/**
 * RECOMMENDATION ENGINE - Core Logic
 *
 * Moteur de recommandation intelligent qui évalue les règles et génère
 * des recommandations personnalisées selon le contexte du wizard.
 */

import {
  WizardContext,
  RecommendationRule,
  Recommendation,
  Inconsistency,
  PriorityLevel,
  RuleConditions,
  ALL_RULES,
  bundles,
  Bundle,
} from "./rules";

// ============================================================================
// CONSTANTS
// ============================================================================

const WEIGHTS = {
  legal: 10,
  technical: 9,
  roi: 8,
  popularity: 6,
  budgetImpact: 4,
  consistency: 7,
} as const;

const PRIORITY_THRESHOLDS = {
  CRITICAL: 9,
  HIGH: 7,
  MEDIUM: 5,
  LOW: 3,
  OPTIONAL: 0,
} as const;

// ============================================================================
// RECOMMENDATION ENGINE CLASS
// ============================================================================

export class RecommendationEngine {
  private rules: RecommendationRule[];
  private bundles: Bundle[];

  constructor(rules?: RecommendationRule[], bundles?: Bundle[]) {
    this.rules = rules || ALL_RULES;
    this.bundles = bundles || [];
  }

  /**
   * Point d'entrée principal : génère toutes les recommandations
   */
  generateRecommendations(context: WizardContext): Recommendation[] {
    // 1. Trouver règles applicables
    const applicableRules = this.findApplicableRules(context);

    // 2. Créer recommandations depuis règles
    const recommendations = this.createRecommendations(
      applicableRules,
      context,
    );

    // 3. Calculer scores de priorité
    const scored = this.scoreRecommendations(recommendations, context);

    // 4. Trier par priorité
    const sorted = this.sortByPriority(scored);

    // 5. Dédupliquer
    const deduped = this.deduplicateRecommendations(sorted);

    return deduped;
  }

  /**
   * Détecte les incohérences dans la sélection actuelle
   */
  detectInconsistencies(context: WizardContext): Inconsistency[] {
    const inconsistencies: Inconsistency[] = [];

    // Filtrer uniquement les règles de cohérence
    const consistencyRules = this.rules.filter((r) => r.type === "CONSISTENCY");

    consistencyRules.forEach((rule) => {
      if (this.evaluateConditions(rule.conditions, context)) {
        if (rule.actions.alert || rule.actions.warn) {
          inconsistencies.push({
            severity: rule.actions.alert ? "CRITICAL" : "HIGH",
            message:
              rule.actions.alert || rule.actions.warn || rule.description,
            suggestedFeatures: [
              ...(rule.actions.require || []),
              ...(rule.actions.recommend || []),
            ],
          });
        }
      }
    });

    return inconsistencies;
  }

  /**
   * Suggère des bundles pertinents
   */
  suggestBundles(context: WizardContext): Bundle[] {
    if (!context.projectType) return [];

    return this.bundles.filter((bundle) => {
      // Bundle doit matcher le type de projet
      if (!bundle.targetProjectTypes.includes(context.projectType!)) {
        return false;
      }

      // Au moins 50% des features du bundle ne sont pas déjà sélectionnées
      const selectedFeatureIds = context.selectedFeatures.map((f) => f.id);
      const notSelected = bundle.features.filter(
        (fId) => !selectedFeatureIds.includes(fId),
      );

      return notSelected.length >= bundle.features.length * 0.5;
    });
  }

  // ==========================================================================
  // PRIVATE METHODS
  // ==========================================================================

  /**
   * Trouve les règles applicables au contexte
   */
  private findApplicableRules(context: WizardContext): RecommendationRule[] {
    return this.rules.filter((rule) =>
      this.evaluateConditions(rule.conditions, context),
    );
  }

