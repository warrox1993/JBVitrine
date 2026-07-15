/**
 * reCAPTCHA Enterprise validation utility
 *
 * @see https://cloud.google.com/recaptcha-enterprise/docs/
 */

interface RecaptchaVerificationResult {
  success: boolean;
  score?: number;
  error?: string;
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

    // Check if token is valid and action matches
    const isValid =
      data.tokenProperties?.valid &&
      data.tokenProperties?.action === expectedAction;

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
