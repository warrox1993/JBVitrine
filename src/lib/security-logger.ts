import { createHash } from "crypto";
import { redis } from "./redis";
import { maskIp } from "./security/escape";

/**
 * How many daily buckets getSecurityStats aggregates, and how long each bucket
 * lives. Counters used to be a single unbounded key per event type with no TTL:
 * they grew forever and reported an all-time total, which is useless for
 * spotting a spike.
 */
const COUNTER_RETENTION_DAYS = 30;
const COUNTER_TTL_SECONDS = COUNTER_RETENTION_DAYS * 24 * 60 * 60;

/** UTC day stamp (YYYY-MM-DD) used to bucket the per-type counters. */
function dayStamp(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * Pseudonymise an IP before it becomes a Redis key.
 *
 * PRIVACY (GDPR): an IP address is personal data. Storing it verbatim inside a
 * key name makes the whole keyspace a plaintext list of visitor IPs. Hashing it
 * keeps the counter functional (same input → same key) without retaining the
 * identifier itself. NEXTAUTH_SECRET acts as the pepper so the digest cannot be
 * reversed with a rainbow table over the ~4 billion IPv4 space; a dedicated
 * IP_HASH_PEPPER takes precedence when set.
 */
function ipKeyHash(ip: string): string {
  const pepper =
    process.env.IP_HASH_PEPPER || process.env.NEXTAUTH_SECRET || "";
  return createHash("sha256").update(`${pepper}:${ip}`).digest("hex").slice(0, 32);
}

export enum SecurityEventType {
  RATE_LIMIT_EXCEEDED = "rate_limit_exceeded",
  XSS_ATTEMPT = "xss_attempt",
  INVALID_INPUT = "invalid_input",
  INVALID_CSRF = "invalid_csrf",
  SUSPICIOUS_PATTERN = "suspicious_pattern",
  CAPTCHA_FAILED = "captcha_failed",
}

export interface SecurityEvent {
  type: SecurityEventType;
  ip: string;
  userAgent?: string;
  details: Record<string, any>;
  timestamp: number;
}

// Log security events
export async function logSecurityEvent(event: SecurityEvent): Promise<void> {
  const timestamp = event.timestamp || Date.now();

  // PRIVACY (GDPR): never write a raw IP or a full user-agent to a log sink.
  // next.config.ts keeps `warn`/`error` in production (removeConsole excludes
  // them), so anything logged here lands verbatim in the Vercel logs. The
  // masked form is enough to correlate events without retaining the identifier.
  const logEntry = {
    ...event,
    ip: maskIp(event.ip),
    userAgent: event.userAgent?.substring(0, 100),
    timestamp,
  };

  console.warn("[SECURITY]", logEntry);

  // Store in Redis for production monitoring
  if (redis) {
    try {
      const key = `security_log:${event.type}:${timestamp}`;
      await redis.setex(key, 7 * 24 * 60 * 60, JSON.stringify(logEntry)); // Keep for 7 days

      // Increment the counter for this event type, bucketed per UTC day and
      // expiring, so stats show a recent window instead of an all-time total
      // that grows in Redis forever.
      const counterKey = `security_count:${event.type}:${dayStamp(new Date(timestamp))}`;
      await redis.incr(counterKey);
      await redis.expire(counterKey, COUNTER_TTL_SECONDS);

      // Also track per client, keyed by a peppered hash rather than the IP.
      const ipKey = `security_ip:${ipKeyHash(event.ip)}`;
      await redis.incr(ipKey);
      await redis.expire(ipKey, 24 * 60 * 60); // Reset daily
    } catch (error) {
      console.error("Failed to log security event to Redis:", error);
    }
  }

  // In production, you could also:
  // - Send to monitoring service (Sentry, DataDog, etc.)
  // - Trigger alerts for critical events
  // - Block IPs with too many violations
}

// Get security stats (for admin dashboard)
export async function getSecurityStats(): Promise<{
  rateLimitViolations: number;
  xssAttempts: number;
  invalidInputs: number;
  csrfViolations: number;
  suspiciousPatterns: number;
  captchaFailures: number;
}> {
  if (!redis) {
    return {
      rateLimitViolations: 0,
      xssAttempts: 0,
      invalidInputs: 0,
      csrfViolations: 0,
      suspiciousPatterns: 0,
      captchaFailures: 0,
    };
  }

  try {
    // Counters are bucketed per UTC day, so sum the retention window.
    const days = Array.from({ length: COUNTER_RETENTION_DAYS }, (_, i) =>
      dayStamp(new Date(Date.now() - i * 24 * 60 * 60 * 1000)),
    );

    const sumForType = async (type: SecurityEventType): Promise<number> => {
      const keys = days.map((d) => `security_count:${type}:${d}`);
      const values = await redis!.mget<(string | number | null)[]>(...keys);
      return (values ?? []).reduce<number>((acc, v) => acc + (Number(v) || 0), 0);
    };

    const [
      rateLimitViolations,
      xssAttempts,
      invalidInputs,
      csrfViolations,
      suspiciousPatterns,
      captchaFailures,
    ] = await Promise.all([
      sumForType(SecurityEventType.RATE_LIMIT_EXCEEDED),
      sumForType(SecurityEventType.XSS_ATTEMPT),
      sumForType(SecurityEventType.INVALID_INPUT),
      sumForType(SecurityEventType.INVALID_CSRF),
      sumForType(SecurityEventType.SUSPICIOUS_PATTERN),
      sumForType(SecurityEventType.CAPTCHA_FAILED),
    ]);

    return {
      rateLimitViolations,
      xssAttempts,
      invalidInputs,
      csrfViolations,
      suspiciousPatterns,
      captchaFailures,
    };
  } catch (error) {
    console.error("Failed to get security stats:", error);
    return {
      rateLimitViolations: 0,
      xssAttempts: 0,
      invalidInputs: 0,
      csrfViolations: 0,
      suspiciousPatterns: 0,
      captchaFailures: 0,
    };
  }
}

// Check if IP should be blocked
export async function isIpBlocked(ip: string): Promise<boolean> {
  if (!redis) return false;

  try {
    // Must use the same pseudonymised key as logSecurityEvent.
    const violations = await redis.get(`security_ip:${ipKeyHash(ip)}`);
    // Block if more than 20 violations in 24h
    return Number(violations) > 20;
  } catch (error) {
    console.error("Failed to check IP block status:", error);
    return false;
  }
}
