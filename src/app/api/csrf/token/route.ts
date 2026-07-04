import { NextResponse } from "next/server";
import { generateCsrfToken, storeCsrfToken } from "@/lib/csrf";
import { csrfLimiter, getClientIdentifier } from "@/lib/rate-limit-redis";

// Get client IP
function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const real = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0] || real || "unknown";
}

export async function GET(request: Request) {
  try {
    // Rate limiting check with error handling
    const clientIdentifier = getClientIdentifier(request);
    let rateLimitResult: {
      success: boolean;
      limit: number;
      remaining: number;
      reset: number;
    };

    try {
      rateLimitResult = await csrfLimiter.limit(clientIdentifier);
    } catch (redisError) {
      // SECURITY (V-W6): CSRF-token issuance is low sensitivity — the token
      // alone grants nothing (it must still pass Origin/Referer + session
      // checks on the protected POST). Blocking issuance when Redis is down
      // would break every legitimate form and the login flow, so we keep
      // issuing tokens. We deliberately log this as a WARNING (not silently)
      // so that the degraded, un-rate-limited state is visible in monitoring.
      console.warn(
        "[CSRF] Rate-limit backend unavailable — issuing token WITHOUT rate limiting (fail-open, low sensitivity):",
        redisError,
      );
      rateLimitResult = {
        success: true,
        limit: 60,
        remaining: 59,
        reset: Date.now() + 60000,
      };
    }

    const { success, limit, remaining, reset } = rateLimitResult;

    if (!success) {
      console.warn("[CSRF] Rate limit exceeded for:", clientIdentifier);
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          errorCode: "RATE_LIMIT_EXCEEDED",
        },
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": reset.toString(),
            "Retry-After": Math.ceil((reset - Date.now()) / 1000).toString(),
          },
        },
      );
    }

    const clientIp = getClientIp(request);

    // Generate CSRF token
    const token = generateCsrfToken();

    // Store token in Redis (expires in 1 hour)
    await storeCsrfToken(token, clientIp);

    console.log(
      "[CSRF] Token generated for:",
      clientIp.substring(0, 10) + "...",
    );

    return NextResponse.json(
      {
        token,
        expiresIn: 3600, // 1 hour in seconds
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
        },
      },
    );
  } catch (error) {
    console.error("[CSRF] Token generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate CSRF token" },
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