  /**
   * Évalue les conditions d'une règle
   */
  private evaluateConditions(
    conditions: RuleConditions,
    context: WizardContext,
  ): boolean {
    // Project Type
    if (conditions.projectType && context.projectType) {
      if (!conditions.projectType.includes(context.projectType)) {
        return false;
      }
    }

    // Features - includes (ALL must be present)
    if (conditions.features?.includes) {
      const hasAll = conditions.features.includes.every((featureId) =>
        context.selectedFeatures.some((f) => f.id === featureId),
      );
      if (!hasAll) return false;
    }

    // Features - excludes (NONE must be present)
    if (conditions.features?.excludes) {
      const hasAny = conditions.features.excludes.some((featureId) =>
        context.selectedFeatures.some((f) => f.id === featureId),
      );
      if (hasAny) return false;
    }

    // Features - requiresAny (AT LEAST ONE must be present)
    if (conditions.features?.requiresAny) {
      const hasAny = conditions.features.requiresAny.some((featureId) =>
        context.selectedFeatures.some((f) => f.id === featureId),
      );
      if (!hasAny) return false;
    }

    // Budget
    if (conditions.budget && context.budget) {
      if (conditions.budget.min && context.budget < conditions.budget.min) {
        return false;
      }
      if (conditions.budget.max && context.budget > conditions.budget.max) {
        return false;
      }
    }

    // Region
    if (conditions.region && context.region) {
      if (!conditions.region.includes(context.region)) {
        return false;
      }
    }

    // Custom condition
    if (conditions.customCondition) {
      if (!conditions.customCondition(context)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Crée des recommandations depuis les règles applicables
   */
  private createRecommendations(
    rules: RecommendationRule[],
    context: WizardContext,
  ): Recommendation[] {
    const recommendations: Recommendation[] = [];

    rules.forEach((rule) => {
      // Déterminer les features à recommander
      const featureIds: string[] = [];
      let actionType: "require" | "recommend" | "suggest" = "suggest";

      if (rule.actions.require && rule.actions.require.length > 0) {
        featureIds.push(...rule.actions.require);
        actionType = "require";
      } else if (rule.actions.recommend && rule.actions.recommend.length > 0) {
        featureIds.push(...rule.actions.recommend);
        actionType = "recommend";
      } else if (rule.actions.suggest && rule.actions.suggest.length > 0) {
        featureIds.push(...rule.actions.suggest);
        actionType = "suggest";
      }

      // Filtrer features déjà sélectionnées
      const selectedIds = context.selectedFeatures.map((f) => f.id);
      const newFeatureIds = featureIds.filter(
        (fId) => !selectedIds.includes(fId),
      );

      if (newFeatureIds.length === 0) {
        // Toutes les features déjà sélectionnées, pas besoin de recommandation
        return;
      }

      recommendations.push({
        ruleId: rule.id,
        type: rule.type,
        name: rule.name,
        description: rule.description,
        reason: rule.reason,
        featureIds: newFeatureIds,
        priorityScore: 0, // Sera calculé après
        priorityLevel: "MEDIUM", // Sera calculé après
        evidence: rule.evidence,
        actions: {
          type: actionType,
          features: newFeatureIds,
        },
      });
    });

    return recommendations;
  }

  /**
   * Calcule le score de priorité pour chaque recommandation
   */
  private scoreRecommendations(
    recommendations: Recommendation[],
    context: WizardContext,
  ): Recommendation[] {
    return recommendations.map((rec) => {
      const rule = this.rules.find((r) => r.id === rec.ruleId);
      if (!rule) return rec;

      const baseScore = this.calculatePriorityScore(rule);
      const adjustedScore = this.applyContextualBoosts(
        baseScore,
        rule,
        context,
      );

      return {
        ...rec,
        priorityScore: adjustedScore,
        priorityLevel: this.getPriorityLevel(adjustedScore),
      };
    });
  }

  /**
   * Calcule le score de base selon la formule
   */
  private calculatePriorityScore(rule: RecommendationRule): number {
    let score = 0;
    let maxScore = 0;

    const s = rule.scoring;

    // Legal Requirement
    if (s.isLegalRequirement) {
      score += WEIGHTS.legal;
    }
    maxScore += WEIGHTS.legal;

    // Technical Dependency
    if (s.isTechnicalDependency) {
      score += WEIGHTS.technical;
    }
    maxScore += WEIGHTS.technical;

    // ROI (normalized to 0-1, max ROI 20:1)
    if (s.expectedROI !== undefined) {
      const roiNormalized = Math.min(s.expectedROI / 20, 1);
      score += WEIGHTS.roi * roiNormalized;
    }
    maxScore += WEIGHTS.roi;

    // Popularity (adoption rate 0-100%)
    if (s.adoptionRate !== undefined) {
      score += WEIGHTS.popularity * (s.adoptionRate / 100);
    }
    maxScore += WEIGHTS.popularity;

    // Budget Impact (inverse - lower price = higher score)
    if (s.priceImpact !== undefined) {
      // Normalize to 0-1, assuming max impact 5000€
      const impactNormalized = Math.min(s.priceImpact / 5000, 1);
      score += WEIGHTS.budgetImpact * (1 - impactNormalized);
    }
    maxScore += WEIGHTS.budgetImpact;

    // Consistency
    if (s.fixesInconsistency) {
      score += WEIGHTS.consistency;
    }
    maxScore += WEIGHTS.consistency;

    // Normalize to 0-10
    return maxScore > 0 ? (score / maxScore) * 10 : 0;
  }

  /**
   * Applique des boosts contextuels
   */
  private applyContextualBoosts(
    baseScore: number,
    rule: RecommendationRule,
    context: WizardContext,
  ): number {
    let adjustedScore = baseScore;

    // Boost si résout incohérence
    if (rule.scoring.fixesInconsistency) {
      adjustedScore += 1.5;
    }

    // Boost si ROI très élevé (>30:1)
    if (rule.scoring.expectedROI && rule.scoring.expectedROI > 30) {
      adjustedScore += 1;
    }

    // Boost pour règles légales et techniques
    if (rule.scoring.isLegalRequirement || rule.scoring.isTechnicalDependency) {
      adjustedScore += 1;
    }

    // Malus si hors budget (si budget défini)
    if (context.budget && rule.scoring.priceImpact) {
      const remainingBudget = context.budget - this.estimateTotalCost(context);
      if (rule.scoring.priceImpact > remainingBudget) {
        adjustedScore -= 2;
      }
    }

    // Clamp to 0-10
    return Math.max(0, Math.min(10, adjustedScore));
  }

  /**
   * Détermine le niveau de priorité selon le score
   */
  private getPriorityLevel(score: number): PriorityLevel {
    if (score >= PRIORITY_THRESHOLDS.CRITICAL) return "CRITICAL";
    if (score >= PRIORITY_THRESHOLDS.HIGH) return "HIGH";
    if (score >= PRIORITY_THRESHOLDS.MEDIUM) return "MEDIUM";
    if (score >= PRIORITY_THRESHOLDS.LOW) return "LOW";
    return "OPTIONAL";
  }

  /**
   * Trie les recommandations par priorité (score décroissant)
   */
  private sortByPriority(recommendations: Recommendation[]): Recommendation[] {
    return [...recommendations].sort(
      (a, b) => b.priorityScore - a.priorityScore,
    );
  }

  /**
   * Déduplique les recommandations (garde le meilleur score si doublon)
   */
  private deduplicateRecommendations(
    recommendations: Recommendation[],
  ): Recommendation[] {
    const seen = new Map<string, Recommendation>();

    recommendations.forEach((rec) => {
      // Utilise featureIds comme clé unique
      const key = rec.featureIds.sort().join(",");

      const existing = seen.get(key);
      if (!existing || rec.priorityScore > existing.priorityScore) {
        seen.set(key, rec);
      }
    });

    return Array.from(seen.values());
  }

  /**
   * Estime le coût total actuel (simplifié)
   */
  private estimateTotalCost(context: WizardContext): number {
    // Simplifié - dans la vraie app, utiliser calculateEstimate
    return context.selectedFeatures.reduce((sum, f) => {
      return sum + (f.priceImpact?.min || 0);
    }, 0);
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Crée une instance du moteur de recommandation
 */
export function createRecommendationEngine(): RecommendationEngine {
  return new RecommendationEngine(ALL_RULES, bundles);
}

/**
 * Groupe les recommandations par niveau de priorité
 */
export function groupRecommendationsByPriority(
  recommendations: Recommendation[],
): Record<PriorityLevel, Recommendation[]> {
  const groups: Record<PriorityLevel, Recommendation[]> = {
    CRITICAL: [],
    HIGH: [],
    MEDIUM: [],
    LOW: [],
    OPTIONAL: [],
  };

  recommendations.forEach((rec) => {
    groups[rec.priorityLevel].push(rec);
  });

  return groups;
}

/**
 * Filtre les recommandations critiques uniquement
 */
export function getCriticalRecommendations(
  recommendations: Recommendation[],
): Recommendation[] {
  return recommendations.filter((r) => r.priorityLevel === "CRITICAL");
}

/**
 * Compte les recommandations par type
 */
export function countRecommendationsByType(
  recommendations: Recommendation[],
): Record<string, number> {
  const counts: Record<string, number> = {
    LEGAL: 0,
    TECHNICAL: 0,
    BEST_PRACTICE: 0,
    BUDGET: 0,
    CONSISTENCY: 0,
    BUNDLE: 0,
  };

  recommendations.forEach((rec) => {
    counts[rec.type] = (counts[rec.type] || 0) + 1;
  });

  return counts;
}

/**
 * Formate un message de recommandation user-friendly
 */
export function formatRecommendationMessage(rec: Recommendation): string {
  const prefix = {
    CRITICAL: "⚠️ OBLIGATOIRE",
    HIGH: "💡 Fortement recommandé",
    MEDIUM: "✨ Suggéré",
    LOW: "💭 À considérer",
    OPTIONAL: "🔍 Option",
  }[rec.priorityLevel];

  let message = `${prefix}: ${rec.name}`;

  if (rec.evidence?.stats && rec.evidence.stats.length > 0) {
    message += `\n📊 ${rec.evidence.stats[0]}`;
  }

  return message;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  RecommendationEngine,
  createRecommendationEngine,
  groupRecommendationsByPriority,
  getCriticalRecommendations,
  countRecommendationsByType,
  formatRecommendationMessage,
};
