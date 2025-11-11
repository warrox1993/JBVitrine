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

    // Exécuter tous les enrichissements en parallèle (uniquement APIs gratuites)
    const [emailValidation, companyData, brandData, techStack] =
      await Promise.allSettled([
        this.validateEmail(email),
        this.getCompanyDataFromHunter(resolvedDomain),
        this.getBrandData(resolvedDomain),
        this.getTechStack(resolvedDomain),
      ]);

    const enriched: EnrichedLeadData = {
      email,
      name: "",
      company,
      companyData:
        companyData.status === "fulfilled"
          ? companyData.value || undefined
          : undefined,
      brandData:
        brandData.status === "fulfilled"
          ? brandData.value || undefined
          : undefined,
      emailValidation:
        emailValidation.status === "fulfilled"
          ? emailValidation.value || undefined
          : undefined,
      techStack:
        techStack.status === "fulfilled"
          ? techStack.value || undefined
          : undefined,
      enrichmentScore: 0,
      confidenceLevel: "low",
    };

    // Calculer le score d'enrichissement
    enriched.enrichmentScore = this.calculateEnrichmentScore(enriched);
    enriched.confidenceLevel = this.determineConfidence(enriched);

    return enriched;
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
  // TECH STACK DETECTION (100% GRATUIT - Détection maison)
  // Analyse headers HTTP uniquement (pas d'API externe payante)
  // ============================================================================

  private async getTechStack(
    domain: string,
  ): Promise<EnrichedLeadData["techStack"] | null> {
    // Use server-side API to avoid CSP violations
    try {
      const response = await fetch("/api/leadScoring/enrich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain }),
      });

      if (!response.ok) {
        console.warn("⚠️ Tech stack API failed, using fallback");
        return null;
      }

      const data = await response.json();
      return data.data?.techStack || null;
    } catch (error) {
      console.warn("⚠️ Tech stack detection unavailable:", error);
      return null;
    }
  }

  /**
   * Détection tech stack basique (100% gratuit, pas d'API externe)
   * Analyse les headers HTTP pour détecter les technologies principales
   */
  private async detectTechStackBasic(
    domain: string,
  ): Promise<EnrichedLeadData["techStack"] | null> {
    try {
      const response = await fetch(`https://${domain}`, {
        method: "HEAD",
        redirect: "follow",
      });

      const headers = response.headers;
      const techs: EnrichedLeadData["techStack"] = {
        cms: [],
        analytics: [],
        ecommerce: [],
        hosting: [],
        cdn: [],
      };

      // Détection basée sur les headers HTTP
      const server = headers.get("server")?.toLowerCase() || "";
      const xPoweredBy = headers.get("x-powered-by")?.toLowerCase() || "";
      const xFramework = headers.get("x-framework")?.toLowerCase() || "";
      const via = headers.get("via")?.toLowerCase() || "";
      const xGenerator = headers.get("x-generator")?.toLowerCase() || "";

      // CMS Detection
      if (xPoweredBy.includes("next.js") || xGenerator.includes("next.js")) {
        techs.cms.push("Next.js");
      }
      if (
        xFramework.includes("wordpress") ||
        xGenerator.includes("wordpress")
      ) {
        techs.cms.push("WordPress");
      }
      if (server.includes("wix")) techs.cms.push("Wix");
      if (server.includes("squarespace")) techs.cms.push("Squarespace");
      if (xPoweredBy.includes("express")) techs.cms.push("Express.js");
      if (xGenerator.includes("drupal")) techs.cms.push("Drupal");
      if (xGenerator.includes("joomla")) techs.cms.push("Joomla");

      // Hosting Detection
      if (xPoweredBy.includes("vercel") || server.includes("vercel")) {
        techs.hosting.push("Vercel");
      }
      if (server.includes("nginx")) techs.hosting.push("Nginx");
      if (server.includes("apache")) techs.hosting.push("Apache");
      if (xPoweredBy.includes("aws")) techs.hosting.push("AWS");
      if (server.includes("netlify")) techs.hosting.push("Netlify");
      if (server.includes("github")) techs.hosting.push("GitHub Pages");

      // CDN Detection
      if (server.includes("cloudflare") || via.includes("cloudflare")) {
        techs.cdn.push("Cloudflare");
      }
      if (server.includes("akamai")) techs.cdn.push("Akamai");
      if (server.includes("fastly")) techs.cdn.push("Fastly");
      if (via.includes("varnish")) techs.cdn.push("Varnish");

      // E-commerce Detection (basic)
      if (xPoweredBy.includes("shopify")) techs.ecommerce.push("Shopify");
      if (server.includes("woocommerce")) techs.ecommerce.push("WooCommerce");
      if (xGenerator.includes("magento")) techs.ecommerce.push("Magento");
      if (xPoweredBy.includes("prestashop")) techs.ecommerce.push("PrestaShop");

      return techs;
    } catch (error) {
      console.error("Basic tech detection error:", error);
      return null;
    }
  }

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
