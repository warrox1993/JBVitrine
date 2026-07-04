/**
 * RECOMMENDATION RULES - Implementation
 *
 * Ce fichier implémente le système de règles de recommandation défini dans
 * RECOMMENDATION_RULES_ENGINE.md
 *
 * @see RECOMMENDATION_RULES_ENGINE.md pour la documentation complète
 */

import { ProjectType, Feature } from "@/components/features/contact/QuoteWizard/types";

// ============================================================================
// TYPES
// ============================================================================

export type RuleType =
  | "LEGAL"
  | "TECHNICAL"
  | "BEST_PRACTICE"
  | "BUDGET"
  | "CONSISTENCY"
  | "BUNDLE";
export type PriorityLevel = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "OPTIONAL";
export type SeverityLevel = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export interface WizardContext {
  projectType: ProjectType | null;
  selectedFeatures: Feature[];
  budget?: number;
  region?: string;
  expectedTraffic?: number;
  businessType?: string;
  targetAudience?: "B2B" | "B2C" | "BOTH";
  hasPhysicalLocation?: boolean;
  mobileTrafficPercentage?: number;
  socialMediaActive?: boolean;
}

export interface RuleConditions {
  projectType?: ProjectType[];
  features?: {
    includes?: string[];
    excludes?: string[];
    requiresAny?: string[];
  };
  region?: string[];
  budget?: {
    min?: number;
    max?: number;
  };
  customCondition?: (context: WizardContext) => boolean;
}

export interface RuleActions {
  require?: string[];
  recommend?: string[];
  suggest?: string[];
  warn?: string;
  alert?: string;
}

export interface RuleScoring {
  isLegalRequirement: boolean;
  isTechnicalDependency: boolean;
  expectedROI?: number;
  adoptionRate?: number;
  priceImpact?: number;
  fixesInconsistency: boolean;
}

export interface RecommendationRule {
  id: string;
  type: RuleType;
  name: string;
  description: string;
  conditions: RuleConditions;
  actions: RuleActions;
  reason: string;
  evidence?: {
    stats?: string[];
    sources?: string[];
    roi?: number;
    adoptionRate?: number;
  };
  scoring: RuleScoring;
}

export interface Recommendation {
  ruleId: string;
  type: RuleType;
  name: string;
  description: string;
  reason: string;
  featureIds: string[];
  priorityScore: number;
  priorityLevel: PriorityLevel;
  evidence?: {
    stats?: string[];
    sources?: string[];
  };
  actions: {
    type: "require" | "recommend" | "suggest";
    features: string[];
  };
}

export interface Inconsistency {
  severity: SeverityLevel;
  message: string;
  suggestedFeatures: string[];
  affectedFeatures?: string[];
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  features: string[];
  discount: number; // percentage
  targetProjectTypes: ProjectType[];
  priceRange: {
    min: number;
    max: number;
  };
  discountedPriceRange: {
    min: number;
    max: number;
  };
}

// ============================================================================
// RÈGLES LÉGALES (L001-L010)
// ============================================================================

