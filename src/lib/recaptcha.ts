/**
 * reCAPTCHA Enterprise validation utility
 *
 * @see https://cloud.google.com/recaptcha-enterprise/docs/
 */

import { siteUrl } from "@/config/site";

interface RecaptchaVerificationResult {
  success: boolean;
  score?: number;
  error?: string;
}

/**
 * Hostnames a reCAPTCHA token may legitimately have been generated on.
 *
 * SECURITY: the site key is public by design (NEXT_PUBLIC_RECAPTCHA_SITE_ID), so
 * anyone can embed it on their own page and mint valid, high-scoring tokens.
 * Without asserting `tokenProperties.hostname`, such a token is accepted here —
 * which, combined with a route that skips the Origin check, removes both
 * anti-CSRF guards at once. Google reports the origin it saw; we pin it.
 *
 * Sources, in order: an explicit override, the canonical production origin, and
 * the current Vercel deployment host (so preview deployments keep working).
 */
function allowedRecaptchaHostnames(): Set<string> {
  const hosts = new Set<string>();

  const override = process.env.RECAPTCHA_ALLOWED_HOSTNAMES;
  if (override) {
    for (const h of override.split(",")) {
      const trimmed = h.trim().toLowerCase();
      if (trimmed) hosts.add(trimmed);
    }
  }

  const canonical = new URL(siteUrl).hostname.toLowerCase();
  hosts.add(canonical);
  hosts.add(canonical.startsWith("www.") ? canonical.slice(4) : `www.${canonical}`);

  // Vercel-provided hostnames for THIS deployment. All three are set by the
  // platform and cannot be influenced by a third party, so adding them does not
  // widen the allowlist to *.vercel.app in general:
  //   VERCEL_URL                     – the unique deployment URL
  //   VERCEL_BRANCH_URL              – the branch alias shown in PRs
  //   VERCEL_PROJECT_PRODUCTION_URL  – the project's production alias
  // Only VERCEL_URL was listed before, so opening a preview from the link
  // Vercel posts on a pull request returned "Vérification anti-bot échouée"
  // even though the token was perfectly valid.
  for (const envVar of [
    process.env.VERCEL_URL,
    process.env.VERCEL_BRANCH_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
  ]) {
    if (envVar) hosts.add(envVar.toLowerCase());
  }

  if (process.env.NODE_ENV !== "production") {
    hosts.add("localhost");
    hosts.add("127.0.0.1");
  }

  return hosts;
}

/**
 * Verify reCAPTCHA Enterprise token
 *
 * @param token - reCAPTCHA token from frontend
 * @param expectedAction - Expected action name (e.g., "contact_form", "quote_submission")
 * @param clientIp - Optional client IP for logging
 * @returns Promise with success status and risk score
 */
export async function verifyRecaptchaEnterprise(
  token: string,
  expectedAction: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept in signature for call-site compat / future logging use
  _clientIp?: string,
): Promise<RecaptchaVerificationResult> {
  // Validate environment variables
  if (
    !token ||
    !process.env.RECAPTCHA_ENTERPRISE_API_KEY ||
    !process.env.RECAPTCHA_PROJECT_ID ||
    !process.env.NEXT_PUBLIC_RECAPTCHA_SITE_ID
  ) {
    const missing = [];
    if (!token) missing.push("token");
    if (!process.env.RECAPTCHA_ENTERPRISE_API_KEY)
      missing.push("RECAPTCHA_ENTERPRISE_API_KEY");
    if (!process.env.RECAPTCHA_PROJECT_ID) missing.push("RECAPTCHA_PROJECT_ID");
    if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_ID)
      missing.push("NEXT_PUBLIC_RECAPTCHA_SITE_ID");

    console.error(
      "❌ Missing reCAPTCHA Enterprise configuration:",
      missing.join(", "),
    );
    return {
      success: false,
      error: "Missing reCAPTCHA configuration",
    };
  }

  try {
    const apiKey = process.env.RECAPTCHA_ENTERPRISE_API_KEY;
    const projectId = process.env.RECAPTCHA_PROJECT_ID;
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_ID;

    // Call reCAPTCHA Enterprise API
    const response = await fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: {
            token: token,
            expectedAction: expectedAction,
            siteKey: siteKey,
          },
        }),
        // Never let a slow upstream pin the serverless function open until the
        // platform timeout — that is a cheap resource-exhaustion lever on a
        // public endpoint.
        signal: AbortSignal.timeout(5000),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ reCAPTCHA Enterprise API error:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        action: expectedAction,
      });
      return {
        success: false,
        error: `API error: ${response.status}`,
      };
    }

    const data = await response.json();

    // Verify the token was minted on one of OUR origins.
    // `hostname` comes from Google's API over TLS, not from the client, so it
    // cannot be stripped or forged by an attacker. When Google omits it we log
    // loudly and let the request through rather than taking the contact form
    // offline over a configuration anomaly.
    const tokenHostname = (data.tokenProperties?.hostname ?? "")
      .toString()
      .toLowerCase();

    let hostnameOk: boolean;
    if (tokenHostname) {
      hostnameOk = allowedRecaptchaHostnames().has(tokenHostname);
      if (!hostnameOk) {
        console.warn("❌ reCAPTCHA hostname mismatch:", {
          got: tokenHostname,
          action: expectedAction,
        });
      }
    } else {
      // FAIL CLOSED. This used to default to `true` and merely log, which
      // silently disabled origin pinning — and reCAPTCHA is the only real
      // anti-bot control on this route (validateCSRF only stops browsers; a
      // server-side script just sets its own Origin header). Google omits
      // hostname for mobile tokens (androidPackageName / iosBundleId) and some
      // WAF tokens; if you ever need those, opt in explicitly rather than
      // leaving the gate open by default.
      hostnameOk = process.env.RECAPTCHA_ALLOW_MISSING_HOSTNAME === "true";
      console.error(
        "⚠️ reCAPTCHA response carried no tokenProperties.hostname — cannot pin " +
          `the token origin. Rejecting (set RECAPTCHA_ALLOW_MISSING_HOSTNAME=true to allow). accepted=${hostnameOk}`,
      );
    }

    // Check if token is valid and action matches
    const isValid =
      data.tokenProperties?.valid &&
      data.tokenProperties?.action === expectedAction &&
      hostnameOk;

    if (!data.tokenProperties?.valid) {
      console.warn(
        "❌ reCAPTCHA token invalid:",
        data.tokenProperties?.invalidReason,
      );
    }

    if (data.tokenProperties?.action !== expectedAction) {
      console.warn("❌ reCAPTCHA action mismatch:", {
        expected: expectedAction,
        got: data.tokenProperties?.action,
      });
    }

    // Get risk score (0.0 = bot, 1.0 = human)
    const score = data.riskAnalysis?.score || 0;

    console.log("✅ reCAPTCHA Enterprise verification:", { score: score });

    // Score threshold: 0.5
    const SCORE_THRESHOLD = 0.5;

    return {
      success: isValid && score >= SCORE_THRESHOLD,
      score: score,
    };
  } catch (error) {
    console.error("❌ reCAPTCHA Enterprise verification error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
