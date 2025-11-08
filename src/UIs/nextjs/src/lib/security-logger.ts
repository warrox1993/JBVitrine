import { redis } from "./redis";

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
  const logEntry = {
    ...event,
    timestamp: event.timestamp || Date.now(),
  };

  // Console log for development
  console.warn("[SECURITY]", logEntry);

  // Store in Redis for production monitoring
  if (redis) {
    try {
      const key = `security_log:${event.type}:${Date.now()}`;
      await redis.setex(key, 7 * 24 * 60 * 60, JSON.stringify(logEntry)); // Keep for 7 days

      // Increment counter for this event type
      const counterKey = `security_count:${event.type}`;
      await redis.incr(counterKey);

      // Also track by IP
      const ipKey = `security_ip:${event.ip}`;
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
    const [
      rateLimitViolations,
      xssAttempts,
      invalidInputs,
      csrfViolations,
      suspiciousPatterns,
      captchaFailures,
    ] = await Promise.all([
      redis.get(`security_count:${SecurityEventType.RATE_LIMIT_EXCEEDED}`),
      redis.get(`security_count:${SecurityEventType.XSS_ATTEMPT}`),
      redis.get(`security_count:${SecurityEventType.INVALID_INPUT}`),
      redis.get(`security_count:${SecurityEventType.INVALID_CSRF}`),
      redis.get(`security_count:${SecurityEventType.SUSPICIOUS_PATTERN}`),
      redis.get(`security_count:${SecurityEventType.CAPTCHA_FAILED}`),
    ]);

    return {
      rateLimitViolations: Number(rateLimitViolations) || 0,
      xssAttempts: Number(xssAttempts) || 0,
      invalidInputs: Number(invalidInputs) || 0,
      csrfViolations: Number(csrfViolations) || 0,
      suspiciousPatterns: Number(suspiciousPatterns) || 0,
      captchaFailures: Number(captchaFailures) || 0,
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
    const violations = await redis.get(`security_ip:${ip}`);
    // Block if more than 20 violations in 24h
    return Number(violations) > 20;
  } catch (error) {
    console.error("Failed to check IP block status:", error);
    return false;
  }
}
