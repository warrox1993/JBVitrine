import { Redis } from "@upstash/redis";

// Initialize Redis client
// For production, set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in .env
// Support both the Vercel Marketplace Upstash integration vars (KV_REST_API_*)
// and the legacy UPSTASH_REDIS_REST_* names (fallback).
const redisUrl =
  process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const redisToken =
  process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const redis =
  redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

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
  namespace: string = "default",
): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
  const now = Date.now();
  const key = `rate_limit:${namespace}:${ip}`;

  if (redis) {
    // Use Redis for production
    try {
      // AVAILABILITY (bug 429): the TTL must be (re)asserted on EVERY call, not
      // only when `count === 1`.
      //
      // The previous version did `incr`, then `pexpire` in a separate
      // round-trip guarded by `count === 1`. If that second call was lost
      // (network blip, function timeout between the two, or a pre-existing key
      // with no TTL), the counter NEVER expired: `incr` kept climbing, and past
      // `config.limit` the IP was refused forever. `pttl` then returned -1, so
      // the response advertised a `resetTime` that would never arrive.
      //
      // PEXPIRE ... NX sets the TTL only when the key has none, so it is safe to
      // send on every request — it never extends a running window.
      const pipeline = redis.pipeline();
      pipeline.incr(key);
      pipeline.pexpire(key, config.windowMs, "NX");
      pipeline.pttl(key);
      const [count, , ttl] = (await pipeline.exec()) as [number, number, number];

      // Belt-and-braces: if the key somehow still has no TTL, force one rather
      // than leaving an immortal counter behind.
      if (typeof ttl !== "number" || ttl < 0) {
        await redis.pexpire(key, config.windowMs);
      }

      const effectiveTtl = typeof ttl === "number" && ttl > 0 ? ttl : config.windowMs;

      return {
        allowed: count <= config.limit,
        remaining: Math.max(0, config.limit - count),
        resetTime: now + effectiveTtl,
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
