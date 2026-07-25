/**
 * Shared section components (refonte-design Phase 2).
 * Reusable building blocks composed by the page-builders in Phase 3.
 */
export { TrustStrip, DEFAULT_TRUST_ITEMS } from "./TrustStrip/TrustStrip";
export type { TrustStripProps, TrustItem } from "./TrustStrip/TrustStrip";

export { ServiceCard } from "./ServiceCard/ServiceCard";
export type { ServiceCardProps } from "./ServiceCard/ServiceCard";

export { CyFunTiers } from "./CyFunTiers/CyFunTiers";
export type {
  CyFunTiersProps,
  CyFunTier,
  CyFunTableRow,
  TierLevel,
} from "./CyFunTiers/CyFunTiers";

export { ProcessSteps } from "./ProcessSteps/ProcessSteps";
export type { ProcessStepsProps, ProcessStep } from "./ProcessSteps/ProcessSteps";

export { Faq } from "./Faq/Faq";
export type { FaqProps, FaqItem } from "./Faq/Faq";

export { NIS2Checker } from "./NIS2Checker/NIS2Checker";

export { ArticleCard } from "./ArticleCard/ArticleCard";
export type { ArticleCardProps } from "./ArticleCard/ArticleCard";

export { CTABox } from "./CTABox/CTABox";
export type { CTABoxProps, CTAAction } from "./CTABox/CTABox";
