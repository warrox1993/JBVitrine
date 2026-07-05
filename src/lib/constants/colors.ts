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
 * Couleurs de priorité (différent du lead scoring)
 * Utilisées dans le système de pricing et notifications
 */
export const PRIORITY_COLORS = {
  high: "#ff6a00",
  medium: "#ffc43a",
  low: "#6b7280",
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
 * Couleurs principales du thème (référence depuis variables.css)
 */
export const THEME_COLORS = {
  primary: "#ff6a00",
  secondary: "#ffc43a",
  accent: "#3a85ff",
  danger: "#e5484d",
  success: "#4CAF50",
  warning: "#ffaa00",
  info: "#2196F3",

  // Dark mode
  bg: "#0f1115",
  bgAlt: "#161a22",
  surface: "#1e2430",
  border: "#2b3342",
  text: "#f6f7f9",
  textMuted: "#c8cdd6",
} as const;

/**
 * Helper type pour extraire les valeurs de couleur
 */
export type LeadColor = (typeof LEAD_COLORS)[keyof typeof LEAD_COLORS];
export type PriorityColor =
  (typeof PRIORITY_COLORS)[keyof typeof PRIORITY_COLORS];
export type StatsColor = (typeof STATS_COLORS)[keyof typeof STATS_COLORS];
export type ThemeColor = (typeof THEME_COLORS)[keyof typeof THEME_COLORS];

/**
 * Mapper une catégorie de lead vers sa couleur
 */
export const getLeadColor = (category: "HOT" | "WARM" | "COLD"): string => {
  return LEAD_COLORS[category];
};

/**
 * Mapper une priorité vers sa couleur
 */
export const getPriorityColor = (
  priority: "high" | "medium" | "low",
): string => {
  return PRIORITY_COLORS[priority];
};

/**
 * Mapper un type de stat vers sa couleur
 */
export const getStatsColor = (type: keyof typeof STATS_COLORS): string => {
  return STATS_COLORS[type];
};

/**
 * Conversion lead category → priority (si nécessaire)
 */
export const leadCategoryToPriority = (
  category: "HOT" | "WARM" | "COLD",
): "high" | "medium" | "low" => {
  const mapping = {
    HOT: "high",
    WARM: "medium",
    COLD: "low",
  } as const;
  return mapping[category];
};
