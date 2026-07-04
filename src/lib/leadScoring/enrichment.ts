/**
 * Lead Enrichment Service (Client-side)
 *
 * Enrichissement automatique avec SEULEMENT des API 100% GRATUITES
 * (Hunter.io, Brandfetch)
 *
 * SECURITY: All API calls are now server-side via /api/leadScoring/enrich
 * API keys are no longer exposed to the client
 *
 * API Keys configuration (server-side only):
 * - ✅ HUNTER_API_KEY (Free: 25/month)
 * - ✅ BRANDFETCH_API_KEY (Free: 1000/month) - Optional
 *
 * Services SUPPRIMÉS (trop chers ou payants):
 * - ❌ Clearbit ($99+/month)
 * - ❌ BuiltWith ($295/month)
 * - ❌ Wappalyzer ($250/month)
 * - ❌ LinkedIn Sales Navigator (très cher)
 * - ❌ OpenCorporates (API payante pour usage commercial)
 *
 * Tech Stack Detection:
 * - ✅ Détection maison 100% gratuite (analyse headers HTTP - server-side)
 *
 * COÛT TOTAL: 0€/mois 💚
 */

import { EnrichedLeadData } from "./types";

// ============================================================================
// SINGLETON & CACHE MANAGEMENT
// Prevents multiple instances and duplicate API calls
// ============================================================================

// Singleton instance
let enrichmentServiceInstance: LeadEnrichmentService | null = null;

// Cache for enrichment results to avoid duplicate API calls
const enrichmentCache = new Map<string, EnrichedLeadData>();

// Track pending requests to prevent duplicate concurrent calls
const pendingRequests = new Map<string, Promise<EnrichedLeadData>>();

/**
 * Get or create singleton instance of LeadEnrichmentService
 */
export function getEnrichmentService(): LeadEnrichmentService {
  if (!enrichmentServiceInstance) {
    enrichmentServiceInstance = new LeadEnrichmentService();
    console.log("[LeadEnrichmentService] Singleton instance created");
  }
  return enrichmentServiceInstance;
}

/**
 * Check if data for this email is already cached
 */
export function getCachedEnrichment(email: string): EnrichedLeadData | null {
  const cached = enrichmentCache.get(email.toLowerCase());
  if (cached) {
    console.log("[LeadEnrichmentService] Cache HIT for:", email);
  }
  return cached || null;
}

/**
 * Clear the enrichment cache (for testing or reset)
 */
export function clearEnrichmentCache(): void {
  enrichmentCache.clear();
  pendingRequests.clear();
  console.log("[LeadEnrichmentService] Cache cleared");
}

/**
 * Get enrichment with caching and deduplication
 * This is the recommended way to enrich leads - it handles:
 * 1. Cache lookup (returns immediately if cached)
 * 2. Request deduplication (reuses pending requests)
 * 3. Cache storage (caches successful results)
 */
export async function enrichLeadWithCache(
  email: string,
  company?: string,
): Promise<EnrichedLeadData> {
  const cacheKey = email.toLowerCase();

  // 1. Check cache first
  const cached = enrichmentCache.get(cacheKey);
  if (cached) {
    console.log("[LeadEnrichmentService] Using cached data for:", email);
    return cached;
  }

  // 2. Check if there's already a pending request for this email
  const pending = pendingRequests.get(cacheKey);
  if (pending) {
    console.log("[LeadEnrichmentService] Reusing pending request for:", email);
    return pending;
  }

  // 3. Create new request and track it
  const service = getEnrichmentService();
  const request = service.enrichLead(email, company).then((result) => {
    // Cache successful results (even fallback data to prevent retries)
    enrichmentCache.set(cacheKey, result);
    pendingRequests.delete(cacheKey);
    return result;
  });

  pendingRequests.set(cacheKey, request);
  return request;
}

// ============================================================================
// MAIN SERVICE CLASS
// ============================================================================

export class LeadEnrichmentService {
  // No API keys on client-side anymore - all moved to server
  private hunterKey: string | undefined;
  private brandfetchKey: string | undefined;

  constructor() {
    // API keys are now server-side only (set to undefined)
    this.hunterKey = undefined;
    this.brandfetchKey = undefined;
  }

  // ============================================================================
  // ENRICHISSEMENT COMPLET
  // ============================================================================