export const legalRules: RecommendationRule[] = [
  {
    id: "L001",
    type: "LEGAL",
    name: "RGPD obligatoire pour UE",
    description:
      "Conformité RGPD complète requise pour collecte de données en UE",
    conditions: {
      region: ["EU", "BE", "FR"],
      customCondition: (ctx) => {
        // Collecte données si formulaire, e-commerce, newsletter, ou espace client
        return (
          ctx.selectedFeatures.some(
            (f) =>
              f.id.includes("contact-form") ||
              f.id.includes("newsletter") ||
              f.id.includes("login-area") ||
              f.id.includes("customer-accounts"),
          ) || ctx.projectType === "ecommerce"
        );
      },
    },
    actions: {
      require: ["rgpd-compliance"],
      alert: "Conformité RGPD OBLIGATOIRE - Amendes jusqu'à 20M€ ou 4% du CA",
    },
    reason:
      "Obligation légale RGPD pour protection des données personnelles en UE",
    evidence: {
      stats: [
        "Amendes RGPD jusqu'à 20M€ ou 4% CA mondial",
        "100% des sites collectant données doivent être conformes",
      ],
      sources: ["RGPD Article 83"],
      adoptionRate: 100,
    },
    scoring: {
      isLegalRequirement: true,
      isTechnicalDependency: false,
      adoptionRate: 100,
      priceImpact: 800,
      fixesInconsistency: true,
    },
  },

  {
    id: "L002",
    type: "LEGAL",
    name: "SSL/HTTPS obligatoire",
    description:
      "Certificat SSL requis pour paiement, authentification, ou données sensibles",
    conditions: {
      customCondition: (ctx) => {
        return (
          ctx.projectType === "ecommerce" ||
          ctx.selectedFeatures.some(
            (f) =>
              f.id.includes("payment-") ||
              f.id.includes("login-area") ||
              f.id.includes("customer-accounts"),
          )
        );
      },
    },
    actions: {
      require: ["ssl-certificate"],
      alert: "SSL OBLIGATOIRE - Norme PCI-DSS + Google pénalise HTTP",
    },
    reason:
      "Norme PCI-DSS pour paiements + Google pénalise HTTP + 85% visiteurs quittent sans cadenas",
    evidence: {
      stats: [
        "PCI-DSS obligatoire pour paiements CB",
        "Google pénalise sites HTTP",
        "85% visiteurs quittent si pas HTTPS",
      ],
      sources: [
        "PCI Security Standards Council",
        "Google Webmaster Guidelines",
      ],
      adoptionRate: 95,
    },
    scoring: {
      isLegalRequirement: true,
      isTechnicalDependency: true,
      adoptionRate: 95,
      priceImpact: 0, // Gratuit (Let's Encrypt)
      fixesInconsistency: true,
    },
  },

  {
    id: "L003",
    type: "LEGAL",
    name: "Mentions légales UE",
    description:
      "Mentions légales, CGU, politique de confidentialité obligatoires",
    conditions: {
      region: ["EU", "BE", "FR"],
      projectType: ["siteVitrine", "ecommerce", "cmsBlog"],
    },
    actions: {
      require: ["legal-pages"],
    },
    reason:
      "Loi pour la confiance dans l'économie numérique (LCEN) - Obligation France/Belgique",
    scoring: {
      isLegalRequirement: true,
      isTechnicalDependency: false,
      adoptionRate: 100,
      priceImpact: 300,
      fixesInconsistency: false,
    },
  },

  {
    id: "L004",
    type: "LEGAL",
    name: "CGV pour E-commerce",
    description: "Conditions Générales de Vente obligatoires",
    conditions: {
      projectType: ["ecommerce"],
    },
    actions: {
      require: ["terms-and-conditions"],
      alert: "CGV OBLIGATOIRES pour e-commerce - Code de la consommation",
    },
    reason: "Code de la consommation - Article L. 111-1",
    scoring: {
      isLegalRequirement: true,
      isTechnicalDependency: false,
      adoptionRate: 100,
      priceImpact: 400,
      fixesInconsistency: false,
    },
  },

  {
    id: "L005",
    type: "LEGAL",
    name: "Droit de rétractation 14 jours",
    description: "Système de retours requis pour e-commerce UE",
    conditions: {
      projectType: ["ecommerce"],
      region: ["EU", "BE", "FR"],
    },
    actions: {
      require: ["order-returns"],
    },
    reason: "Directive européenne 2011/83/UE - Droit de rétractation 14 jours",
    scoring: {
      isLegalRequirement: true,
      isTechnicalDependency: false,
      adoptionRate: 100,
      priceImpact: 1200,
      fixesInconsistency: false,
    },
  },

  {
    id: "L007",
    type: "LEGAL",
    name: "Banner cookies consent",
    description: "Consentement cookies obligatoire pour tracking/analytics",
    conditions: {
      region: ["EU", "BE", "FR"],
      customCondition: (ctx) => {
        return ctx.selectedFeatures.some(
          (f) =>
            f.id.includes("analytics") ||
            f.id.includes("tracking") ||
            f.id.includes("google-analytics") ||
            f.id.includes("facebook-pixel"),
        );
      },
    },
    actions: {
      require: ["cookie-consent-banner"],
    },
    reason: "RGPD + Directive ePrivacy - Consentement cookies obligatoire",
    scoring: {
      isLegalRequirement: true,
      isTechnicalDependency: false,
      adoptionRate: 100,
      priceImpact: 400,
      fixesInconsistency: true,
    },
  },
];

