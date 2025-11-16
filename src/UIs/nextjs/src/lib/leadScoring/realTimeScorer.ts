/**
 * Real-Time Lead Scoring Engine
 *
 * Calcule le score d'un lead en temps réel pendant qu'il remplit le wizard,
 * avec breakdown détaillé par catégorie.
 */

import { LeadScore, EnrichedLeadData, BehavioralData } from "./types";
import { QuoteData } from "@/components/contact/QuoteWizard/types";
import { calculateEstimate } from "@/lib/pricing/calculator";

export class RealTimeLeadScorer {
  private startTime: number;
  private interactions: number = 0;
  private enrichedData: EnrichedLeadData | null = null;
  private currentStep: number = 0;

  constructor() {
    this.startTime = Date.now();
  }

  // Set enriched data when available
  setEnrichedData(data: EnrichedLeadData) {
    this.enrichedData = data;
  }

  // Set current wizard step
  setCurrentStep(step: number) {
    this.currentStep = step;
  }

  // Track interaction
  trackInteraction() {
    this.interactions++;
  }

  // Get current step
  getCurrentStep(): number {
    return this.currentStep;
  }

  // ============================================================================
  // SCORING DU PROJET (0-30 points)
  // ============================================================================

  scoreProject(data: QuoteData): number {
    let score = 0;

    // Type de projet (0-10 pts)
    const projectValue: Record<string, number> = {
      appWeb: 10,
      ecommerce: 9,
      aiAutomation: 8,
      auditCyber: 7,
      siteVitrine: 5,
      cmsBlog: 3,
    };
    const projectTypeScore = projectValue[data.projectType || ""] || 0;
    score += projectTypeScore;
    console.log(
      "[Lead Scoring] Project Type:",
      data.projectType,
      "→",
      projectTypeScore,
      "pts",
    );

    // Budget estimé (0-10 pts)
    let budgetScore = 0;
    if (data.projectType) {
      const estimate = calculateEstimate(data);
      if (estimate.min >= 10000) budgetScore = 10;
      else if (estimate.min >= 5000) budgetScore = 7;
      else if (estimate.min >= 2500) budgetScore = 4;
      else budgetScore = 2;
      score += budgetScore;
      console.log(
        "[Lead Scoring] Budget:",
        estimate.min,
        "€ →",
        budgetScore,
        "pts",
      );
    }

    // Complexité projet (0-10 pts)
    const featureCount = data.features?.length || 0;
    let complexityScore = 0;
    if (featureCount >= 8) complexityScore = 10;
    else if (featureCount >= 5) complexityScore = 7;
    else if (featureCount >= 3) complexityScore = 4;
    else if (featureCount >= 1) complexityScore = 2;
    score += complexityScore;
    console.log(
      "[Lead Scoring] Features:",
      featureCount,
      "→",
      complexityScore,
      "pts",
    );
    console.log("[Lead Scoring] Total Project Score:", score, "/ 30");

    return Math.min(score, 30);
  }

  // ============================================================================
  // SCORING D'ENGAGEMENT (0-25 points)
  // ============================================================================

  scoreEngagement(): number {
    let score = 0;

    // Temps passé (0-10 pts)
    const minutesSpent = (Date.now() - this.startTime) / 60000;
    if (minutesSpent >= 5) score += 10;
    else if (minutesSpent >= 3) score += 7;
    else if (minutesSpent >= 2) score += 4;
    else if (minutesSpent >= 0.5) score += 2;

    // Interactions (0-10 pts) - clics sur info bubbles, retours en arrière
    if (this.interactions >= 10) score += 10;
    else if (this.interactions >= 6) score += 7;
    else if (this.interactions >= 3) score += 4;
    else if (this.interactions >= 1) score += 2;

    // Vitesse de remplissage (0-5 pts) - ni trop rapide (bot) ni trop lent
    if (minutesSpent > 0) {
      const stepsPerMinute = this.currentStep / minutesSpent;
      if (stepsPerMinute >= 0.5 && stepsPerMinute <= 2) score += 5;
      else if (stepsPerMinute > 2 && stepsPerMinute <= 3)
        score += 2; // Un peu rapide
      else if (stepsPerMinute > 3) score += 1; // Suspect (bot?)
    }

    return Math.min(score, 25);
  }

  // ============================================================================
  // SCORING DE COMPLÉTION (0-20 points)
  // ============================================================================

  scoreCompletion(data: QuoteData): number {
    let score = 0;
    const requiredFields = ["projectType", "design", "seo", "timeline"];
    const optionalFields = ["features", "maintenance", "hosting", "training"];

    // Champs requis complétés (0-10 pts)
    const completedRequired = requiredFields.filter(
      (f) => data[f as keyof QuoteData],
    ).length;
    score += (completedRequired / requiredFields.length) * 10;

    // Champs optionnels (0-5 pts)
    const completedOptional = optionalFields.filter(
      (f) => data[f as keyof QuoteData],
    ).length;
    score += (completedOptional / optionalFields.length) * 5;

    // Note: Final form completion (name, email, phone, company) is scored
    // separately when ContactInfo is submitted, not from QuoteData

    return Math.min(score, 20);
  }

