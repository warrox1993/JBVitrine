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
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- ip kept in signature for call-site compat; see comment below on why it must stay unused
export async function storeCsrfToken(token: string, _ip: string): Promise<void> {
  // Bug 429/mobile : la clé ne doit PAS dépendre de l'IP (elle change sur mobile)
  const hashedToken = hashToken(token);
  const key = `csrf:${hashedToken}`;

  if (redis) {
    // Store in Redis with 1 hour expiration
    await redis.setex(key, 60 * 60, "1");
  } else {
    // Fallback to in-memory (not ideal for production)
    // This is just for development
    const memKey = hashedToken;
    inMemoryCsrf.set(memKey, Date.now() + 60 * 60 * 1000);
  }
}

// Validate CSRF token
export async function validateCsrfToken(
  token: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- ip kept in signature for call-site compat (not used in the key, see storeCsrfToken)
  _ip: string,
): Promise<boolean> {
  if (!token) return false;

  const hashedToken = hashToken(token);
  const key = `csrf:${hashedToken}`;

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
    const memKey = hashedToken;
    const expiry = inMemoryCsrf.get(memKey);
    if (expiry && Date.now() < expiry) {
      inMemoryCsrf.delete(memKey);
      return true;
    }
    return false;
  }
}

// Fallback in-memory store for development
// Note: no periodic cleanup here; this file runs in serverless invocations
// where each invocation has its own memory, so a setInterval never fires
// usefully. Redis (production) handles expiry via setex TTL.
const inMemoryCsrf = new Map<string, number>();
