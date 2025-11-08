import {
  QuoteData,
  QuoteEstimate,
  ContactInfo,
  LeadScore,
  LeadPriority,
} from "@/components/contact/QuoteWizard/types";

/**
 * Calculate lead score based on multiple factors
 * Score range: 0-100
 * 70+ = High priority
 * 40-69 = Medium priority
 * 0-39 = Low priority
 */
export function calculateLeadScore(
  estimate: QuoteEstimate,
  quoteData: QuoteData,
  contactInfo: ContactInfo,
): LeadScore {
  let score = 0;
  const reasons: string[] = [];
  const qualificationNotes = {
    budgetQualified: false,
    timelineRealistic: false,
    professionalEmail: false,
    companyProvided: false,
    detailedMessage: false,
    phoneProvided: false,
  };

  // 1. Budget Score (max 30 points)
  const budgetScore = calculateBudgetScore(estimate.min);
  score += budgetScore;
  qualificationNotes.budgetQualified = budgetScore >= 20;

  if (estimate.min >= 10000) {
    reasons.push(`Budget élevé (${estimate.min}€+) - Lead premium`);
  } else if (estimate.min >= 5000) {
    reasons.push(`Budget qualifié (${estimate.min}€)`);
  } else if (estimate.min >= 2000) {
    reasons.push(`Budget standard (${estimate.min}€)`);
  } else {
    reasons.push(`Budget faible (${estimate.min}€)`);
  }

  // 2. Timeline Score (max 15 points)
  const timelineScore = calculateTimelineScore(quoteData.timeline);
  score += timelineScore;
  qualificationNotes.timelineRealistic = timelineScore >= 10;

  if (quoteData.timeline === "asap") {
    reasons.push("Timeline urgente (risque de non-réalisme)");
  } else if (quoteData.timeline === ">3m") {
    reasons.push("Timeline flexible - bon signal");
  } else {
    reasons.push("Timeline réaliste");
  }

  // 3. Email Quality (max 20 points)
  const emailScore = calculateEmailScore(contactInfo.email);
  score += emailScore;
  qualificationNotes.professionalEmail = emailScore >= 15;

  if (emailScore >= 15) {
    reasons.push("Email professionnel fourni");
  } else {
    reasons.push("Email personnel (Gmail/Hotmail/etc)");
  }

  // 4. Company Information (max 15 points)
  const companyScore = contactInfo.company ? 15 : 0;
  score += companyScore;
  qualificationNotes.companyProvided = !!contactInfo.company;

  if (contactInfo.company) {
    reasons.push(`Entreprise renseignée : ${contactInfo.company}`);
  } else {
    reasons.push("Pas d'entreprise renseignée (particulier ?)");
  }

  // 5. Message Quality (max 10 points)
  const messageScore = calculateMessageScore(contactInfo.message || "");
  score += messageScore;
  qualificationNotes.detailedMessage = messageScore >= 7;

  if (messageScore >= 7) {
    reasons.push("Message détaillé et contextualisé");
  } else if (messageScore >= 4) {
    reasons.push("Message basique fourni");
  } else {
    reasons.push("Message vague ou absent");
  }

  // 6. Phone Provided (max 10 points)
  const phoneScore = contactInfo.phone ? 10 : 0;
  score += phoneScore;
  qualificationNotes.phoneProvided = !!contactInfo.phone;

  if (contactInfo.phone) {
    reasons.push("Téléphone fourni - facilite le contact");
  }

  // 7. Project Complexity Bonus (0-10 points)
  const complexityBonus = calculateComplexityBonus(
    estimate.complexity,
    estimate.totalFeatures,
  );
  score += complexityBonus;

  if (complexityBonus > 5) {
    reasons.push("Projet complexe avec plusieurs fonctionnalités");
  }

  // Determine priority based on final score
  const priority = determinePriority(score);

  return {
    score: Math.min(100, Math.round(score)),
    priority,
    reasons,
    qualificationNotes,
  };
}

/**
 * Calculate budget score (0-30 points)
 */
function calculateBudgetScore(minBudget: number): number {
  if (minBudget >= 25000) return 30;
  if (minBudget >= 15000) return 28;
  if (minBudget >= 10000) return 25;
  if (minBudget >= 5000) return 20;
  if (minBudget >= 3000) return 15;
  if (minBudget >= 2000) return 10;
  return 5;
}

/**
 * Calculate timeline score (0-15 points)
 */
function calculateTimelineScore(timeline: string | null): number {
  if (!timeline) return 5;

  const scores: Record<string, number> = {
    asap: 8, // Urgent but potentially unrealistic
    "1m": 12,
    "2-3m": 15,
    ">3m": 15,
    flexible: 15,
  };

  return scores[timeline] || 10;
}

/**
 * Calculate email quality score (0-20 points)
 */