// ============================================================================
// RÈGLES TECHNIQUES (T001-T020)
// ============================================================================

export const technicalRules: RecommendationRule[] = [
  {
    id: "T001",
    type: "TECHNICAL",
    name: "Paiement nécessite SSL + Gateway",
    description: "SSL et gateway paiement requis pour transactions",
    conditions: {
      features: {
        requiresAny: ["payment-stripe", "payment-mollie", "payment-paypal"],
      },
    },
    actions: {
      require: ["ssl-certificate"],
      alert: "Paiement impossible sans SSL",
    },
    reason: "Dépendance technique absolue - paiement impossible sans SSL",
    scoring: {
      isLegalRequirement: false,
      isTechnicalDependency: true,
      adoptionRate: 100,
      priceImpact: 0,
      fixesInconsistency: true,
    },
  },

  {
    id: "T002",
    type: "TECHNICAL",
    name: "Stock management pour e-commerce",
    description: "Gestion de stock essentielle pour éviter survente",
    conditions: {
      projectType: ["ecommerce"],
      customCondition: () => {
        // Assume products > 10 based on catalog size selection
        return true;
      },
    },
    actions: {
      require: ["stock-management"],
      alert: "Survente = catastrophe client + réputation",
    },
    reason: "Éviter survente et gérer disponibilité produits",
    scoring: {
      isLegalRequirement: false,
      isTechnicalDependency: true,
      adoptionRate: 95,
      priceImpact: 1500,
      fixesInconsistency: true,
    },
  },

  {
    id: "T003",
    type: "TECHNICAL",
    name: "Auth nécessite session + recovery",
    description:
      "Session management et password recovery requis pour authentification",
    conditions: {
      features: {
        requiresAny: ["login-area", "customer-accounts"],
      },
    },
    actions: {
      require: ["session-management", "password-recovery"],
      recommend: ["2fa-admin"],
    },
    reason: "UX basique attendue + sécurité minimale",
    scoring: {
      isLegalRequirement: false,
      isTechnicalDependency: true,
      adoptionRate: 100,
      priceImpact: 800,
      fixesInconsistency: true,
    },
  },

  {
    id: "T004",
    type: "TECHNICAL",
    name: "Search requis si 15+ pages",
    description: "Moteur de recherche nécessaire pour navigation",
    conditions: {
      projectType: ["siteVitrine"],
      customCondition: (ctx) => {
        // Check if pages-11-20 or pages-20+ selected
        return ctx.selectedFeatures.some(
          (f) => f.id === "pages-11-20" || f.id === "pages-20+",
        );
      },
    },
    actions: {
      recommend: ["search-engine"],
    },
    reason: "30% des visiteurs utilisent la recherche sur sites 15+ pages",
    evidence: {
      stats: ["30% visiteurs utilisent recherche sur sites 15+ pages"],
      adoptionRate: 75,
    },
    scoring: {
      isLegalRequirement: false,
      isTechnicalDependency: false,
      adoptionRate: 75,
      priceImpact: 1200,
      fixesInconsistency: false,
    },
  },

  {
    id: "T005",
    type: "TECHNICAL",
    name: "Filtres essentiels si 50+ produits",
    description: "Filtres produits critiques pour gros catalogues",
    conditions: {
      projectType: ["ecommerce"],
      customCondition: (ctx) => {
        return ctx.selectedFeatures.some(
          (f) =>
            f.id === "products-50-200" ||
            f.id === "products-200-500" ||
            f.id === "products-500-2000" ||
            f.id === "products-2000+",
        );
      },
    },
    actions: {
      require: ["product-filters"],
      alert: "Navigation impossible sans filtres sur gros catalogue",
    },
    reason: "Améliore drastiquement UX et conversions sur catalogues larges",
    scoring: {
      isLegalRequirement: false,
      isTechnicalDependency: true,
      adoptionRate: 100,
      priceImpact: 1800,
      fixesInconsistency: true,
    },
  },

  {
    id: "T013",
    type: "TECHNICAL",
    name: "Search avancé pour large dataset",
    description: "Elasticsearch/Algolia requis pour gros catalogues",
    conditions: {
      projectType: ["ecommerce"],
      customCondition: (ctx) => {
        return ctx.selectedFeatures.some(
          (f) => f.id === "products-500-2000" || f.id === "products-2000+",
        );
      },
    },
    actions: {
      require: ["search-advanced"],
      alert: "SQL full-text insuffisant pour performance sur 500+ produits",
    },
    reason: "Performance et pertinence critique sur gros catalogues",
    scoring: {
      isLegalRequirement: false,
      isTechnicalDependency: true,
      adoptionRate: 90,
      priceImpact: 2500,
      fixesInconsistency: false,
    },
  },
];

