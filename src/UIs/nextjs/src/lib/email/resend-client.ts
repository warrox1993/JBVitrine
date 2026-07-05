import { Resend } from "resend";

let _resend: Resend | null = null;

/**
 * Client Resend lazy — instancié au 1er appel, jamais à l'import du module
 * (évite de casser le build de prod quand RESEND_API_KEY est absent).
 */
export function getResend(): Resend {
  if (_resend) return _resend;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not defined");
  }
  _resend = new Resend(apiKey);
  return _resend;
}
