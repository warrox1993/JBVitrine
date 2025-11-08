/**
 * Lead Scoring System - Main Export
 *
 * Système complet de scoring et qualification automatique des leads
 */

// Core modules
export {
  BehavioralTracker,
  getTracker,
  resetTracker,
} from "./behavioralTracking";
export {
  RealTimeLeadScorer,
  isHotLead,
  isQualifiedLead,
  getRecommendedAction,
  formatGrade,
} from "./realTimeScorer";
export {
  LeadEnrichmentService,
  isValidEmail,
  extractDomain,
} from "./enrichment";

// Types
export type {
  LeadScore,
  BehavioralData,
  EnrichedLeadData,
  RoutingRule,
  RoutingResult,
  PredictionResult,
  CompleteLead,
  SessionData,
} from "./types";
