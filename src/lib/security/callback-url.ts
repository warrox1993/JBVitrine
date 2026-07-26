/**
 * Post-login redirect target sanitisation.
 *
 * Lives here rather than inside the login page so it is unit-testable — see
 * callback-url.test.ts, which pins the bypass payloads below.
 */

/** Where to land when the requested callback URL is missing or not allowed. */
export const CALLBACK_FALLBACK = "/admin/leads";

/**
 * Resolve an untrusted `?callbackUrl=` value to an internal admin path.
 *
 * SECURITY: prefix filtering is NOT enough. The previous implementation rejected
 * "//evil.com" but allowed "/\evil.com", and the WHATWG URL parser normalises
 * "\" to "/" — so `router.push("/\evil.com")` resolved to https://evil.com/,
 * Next classified it as an external URL and performed a real cross-site
 * navigation. An attacker only had to get an admin to follow
 * /admin/login?callbackUrl=/\evil.com and, right after a successful login, they
 * landed on a page the attacker controls (ideal for a fake "session expired"
 * prompt). The middleware's query filter does not catch it either: it only looks
 * for "<script", "javascript:" and the eval token.
 *
 * Approach: parse against a throwaway base, keep ONLY the resolved path, and
 * require it to stay inside /admin. Anything resolving off-origin is discarded.
 */
export function sanitizeCallbackUrl(rawCallbackUrl: string | null): string {
  if (!rawCallbackUrl) {
    return CALLBACK_FALLBACK;
  }

  const base = "https://callback.invalid";
  try {
    const parsed = new URL(rawCallbackUrl, base);
    // Any absolute or protocol-relative URL (including backslash variants)
    // resolves to a different origin than the throwaway base.
    if (parsed.origin !== base) {
      return CALLBACK_FALLBACK;
    }
    const path = `${parsed.pathname}${parsed.search}${parsed.hash}`;
    return /^\/admin(?:\/|$)/.test(path) ? path : CALLBACK_FALLBACK;
  } catch {
    return CALLBACK_FALLBACK;
  }
}