  // ============================================================================
  // SCORING D'ENRICHISSEMENT (0-15 points)
  // ============================================================================

  scoreEnrichment(): number {
    if (!this.enrichedData) {
      console.log(
        "[Lead Scoring] Enrichment: No enriched data yet (email not submitted) → 0 pts",
      );
      return 0;
    }

    let score = 0;

    // Email validation (0-5 pts)
    if (this.enrichedData.emailValidation?.valid) {
      score += 3;
      if (this.enrichedData.emailValidation.score >= 80) score += 2;
      console.log(
        "[Lead Scoring] Email validation:",
        this.enrichedData.emailValidation.score,
        "→",
        score,
        "pts",
      );
    }

    // Hunter.io Company Data (0-5 pts)
    let companyScore = 0;
    if (this.enrichedData.companyData) {
      companyScore += 2; // Domaine trouvé
      if (this.enrichedData.companyData.organization) companyScore += 1;
      if (this.enrichedData.companyData.industry) companyScore += 1;
      if (
        this.enrichedData.companyData.linkedin ||
        this.enrichedData.companyData.twitter
      )
        companyScore += 1;
      score += companyScore;
      console.log(
        "[Lead Scoring] Company data (Hunter.io):",
        this.enrichedData.companyData.organization,
        "→",
        companyScore,
        "pts",
      );
    }

    // Brandfetch Data (0-3 pts)
    let brandScore = 0;
    if (this.enrichedData.brandData) {
      brandScore += 1;
      if (this.enrichedData.brandData.logo) brandScore += 1;
      if (this.enrichedData.brandData.industry) brandScore += 1;
      score += brandScore;
      console.log(
        "[Lead Scoring] Brand data (Brandfetch):",
        this.enrichedData.brandData.name,
        "→",
        brandScore,
        "pts",
      );
    }

    // Tech Stack Detection (0-2 pts)
    let techScore = 0;
    if (this.enrichedData.techStack) {
      const totalTech =
        (this.enrichedData.techStack.cms?.length || 0) +
        (this.enrichedData.techStack.ecommerce?.length || 0) +
        (this.enrichedData.techStack.hosting?.length || 0) +
        (this.enrichedData.techStack.cdn?.length || 0);
      if (totalTech >= 3) techScore = 2;
      else if (totalTech >= 1) techScore = 1;
      score += techScore;
      console.log(
        "[Lead Scoring] Tech stack detected:",
        totalTech,
        "technologies →",
        techScore,
        "pts",
      );
    }

    console.log("[Lead Scoring] Total Enrichment Score:", score, "/ 15");
    return Math.min(score, 15);
  }

  // ============================================================================
  // SCORING COMPORTEMENTAL (0-10 points)
  // ============================================================================

  scoreBehavioral(behavioral: BehavioralData): number {
    let score = 0;
    console.log("[Lead Scoring] Behavioral data received:", {
      pagesCount: behavioral.visitedPages?.length || 0,
      sessionDurationMinutes: (behavioral.sessionDuration / 60000).toFixed(2),
      utmSource: behavioral.utm_source || "none",
      wizardStarted: behavioral.wizardStarted,
    });

    // Pages visitées avant wizard (0-5 pts)
    let pagesScore = 0;
    if (behavioral.visitedPages.some((p) => p.path.includes("/portfolio"))) {
      pagesScore += 2;
      console.log("[Lead Scoring] Portfolio visited: +2 pts");
    }
    if (behavioral.visitedPages.some((p) => p.path.includes("/blog"))) {
      pagesScore += 1;
      console.log("[Lead Scoring] Blog visited: +1 pt");
    }
    if (behavioral.visitedPages.some((p) => p.path.includes("/services"))) {
      pagesScore += 2;
      console.log("[Lead Scoring] Services visited: +2 pts");
    }
    score += pagesScore;

    // Temps total sur le site (0-3 pts)
    const totalMinutes = behavioral.sessionDuration / 60000;
    let timeScore = 0;
    if (totalMinutes >= 10) timeScore = 3;
    else if (totalMinutes >= 5) timeScore = 2;
    else if (totalMinutes >= 2) timeScore = 1;
    score += timeScore;
    console.log(
      "[Lead Scoring] Time on site:",
      totalMinutes.toFixed(2),
      "min →",
      timeScore,
      "pts",
    );

    // Source de trafic (0-2 pts)
    let trafficScore = 0;
    if (
      behavioral.utm_source === "organic" ||
      behavioral.utm_source === "direct"
    ) {
      trafficScore = 2;
    } else if (behavioral.utm_source === "referral") {
      trafficScore = 1;
    }
    score += trafficScore;
    console.log(
      "[Lead Scoring] Traffic source:",
      behavioral.utm_source || "none",
      "→",
      trafficScore,
      "pts",
    );
    console.log("[Lead Scoring] Total Behavioral Score:", score, "/ 10");

    return Math.min(score, 10);
  }