  /**
   * Enrichit un lead avec toutes les sources disponibles
   */
  async enrichLead(
    email: string,
    company?: string,
    domain?: string,
  ): Promise<EnrichedLeadData> {
    const resolvedDomain = domain || this.extractDomain(email);

    try {
      console.log("[LeadEnrichmentService] Starting enrichment for:", email);

      // Call server-side API for all enrichment data
      const response = await fetch("/api/leadScoring/enrich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, domain: resolvedDomain, company }),
      });

      // Validate Content-Type BEFORE parsing to avoid JSON parse errors
      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        console.warn("[LeadEnrichmentService] API failed:", {
          status: response.status,
          statusText: response.statusText,
          contentType,
        });

        // Check if response is HTML (error page or rate limit)
        if (contentType?.includes("text/html")) {
          console.error(
            "[LeadEnrichmentService] API returned HTML instead of JSON (rate limit or error page)",
          );
          return this.createFallbackData(email, company);
        }

        // Try to parse JSON error for details
        try {
          const errorData = await response.json();
          console.warn("[LeadEnrichmentService] API error details:", errorData);
          if (response.status === 429) {
            console.warn(
              "[LeadEnrichmentService] Rate limit exceeded, using fallback",
            );
          }
        } catch {
          console.warn(
            "[LeadEnrichmentService] Could not parse error response",
          );
        }

        return this.createFallbackData(email, company);
      }

      // Validate Content-Type is JSON before parsing
      if (!contentType?.includes("application/json")) {
        console.error(
          "[LeadEnrichmentService] Invalid content-type:",
          contentType,
        );
        return this.createFallbackData(email, company);
      }

      const result = await response.json();
      const data = result.data || {};

      const enriched: EnrichedLeadData = {
        email,
        name: "",
        company,
        companyData: data.companyData,
        brandData: data.brandData,
        emailValidation: data.emailValidation,
        techStack: data.techStack,
        enrichmentScore: 0,
        confidenceLevel: "low",
      };

      // Calculate score locally based on returned data
      enriched.enrichmentScore = this.calculateEnrichmentScore(enriched);
      enriched.confidenceLevel = this.determineConfidence(enriched);

      console.log("[LeadEnrichmentService] Enrichment complete:", {
        email,
        score: enriched.enrichmentScore,
        confidence: enriched.confidenceLevel,
      });

