// Types for the Quote Wizard system

export type ProjectType =
  | "siteVitrine"
  | "ecommerce"
  | "appWeb"
  | "auditCyber"
  | "aiAutomation"
  | "cmsBlog";

export type DesignLevel = "template" | "semi-custom" | "custom";
export type SEOLevel = "basic" | "advanced" | "none";
export type TimelineOption = "asap" | "1m" | "2-3m" | ">3m" | "flexible";
export type LeadPriority = "high" | "medium" | "low";

export interface Feature {
  id: string;
  name: string;
  description: string;
  explanation?: string; // Explication détaillée pour développeurs ET non-techniques
  category?: string;
  selected: boolean;
  mutuallyExclusive?: boolean; // Si true, une seule option de cette catégorie peut être sélectionnée (comportement radio)
  priceImpact?: {
    min: number;
    max: number;
  };
}

export interface QuoteData {
  // Step 1: Project type
  projectType: ProjectType | null;

  // Step 1.5: Code ownership (only for ecommerce)
  codeOwnership: boolean | null; // true = custom code, false = CMS, null = not answered

  // Step 2: Features (conditional based on project type)
  features: Feature[];

  // Step 3: Design & Technical
  design: DesignLevel | null;
  seo: SEOLevel | null;
  animations: boolean;

  // Additional options
  maintenance: boolean;
  training: boolean;
  hosting: boolean;

  // Timeline preference
  timeline: TimelineOption | null;
}

export interface PriceBreakdownItem {
  item: string;
  description?: string;
  price: number;
  category?: "base" | "feature" | "design" | "seo" | "service";
}

export interface QuoteEstimate {
  min: number;
  max: number;
  breakdown: PriceBreakdownItem[];
  timeline: string;
  currency: "EUR";
  totalFeatures: number;
  complexity: "simple" | "medium" | "complex";
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  company: string;
  message?: string;
  consent: boolean;
}

export interface LeadScore {
  score: number; // 0-100
  priority: LeadPriority;
  reasons: string[];
  qualificationNotes: {
    budgetQualified: boolean;
    timelineRealistic: boolean;
    professionalEmail: boolean;
    companyProvided: boolean;
    detailedMessage: boolean;
    phoneProvided: boolean;
  };
}

export interface QuoteSubmission {
  estimate: QuoteEstimate;
  quoteData: QuoteData;
  contactInfo: ContactInfo;
  leadScore: LeadScore;
  utm?: {
    source?: string | null;
    campaign?: string | null;
    medium?: string | null;
  };
  timestamp: number;
  formStartTime?: number;
}

// Feature definitions by project type
export interface ProjectTypeConfig {
  id: ProjectType;
  name: string;
  description: string;
  explanation?: string; // Explication détaillée pour développeurs ET non-techniques
  icon: string;
  basePrice: number;
  features: Feature[];
  estimatedTimelineWeeks: {
    min: number;
    max: number;
  };
}

// Pricing matrix structure
export interface PricingMatrix {
  base: number;
  features: Record<string, { min: number; max: number }>;
  design: Record<DesignLevel, number>;
  seo: Record<SEOLevel, number>;
  services: {
    maintenance: number;
    training: number;
    hosting: number;
  };
}
