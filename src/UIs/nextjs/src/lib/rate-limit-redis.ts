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

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

/**
 * Rate limiter for quote submissions
 * Limit: 20 requests per hour per user (increased for testing)
 */
export const quoteLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '1 h'),
  analytics: true,
  prefix: 'smidjan_quote',
});

/**
 * Rate limiter for contact form
 * Limit: 20 requests per hour per user (increased for testing)
 */
export const contactLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '1 h'),
  analytics: true,
  prefix: 'smidjan_contact',
});

/**
 * Rate limiter for lead enrichment API
 * Limit: 60 requests per minute (external API calls)
 */
export const enrichmentLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(60, '1 m'),
  analytics: true,
  prefix: 'smidjan_enrichment',
});

/**
 * Extract client identifier for rate limiting
 * 
 * Priority:
 * 1. Real IP from x-forwarded-for (Vercel passes client IP here)
 * 2. x-real-ip header (fallback)
 * 3. Fingerprint from user-agent + accept-language (last resort)
 * 
 * @param request - Next.js request object
 * @returns Unique identifier for the client
 */
export function getClientIdentifier(request: Request): string {
  // Priority 1: x-forwarded-for (Vercel always sets this)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // Take the first IP (client's real IP)
    const clientIP = forwardedFor.split(',')[0].trim();
    if (clientIP && clientIP !== '' && clientIP !== 'unknown') {
      return clientIP;
    }
  }

  // Priority 2: x-real-ip
  const realIP = request.headers.get('x-real-ip');
  if (realIP && realIP !== '' && realIP !== 'unknown') {
    return realIP.trim();
  }

  // Priority 3: Fingerprint (fallback for development or edge cases)
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const acceptLang = request.headers.get('accept-language') || 'unknown';
  const fingerprint = `fallback_${userAgent.substring(0, 30)}_${acceptLang.substring(0, 10)}`;

  console.warn('⚠️ Could not extract real IP, using fingerprint:', fingerprint.substring(0, 50));
  return fingerprint;
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
    const { success, limit, remaining, reset } = await limiter.limit(identifier);

    if (!success) {
      return {
        success: false,
        response: new Response(
          JSON.stringify({
            ok: false,
            message: 'Trop de requêtes. Veuillez réessayer plus tard.',
            rateLimitInfo: {
              limit,
              remaining: 0,
              reset: new Date(reset).toISOString(),
            },
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'X-RateLimit-Limit': limit.toString(),
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': new Date(reset).toISOString(),
            },
          },
        ),
      };
    }

    return { success: true, remaining };
  } catch (error) {
    console.error('❌ Rate limit check failed:', error);
    // Fail open: allow request if rate limiting service is down
    return { success: true, remaining: undefined };
  }
}
