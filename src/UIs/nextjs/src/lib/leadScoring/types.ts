/**
 * Lead Scoring System - Common Types
 *
 * Types partagés pour le système de scoring avancé des leads
 */

import {
  ProjectType,
  QuoteData,
  QuoteEstimate,
} from "@/components/contact/QuoteWizard/types";

// ============================================================================
// LEAD SCORE
// ============================================================================

export interface LeadScore {
  total: number; // 0-100
  breakdown: {
    project: number; // 0-30 points
    engagement: number; // 0-25 points
    completion: number; // 0-20 points
    enrichment: number; // 0-15 points
    behavioral: number; // 0-10 points
  };
  grade: "HOT" | "WARM" | "COLD" | "SPAM";
  confidence: number; // 0-100
}

// ============================================================================
// BEHAVIORAL TRACKING
// ============================================================================

export interface BehavioralData {
  // Session info
  sessionId: string;
  sessionStart: number;
  sessionDuration: number;

  // Navigation
  visitedPages: Array<{
    path: string;
    title: string;
    timeSpent: number;
    scrollDepth: number;
    enteredAt: number;
  }>;

  // Engagement
  interactions: Array<{
    type: "click" | "scroll" | "hover" | "form_focus";
    element: string;
    timestamp: number;
  }>;

  // Wizard-specific
  wizardStarted: boolean;
  wizardStep: number;
  wizardBackClicks: number;
  infoBubbleOpened: string[];

  // Traffic source
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  landingPage: string;

  // Device
  device: "mobile" | "tablet" | "desktop";
  browser: string;
  os: string;

  // Calculated metrics
  engagementScore: number; // 0-100
  intentScore: number; // 0-100
}

// ============================================================================
// ENRICHMENT
// ============================================================================

export interface EnrichedLeadData {
  // Données de base (formulaire)
  email: string;
  name: string;
  company?: string;
  phone?: string;

  // Hunter.io Domain Search (Remplace Clearbit)
  // FREE: 25 recherches/mois
  companyData?: {
    domain: string;
    organization: string;
    employees: number | null;
    industry: string | null;
    country: string;
    twitter: string | null;
    linkedin: string | null;
    emails_found: number;
  };

  // Brandfetch (Logos + Brand Info)
  // FREE: 1000 lookups/mois
  brandData?: {
    name: string;
    logo: string | null;
    icon: string | null;
    colors: string[];
    fonts: string[];
    description: string | null;
    industry: string | null;
    employees: string | null;
  };

  // Hunter.io Email Validation
  // FREE: 25 vérifications/mois
  emailValidation?: {
    valid: boolean;
    score: number; // 0-100
    disposable: boolean;
    acceptAll: boolean;
    role: boolean;
    free: boolean;
  };

  // Tech Stack Detection (Détection maison 100% gratuite)
  // Analyse headers HTTP (Server, X-Powered-By, Via, X-Generator, etc.)
  // Détecte: CMS, Hosting, CDN, E-commerce platforms
  techStack?: {
    cms: string[]; // Next.js, WordPress, Drupal, etc.
    analytics: string[]; // Détection limitée via headers
    ecommerce: string[]; // Shopify, WooCommerce, Magento, etc.
    hosting: string[]; // Vercel, Netlify, AWS, Nginx, Apache, etc.
    cdn: string[]; // Cloudflare, Akamai, Fastly, etc.
  };

  // Scoring ajusté
  enrichmentScore: number;
  confidenceLevel: "high" | "medium" | "low";
}

// ============================================================================
// ROUTING
// ============================================================================

export interface RoutingRule {
  id: string;
  name: string;
  priority: number;
  conditions: {
    scoreMin?: number;
    scoreMax?: number;
    projectTypes?: ProjectType[];
    budgetMin?: number;
    enrichmentMin?: number;
    intentMin?: number;
  };
  action: {
    type: "assign" | "notify" | "workflow" | "reject";
    assignTo?: string; // email ou Slack user ID
    slackChannel?: string;
    workflow?: string;
    emailTemplate?: string;
  };
}

export interface RoutingResult {
  ruleId: string;
  ruleName: string;
  action: "assign" | "notify" | "workflow" | "reject";
  timestamp: string;
  success: boolean;
  assignedTo?: string;
  workflow?: string;
  rejected?: boolean;
  error?: string;
}

// ============================================================================
// ML PREDICTION
// ============================================================================

export interface PredictionResult {
  conversionProbability: number; // 0-1
  expectedValue: number; // Budget estimé × probabilité
  recommendedAction:
    | "contact_asap"
    | "schedule_call"
    | "nurture"
    | "disqualify";
  confidence: number; // 0-1
  factors: Array<{
    factor: string;
    impact: number; // -1 to 1
    description: string;
  }>;
}

// ============================================================================
// COMPLETE LEAD DATA
// ============================================================================

export interface CompleteLead {
  lead: EnrichedLeadData;
  score: LeadScore;
  quoteData: QuoteData;
  estimate: QuoteEstimate;
  behavioral: BehavioralData;
  prediction?: PredictionResult;
  routing?: RoutingResult;
  timestamp: string;
  id?: string;
}

// ============================================================================
// SESSION STORAGE
// ============================================================================

export interface SessionData {
  sessionId: string;
  userId?: string;
  visitedPages: string[];
  totalTimeMinutes: number;
  source?: string;
  medium?: string;
  campaign?: string;
}
