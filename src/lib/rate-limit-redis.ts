/**
 * Upstash Redis Configuration for Rate Limiting
 *
 * Architecture:
 * - Neon Postgres: Persistent data (quotes, leads, orders)
 * - Upstash Redis: Fast operations (rate limiting, cache, counters)
 *
 * Best Practices Next.js 16 (2025):
 * - Sliding window algorithm (more fair than fixed window)
 * - Separate limiters per endpoint (different limits)
 * - Analytics enabled (monitor rate limiting)
 * - Graceful fallback on Redis errors
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

/**
 * Rate limiter for quote submissions
 * Limit: 3 requests per hour per user (anti-spam)
 *
 * Prefix v3: Reset all counters (previous limits were broken)
 */
export const quoteLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "1 h"),
  analytics: true,
  prefix: "smidjan_v4_quote",
});

/**
 * Rate limiter for contact form
 * Limit: 3 requests per hour per user (anti-spam)
 */
export const contactLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "1 h"),
  analytics: true,
  prefix: "smidjan_v3_contact",
});

/**
 * Rate limiter for admin login
 * Limit: 5 attempts per 15 minutes per user
 */
export const loginLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "15 m"),
  analytics: true,
  prefix: "smidjan_v3_login",
});

/**
 * Rate limiter for lead enrichment API
 * Limit: 100 requests per minute per user
 */
export const enrichmentLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "1 m"),
  analytics: true,
  prefix: "smidjan_v3_enrichment",
});

/**
 * Rate limiter for CSRF token endpoint
 * Limit: 60 requests per minute per user
 */
export const csrfLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(60, "1 m"),
  analytics: true,
  prefix: "smidjan_v3_csrf",
});

/**
 * Rate limiter for lead scoring session/events endpoints
 * Limit: 100 requests per minute per user
 */
export const leadScoringLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "1 m"),
  analytics: true,
  prefix: "smidjan_v3_leadscore",
});

/**
 * Extract client identifier for rate limiting
 *
 * SECURITY (V-W6): The left-most segment of `x-forwarded-for` is fully
 * client-controlled and therefore spoofable, so it must NOT be trusted as the
 * rate-limit key. This app runs behind Vercel's proxy, which populates
 * `x-real-ip` with the real, platform-observed client IP. We therefore treat
 * `x-real-ip` as the trustworthy source of truth.
 *
 * ASSUMPTION: deployed behind Vercel's edge/proxy (or an equivalent trusted
 * proxy) that sets `x-real-ip` to the true client IP and strips/overrides
 * inbound spoofed values. This is true for the production deployment.
 *
 * Priority:
 * 1. x-real-ip (trusted platform-provided client IP)
 * 2. x-forwarded-for FIRST entry — ONLY as a fallback when x-real-ip is absent
 *    (e.g. local/self-hosted dev without the Vercel proxy)
 * 3. A single constant bucket — we deliberately do NOT fall back to a
 *    client-controlled fingerprint (user-agent / accept-language), because an
 *    attacker could rotate those to evade the limit. A shared constant bucket
 *    fails closed for rate-limiting purposes (it will throttle harder, never
 *    weaker).
 *
 * @param request - Next.js request object
 * @returns Unique identifier for the client
 */
export function getClientIdentifier(request: Request): string {
  // Priority 1: x-real-ip — trusted client IP set by the Vercel proxy.
  const realIP = request.headers.get("x-real-ip");
  if (realIP && realIP.trim() !== "" && realIP.trim() !== "unknown") {
    return realIP.trim();
  }

  // Priority 2: x-forwarded-for first entry — ONLY when x-real-ip is missing.
  // Not trustworthy behind Vercel (spoofable), but useful for local/self-hosted
  // dev where no trusted proxy sets x-real-ip.
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const clientIP = forwardedFor.split(",")[0].trim();
    if (clientIP && clientIP !== "" && clientIP !== "unknown") {
      return clientIP;
    }
  }

  // Priority 3: constant bucket. Do NOT use a client-controlled fingerprint
  // (would let attackers rotate headers to bypass rate limiting). A shared
  // constant bucket fails closed (over-throttles) rather than open.
  console.warn(
    "⚠️ Could not extract a trusted client IP (no x-real-ip / x-forwarded-for); " +
      "using shared constant rate-limit bucket.",
  );
  return "shared_no_ip_bucket";
}

/**
 * Helper to check rate limit and return formatted response
 * Usage example:
 *
 * const rateLimitResult = await checkRateLimit(quoteLimiter, request);
 * if (!rateLimitResult.success) {
 *   return rateLimitResult.response;
 * }
 */
export async function checkRateLimit(
  limiter: Ratelimit,
  request: Request,
): Promise<{
  success: boolean;
  response?: Response;
  remaining?: number;
}> {
  try {
    const identifier = getClientIdentifier(request);
    const { success, limit, remaining, reset } =
      await limiter.limit(identifier);

    if (!success) {
      return {
        success: false,
        response: new Response(
          JSON.stringify({
            ok: false,
            message: "Trop de requêtes. Veuillez réessayer plus tard.",
            rateLimitInfo: {
              limit,
              remaining: 0,
              reset: new Date(reset).toISOString(),
            },
          }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "X-RateLimit-Limit": limit.toString(),
              "X-RateLimit-Remaining": "0",
              "X-RateLimit-Reset": new Date(reset).toISOString(),
            },
          },
        ),
      };
    }

    return { success: true, remaining };
  } catch (error) {
    console.error("❌ Rate limit check failed:", error);
    // Fail open: allow request if rate limiting service is down
    return { success: true, remaining: undefined };
  }
}
