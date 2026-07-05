/**
 * Spam Content Detection
 * Detects spam patterns in form submissions
 */

// Common spam keywords
const SPAM_KEYWORDS = [
  // Marketing/Sales spam
  "SEO services",
  "cheap viagra",
  "cialis",
  "crypto",
  "cryptocurrency",
  "bitcoin",
  "forex",
  "make money fast",
  "work from home",
  "get rich",
  "free money",
  "loan",
  "credit card",
  "weight loss",
  "diet pills",

  // Link farming
  "check out my",
  "visit my site",
  "click here",
  "follow this link",
  "download now",

  // Generic spam
  "congratulations you won",
  "claim your prize",
  "limited time offer",
  "act now",
  "call now",
  "exclusive deal",

  // Suspicious patterns
  "prince of nigeria",
  "inheritance",
  "lottery winner",
  "unclaimed funds",
];

/**
 * Check if message contains spam keywords
 * @param text - Text to check
 * @returns true if spam detected, false otherwise
 */
export function containsSpamKeywords(text: string): boolean {
  if (!text || typeof text !== "string") return false;

  const lowerText = text.toLowerCase();
  return SPAM_KEYWORDS.some((keyword) =>
    lowerText.includes(keyword.toLowerCase()),
  );
}

/**
 * Count URLs in text
 * @param text - Text to analyze
 * @returns Number of URLs found
 */
export function countUrls(text: string): number {
  if (!text || typeof text !== "string") return 0;

  // Match http(s):// or www. patterns
  const urlPattern = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/gi;
  const matches = text.match(urlPattern);
  return matches ? matches.length : 0;
}

/**
 * Check for excessive URLs (common in spam)
 * @param text - Text to check
 * @param maxUrls - Maximum allowed URLs (default: 2)
 * @returns true if too many URLs, false otherwise
 */
export function hasExcessiveUrls(text: string, maxUrls: number = 2): boolean {
  return countUrls(text) > maxUrls;
}

/**
 * Check for excessive capitalization (SHOUTING)
 * @param text - Text to check
 * @returns true if excessive caps, false otherwise
 */
export function hasExcessiveCaps(text: string): boolean {
  if (!text || typeof text !== "string" || text.length < 10) return false;

  const letters = text.replace(/[^a-zA-Z]/g, "");
  if (letters.length === 0) return false;

  const caps = text.replace(/[^A-Z]/g, "");
  const capsRatio = caps.length / letters.length;

  // More than 50% capitals is suspicious
  return capsRatio > 0.5;
}

/**
 * Check for repeated characters (spamming technique)
 * @param text - Text to check
 * @returns true if excessive repetition found, false otherwise
 */
export function hasExcessiveRepetition(text: string): boolean {
  if (!text || typeof text !== "string") return false;

  // Check for same character repeated 5+ times
  const repetitionPattern = /(.)\1{4,}/;
  return repetitionPattern.test(text);
}

/**
 * Check message quality (too short, too generic, etc.)
 * @param text - Message text
 * @returns true if low quality, false otherwise
 */
export function isLowQualityMessage(text: string): boolean {
  if (!text || typeof text !== "string") return true;

  const trimmed = text.trim();

  // Too short (less than 30 chars - already validated but double-check)
  if (trimmed.length < 30) return true;

  // Generic messages
  const genericMessages = [
    "hi",
    "hello",
    "test",
    "testing",
    "test message",
    "asdf",
    "qwerty",
    "lorem ipsum",
  ];

  const lowerTrimmed = trimmed.toLowerCase();
  if (genericMessages.some((generic) => lowerTrimmed === generic)) {
    return true;
  }

  // Very few words (< 5 words for a 30+ char message is suspicious)
  const words = trimmed.split(/\s+/).filter((w) => w.length > 0);
  if (words.length < 5) return true;

  return false;
}

/**
 * Comprehensive spam check
 * @param text - Text to check
 * @returns Spam detection result with details
 */
export function checkForSpam(text: string): {
  isSpam: boolean;
  reasons: string[];
  score: number;
} {
  const reasons: string[] = [];
  let score = 0;

  if (containsSpamKeywords(text)) {
    reasons.push("Contient des mots-clés de spam");
    score += 3;
  }

  if (hasExcessiveUrls(text)) {
    reasons.push("Trop de liens");
    score += 2;
  }

  if (hasExcessiveCaps(text)) {
    reasons.push("Majuscules excessives");
    score += 2;
  }

  if (hasExcessiveRepetition(text)) {
    reasons.push("Répétitions excessives");
    score += 2;
  }

  if (isLowQualityMessage(text)) {
    reasons.push("Message de faible qualité");
    score += 1;
  }

  // Spam if score >= 3
  return {
    isSpam: score >= 3,
    reasons,
    score,
  };
}