// ============================================================================
// RÈGLES BEST PRACTICES (BP001-BP025)
// ============================================================================

export const bestPracticeRules: RecommendationRule[] = [
  {
    id: "BP001",
    type: "BEST_PRACTICE",
    name: "Google Analytics standard",
    description: "Google Analytics 4 pour mesure et optimisation",
    conditions: {
      projectType: ["siteVitrine", "ecommerce", "cmsBlog"],
    },
    actions: {
      recommend: ["google-analytics-4"],
    },
    reason: "87% des sites l'ont + gratuit + standard industrie",
    evidence: {
      stats: ["87% adoption", "Gratuit", "ROI mesure essentielle"],
      adoptionRate: 87,
      roi: 20,
    },
    scoring: {
      isLegalRequirement: false,
      isTechnicalDependency: false,
      expectedROI: 20,
      adoptionRate: 87,
      priceImpact: 500,
      fixesInconsistency: false,
    },
  },

  {
    id: "BP002",
    type: "BEST_PRACTICE",
    name: "Blog pour SEO",
    description: "Blog booste trafic organique et génération de leads",
    conditions: {
      projectType: ["siteVitrine"],
      customCondition: (ctx) => {
        return ctx.selectedFeatures.some(
          (f) => f.id === "seo-advanced" || f.id === "seo-expert",
        );
      },
    },
    actions: {
      recommend: ["blog"],
    },
    reason: "Sites avec blog ont +67% de leads + trafic organique +55%",
    evidence: {
      stats: ["67% plus de leads", "55% plus de trafic organique"],
      sources: ["HubSpot"],
      roi: 8,
    },
    scoring: {
      isLegalRequirement: false,
      isTechnicalDependency: false,
      expectedROI: 8,
      adoptionRate: 60,
      priceImpact: 2000,
      fixesInconsistency: false,
    },
  },

  {
    id: "BP003",
    type: "BEST_PRACTICE",
    name: "Témoignages boostent conversion",
    description: "Avis clients augmentent confiance et conversions",
    conditions: {
      projectType: ["siteVitrine", "ecommerce"],
    },
    actions: {
      recommend: ["testimonials"],
    },
    reason: "92% lisent avis avant acheter + conversion +34%",
    evidence: {
      stats: ["92% consumers read reviews", "Conversion +34%"],
      sources: ["BrightLocal"],
      roi: 5,
    },
    scoring: {
      isLegalRequirement: false,
      isTechnicalDependency: false,
      expectedROI: 5,
      adoptionRate: 75,
      priceImpact: 800,
      fixesInconsistency: false,
    },
  },

  {
    id: "BP004",
    type: "BEST_PRACTICE",
    name: "Avis clients vérifiés",
    description: "Product reviews augmentent conversions e-commerce",
    conditions: {
      projectType: ["ecommerce"],
    },
    actions: {
      recommend: ["product-reviews"],
    },
    reason: "Avis augmentent conversions de 18-25% (270% pour produits chers)",
    evidence: {
      stats: ["Conversion +18-25%", "+270% pour high-price items"],
      sources: ["Spiegel Research Center"],
      roi: 6,
    },
    scoring: {
      isLegalRequirement: false,
      isTechnicalDependency: false,
      expectedROI: 6,
      adoptionRate: 80,
      priceImpact: 1200,
      fixesInconsistency: false,
    },
  },

  {
    id: "BP005",
    type: "BEST_PRACTICE",
    name: "Newsletter pour fidélisation",
    description: "Email marketing ROI exceptionnel",
    conditions: {
      projectType: ["ecommerce", "cmsBlog"],
    },
    actions: {
      recommend: ["newsletter-signup"],
    },
    reason: "Email marketing ROI = 42:1 (42€ pour 1€ investi)",
    evidence: {
      stats: ["ROI 42:1", "Channel le plus rentable"],
      sources: ["DMA"],
      roi: 42,
    },
    scoring: {
      isLegalRequirement: false,
      isTechnicalDependency: false,
      expectedROI: 42,
      adoptionRate: 85,
      priceImpact: 600,
      fixesInconsistency: false,
    },
  },

  {
    id: "BP009",
    type: "BEST_PRACTICE",
    name: "Récupération paniers abandonnés",
    description: "Emails automatiques récupèrent 10-15% des paniers",
    conditions: {
      projectType: ["ecommerce"],
    },
    actions: {
      recommend: ["abandoned-cart"],
    },
    reason: "70% paniers abandonnés, emails récupèrent 10-15% = +7-10% CA",
    evidence: {
      stats: ["69.82% cart abandonment", "10-15% recovery rate", "ROI 40:1"],
      sources: ["Baymard Institute"],
      roi: 40,
    },
    scoring: {
      isLegalRequirement: false,
      isTechnicalDependency: false,
      expectedROI: 40,
      adoptionRate: 65,
      priceImpact: 1500,
      fixesInconsistency: false,
    },
  },

  {
    id: "BP020",
    type: "BEST_PRACTICE",
    name: "SEO local pour présence physique",
    description: "SEO local + Google My Business pour visibilité locale",
    conditions: {
      customCondition: (ctx) => ctx.hasPhysicalLocation === true,
    },
    actions: {
      recommend: ["seo-local", "map-locations", "google-my-business"],
    },
    reason: "46% recherches Google sont locales + GMB = top 3 Google Maps",
    evidence: {
      stats: [
        "46% of all Google searches are local",
        "GMB critical for local ranking",
      ],
      sources: ["Google"],
      roi: 12,
    },
    scoring: {
      isLegalRequirement: false,
      isTechnicalDependency: false,
      expectedROI: 12,
      adoptionRate: 70,
      priceImpact: 1200,
      fixesInconsistency: false,
    },
  },

  {
    id: "BP024",
    type: "BEST_PRACTICE",
    name: "Guest checkout obligatoire",
    description: "Achat sans compte réduit abandons",
    conditions: {
      projectType: ["ecommerce"],
    },
    actions: {
      recommend: ["guest-checkout"],
      alert: "24% des abandons dus à création compte obligatoire",
    },
    reason: "24% abandons dus à création compte obligatoire",
    evidence: {
      stats: ["24% abandonment due to forced account creation"],
      sources: ["Baymard Institute"],
      roi: 8,
    },
    scoring: {
      isLegalRequirement: false,
      isTechnicalDependency: false,
      expectedROI: 8,
      adoptionRate: 90,
      priceImpact: 600,
      fixesInconsistency: false,
    },
  },
];

