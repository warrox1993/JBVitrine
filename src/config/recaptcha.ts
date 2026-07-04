/**
 * Configuration reCAPTCHA Enterprise
 * Clés accessibles côté client et serveur
 */

// Site Key (public - utilisée côté client)
export const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_ID || "";

// API Key (privée - serveur seulement)
export const RECAPTCHA_API_KEY = process.env.RECAPTCHA_ENTERPRISE_API_KEY || "";

// Project ID (privé - serveur seulement)
export const RECAPTCHA_PROJECT_ID = process.env.RECAPTCHA_PROJECT_ID || "";
