import { randomBytes, createHash } from "crypto";
import { redis } from "./redis";

// Generate CSRF token
export function generateCsrfToken(): string {
  return randomBytes(32).toString("hex");
}

// Hash token for storage
function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

// Store CSRF token (with expiration)
export async function storeCsrfToken(token: string, ip: string): Promise<void> {
  const hashedToken = hashToken(token);
  const key = `csrf:${ip}:${hashedToken}`;

  if (redis) {
    // Store in Redis with 1 hour expiration
    await redis.setex(key, 60 * 60, "1");
  } else {
    // Fallback to in-memory (not ideal for production)
    // This is just for development
    const memKey = `${ip}:${hashedToken}`;
    inMemoryCsrf.set(memKey, Date.now() + 60 * 60 * 1000);
  }
}

// Validate CSRF token
export async function validateCsrfToken(
  token: string,
  ip: string,
): Promise<boolean> {
  if (!token) return false;

  const hashedToken = hashToken(token);
  const key = `csrf:${ip}:${hashedToken}`;

  if (redis) {
    const exists = await redis.get(key);
    if (exists) {
      // Delete token after use (one-time use)
      await redis.del(key);
      return true;
    }
    return false;
  } else {
    // Fallback to in-memory
    const memKey = `${ip}:${hashedToken}`;
    const expiry = inMemoryCsrf.get(memKey);
    if (expiry && Date.now() < expiry) {
      inMemoryCsrf.delete(memKey);
      return true;
    }
    return false;
  }
}

// Fallback in-memory store for development
const inMemoryCsrf = new Map<string, number>();

// Clean up expired tokens (run periodically)
setInterval(
  () => {
    const now = Date.now();
    for (const [key, expiry] of inMemoryCsrf.entries()) {
      if (now > expiry) {
        inMemoryCsrf.delete(key);
      }
    }
  },
  5 * 60 * 1000,
); // Every 5 minutes
