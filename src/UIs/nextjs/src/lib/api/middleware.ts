/**
 * API Middleware Utilities
 *
 * DRY principle: Centralize common API route validations
 * Used for: CSRF protection, Content-Type validation, reCAPTCHA
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyRecaptchaEnterprise } from "@/lib/recaptcha";
import { getClientIdentifier } from "@/lib/rate-limit-redis";

export interface MiddlewareResult {
  success: boolean;
  response?: NextResponse;
  clientIdentifier?: string;
}

/**
 * Validate Content-Type header is application/json
 */
export function validateContentType(request: NextRequest): MiddlewareResult {
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
export function validateCSRF(request: NextRequest): MiddlewareResult {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const host = request.headers.get("host");

  const isLocalhost =
    host?.includes("localhost") || host?.includes("127.0.0.1");
  const isValidOrigin =
    isLocalhost ||
    origin?.includes(host || "") ||
    referer?.includes(host || "");

  if (!isValidOrigin) {
    const clientIdentifier = getClientIdentifier(request);
    console.warn("CSRF attempt detected", {
      ip: clientIdentifier,
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
  request: NextRequest,
  token: string | undefined,
  action: string,
): Promise<MiddlewareResult> {
  const clientIdentifier = getClientIdentifier(request);

  // Skip reCAPTCHA in development/test mode
  if (process.env.SKIP_RECAPTCHA === "true") {
    console.log(`[DEV] Skipping reCAPTCHA for ${action}`);
    return { success: true };
  }

  if (!token) {
    console.warn(`${action} submission without reCAPTCHA token`, {
      ip: clientIdentifier,
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
      ip: clientIdentifier,
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

/**
 * Run multiple middleware checks sequentially
 * Returns first failure or success if all pass
 */
export function runMiddleware(
  request: NextRequest,
  checks: ((
    req: NextRequest,
  ) => MiddlewareResult | Promise<MiddlewareResult>)[],
): Promise<MiddlewareResult> {
  return checks.reduce<Promise<MiddlewareResult>>(
    async (promise, check) => {
      const prevResult = await promise;
      if (!prevResult.success) {
        return prevResult;
      }
      return check(request);
    },
    Promise.resolve({
      success: true,
      clientIdentifier: getClientIdentifier(request),
    }),
  );
}
