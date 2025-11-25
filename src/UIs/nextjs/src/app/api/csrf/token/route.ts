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
      // If Redis fails, allow the request (fail open)
      console.error("[CSRF] Redis rate limit error:", redisError);
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
