/**
 * Configuration reCAPTCHA Enterprise
 * Clés accessibles côté client et serveur
 */

// Site Key (public - utilisée côté client)
export const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_ID || "";
