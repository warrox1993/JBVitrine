import { NextResponse } from "next/server";
import { getResend } from "@/lib/email/resend-client";
import {
  contactLimiter,
  contactAttemptLimiter,
  getClientIdentifier,
} from "@/lib/rate-limit-redis";
import {
  logSecurityEvent,
  SecurityEventType,
  isIpBlocked,
} from "@/lib/security-logger";
import { validateCsrfToken, consumeCsrfToken } from "@/lib/csrf";
import { validateContentType, validateCSRF } from "@/lib/api/middleware";
import { validateEmail, sanitizeString } from "@/lib/validation";
import { verifyRecaptchaEnterprise } from "@/lib/recaptcha";
import { escapeHtml } from "@/lib/security/escape";
import { contact } from "@/config/site";

const REQUEST_TYPE_LABELS: Record<string, string> = {
  cv: "Candidature (CV)",
  technical: "Problème technique",
  assistance: "Demande d'assistance",
  bug: "Signalement de bug",
  partnership: "Proposition de partenariat",
  other: "Autre demande",
};

/** Reject oversized payloads before parsing (same guard as /api/leadScoring/leads). */
const MAX_BODY_BYTES = 64 * 1024;

/** Per-field length ceilings, enforced for every field including optional ones. */
const MAX_LENGTHS = {
  name: 100,
  company: 100,
  phone: 32,
  email: 254,
  message: 5000,
} as const;

/**
 * Read a body field as a trimmed string, or null when it is absent/not a string.
 *
 * Guards against type confusion: `{"name": ["a","b"]}` has a `.length` of 2, so
 * a bare length check passed it through and the later `.trim()` threw a
 * TypeError, surfacing as a 500. Anything that is not a string is rejected.
 */
