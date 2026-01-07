import { NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/redis";
import {
  logSecurityEvent,
  SecurityEventType,
  isIpBlocked,
} from "@/lib/security-logger";
import { validateCsrfToken } from "@/lib/csrf";
import { validateEmail, sanitizeString } from "@/lib/validation";
import { verifyRecaptchaEnterprise } from "@/lib/recaptcha";

const resend = new Resend(process.env.RESEND_API_KEY);

const REQUEST_TYPE_LABELS: Record<string, string> = {
  cv: "Candidature (CV)",
  technical: "Problème technique",
  assistance: "Demande d'assistance",
  bug: "Signalement de bug",
  partnership: "Proposition de partenariat",
  other: "Autre demande",
};

// Get client IP (local utility for this route)
function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const real = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0] || real || "unknown";
}

export async function POST(request: Request) {
  try {
    // Get client info for security logging
    const clientIp = getClientIp(request);
    const userAgent = request.headers.get("user-agent") || undefined;

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

    // Rate limiting with Redis
    const rateLimit = await checkRateLimit(
      clientIp,
      undefined,
      "contact_direct",
    );
    if (!rateLimit.allowed) {
      await logSecurityEvent({
        type: SecurityEventType.RATE_LIMIT_EXCEEDED,
        ip: clientIp,
        userAgent,
        details: {
          resetTime: new Date(rateLimit.resetTime).toISOString(),
          remaining: rateLimit.remaining,
        },
        timestamp: Date.now(),
      });
      return NextResponse.json(
        {
          error: "Trop de requêtes. Veuillez réessayer dans 10 minutes.",
          resetTime: rateLimit.resetTime,
        },
        { status: 429 },
      );
    }

    const body = await request.json();
    const {
      requestType,
      email,
      name,
      company,
      phone,
      message,
      csrfToken,
      recaptchaToken,
    } = body;

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

    // Length validations
    if (name.length > 100 || message.length > 5000) {
      await logSecurityEvent({
        type: SecurityEventType.INVALID_INPUT,
        ip: clientIp,
        userAgent,
        details: {
          reason: "Data too long",
          nameLength: name.length,
          messageLength: message.length,
        },
        timestamp: Date.now(),
      });
      return NextResponse.json(
        { error: "Données trop longues" },
        { status: 400 },
      );
    }

    if (company && company.length > 100) {
      await logSecurityEvent({
        type: SecurityEventType.INVALID_INPUT,
        ip: clientIp,
        userAgent,
        details: {
          reason: "Company name too long",
          companyLength: company.length,
        },
        timestamp: Date.now(),
      });
      return NextResponse.json(
        { error: "Nom d'entreprise trop long" },
        { status: 400 },
      );
    }

    // XSS prevention check
    const xssPattern = /<script|javascript:|on\w+=/i;
    if (
      xssPattern.test(name) ||
      xssPattern.test(message) ||
      (company && xssPattern.test(company))
    ) {
      await logSecurityEvent({
        type: SecurityEventType.XSS_ATTEMPT,
        ip: clientIp,
        userAgent,
        details: {
          reason: "XSS pattern detected",
          fields: {
            name: xssPattern.test(name),
            message: xssPattern.test(message),
            company: company ? xssPattern.test(company) : false,
          },
        },
        timestamp: Date.now(),
      });
      return NextResponse.json(
        { error: "Contenu invalide détecté" },
        { status: 400 },
      );
    }

    // ✅ Sanitize all inputs using centralized helper
    const safeName = sanitizeString(name.trim());
    const safeEmail = sanitizeString(email.trim());
    const safeCompany = company ? sanitizeString(company.trim()) : "";
    const safePhone = phone ? sanitizeString(phone.trim()) : "";
    const safeMessage = sanitizeString(message.trim());

    // Send email via Resend
    const requestTypeLabel =
      REQUEST_TYPE_LABELS[requestType] || "Autre demande";
    const { data, error } = await resend.emails.send({
      from: "Smidjan Contact <contact@smidjan.be>",
      to: ["smidjan.agency@outlook.com"],
      replyTo: email,
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
                    <td style="padding: 8px 0;"><strong>${safeName}</strong></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Email:</td>
                    <td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #667eea; text-decoration: none;">${safeEmail}</a></td>
                  </tr>
                  ${
                    safeCompany
                      ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Entreprise:</td>
                    <td style="padding: 8px 0;">${safeCompany}</td>
                  </tr>
                  `
                      : ""
                  }
                  ${
                    safePhone
                      ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Téléphone:</td>
                    <td style="padding: 8px 0;"><a href="tel:${safePhone}" style="color: #667eea; text-decoration: none;">${safePhone}</a></td>
                  </tr>
                  `
                      : ""
                  }
                </table>
              </div>

              <div style="background: white; padding: 20px; border-radius: 8px;">
                <h2 style="color: #667eea; margin-top: 0; font-size: 18px;">Message</h2>
                <p style="white-space: pre-wrap; margin: 0; line-height: 1.6;">${safeMessage}</p>
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
