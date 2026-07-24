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

// Initialize Redis client. Support both the Vercel Marketplace Upstash
// integration vars (KV_REST_API_*) and the legacy UPSTASH_REDIS_REST_* names.
const redis = new Redis({
  url: (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL)!,
  token: (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN)!,
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
// 5/min per IP — the enrichment endpoint fans out to metered/paid third-party
// APIs (Hunter, Brandfetch), so keep the ceiling low to cap cost-exhaustion.
export const enrichmentLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"),
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
 * 3. A per-request UNIQUE bucket — see the availability note below.
 *
 * AVAILABILITY FIX (bug 429): the previous implementation returned a single
 * CONSTANT bucket ("shared_no_ip_bucket") whenever no IP could be extracted.
 * That collapsed EVERY such request into ONE shared rate-limit budget, so as
 * soon as the aggregate no-IP traffic exceeded a limiter's ceiling (e.g. 60/min
 * for the CSRF token endpoint) any client — including on its very first request
 * — received a 429. If a deployment/proxy fails to surface a client IP at all,
 * this throttled the ENTIRE site down to one shared bucket. We now fall back to
 * a per-request unique key instead: a request we cannot attribute to a client
 * gets its own bucket (fail-open for rate-limiting) rather than poisoning a
 * bucket shared with unrelated legitimate users.
 *
 * SECURITY NOTE: this is fail-open ONLY on the path where no IP is available.
 * Behind Vercel, real external requests always carry a platform-set
 * `x-forwarded-for` (clients cannot strip it), so genuine abusers are still
 * limited by their real IP via priority 1/2. We deliberately do NOT fall back
 * to a client-controlled fingerprint (user-agent / accept-language), which an
 * attacker could rotate. If your proxy does not set x-real-ip/x-forwarded-for,
 * configure trusted IP forwarding rather than relying on this fallback.
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

  // Priority 3: per-request UNIQUE bucket. Cannot attribute this request to a
  // client, so give it its own bucket instead of a shared constant one (which
  // caused the site-wide 429 bug). Sliding-window keys expire with the window,
  // so these ephemeral keys self-clean and do not accumulate in Redis.
  console.warn(
    "⚠️ Could not extract a trusted client IP (no x-real-ip / x-forwarded-for); " +
      "using a per-request unique rate-limit bucket (fail-open).",
  );
  return `no_ip_${crypto.randomUUID()}`;
}

