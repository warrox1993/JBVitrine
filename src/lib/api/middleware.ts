/**
 * API Middleware Utilities
 *
 * DRY principle: Centralize common API route validations
 * Used for: CSRF protection, Content-Type validation, reCAPTCHA
 */

import { NextResponse } from "next/server";
import { verifyRecaptchaEnterprise } from "@/lib/recaptcha";
import { getClientIdentifier } from "@/lib/rate-limit-redis";
import { isSameOrigin } from "@/lib/security/origin";
import { maskIp } from "@/lib/security/escape";

export interface MiddlewareResult {
  success: boolean;
  response?: NextResponse;
  clientIdentifier?: string;
}

/**
 * Validate Content-Type header is application/json
 *
 * SECURITY: this is a CSRF control, not just hygiene. `request.json()` parses
 * the body regardless of Content-Type, so without this check a cross-origin
 * HTML form with `enctype="text/plain"` can hand-craft a valid JSON body and
 * submit it without triggering a CORS preflight. Requiring application/json
 * forces a preflight that a hostile origin cannot pass.
 *
 * Accepts a plain `Request` so route handlers that receive `Request` (not just
 * `NextRequest`) can use it — NextRequest extends Request, so existing callers
 * are unaffected.
 */
export function validateContentType(request: Request): MiddlewareResult {
  const contentType = request.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    return {
      success: false,
      response: NextResponse.json(
        {
          ok: false,
          message: "Content-Type must be application/json",
        },
        { status: 415 },
      ),
    };
  }

  return { success: true };
}

/**
 * Validate CSRF via Origin/Referer headers
 * Protects against cross-site request forgery attacks
 */
export function validateCSRF(request: Request): MiddlewareResult {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const host = request.headers.get("host");

  // SECURITY (V-W6): the localhost bypass must be an EXACT host match and must
  // only apply outside production. `host?.includes("localhost")` would match a
  // hostile host like "localhost.attacker.com", defeating CSRF protection.
  const isDev = process.env.NODE_ENV !== "production";
  const isLocalhost =
    isDev &&
    !!host &&
    (host === "localhost" ||
      host === "127.0.0.1" ||
      host.startsWith("localhost:") ||
      host.startsWith("127.0.0.1:"));
  const isValidOrigin = isLocalhost || isSameOrigin(origin, referer, host);

  if (!isValidOrigin) {
    const clientIdentifier = getClientIdentifier(request);
    // PRIVACY: mask the IP — console.warn survives the production
    // `removeConsole` setting, so a raw IP here would be PII in the Vercel logs.
    console.warn("CSRF attempt detected", {
      ip: maskIp(clientIdentifier),
      origin,
      referer,
      host,
    });

    return {
      success: false,
      response: NextResponse.json(
        { ok: false, message: "Invalid request origin" },
        { status: 403 },
      ),
    };
  }

  return { success: true };
}

/**
 * Validate reCAPTCHA token for bot protection
 * @param request - Next.js request object
 * @param token - reCAPTCHA token from client
 * @param action - Action name for reCAPTCHA verification
 */
export async function validateRecaptcha(
  request: Request,
  token: string | undefined,
  action: string,
): Promise<MiddlewareResult> {
  const clientIdentifier = getClientIdentifier(request);

  // Skip reCAPTCHA in development/test mode ONLY.
  // SECURITY (V-W6): SKIP_RECAPTCHA must NEVER take effect in production, even
  // if the env var is accidentally set there.
  if (
    process.env.NODE_ENV !== "production" &&
    process.env.SKIP_RECAPTCHA === "true"
  ) {
    console.log(`[DEV] Skipping reCAPTCHA for ${action}`);
    return { success: true };
  }

  if (!token) {
    console.warn(`${action} submission without reCAPTCHA token`, {
      ip: maskIp(clientIdentifier),
    });
    return {
      success: false,
      response: NextResponse.json(
        { ok: false, message: "Vérification de sécurité manquante" },
        { status: 400 },
      ),
    };
  }

  const recaptchaResult = await verifyRecaptchaEnterprise(
    token,
    action,
    clientIdentifier,
  );

  if (!recaptchaResult.success) {
    console.warn(`${action} failed reCAPTCHA verification`, {
      ip: maskIp(clientIdentifier),
      score: recaptchaResult.score,
      error: recaptchaResult.error,
    });
    return {
      success: false,
      response: NextResponse.json(
        {
          ok: false,
          message: "Vérification anti-bot échouée. Veuillez réessayer.",
        },
        { status: 403 },
      ),
    };
  }

  console.log(`${action} reCAPTCHA verified`, { score: recaptchaResult.score });
  return { success: true };
}
