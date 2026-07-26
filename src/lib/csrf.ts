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

/**
 * Check that a CSRF token exists and has not expired — WITHOUT consuming it.
 *
 * AVAILABILITY (bug 429): this used to delete the token on the very first read,
 * even when the request went on to fail (missing captcha, invalid email, mail
 * provider error…). The client caches its token for ~55 min and had no refresh
 * path, so every retry replayed a token the server had already destroyed and
 * came back 403 — while each attempt still burned one of the 3 hourly slots.
 * Three failed attempts therefore produced a one-hour 429 without a single mail
 * ever being sent.
 *
 * Callers MUST call {@link consumeCsrfToken} once the request has fully
 * succeeded, so one-time-use is preserved for requests that actually did
 * something.
 */
export async function validateCsrfToken(
  token: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- ip kept in signature for call-site compat (not used in the key, see storeCsrfToken)
  _ip: string,
): Promise<boolean> {
  if (!token || typeof token !== "string") return false;

  const hashedToken = hashToken(token);
  const key = `csrf:${hashedToken}`;

  if (redis) {
    const exists = await redis.get(key);
    return !!exists;
  }

  // Fallback to in-memory
  const expiry = inMemoryCsrf.get(hashedToken);
  return !!expiry && Date.now() < expiry;
}

/**
 * Atomically burn a CSRF token, returning whether THIS caller won the race.
 *
 * Call it immediately before the side effect the token authorises. `DEL` is
 * atomic and reports how many keys it removed, so exactly one of N concurrent
 * requests carrying the same token gets `true`; the rest get `false` and must
 * be rejected.
 *
 * That restores single-use, which validateCsrfToken alone cannot provide: it is
 * a plain read, so N concurrent requests all pass it. Consuming after the side
 * effect (the previous design) left the token replayable for its full 1h TTL,
 * and the code claimed "preserves one-time-use" while doing the opposite.
 *
 * @returns true if the token existed and was burned by this call.
 */
export async function consumeCsrfToken(token: string): Promise<boolean> {
  if (!token || typeof token !== "string") return false;

  const hashedToken = hashToken(token);

  if (redis) {
    // redis.del returns the number of keys actually removed (0 or 1).
    const removed = await redis.del(`csrf:${hashedToken}`);
    return removed === 1;
  }

  return inMemoryCsrf.delete(hashedToken);
}

// Fallback in-memory store for development
// Note: no periodic cleanup here; this file runs in serverless invocations
// where each invocation has its own memory, so a setInterval never fires
// usefully. Redis (production) handles expiry via setex TTL.
const inMemoryCsrf = new Map<string, number>();