// ============================================================================
// RÈGLES COHÉRENCE (C001-C020)
// ============================================================================

export const consistencyRules: RecommendationRule[] = [
  {
    id: "C001",
    type: "CONSISTENCY",
    name: "E-commerce sans paiement",
    description: "E-commerce doit avoir système de paiement",
    conditions: {
      projectType: ["ecommerce"],
      features: {
        excludes: [
          "payment-stripe",
          "payment-mollie",
          "payment-paypal",
          "payment-klarna",
        ],
      },
    },
    actions: {
      alert: "E-commerce sans système de paiement détecté",
      recommend: ["payment-stripe", "payment-mollie"],
    },
    reason: "E-commerce sans paiement = incohérence critique",
    scoring: {
      isLegalRequirement: false,
      isTechnicalDependency: false,
      adoptionRate: 100,
      priceImpact: 0,
      fixesInconsistency: true,
    },
  },

  {
    id: "C002",
    type: "CONSISTENCY",
    name: "Produits sans stock management",
    description: "Catalogue sans gestion de stock = risque survente",
    conditions: {
      projectType: ["ecommerce"],
      features: {
        excludes: ["stock-management"],
      },
    },
    actions: {
      alert: "Catalogue sans gestion de stock = risque survente",
      recommend: ["stock-management"],
    },
    reason: "Éviter survente catastrophique",
    scoring: {
      isLegalRequirement: false,
      isTechnicalDependency: false,
      adoptionRate: 95,
      priceImpact: 1500,
      fixesInconsistency: true,
    },
  },

  {
    id: "C008",
    type: "CONSISTENCY",
    name: "E-commerce sans analytics",
    description: "E-commerce sans analytics = pilotage à l'aveugle",
    conditions: {
      projectType: ["ecommerce"],
      features: {
        excludes: ["google-analytics-4", "analytics-setup"],
      },
    },
    actions: {
      alert: "E-commerce sans analytics = pilotage à l'aveugle",
      recommend: ["google-analytics-4", "conversion-tracking"],
    },
    reason: "Impossible d'optimiser sans données",
    scoring: {
      isLegalRequirement: false,
      isTechnicalDependency: false,
      adoptionRate: 90,
      priceImpact: 500,
      fixesInconsistency: true,
    },
  },
];