function calculateEmailScore(email: string): number {
  const lowerEmail = email.toLowerCase();

  // Free email providers
  const freeProviders = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "live.com",
    "icloud.com",
    "protonmail.com",
    "aol.com",
  ];

  const isFreeEmail = freeProviders.some((provider) =>
    lowerEmail.endsWith(`@${provider}`),
  );

  if (isFreeEmail) {
    return 5; // Low score for free emails
  }

  // Professional email
  // Additional checks for domain quality
  const domain = email.split("@")[1];

  // Check if it's a valid domain (basic check)
  if (domain && domain.includes(".") && domain.length > 5) {
    return 20; // High score for professional email
  }

  return 10; // Medium score
}

/**
 * Calculate message quality score (0-10 points)
 */
function calculateMessageScore(message: string): number {
  if (!message) return 0;

  let score = 0;

  // Length
  if (message.length > 200) score += 4;
  else if (message.length > 100) score += 3;
  else if (message.length > 50) score += 2;
  else score += 1;

  // Contains specific keywords indicating serious inquiry
  const qualityKeywords = [
    "projet",
    "besoin",
    "objectif",
    "client",
    "utilisateur",
    "fonctionnalité",
    "budget",
    "délai",
    "urgent",
    "important",
    "actuellement",
    "existant",
    "remplacer",
    "améliorer",
  ];

  const messageWords = message.toLowerCase().split(/\s+/);
  const keywordMatches = qualityKeywords.filter((keyword) =>
    messageWords.some((word) => word.includes(keyword)),
  ).length;

  if (keywordMatches >= 3) score += 4;
  else if (keywordMatches >= 2) score += 3;
  else if (keywordMatches >= 1) score += 2;

  // Contains questions (indicating engagement)
  if (message.includes("?")) score += 2;

  return Math.min(10, score);
}

/**
 * Calculate complexity bonus (0-10 points)
 */
function calculateComplexityBonus(
  complexity: "simple" | "medium" | "complex",
  featureCount: number,
): number {
  let score = 0;

  // Complexity score
  if (complexity === "complex") score += 5;
  else if (complexity === "medium") score += 3;
  else score += 1;

  // Feature count bonus
  if (featureCount >= 10) score += 5;
  else if (featureCount >= 5) score += 3;
  else if (featureCount >= 3) score += 2;

  return Math.min(10, score);
}

/**
 * Determine priority based on score
 */
function determinePriority(score: number): LeadPriority {
  if (score >= 70) return "high";
  if (score >= 40) return "medium";
  return "low";
}

/**
 * Get priority emoji
 */
export function getPriorityEmoji(priority: LeadPriority): string {
  const emojis: Record<LeadPriority, string> = {
    high: "🔥",
    medium: "⚡",
    low: "📝",
  };
  return emojis[priority];
}

/**
 * Get priority color
 */
export function getPriorityColor(priority: LeadPriority): string {
  const colors: Record<LeadPriority, string> = {
    high: "#ff6a00", // Orange vif
    medium: "#ffc43a", // Jaune
    low: "#6b7280", // Gris
  };
  return colors[priority];
}

/**
 * Get recommended action based on lead score
 */
export function getRecommendedAction(leadScore: LeadScore): string {
  if (leadScore.priority === "high") {
    return "Appeler dans les 4h (lead chaud)";
  }
  if (leadScore.priority === "medium") {
    return "Envoyer email personnalisé sous 24h";
  }
  return "Envoyer email template automatique";
}

/**
 * Generate lead summary for internal notification
 */
export function generateLeadSummary(
  estimate: QuoteEstimate,
  quoteData: QuoteData,
  contactInfo: ContactInfo,
  leadScore: LeadScore,
): string {
  const projectTypeName = quoteData.projectType || "Non spécifié";
  const budgetRange = `${estimate.min} - ${estimate.max} €`;
  const timeline = estimate.timeline;

  let summary = `
LEAD PRIORITY: ${leadScore.priority.toUpperCase()}
Score: ${leadScore.score}/100

Client: ${contactInfo.name}
${contactInfo.company ? `Entreprise: ${contactInfo.company}` : ""}
Email: ${contactInfo.email}
${contactInfo.phone ? `Téléphone: ${contactInfo.phone}` : ""}

Projet: ${projectTypeName}
Budget estimé: ${budgetRange}
Délai: ${timeline}
Complexité: ${estimate.complexity}
Fonctionnalités: ${estimate.totalFeatures}

QUALIFICATION:
${leadScore.reasons.map((r) => `• ${r}`).join("\n")}

ACTION SUGGÉRÉE:
> ${getRecommendedAction(leadScore)}
`;

  if (contactInfo.message) {
    summary += `\nMessage complet:\n"${contactInfo.message.substring(0, 300)}${contactInfo.message.length > 300 ? "..." : ""}"`;
  }

  return summary.trim();
}
