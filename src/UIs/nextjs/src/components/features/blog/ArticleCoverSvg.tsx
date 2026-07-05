import React from "react";

export type ArticleCoverTone = "light" | "dark";

export interface ArticleCoverSvgProps {
  /** Real article category label (from BlogArticle.category). */
  category?: string;
  /** Pixel size (square). Default 64, matching the ArticleCard cover slot. */
  size?: number;
  /**
   * "light" (default): navy/orange line-art for a white/tinted card background.
   * "dark": white/orange line-art for a navy panel background (e.g. FeaturedArticle visual).
   */
  tone?: ArticleCoverTone;
  className?: string;
}

/**
 * Small themed line-art cover illustration keyed by blog category, ported
 * from the "Journal" mockup's per-category `.art-cover` icons. Purely
 * decorative — used as the `cover` slot of `ArticleCard` / `FeaturedArticle`.
 * Does not touch or replace any real article data.
 */
export function ArticleCoverSvg({
  category,
  size = 64,
  tone = "light",
  className,
}: ArticleCoverSvgProps) {
  const stroke = tone === "dark" ? "#ffffff" : "#1c3a63";
  const strokeMuted = tone === "dark" ? "rgba(255,255,255,.45)" : "#c7d0de";
  const fillPlate = tone === "dark" ? "rgba(255,255,255,.08)" : "#ffffff";
  const accent = tone === "dark" ? "#ff9a4d" : "#ff6a00";
  const accentSoft = tone === "dark" ? "rgba(255,154,77,.18)" : "#fff3ea";
  const dark = tone === "dark" ? "rgba(255,255,255,.7)" : "#12294a";

  const content = getContent(category, {
    stroke,
    strokeMuted,
    fillPlate,
    accent,
    accentSoft,
    dark,
  });

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {content}
    </svg>
  );
}

interface Palette {
  stroke: string;
  strokeMuted: string;
  fillPlate: string;
  accent: string;
  accentSoft: string;
  dark: string;
}

function getContent(category: string | undefined, p: Palette): React.ReactNode {
  const key = (category || "").toLowerCase();

  if (key.includes("cyber")) {
    // Shield with a check — cybersécurité.
    return (
      <>
        <path
          d="M32 8l16 6v11c0 10-6.8 19-16 22-9.2-3-16-12-16-22V14l16-6Z"
          fill={p.fillPlate}
          stroke={p.stroke}
          strokeWidth="1.6"
        />
        <path d="M32 8v39" stroke={p.strokeMuted} strokeWidth="1.4" />
        <circle cx="24" cy="26" r="3.2" fill={p.dark} />
        <circle cx="40" cy="26" r="3.2" fill={p.accent} />
      </>
    );
  }

  if (key.includes("automatisation") || key.includes(" ia") || key.startsWith("ia") || key.includes("intelligence")) {
    // Connected nodes — automatisation & IA.
    return (
      <>
        <circle cx="32" cy="14" r="5" fill={p.fillPlate} stroke={p.stroke} strokeWidth="1.6" />
        <circle cx="14" cy="46" r="5" fill={p.fillPlate} stroke={p.stroke} strokeWidth="1.6" />
        <circle cx="50" cy="46" r="5" fill={p.fillPlate} stroke={p.stroke} strokeWidth="1.6" />
        <circle cx="32" cy="34" r="6" fill={p.dark} />
        <path
          d="M32 19v9M18.5 42 28 37M45.5 42 36 37"
          stroke={p.stroke}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="32" cy="34" r="2" fill={p.accent} />
      </>
    );
  }

  if (key.includes("seo") || key.includes("marketing")) {
    // Magnifier over a growth curve — SEO & marketing.
    return (
      <>
        <path
          d="M10 44 22 30l8 8 16-20"
          stroke={p.stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="42" cy="20" r="10" fill={p.fillPlate} stroke={p.stroke} strokeWidth="1.6" />
        <circle cx="42" cy="20" r="4" stroke={p.stroke} strokeWidth="1.3" />
        <path d="M49 27 56 34" stroke={p.accent} strokeWidth="2.4" strokeLinecap="round" />
      </>
    );
  }

  if (key.includes("developpement") || key.includes("développement") || key.includes("dev") || key.includes("web")) {
    // Code brackets — développement web.
    return (
      <>
        <path
          d="M22 20 10 32l12 12M42 20l12 12-12 12"
          stroke={p.stroke}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="26" y="24" width="12" height="16" rx="2.5" fill={p.fillPlate} stroke={p.stroke} strokeWidth="1.6" />
        <path d="M29 24v-3a3 3 0 0 1 6 0v3" stroke={p.stroke} strokeWidth="1.6" />
        <circle cx="32" cy="32" r="1.6" fill={p.accent} />
      </>
    );
  }

  // Fallback — generic document/checklist.
  return (
    <>
      <rect x="16" y="9" width="32" height="46" rx="4" fill={p.fillPlate} stroke={p.stroke} strokeWidth="1.6" />
      <path d="M23 20h18M23 27h18M23 34h11" stroke={p.strokeMuted} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="26" cy="44" r="7" fill={p.accentSoft} stroke={p.accent} strokeWidth="1.6" />
      <path
        d="M23 44l2.2 2.4L29.5 41.6"
        stroke={p.accent}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

export default ArticleCoverSvg;
