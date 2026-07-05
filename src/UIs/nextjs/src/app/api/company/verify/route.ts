import { NextRequest, NextResponse } from "next/server";
import { verifyCompanyWithCBE, validateBCEFormat } from "@/lib/cbeapi";
import { checkRateLimit } from "@/lib/redis";
import { logSecurityEvent, SecurityEventType } from "@/lib/security-logger";
import { getClientIdentifier } from "@/lib/rate-limit-redis";
import { validateContentType, validateCSRF } from "@/lib/api/middleware";

// FOLLOW-UP (V-W7): no caller of this endpoint was found passing a
// reCAPTCHA token (searched src/ for "bceNumber" usage), so `validateRecaptcha`
// is NOT wired in here to avoid breaking the existing client flow. Before
// enabling it, confirm the form component collects and forwards a
// `recaptchaToken` field, then add:
//   const recaptchaCheck = await validateRecaptcha(request, body.recaptchaToken, "company_verify");
//   if (!recaptchaCheck.success) return recaptchaCheck.response;

export async function POST(request: NextRequest) {
  try {
    // SECURITY (V-W7): reject non-JSON bodies and cross-origin requests
    // (defense-in-depth beyond SameSite cookies) before doing any work.
    const contentTypeCheck = validateContentType(request);
    if (!contentTypeCheck.success) return contentTypeCheck.response;

    const csrfCheck = validateCSRF(request);
    if (!csrfCheck.success) return csrfCheck.response;

    // SECURITY (V-W7): use the shared, platform-trusted client identifier
    // instead of a local x-forwarded-for[0] parse (spoofable duplicate).
    const clientIp = getClientIdentifier(request);
    const userAgent = request.headers.get("user-agent") || undefined;

    // Rate limiting: 10 requests per 5 minutes (more lenient than contact form)
    const rateLimit = await checkRateLimit(clientIp, {
      limit: 10,
      windowMs: 5 * 60 * 1000,
    }, "company_verify");

    if (!rateLimit.allowed) {
      await logSecurityEvent({
        type: SecurityEventType.RATE_LIMIT_EXCEEDED,
        ip: clientIp,
        userAgent,
        details: {
          endpoint: "/api/company/verify",
          resetTime: new Date(rateLimit.resetTime).toISOString(),
        },
        timestamp: Date.now(),
      });

      return NextResponse.json(
        {
          error: "Trop de requêtes. Veuillez réessayer dans quelques minutes.",
          resetTime: rateLimit.resetTime,
        },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { bceNumber } = body;

    if (!bceNumber || typeof bceNumber !== "string") {
      return NextResponse.json({ error: "Numéro BCE requis" }, { status: 400 });
    }

    // First, validate format without API call
    const formatValidation = validateBCEFormat(bceNumber);
    if (!formatValidation.valid) {
      return NextResponse.json({
        valid: false,
        error: formatValidation.error,
        formatted: null,
      });
    }

    // Then verify with CBE API
    const verification = await verifyCompanyWithCBE(bceNumber);

    // Log suspicious patterns (company not found, inactive companies)
    if (verification.exists && !verification.active) {
      await logSecurityEvent({
        type: SecurityEventType.SUSPICIOUS_PATTERN,
        ip: clientIp,
        userAgent,
        details: {
          reason: "Inactive company BCE number provided",
          bceNumber: formatValidation.formatted,
        },
        timestamp: Date.now(),
      });
    }

    return NextResponse.json({
      valid: verification.valid,
      exists: verification.exists,
      active: verification.active,
      formatted: formatValidation.formatted,
      company: verification.company
        ? {
            name: verification.company.name,
            status: verification.company.status,
            address: verification.company.address,
          }
        : null,
      error: verification.error,
    });
  } catch (error) {
    console.error("Company verification error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la vérification" },
      { status: 500 },
    );
  }
}
