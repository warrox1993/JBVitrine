import {
  QuoteData,
  QuoteEstimate,
  PriceBreakdownItem,
  ProjectType,
} from "@/components/features/contact/QuoteWizard/types";
import { pricingMatrices } from "./matrices";

/**
 * Calculate the complete estimate for a quote
 */
export function calculateEstimate(data: QuoteData): QuoteEstimate {
  if (!data.projectType) {
    throw new Error("Project type is required for calculation");
  }

  const matrix = pricingMatrices[data.projectType];
  const breakdown: PriceBreakdownItem[] = [];

  // Base price
  let min = matrix.base;
  let max = matrix.base;

  breakdown.push({
    item: `Base ${getProjectTypeName(data.projectType)}`,
    description: "Infrastructure de base et fonctionnalités essentielles",
    price: matrix.base,
    category: "base",
  });

  // Calculate features prices
  data.features.forEach((feature) => {
    if (feature.selected) {
      const featurePrice = matrix.features[feature.id];
      if (featurePrice) {
        min += featurePrice.min;
        max += featurePrice.max;
        breakdown.push({
          item: feature.name,
          description: feature.description,
          price: featurePrice.min,
          category: "feature",
        });
      }
    }
  });

  // Add design price
  if (data.design) {
    const designPrice = matrix.design[data.design];
    if (designPrice > 0) {
      min += designPrice;
      max += designPrice;
      breakdown.push({
        item: `Design ${getDesignLevelName(data.design)}`,
        description: getDesignDescription(data.design),
        price: designPrice,
        category: "design",
      });
    }
  }

  // Add SEO price
  if (data.seo && data.seo !== "none") {
    const seoPrice = matrix.seo[data.seo];
    if (seoPrice > 0) {
      min += seoPrice;
      max += seoPrice;
      breakdown.push({
        item: `SEO ${data.seo === "basic" ? "de base" : "avancé"}`,
        description: getSEODescription(data.seo),
        price: seoPrice,
        category: "seo",
      });
    }
  }

  // Add services
  if (data.training) {
    const trainingPrice = matrix.services.training;
    min += trainingPrice;
    max += trainingPrice;
    breakdown.push({
      item: "Formation équipe",
      description: "Session de formation à l'administration",
      price: trainingPrice,
      category: "service",
    });
  }

  if (data.hosting && matrix.services.hosting > 0) {
    const hostingPrice = matrix.services.hosting;
    min += hostingPrice;
    max += hostingPrice;
    breakdown.push({
      item: "Hébergement (1 an)",
      description: "Hébergement professionnel avec SSL et backups",
      price: hostingPrice,
      category: "service",
    });
  } else if (matrix.services.hosting === 0) {
    breakdown.push({
      item: "Hébergement (1 an)",
      description: "Inclus dans le prix",
      price: 0,
      category: "service",
    });
  }

  // Calculate timeline
  const timeline = calculateTimeline(
    min,
    data.projectType,
    data.features.length,
  );

  // Determine complexity
  const complexity = determineComplexity(min, data.features.length);

  return {
    min: Math.round(min),
    max: Math.round(max),
    breakdown,
    timeline,
    currency: "EUR",
    totalFeatures: data.features.filter((f) => f.selected).length,
    complexity,
  };
}

/**
 * Calculate estimated timeline based on price and complexity
 */
function calculateTimeline(
  totalPrice: number,
  projectType: ProjectType,
  featureCount: number,
): string {
  // Base calculation: 1 week per 1500€
  let weeks = Math.ceil(totalPrice / 1500);

  // Adjust based on project type
  const typeMultipliers: Record<ProjectType, number> = {
    siteVitrine: 0.8,
    cmsBlog: 0.9,
    ecommerce: 1.2,
    appWeb: 1.3,
    auditCyber: 1.0,
    aiAutomation: 1.1,
  };

  weeks = Math.ceil(weeks * typeMultipliers[projectType]);

  // Adjust for feature complexity
  if (featureCount > 10) weeks += 2;
  if (featureCount > 15) weeks += 2;

  // Return readable timeline
  if (weeks <= 2) return "1-2 semaines";
  if (weeks <= 4) return "3-4 semaines";
  if (weeks <= 6) return "4-6 semaines";
  if (weeks <= 8) return "6-8 semaines";
  if (weeks <= 10) return "8-10 semaines";
  if (weeks <= 12) return "10-12 semaines";
  return "> 3 mois";
}

/**
 * Determine project complexity
 */
function determineComplexity(
  price: number,
  featureCount: number,
): "simple" | "medium" | "complex" {
  if (price < 5000 && featureCount < 5) return "simple";
  if (price < 15000 && featureCount < 12) return "medium";
  return "complex";
}

/**
 * Get human-readable project type name
 */
function getProjectTypeName(type: ProjectType): string {
  const names: Record<ProjectType, string> = {
    siteVitrine: "Site Vitrine",
    ecommerce: "E-commerce",
    appWeb: "Application Web",
    auditCyber: "Audit Cybersécurité",
    aiAutomation: "Automatisation IA",
    cmsBlog: "CMS / Blog",
  };
  return names[type];
}

/**
 * Get human-readable design level name
 */
function getDesignLevelName(level: string): string {
  const names: Record<string, string> = {
    template: "template adapté",
    "semi-custom": "semi-personnalisé",
    custom: "sur mesure",
  };
  return names[level] || level;
}

/**
 * Get design level description
 */
function getDesignDescription(level: string): string {
  const descriptions: Record<string, string> = {
    template: "Template professionnel adapté à votre charte",
    "semi-custom": "Design personnalisé avec vos couleurs et branding",
    custom: "Design 100% sur mesure, unique et optimisé",
  };
  return descriptions[level] || "";
}

/**
 * Get SEO level description
 */
function getSEODescription(level: string): string {
  const descriptions: Record<string, string> = {
    basic:
      "SEO de base : meta tags, sitemap, schema.org, optimisation technique",
    advanced:
      "SEO avancé : stratégie complète, recherche de mots-clés, optimisation de contenu, backlinks",
  };
  return descriptions[level] || "";
}

/**
 * Format price for display
 */
export function formatPrice(price: number, currency: string = "EUR"): string {
  return new Intl.NumberFormat("fr-BE", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Format price range for display
 */
export function formatPriceRange(
  min: number,
  max: number,
  currency: string = "EUR",
): string {
  if (min === max) {
    return formatPrice(min, currency);
  }
  return `${formatPrice(min, currency)} - ${formatPrice(max, currency)}`;
}

/**
 * Calculate monthly maintenance cost
 */
export function calculateMaintenance(
  projectType: ProjectType,
  includeMonitoring: boolean = false,
): number {
  const matrix = pricingMatrices[projectType];
  let cost = matrix.services.maintenance;

  if (includeMonitoring && projectType !== "auditCyber") {
    cost += 50; // Additional monitoring
  }

  return cost;
}
