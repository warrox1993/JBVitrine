/**
 * Animation utilities - DRY principle
 * Fonctions helpers pour gérer les animations de manière centralisée
 */

/**
 * Calcule un délai d'animation staggeré pour créer un effet de cascade
 * Utilisé pour animer séquentiellement des listes d'éléments
 *
 * @param index - Index de l'élément dans la liste
 * @param baseDelay - Délai de base en secondes (default: 0)
 * @param increment - Incrément entre chaque élément en secondes (default: 0.1)
 * @returns String CSS pour animation-delay
 *
 * @example
 * // Dans un .map()
 * items.map((item, i) => (
 *   <div style={{ animationDelay: getStaggerDelay(i) }}>
 *     {item}
 *   </div>
 * ))
 *
 * // Avec délai de base et incrément personnalisé
 * getStaggerDelay(2, 0.5, 0.15) // "0.8s" (0.5 + 2 * 0.15)
 */
export const getStaggerDelay = (
  index: number,
  baseDelay: number = 0,
  increment: number = 0.1,
): string => {
  return `${baseDelay + index * increment}s`;
};

/**
 * Convertit une durée en millisecondes vers une string CSS
 *
 * @param ms - Durée en millisecondes
 * @returns String CSS (ex: "300ms" ou "1.5s")
 *
 * @example
 * msToCSS(300) // "300ms"
 * msToCSS(1500) // "1.5s"
 */
export const msToCSS = (ms: number): string => {
  return ms >= 1000 ? `${ms / 1000}s` : `${ms}ms`;
};

/**
 * Génère une valeur de transition CSS avec durée et easing
 *
 * @param property - Propriété CSS à animer (ex: "all", "opacity", "transform")
 * @param duration - Durée en ms
 * @param easing - Fonction d'easing (default: "ease")
 * @returns String CSS pour transition
 *
 * @example
 * getTransition("opacity", 300) // "opacity 300ms ease"
 * getTransition("all", 200, "cubic-bezier(0.4, 0, 0.2, 1)")
 * // "all 200ms cubic-bezier(0.4, 0, 0.2, 1)"
 */
export const getTransition = (
  property: string,
  duration: number,
  easing: string = "ease",
): string => {
  return `${property} ${msToCSS(duration)} ${easing}`;
};

/**
 * Génère plusieurs transitions CSS combinées
 *
 * @param transitions - Array de tuples [property, duration, easing?]
 * @returns String CSS avec transitions multiples
 *
 * @example
 * getMultipleTransitions([
 *   ['opacity', 200],
 *   ['transform', 300, 'cubic-bezier(0.4, 0, 0.2, 1)']
 * ])
 * // "opacity 200ms ease, transform 300ms cubic-bezier(0.4, 0, 0.2, 1)"
 */
export const getMultipleTransitions = (
  transitions: Array<[string, number, string?]>,
): string => {
  return transitions
    .map(([property, duration, easing]) =>
      getTransition(property, duration, easing),
    )
    .join(", ");
};

/**
 * Easings CSS prédéfinis (courbes de Bézier optimisées)
 */
export const EASINGS = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",

  // Material Design easings
  standard: "cubic-bezier(0.4, 0, 0.2, 1)",
  decelerate: "cubic-bezier(0, 0, 0.2, 1)",
  accelerate: "cubic-bezier(0.4, 0, 1, 1)",
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)",

  // Custom smooth easings
  smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  elastic: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
} as const;

/**
 * Durées d'animation standards (en ms)
 * Basées sur Material Design guidelines
 */
export const DURATIONS = {
  instant: 0,
  fast: 150,
  base: 200,
  moderate: 300,
  slow: 400,
  slower: 500,
  slowest: 700,
} as const;

/**
 * Génère un style pour une animation de particules flottantes
 *
 * @param index - Index de la particule
 * @param totalParticles - Nombre total de particules
 * @param baseDelay - Délai de base
 * @returns Object de style React
 *
 * @example
 * {Array.from({ length: 8 }).map((_, i) => (
 *   <div key={i} style={getFloatingParticleStyle(i, 8)} />
 * ))}
 */
export const getFloatingParticleStyle = (
  index: number,
  totalParticles: number,
  baseDelay: number = 0,
): React.CSSProperties => {
  const delay = baseDelay + (index / totalParticles) * 2;
  const duration = 3 + (index % 3);

  return {
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
  };
};

/**
 * Type pour les propriétés d'animation
 */
export type AnimationConfig = {
  name: string;
  duration?: number;
  delay?: number;
  easing?: keyof typeof EASINGS;
  iterationCount?: number | "infinite";
  direction?: "normal" | "reverse" | "alternate" | "alternate-reverse";
  fillMode?: "none" | "forwards" | "backwards" | "both";
};

/**
 * Génère une string animation CSS complète à partir d'une config
 *
 * @param config - Configuration de l'animation
 * @returns String CSS pour la propriété animation
 *
 * @example
 * getAnimationString({
 *   name: 'fadeIn',
 *   duration: 300,
 *   delay: 100,
 *   easing: 'smooth',
 *   fillMode: 'forwards'
 * })
 * // "fadeIn 300ms cubic-bezier(0.4, 0, 0.2, 1) 100ms forwards"
 */
export const getAnimationString = (config: AnimationConfig): string => {
  const {
    name,
    duration = DURATIONS.base,
    delay = 0,
    easing = "ease",
    iterationCount = 1,
    direction = "normal",
    fillMode = "none",
  } = config;

  const easingValue = EASINGS[easing] || easing;

  const parts = [name, msToCSS(duration), easingValue];

  if (delay > 0) parts.push(msToCSS(delay));
  if (iterationCount !== 1) parts.push(String(iterationCount));
  if (direction !== "normal") parts.push(direction);
  if (fillMode !== "none") parts.push(fillMode);

  return parts.join(" ");
};

/**
 * Hook-like function pour obtenir une valeur de pourcentage
 * Utile pour les barres de progression
 *
 * @param value - Valeur actuelle
 * @param max - Valeur maximum
 * @param decimals - Nombre de décimales (default: 0)
 * @returns Nombre de 0 à 100
 *
 * @example
 * toPercentage(50, 100) // 50
 * toPercentage(1, 3, 2) // 33.33
 */
export const toPercentage = (
  value: number,
  max: number,
  decimals: number = 0,
): number => {
  const percentage = (value / max) * 100;
  return decimals > 0
    ? Number(percentage.toFixed(decimals))
    : Math.round(percentage);
};
