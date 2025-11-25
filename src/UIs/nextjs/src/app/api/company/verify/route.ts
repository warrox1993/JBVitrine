import { NextResponse } from "next/server";
import { verifyCompanyWithCBE, validateBCEFormat } from "@/lib/cbeapi";
import { checkRateLimit } from "@/lib/redis";
import { logSecurityEvent, SecurityEventType } from "@/lib/security-logger";

// Get client IP
function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const real = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0] || real || "unknown";
}

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
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
