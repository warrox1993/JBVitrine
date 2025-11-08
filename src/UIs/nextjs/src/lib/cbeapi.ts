/**
 * CBE API Integration
 * Belgian Company Database (Banque-Carrefour des Entreprises / Kruispuntbank van Ondernemingen)
 *
 * Use cases:
 * - Validate company registration numbers (BCE/KBO numbers)
 * - Retrieve company information
 * - Anti-fraud verification
 * - Lead enrichment
 */

const CBEAPI_BASE_URL =
  "https://kbopub.economie.fgov.be/kbopub/zoeknummerform.html";

export interface CBECompanyData {
  enterpriseNumber: string;
  name: string;
  status: "active" | "inactive";
  juridicalForm?: string;
  address?: {
    street: string;
    number: string;
    box?: string;
    zipCode: string;
    municipality: string;
  };
  activities?: string[];
}

export interface CBEVerificationResult {
  valid: boolean;
  exists: boolean;
  active?: boolean;
  company?: CBECompanyData;
  error?: string;
}

/**
 * Format BCE number (removes spaces, dots, and validates format)
 */
export function formatBCENumber(input: string): string | null {
  // Remove all non-numeric characters
  const cleaned = input.replace(/[^0-9]/g, "");

  // BCE numbers are 10 digits (format: 0XXX.XXX.XXX or 1XXX.XXX.XXX)
  if (cleaned.length !== 10) {
    return null;
  }

  // First digit must be 0 or 1
  if (!cleaned.startsWith("0") && !cleaned.startsWith("1")) {
    return null;
  }

  return cleaned;
}

/**
 * Validate BCE number format and checksum
 */
export function validateBCENumber(bceNumber: string): boolean {
  const formatted = formatBCENumber(bceNumber);
  if (!formatted) return false;

  // Calculate modulo 97 checksum
  const base = formatted.substring(0, 8);
  const checkDigits = formatted.substring(8, 10);
  const calculatedCheck = 97 - (parseInt(base) % 97);

  return calculatedCheck.toString().padStart(2, "0") === checkDigits;
}

/**
 * Verify company with CBE API
 */
export async function verifyCompanyWithCBE(
  bceNumber: string,
): Promise<CBEVerificationResult> {
  const apiSecret = process.env.CBEAPI_SECRET;

  if (!apiSecret) {
    console.warn("CBEAPI_SECRET not configured, skipping company verification");
    return {
      valid: false,
      exists: false,
      error: "API not configured",
    };
  }

  // Format and validate BCE number
  const formatted = formatBCENumber(bceNumber);
  if (!formatted) {
    return {
      valid: false,
      exists: false,
      error: "Invalid BCE number format",
    };
  }

  if (!validateBCENumber(formatted)) {
    return {
      valid: false,
      exists: false,
      error: "Invalid BCE number checksum",
    };
  }

  try {
    // Note: The actual CBE API endpoint may differ
    // This is a placeholder - you'll need to adjust based on actual API documentation
    const response = await fetch(
      `https://kbopub.economie.fgov.be/kbopub/api/v1/enterprises/${formatted}`,
      {
        headers: {
          Authorization: `Bearer ${apiSecret}`,
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      if (response.status === 404) {
        return {
          valid: true, // Format is valid
          exists: false, // But company doesn't exist
          error: "Company not found in CBE database",
        };
      }

      throw new Error(`CBE API error: ${response.status}`);
    }

    const data = await response.json();

    // Parse company data (adjust based on actual API response structure)
    const company: CBECompanyData = {
      enterpriseNumber: formatted,
      name: data.name || data.denomination || "",
      status: data.status === "AC" ? "active" : "inactive",
      juridicalForm: data.juridicalForm,
      address: data.address
        ? {
            street: data.address.street,
            number: data.address.number,
            box: data.address.box,
            zipCode: data.address.zipCode,
            municipality: data.address.municipality,
          }
        : undefined,
      activities: data.activities || [],
    };

    return {
      valid: true,
      exists: true,
      active: company.status === "active",
      company,
    };
  } catch (error) {
    console.error("CBE API verification error:", error);
    return {
      valid: false,
      exists: false,
      error: error instanceof Error ? error.message : "API error",
    };
  }
}

/**
 * Simple verification (format only, no API call)
 * Use when you just need to validate the format
 */
export function validateBCEFormat(bceNumber: string): {
  valid: boolean;
  formatted?: string;
  error?: string;
} {
  const formatted = formatBCENumber(bceNumber);

  if (!formatted) {
    return {
      valid: false,
      error: "Invalid BCE number format (must be 10 digits)",
    };
  }

  if (!validateBCENumber(formatted)) {
    return {
      valid: false,
      error: "Invalid BCE checksum",
    };
  }

  return {
    valid: true,
    formatted,
  };
}