function readString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export async function POST(request: Request) {
  try {
    // Get client info for security logging. Use the trusted identifier
    // (x-real-ip set by the Vercel proxy) — NOT the spoofable left-most
    // x-forwarded-for — so the rate-limit key, IP-block lookup and security
    // event attribution can't be forged (no bypass / no victim-IP poisoning).
    const clientIp = getClientIdentifier(request);
    const userAgent = request.headers.get("user-agent") || undefined;

    // Raw-attempt ceiling — FIRST gate, before Content-Type, Origin, parsing or
    // any outbound call.
    //
    // The 3/hour send quota is deliberately charged at the very END of this
    // handler, so early rejections (415, bad Origin, malformed JSON) cost the
    // caller nothing and are recorded nowhere. Without this gate the most
    // exposed public route of the site had no rate ceiling at all: a single IP
    // could loop indefinitely — no 429, no counter, invisible to
    // getSecurityStats(). It must sit ahead of the cheap validators too,
    // otherwise a flood simply sends the wrong Content-Type and slips past.
    //
    // This is a DIFFERENT limiter with its own prefix. It caps raw *attempts*
    // and does not touch the 3/hour *send* policy.
    let attempt: Awaited<ReturnType<typeof contactAttemptLimiter.limit>> | null = null;
    try {
      attempt = await contactAttemptLimiter.limit(clientIp);
    } catch (attemptError) {
      // Fail OPEN here on purpose: this is a flood guard, not the anti-spam
      // control. The 3/hour quota below fails CLOSED and stays authoritative.
      console.error("Attempt limiter unavailable (failing open):", attemptError);
    }
    if (attempt && !attempt.success && attempt.reason !== "timeout") {
      return NextResponse.json(
        { error: "Trop de tentatives. Veuillez patienter quelques minutes." },
        { status: 429, headers: { "Retry-After": "600" } },
      );
    }

    // SECURITY: require application/json. Without it, `request.json()` happily
    // parses a body sent by a cross-origin form with enctype="text/plain",
    // which needs no CORS preflight — a working CSRF vector even though the
    // CSRF token itself is checked below.
    const contentTypeCheck = validateContentType(request);
    if (!contentTypeCheck.success) return contentTypeCheck.response;

    // SECURITY: strict Origin/Referer check, same control the other mutating
    // routes (/api/company/verify, /api/leadScoring/leads) already apply. The
    // CSRF token alone is not bound to a session or cookie, so anyone can GET
    // one from the public /api/csrf/token and replay it; this is what actually
    // ties the request to our own origin.
    const originCheck = validateCSRF(request);
    if (!originCheck.success) return originCheck.response;

    // Check if IP is blocked
    if (await isIpBlocked(clientIp)) {
      await logSecurityEvent({
        type: SecurityEventType.RATE_LIMIT_EXCEEDED,
        ip: clientIp,
        userAgent,
        details: { reason: "IP blocked due to excessive violations" },
        timestamp: Date.now(),
      });
      return NextResponse.json(
        {
          error:
            "Accès temporairement bloqué. Contactez le support si nécessaire.",
        },
        { status: 403 },
      );
    }

    // NOTE ON ORDERING (bug 429): the 3-per-hour anti-spam quota is consumed at
    // the very END of this handler, right before the mail is sent — NOT here.
    //
    // It used to be debited first, ahead of CSRF, captcha and field validation.
    // Every rejected submission still burned a slot, so three typos (or three
    // empty POSTs from an attacker, who never had to solve the captcha) locked
    // the site's only conversion channel for a full hour without a single mail
    // being sent. The ceiling itself is unchanged: 3 per hour.

    // Reject oversized bodies before parsing.
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Payload trop volumineux" }, { status: 413 });
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
    }
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
    }

    const requestType = readString(body.requestType);
    const email = readString(body.email);
    const name = readString(body.name);
    const company = readString(body.company);
    const phone = readString(body.phone);
    const message = readString(body.message);
    const csrfToken = readString(body.csrfToken);
    const recaptchaToken = readString(body.recaptchaToken);

    // CSRF validation
    if (!csrfToken || !(await validateCsrfToken(csrfToken, clientIp))) {
      await logSecurityEvent({
        type: SecurityEventType.INVALID_CSRF,
        ip: clientIp,
        userAgent,
        details: { hasToken: !!csrfToken },
        timestamp: Date.now(),
      });
      return NextResponse.json(
        { error: "Token de sécurité invalide. Rechargez la page." },
        { status: 403 },
      );
    }

    // reCAPTCHA verification (REQUIRED)
    if (!recaptchaToken) {
      await logSecurityEvent({
        type: SecurityEventType.CAPTCHA_FAILED,
        ip: clientIp,
        userAgent,
        details: { hasToken: false, reason: "Token missing" },
        timestamp: Date.now(),
      });
      return NextResponse.json(
        { error: "Vérification de sécurité manquante" },
        { status: 400 },
      );
    }

    const recaptchaResult = await verifyRecaptchaEnterprise(
      recaptchaToken,
      "contact_form",
      clientIp,
    );
    if (!recaptchaResult.success) {
      await logSecurityEvent({
        type: SecurityEventType.CAPTCHA_FAILED,
        ip: clientIp,
        userAgent,
        details: {
          hasToken: !!recaptchaToken,
          score: recaptchaResult.score,
        },
        timestamp: Date.now(),
      });
      return NextResponse.json(
        { error: "Vérification anti-bot échouée. Veuillez réessayer." },
        { status: 403 },
      );
    }

    // Validation
    if (!requestType || !email || !name || !message) {
      await logSecurityEvent({
        type: SecurityEventType.INVALID_INPUT,
        ip: clientIp,
        userAgent,
        details: { reason: "Missing required fields" },
        timestamp: Date.now(),
      });
      return NextResponse.json(
        { error: "Type de demande, email, nom et message requis" },
        { status: 400 },
      );
    }

    // Request type whitelist validation
    const validTypes = [
      "cv",
      "technical",
      "assistance",
      "bug",
      "partnership",
      "other",
    ];
    if (!validTypes.includes(requestType)) {
      await logSecurityEvent({
        type: SecurityEventType.INVALID_INPUT,
        ip: clientIp,
        userAgent,
        details: { reason: "Invalid request type", requestType },
        timestamp: Date.now(),
      });
      return NextResponse.json(
        { error: "Type de demande invalide" },
        { status: 400 },
      );
    }

    // ✅ Email validation using centralized helper
    if (!validateEmail(email)) {
      await logSecurityEvent({
        type: SecurityEventType.INVALID_INPUT,
        ip: clientIp,
        userAgent,
        details: { reason: "Invalid email format" },
        timestamp: Date.now(),
      });
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 },
      );
    }

    // Length validations — every field, including the optional ones. `phone`
    // previously had no ceiling at all.
    const tooLong = (
      [
        ["name", name],
        ["company", company],
        ["phone", phone],
        ["email", email],
        ["message", message],
      ] as const
    ).find(([field, value]) => value !== null && value.length > MAX_LENGTHS[field]);

    if (tooLong) {
      await logSecurityEvent({
        type: SecurityEventType.INVALID_INPUT,
        ip: clientIp,
        userAgent,
        details: {
          reason: "Data too long",
          field: tooLong[0],
          length: tooLong[1]?.length,
        },
        timestamp: Date.now(),
      });
      return NextResponse.json(
        { error: "Données trop longues" },
        { status: 400 },
      );
    }

    // ✅ Sanitize all inputs using centralized helper (already trimmed by readString)
    const safeName = sanitizeString(name);
    const safeEmail = sanitizeString(email);
    const safeCompany = company ? sanitizeString(company) : "";
    const safePhone = phone ? sanitizeString(phone) : "";
    const safeMessage = sanitizeString(message);

    // Rate limiting: 3 per hour per client — the intended anti-spam ceiling,
    // UNCHANGED. Consumed here, as the last gate before the side effect.
    //
    // NOTE: a consumed slot is NOT refunded if the mail then fails to send —
    // see the Resend error branch below, which refunds explicitly.
    let rateLimit: Awaited<ReturnType<typeof contactLimiter.limit>>;
    try {
      rateLimit = await contactLimiter.limit(clientIp);
    } catch (limitError) {
      // Fail CLOSED for anti-spam (never send mail without a quota check), but
      // with an explicit 503 instead of a generic 500 so the visitor is told to
      // retry rather than shown "Internal server error".
      console.error("Rate limit backend unavailable (failing closed):", limitError);
      return NextResponse.json(
        { error: "Service temporairement indisponible. Veuillez réessayer." },
        { status: 503 },
      );
    }

    // SECURITY (fail-open by default): @upstash/ratelimit races the Redis call
    // against a timer (`this.timeout = config.timeout ?? 5e3`) and, on timeout,
    // RESOLVES with `{ success: true, reason: "timeout" }` — it does NOT throw.
    // The catch above therefore only covers FAST failures (connection refused,
    // 4xx). On the common failure mode — a slow/hanging Upstash — the quota
    // check silently passes and mail goes out with no limit at all. Treat a
    // timeout as a failure, so the fail-closed intent above is real.
    if (rateLimit.reason === "timeout") {
      console.error("Rate limit backend timed out (failing closed)");
      return NextResponse.json(
        { error: "Service temporairement indisponible. Veuillez réessayer." },
        { status: 503 },
      );
    }

    if (!rateLimit.success) {
      await logSecurityEvent({
        type: SecurityEventType.RATE_LIMIT_EXCEEDED,
        ip: clientIp,
        userAgent,
        details: {
          resetTime: new Date(rateLimit.reset).toISOString(),
          remaining: rateLimit.remaining,
        },
        timestamp: Date.now(),
      });
      return NextResponse.json(
        {
          // The window is slidingWindow(3, "1 h") — the previous copy said
          // "10 minutes", which is why a 429 read as arbitrary/immediate.
          error: "Trop de requêtes. Veuillez réessayer dans une heure.",
          resetTime: rateLimit.reset,
        },
        { status: 429 },
      );
    }

    // Burn the CSRF token ATOMICALLY, immediately before the side effect.
    //
    // validateCsrfToken above is a plain read, so N concurrent requests with
    // the same token all pass it. DEL is atomic and reports whether it actually
    // removed the key, so exactly one racer proceeds. Doing this here rather
    // than after the send is what makes single-use real: consuming afterwards
    // left the token replayable for its whole 1h TTL.
    if (!(await consumeCsrfToken(csrfToken))) {
      return NextResponse.json(
        { error: "Token de sécurité déjà utilisé. Rechargez la page." },
        { status: 409 },
      );
    }

    // Send email via Resend
    const requestTypeLabel =
      REQUEST_TYPE_LABELS[requestType] || "Autre demande";
    const { data, error } = await getResend().emails.send({
      from: `Smidjan Contact <${contact.senderEmail}>`,
      to: [contact.notificationsEmail],
      replyTo: safeEmail,
      subject: `[${requestTypeLabel.toUpperCase()}] Nouveau message de ${safeName}${safeCompany ? ` (${safeCompany})` : ""}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Nouveau contact direct</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">
                ${requestTypeLabel}
              </h1>
            </div>

            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #667eea; margin-top: 0; font-size: 18px;">Informations du contact</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 600; width: 120px;">Type:</td>
                    <td style="padding: 8px 0;"><strong>${requestTypeLabel}</strong></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 600; width: 120px;">Nom:</td>
                    <td style="padding: 8px 0;"><strong>${escapeHtml(safeName)}</strong></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Email:</td>
                    <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(safeEmail)}" style="color: #667eea; text-decoration: none;">${escapeHtml(safeEmail)}</a></td>
                  </tr>
                  ${
                    safeCompany
                      ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Entreprise:</td>
                    <td style="padding: 8px 0;">${escapeHtml(safeCompany)}</td>
                  </tr>
                  `
                      : ""
                  }
                  ${
                    safePhone
                      ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Téléphone:</td>
                    <td style="padding: 8px 0;"><a href="tel:${escapeHtml(safePhone)}" style="color: #667eea; text-decoration: none;">${escapeHtml(safePhone)}</a></td>
                  </tr>
                  `
                      : ""
                  }
                </table>
              </div>

              <div style="background: white; padding: 20px; border-radius: 8px;">
                <h2 style="color: #667eea; margin-top: 0; font-size: 18px;">Message</h2>
                <p style="white-space: pre-wrap; margin: 0; line-height: 1.6;">${escapeHtml(safeMessage)}</p>
              </div>

              <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
                <p style="margin: 0; color: #92400e;">
                  <strong>Action requise :</strong> Répondre sous 24h ouvrées
                </p>
              </div>
            </div>

            <div style="margin-top: 20px; text-align: center; color: #6b7280; font-size: 12px;">
              <p style="margin: 0;">
                Ce message a été envoyé depuis le formulaire de contact direct de smidjan.be
              </p>
              <p style="margin: 5px 0 0 0;">
                ${new Date().toLocaleString("fr-BE", { timeZone: "Europe/Brussels" })}
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      // Refund the quota slot: the submission was valid, the failure is OURS.
      // Without this, three Resend incidents cost the visitor all three hourly
      // slots and produce a 429 without a single mail ever being sent — the
      // original bug, merely narrowed to provider outages.
      await contactLimiter.limit(clientIp, { rate: -1 }).catch((refundError) => {
        console.error("Failed to refund the rate-limit slot:", refundError);
      });
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
      id: data?.id,
    });
  } catch (error) {
    console.error("Contact direct API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
