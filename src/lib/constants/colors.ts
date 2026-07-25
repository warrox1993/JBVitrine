/**
 * Couleurs centralisées - DRY principle
 * Source unique de vérité pour toutes les couleurs utilisées dans l'application
 */

/**
 * Couleurs pour le lead scoring
 * Utilisées dans admin/leads, notifications, email templates
 */
export const LEAD_COLORS = {
  HOT: "#ff4444",
  WARM: "#ffaa00",
  COLD: "#4444ff",
} as const;

/**
 * Couleurs pour les statistiques (dashboard admin)
 */
export const STATS_COLORS = {
  total: "#4CAF50",
  average: "#ff6a00",
  today: "#2196F3",
  success: "#4CAF50",
  warning: "#ffaa00",
  danger: "#ff4444",
  info: "#2196F3",
} as const;

/**
 * Mapper une catégorie de lead vers sa couleur
 */
export const getLeadColor = (category: string): string => {
  // Fall back to the COLD colour for any unmapped grade (e.g. "SPAM") so the
  // Discord/Slack embed never receives an undefined colour.
  return LEAD_COLORS[category as keyof typeof LEAD_COLORS] ?? LEAD_COLORS.COLD;
};