      return enriched;
    } catch (error) {
      console.error("[LeadEnrichmentService] Enrichment error:", error);
      return this.createFallbackData(email, company);
    }
  }

  /**
   * Creates fallback data when enrichment fails
   */
  private createFallbackData(
    email: string,
    company?: string,
  ): EnrichedLeadData {
    return {
      email,
      name: "",
      company,
      enrichmentScore: 0,
      confidenceLevel: "low",
    };
  }

  // ============================================================================
  // HUNTER.IO DOMAIN SEARCH (Remplace Clearbit Company)
  // FREE: 25 recherches/mois
  // ============================================================================

  private async getCompanyDataFromHunter(
    domain: string,
  ): Promise<EnrichedLeadData["companyData"] | null> {
    if (!this.hunterKey) {
      console.warn("Hunter.io API key not configured");
      return this.mockCompanyData(domain);
    }

    try {
      const response = await fetch(
        `https://api.hunter.io/v2/domain-search?domain=${domain}&api_key=${this.hunterKey}&limit=1`,
      );

      if (!response.ok) {
        console.warn("Hunter.io domain search failed, using mock data");
        return this.mockCompanyData(domain);
      }

      const { data } = await response.json();

      return {
        domain: data.domain,
        organization: data.organization || domain,
        employees: null, // Hunter ne fournit pas cette info
        industry: data.industry || null,
        country: data.country,
        twitter: data.twitter || null,
        linkedin: data.linkedin || null,
        emails_found: data.total || 0,
      };
    } catch (error) {
      console.error("Hunter.io domain search error:", error);
      return this.mockCompanyData(domain);
    }
  }

  // ============================================================================
  // BRANDFETCH (Logos + Infos Marque)
  // FREE: 1000 lookups/mois
  // ============================================================================

  private async getBrandData(
    domain: string,
  ): Promise<EnrichedLeadData["brandData"] | null> {
    if (!this.brandfetchKey) {
      console.log("Brandfetch API key not configured, skipping");
      return null;
    }

    try {
      const response = await fetch(
        `https://api.brandfetch.io/v2/brands/${domain}`,
        {
          headers: {
            Authorization: `Bearer ${this.brandfetchKey}`,
          },
        },
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json();

      return {
        name: data.name,
        logo: data.logos?.[0]?.formats?.[0]?.src || null,
        icon: data.icons?.[0]?.formats?.[0]?.src || null,
        colors: data.colors?.map((c: any) => c.hex) || [],
        fonts: data.fonts?.map((f: any) => f.name) || [],
        description: data.description || null,
        industry: data.industry || null,
        employees: data.company?.employeesRange || null,
      };
    } catch (error) {
      console.error("Brandfetch error:", error);
      return null;
    }
  }

  // ============================================================================
  // HUNTER.IO EMAIL VALIDATION
  // ============================================================================

  private async validateEmail(
    email: string,
  ): Promise<EnrichedLeadData["emailValidation"] | null> {
    if (!this.hunterKey) {
      console.warn("Hunter.io API key not configured");
      return this.mockEmailValidation(email);
    }

    try {
      const response = await fetch(
        `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${this.hunterKey}`,
      );

      if (!response.ok) {
        return this.mockEmailValidation(email);
      }

      const { data } = await response.json();

      return {
        valid: data.status === "valid",
        score: data.score || 0,
        disposable: data.disposable || false,
        acceptAll: data.accept_all || false,
        role: data.role || false,
        free: data.webmail || false,
      };
    } catch (error) {
      console.error("Hunter.io error:", error);
      return this.mockEmailValidation(email);
    }
  }

  // ============================================================================
  // TECH STACK DETECTION
  // Note: Tech stack is now returned by the main enrichLead() call via server API
  // The methods below are DEPRECATED and kept only for reference
  // ============================================================================

  // ============================================================================
  // SCORING
  // ============================================================================

  /**
   * Calcule le score d'enrichissement (0-100)
   * Basé uniquement sur des APIs GRATUITES
   */
  private calculateEnrichmentScore(data: EnrichedLeadData): number {
    let score = 0;

    // Hunter.io Company Data (0-25 pts)
    if (data.companyData) {
      score += 10; // Base: domaine trouvé
      if (data.companyData.organization) score += 5;
      if (data.companyData.industry) score += 5;
      if (data.companyData.linkedin || data.companyData.twitter) score += 5;
    }

    // Brandfetch Data (0-15 pts)
    if (data.brandData) {
      score += 5; // Base: brand trouvée
      if (data.brandData.logo) score += 5;
      if (data.brandData.industry) score += 5;
    }

    // Email validation (0-35 pts) - Points redistribués
    if (data.emailValidation) {
      if (data.emailValidation.valid) score += 20;
      if (data.emailValidation.score >= 80) score += 10;
      if (!data.emailValidation.disposable && !data.emailValidation.free)
        score += 5;
    }

    // Tech stack (0-25 pts) - Points augmentés
    if (data.techStack) {
      const totalTech =
        (data.techStack.cms?.length || 0) +
        (data.techStack.ecommerce?.length || 0) +
        (data.techStack.hosting?.length || 0) +
        (data.techStack.cdn?.length || 0);
      if (totalTech >= 5) score += 25;
      else if (totalTech >= 3) score += 15;
      else if (totalTech >= 1) score += 5;
    }

    return Math.min(score, 100);
  }

  /**
   * Détermine le niveau de confiance basé sur les données enrichies
   */
  private determineConfidence(
    data: EnrichedLeadData,
  ): "high" | "medium" | "low" {
    const dataPoints = [
      data.companyData,
      data.brandData,
      data.emailValidation?.valid,
      data.techStack,
    ].filter(Boolean).length;

    if (dataPoints >= 3) return "high";
    if (dataPoints >= 2) return "medium";
    return "low";
  }

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================

  private extractDomain(email: string): string {
    return email.split("@")[1] || "";
  }

  // ============================================================================
  // MOCK DATA (Pour développement sans API keys)
  // ============================================================================

  private mockCompanyData(domain: string): EnrichedLeadData["companyData"] {
    return {
      domain: domain,
      organization: domain.split(".")[0].toUpperCase(),
      employees: null,
      industry: "Technology",
      country: "BE",
      twitter: null,
      linkedin: null,
      emails_found: 0,
    };
  }

  private mockEmailValidation(
    email: string,
  ): EnrichedLeadData["emailValidation"] {
    const isFree = ["gmail.com", "outlook.com", "yahoo.com"].includes(
      this.extractDomain(email),
    );

    return {
      valid: true,
      score: isFree ? 60 : 85,
      disposable: false,
      acceptAll: false,
      role: false,
      free: isFree,
    };
  }
}

// ============================================================================
// HELPER: Validation basique email
// ============================================================================

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ============================================================================
// HELPER: Extraction domaine
// ============================================================================

export function extractDomain(email: string): string {
  return email.split("@")[1] || "";
}
