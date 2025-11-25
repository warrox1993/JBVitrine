import { Redis } from "@upstash/redis";

// Initialize Redis client
// For production, set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in .env
export const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

// Fallback in-memory store for development
const memoryStore = new Map<string, { count: number; resetTime: number }>();

export interface RateLimitConfig {
  limit: number; // Max requests
  windowMs: number; // Time window in milliseconds
}

export async function checkRateLimit(
  ip: string,
  config: RateLimitConfig = {
    limit: process.env.NODE_ENV === "development" ? 100 : 20,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
  const now = Date.now();
  const key = `rate_limit:${ip}`;

  if (redis) {
    // Use Redis for production
    try {
      const count = await redis.incr(key);

      if (count === 1) {
        // First request, set expiration
        await redis.pexpire(key, config.windowMs);
      }

      const ttl = await redis.pttl(key);
      const resetTime = now + (ttl > 0 ? ttl : config.windowMs);

      return {
        allowed: count <= config.limit,
        remaining: Math.max(0, config.limit - count),
        resetTime,
      };
    } catch (error) {
      console.error("Redis rate limit error:", error);
      // Fallback to memory store on Redis error
    }
  }

  // Use in-memory store for development or Redis fallback
  const record = memoryStore.get(key);

  if (!record || now > record.resetTime) {
    const resetTime = now + config.windowMs;
    memoryStore.set(key, { count: 1, resetTime });
    return { allowed: true, remaining: config.limit - 1, resetTime };
  }

  if (record.count >= config.limit) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  record.count++;
  return {
    allowed: true,
    remaining: config.limit - record.count,
    resetTime: record.resetTime,
  };
}

// Clear rate limit for an IP (useful for testing)
export async function clearRateLimit(ip: string): Promise<void> {
  const key = `rate_limit:${ip}`;

  if (redis) {
    await redis.del(key);
  } else {
    memoryStore.delete(key);
  }
}