// ============================================================================
// BUNDLES (P001-P015)
// ============================================================================

export const bundles: Bundle[] = [
  {
    id: "P001",
    name: "Pack SEO Pro",
    description: "Bundle cohérent pour visibilité Google maximale",
    features: [
      "seo-advanced",
      "schema-markup",
      "open-graph-meta",
      "seo-breadcrumbs",
    ],
    discount: 15,
    targetProjectTypes: ["siteVitrine", "ecommerce", "cmsBlog"],
    priceRange: { min: 1200, max: 1800 },
    discountedPriceRange: { min: 1020, max: 1530 },
  },
  {
    id: "P002",
    name: "Pack E-commerce Starter",
    description: "Essentiel minimum pour lancer boutique en ligne",
    features: [
      "products-50",
      "payment-stripe",
      "stock-management",
      "shipping-flat-rate",
      "guest-checkout",
      "ssl-certificate",
    ],
    discount: 10,
    targetProjectTypes: ["ecommerce"],
    priceRange: { min: 5000, max: 7000 },
    discountedPriceRange: { min: 4500, max: 6300 },
  },
  {
    id: "P003",
    name: "Pack E-commerce Pro",
    description: "Features ROI prouvé pour croissance",
    features: [
      "products-50-200",
      "payment-stripe",
      "stock-management",
      "product-reviews",
      "abandoned-cart",
      "google-analytics-4",
      "conversion-tracking",
      "newsletter",
      "promo-codes",
    ],
    discount: 12,
    targetProjectTypes: ["ecommerce"],
    priceRange: { min: 8000, max: 12000 },
    discountedPriceRange: { min: 7040, max: 10560 },
  },
  {
    id: "P004",
    name: "Pack Marketing Digital",
    description: "Mesure + optimisation complète",
    features: [
      "google-analytics-4",
      "conversion-tracking",
      "schema-markup",
      "open-graph-meta",
      "exit-intent-popup",
      "heatmaps-session-recording",
    ],
    discount: 15,
    targetProjectTypes: ["siteVitrine", "ecommerce", "cmsBlog"],
    priceRange: { min: 2000, max: 3000 },
    discountedPriceRange: { min: 1700, max: 2550 },
  },
  {
    id: "P005",
    name: "Pack Sécurité & Conformité",
    description: "Protection complète légale + technique",
    features: [
      "ssl-certificate",
      "rgpd-compliance",
      "daily-backups",
      "2fa-admin",
      "anti-ddos-protection",
    ],
    discount: 10,
    targetProjectTypes: ["ecommerce", "appWeb"],
    priceRange: { min: 1500, max: 2500 },
    discountedPriceRange: { min: 1350, max: 2250 },
  },
];

// ============================================================================
// EXPORT ALL RULES
// ============================================================================

export const ALL_RULES: RecommendationRule[] = [
  ...legalRules,
  ...technicalRules,
  ...bestPracticeRules,
  ...consistencyRules,
];

const rules = {
  legalRules,
  technicalRules,
  bestPracticeRules,
  consistencyRules,
  bundles,
  ALL_RULES,
};

export default rules;
