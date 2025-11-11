/**
 * RECOMMENDATION SYSTEM - Public API
 *
 * Point d'entrée central pour le système de recommandations intelligentes.
 *
 * @example
 * ```typescript
 * import { createRecommendationEngine } from '@/lib/recommendations';
 *
 * const engine = createRecommendationEngine();
 * const recommendations = engine.generateRecommendations(context);
 * const inconsistencies = engine.detectInconsistencies(context);
 * const bundles = engine.suggestBundles(context);
 * ```
 */

// Core engine
export {
  RecommendationEngine,
  createRecommendationEngine,
  groupRecommendationsByPriority,
  getCriticalRecommendations,
  countRecommendationsByType,
  formatRecommendationMessage,
} from "./engine";

// Rules and types
export {
  ALL_RULES,
  legalRules,
  technicalRules,
  bestPracticeRules,
  consistencyRules,
  bundles,
  type WizardContext,
  type RecommendationRule,
  type Recommendation,
  type Inconsistency,
  type Bundle,
  type RuleType,
  type PriorityLevel,
  type SeverityLevel,
  type RuleConditions,
  type RuleActions,
  type RuleScoring,
} from "./rules";

// Re-export default
export { default as RecommendationSystem } from "./engine";
