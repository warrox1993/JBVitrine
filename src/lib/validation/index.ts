/**
 * Centralized Validation Utilities
 * 
 * DRY principle: Single source of truth for all validation logic
 * Used across: /api/quote, /api/contact, and other routes
 */

import { isValidPhoneNumber } from "libphonenumber-js";

/**
 * Validate email format (RFC 5322 simplified)
 * @param email - Email address to validate
 * @returns true if valid email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

/**
 * Sanitize string for safe logging and email rendering
 * Removes control characters and normalizes whitespace
 * @param input - String to sanitize
 * @returns Sanitized string
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/[\x00-\x1F\x7F]/g, "") // Remove control characters
    .replace(/\n/g, " ") // Replace newlines with spaces for logs
    .replace(/\r/g, "")
    .trim();
}

/**
 * Validate phone number (international format)
 * Uses libphonenumber-js for accurate validation
 * @param phone - Phone number to validate
 * @returns true if valid phone number
 */
export function validatePhone(phone: string): boolean {
  try {
    return isValidPhoneNumber(phone);
  } catch {
    return false;
  }
}

/**
 * Validate name field (no numbers, valid characters)
 * @param name - Name to validate
 * @returns Error message or null if valid
 */
export function validateName(name: string): string | null {
  if (!name || typeof name !== "string") {
    return "Le nom est requis";
  }
  if (name.length < 2 || name.length > 80) {
    return "Le nom doit contenir entre 2 et 80 caractères";
  }
  // Reject names containing numbers
  if (/\d/.test(name)) {
    return "Le nom ne peut pas contenir de chiffres";
  }
  // Reject names with disallowed characters. Accept any Unicode letter (\p{L})
  // and combining mark (\p{M}, e.g. Vietnamese diacritics) so international
  // names (Cyrillic, CJK, Arabic, "Nguyễn"…) are not rejected; still block
  // digits (checked above) and symbols.
  if (/[^\p{L}\p{M}\s\-'.]/u.test(name)) {
    return "Le nom contient des caractères non autorisés";
  }
  return null;
}

