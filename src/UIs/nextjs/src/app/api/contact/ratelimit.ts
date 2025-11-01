/**
 * Server-side rate limiting for API endpoints
 * Tracks requests by IP address with sliding window
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// In-memory storage for rate limiting (use Redis in production with high traffic)
const requestCounts = new Map<string, RateLimitRecord>();

// Cleanup old entries every 10 minutes
setInterval(
  () => {
    const now = Date.now();
    for (const [ip, record] of requestCounts.entries()) {
      if (now > record.resetTime) {
        requestCounts.delete(ip);
      }
    }
  },
  10 * 60 * 1000,
);

/**
 * Check if request should be rate limited
 * @param ip - Client IP address
 * @param maxRequests - Maximum requests allowed in window (default: 5)
 * @param windowMs - Time window in milliseconds (default: 60000ms = 1 minute)
 * @returns true if request is allowed, false if rate limited
 */
export function checkRateLimit(
  ip: string,
  maxRequests: number = 5,
  windowMs: number = 60000,
): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);

  // No record or window expired - allow request
  if (!record || now > record.resetTime) {
    requestCounts.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return true;
  }

  // Check if limit exceeded
  if (record.count >= maxRequests) {
    return false;
  }

  // Increment counter
  record.count++;
  return true;
}

/**
 * Extract client IP from request headers
 * Handles proxies, load balancers, and CDNs
 * @param request - Next.js request object
 * @returns Client IP address or 'unknown'
 */
export function getClientIP(request: Request): string {
  // Check X-Forwarded-For header (set by proxies/load balancers)
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // X-Forwarded-For can be a comma-separated list, first IP is the client
    return forwardedFor.split(",")[0].trim();
  }

  // Check X-Real-IP header (alternative header)
  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP.trim();
  }

  // Fallback for development/testing
  return "unknown";
}

/**
 * Get remaining requests for an IP
 * Useful for adding X-RateLimit-* headers
 */
export function getRateLimitInfo(
  ip: string,
  maxRequests: number = 5,
): { remaining: number; resetTime: number } {
  const record = requestCounts.get(ip);
  const now = Date.now();

  if (!record || now > record.resetTime) {
    return {
      remaining: maxRequests,
      resetTime: now + 60000,
    };
  }

  return {
    remaining: Math.max(0, maxRequests - record.count),
    resetTime: record.resetTime,
  };
}