  // ============================================================================
  // CALCUL DU SCORE TOTAL
  // ============================================================================

  calculateTotalScore(data: QuoteData, behavioral: BehavioralData): LeadScore {
    const breakdown = {
      project: this.scoreProject(data),
      engagement: this.scoreEngagement(),
      completion: this.scoreCompletion(data),
      enrichment: this.scoreEnrichment(),
      behavioral: this.scoreBehavioral(behavioral),
    };

    const total = Object.values(breakdown).reduce((a, b) => a + b, 0);

    // Déterminer le grade
    let grade: LeadScore["grade"];
    if (total >= 80) grade = "HOT";
    else if (total >= 60) grade = "WARM";
    else if (total >= 40) grade = "COLD";
    else grade = "SPAM";

    // Calculer la confiance
    const confidence = this.calculateConfidence(data, breakdown);

    return { total, breakdown, grade, confidence };
  }

  // ============================================================================
  // CONFIANCE DANS LE SCORE
  // ============================================================================

  private calculateConfidence(
    data: QuoteData,
    breakdown: LeadScore["breakdown"],
  ): number {
    let confidence = 100;

    // Réduire si enrichissement manquant
    if (breakdown.enrichment === 0) confidence -= 20;

    // Réduire si comportemental faible
    if (breakdown.behavioral < 3) confidence -= 15;

    // Réduire si complétion partielle
    if (breakdown.completion < 15) confidence -= 15;

    // Réduire si pas assez d'engagement
    if (breakdown.engagement < 10) confidence -= 10;

    // Augmenter si enrichissement réussi et bon comportement
    if (this.enrichedData && breakdown.behavioral >= 5) {
      confidence += 10;
    }

    return Math.max(0, Math.min(confidence, 100));
  }

  // ============================================================================
  // HELPER: MISE À JOUR PROGRESSIVE
  // ============================================================================

  /**
   * Calcule un score partiel basé sur les données disponibles
   * Utile pour afficher le score en temps réel même si tout n'est pas rempli
   */
  calculatePartialScore(
    data: Partial<QuoteData>,
    behavioral?: BehavioralData,
  ): Partial<LeadScore> {
    const breakdown: Partial<LeadScore["breakdown"]> = {};

    // Calculer uniquement les scores possibles
    if (data.projectType) {
      breakdown.project = this.scoreProject(data as QuoteData);
    }

    breakdown.engagement = this.scoreEngagement();

    if (Object.keys(data).length > 0) {
      breakdown.completion = this.scoreCompletion(data as QuoteData);
    }

    breakdown.enrichment = this.scoreEnrichment();

    if (behavioral) {
      breakdown.behavioral = this.scoreBehavioral(behavioral);
    }

    // Calculer le total avec ce qui est disponible
    const total = Object.values(breakdown)
      .filter((v): v is number => v !== undefined)
      .reduce((a, b) => a + b, 0);

    // Estimer le grade (provisoire)
    let grade: LeadScore["grade"] = "COLD";
    if (total >= 60) grade = "HOT";
    else if (total >= 40) grade = "WARM";
    else if (total >= 20) grade = "COLD";
    else grade = "SPAM";

    return {
      total,
      breakdown: breakdown as LeadScore["breakdown"],
      grade,
      confidence: 50, // Confiance réduite pour un score partiel
    };
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Détermine si un lead est "hot" et nécessite un contact immédiat
 */
export function isHotLead(score: LeadScore): boolean {
  return score.grade === "HOT" && score.total >= 80;
}

/**
 * Détermine si un lead est qualifié (WARM ou HOT)
 */
export function isQualifiedLead(score: LeadScore): boolean {
  return score.grade === "HOT" || score.grade === "WARM";
}

/**
 * Retourne une recommandation d'action basée sur le score
 */
export function getRecommendedAction(score: LeadScore): {
  action: string;
  priority: "urgent" | "high" | "medium" | "low";
  message: string;
} {
  if (score.grade === "HOT") {
    return {
      action: "contact_immediately",
      priority: "urgent",
      message: "Contacter dans les 5 minutes - Lead très qualifié",
    };
  }

  if (score.grade === "WARM") {
    return {
      action: "schedule_call",
      priority: "high",
      message: "Planifier un appel dans les 24h",
    };
  }

  if (score.grade === "COLD") {
    return {
      action: "nurture",
      priority: "medium",
      message: "Ajouter à la séquence de nurturing",
    };
  }

  return {
    action: "review",
    priority: "low",
    message: "Révision manuelle nécessaire - Possiblement spam",
  };
}

/**
 * Formate le grade pour l'affichage
 */
export function formatGrade(grade: LeadScore["grade"]): string {
  const labels = {
    HOT: "🔥 Lead Chaud",
    WARM: "⚡ Lead Qualifié",
    COLD: "❄️ Lead Froid",
    SPAM: "⚠️ À Vérifier",
  };
  return labels[grade];
}
