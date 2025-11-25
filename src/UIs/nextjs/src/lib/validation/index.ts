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
  } catch (_error) {
    return false;
  }
}

/**
 * Validate that request has JSON Content-Type
 * @param request - Next.js request object
 * @returns true if Content-Type is application/json
 */
export function isValidContentType(request: Request): boolean {
  const contentType = request.headers.get("content-type");
  return !!contentType && contentType.includes("application/json");
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
  // Reject names with excessive special characters
  if (/[^a-zA-ZÀ-ÿ\s\-'.]/g.test(name)) {
    return "Le nom contient des caractères non autorisés";
  }
  return null;
}

/**
 * Validate company name
 * @param company - Company name to validate
 * @returns Error message or null if valid
 */
export function validateCompany(company: string): string | null {
  if (company.length > 100) {
    return "Le nom de l'entreprise est trop long (max 100 caractères)";
  }
  // Reject if contains suspicious patterns
  if (/<script|javascript:|onerror=/i.test(company)) {
    return "Caractères non autorisés détectés";
  }
  return null;
}

/**
 * Validate message field
 * @param message - Message to validate
 * @param minLength - Minimum length (default 30)
 * @param maxLength - Maximum length (default 1500)
 * @returns Error message or null if valid
 */
export function validateMessage(
  message: string,
  minLength: number = 30,
  maxLength: number = 1500
): string | null {
  if (!message || typeof message !== "string") {
    return "La description est requise";
  }
  if (message.length < minLength || message.length > maxLength) {
    return `La description doit contenir entre ${minLength} et ${maxLength} caractères`;
  }
  return null;
}
