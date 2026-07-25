import React from "react";
import styles from "./ProjectCover.module.css";

export type ProjectCoverKey = "clawkwerk" | "formcraft" | "site" | "secapp";

export interface ProjectCoverProps {
  projectKey: ProjectCoverKey;
  className?: string;
}

/**
 * Abstract, cyber-flavoured "cover" graphic for a project case-study band.
 * The projects have no photography, so each one gets a themed inline-SVG
 * line-art glyph drawn on a navy plate (mirrors FeaturedArticle's visual
 * panel + WhoamiTerminal/Fondateur's on-dark line-art language): a terminal
 * for the CLI audit tool, chained/typed nodes for the form-builder library,
 * a hardened multilingual browser for this site, and a target/shield for
 * the security exercises. Purely decorative - no real screenshots implied.
 */
export function ProjectCover({ projectKey, className }: ProjectCoverProps) {
  const cn = [styles.panel, className].filter(Boolean).join(" ");
  return (
    <div className={cn} aria-hidden="true">
      <div className={`${styles.gridBg} grid-bg`} />
      <svg className={styles.art} viewBox="0 0 240 170" fill="none">
        {GLYPHS[projectKey]}
      </svg>
    </div>
  );
}

/** Shared "device" chrome: outer plate + traffic-light dots + header rule. */
const FRAME = (
  <>
    <rect
      x="14"
      y="16"
      width="212"
      height="138"
      rx="14"
      fill="rgba(255,255,255,.035)"
      stroke="var(--on-dark-line)"
      strokeWidth="1.3"
    />
    <circle cx="30" cy="32" r="3" fill="var(--on-dark-line)" />
    <circle cx="40" cy="32" r="3" fill="var(--on-dark-line)" />
    <circle cx="50" cy="32" r="3" fill="var(--on-dark-line)" />
    <line x1="14" y1="42" x2="226" y2="42" stroke="var(--on-dark-line)" strokeWidth="1.2" />
  </>
);

const GLYPHS: Record<ProjectCoverKey, React.ReactNode> = {
  // ClawkWerk - CLI audit tool: terminal prompt + scan output + verified badge.
  clawkwerk: (
    <>
      {FRAME}
      <path
        d="M32 66 L40 74 L32 82"
        stroke="var(--orange-on-dark)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="50" y="70" width="90" height="6" rx="3" fill="var(--on-dark-muted)" opacity=".55" />
      <rect x="32" y="90" width="70" height="6" rx="3" fill="var(--on-dark-muted)" opacity=".35" />
      <rect x="32" y="108" width="52" height="6" rx="3" fill="var(--orange-on-dark)" />
      <rect x="88" y="107" width="7" height="8" rx="1.5" fill="var(--orange-on-dark)" className={styles.cursor} />
      <circle cx="192" cy="118" r="22" fill="var(--navy-3)" stroke="var(--orange-on-dark)" strokeWidth="1.6" />
      <path
        d="m182 118 6 6 12-13"
        stroke="var(--orange-on-dark)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  // FormCraft - typed form-builder: fields chaining into typed API nodes.
  formcraft: (
    <>
      {FRAME}
      <rect
        x="32"
        y="60"
        width="96"
        height="10"
        rx="5"
        fill="rgba(255,255,255,.07)"
        stroke="var(--on-dark-line)"
        strokeWidth="1.1"
      />
      <rect
        x="32"
        y="80"
        width="74"
        height="10"
        rx="5"
        fill="rgba(255,255,255,.07)"
        stroke="var(--on-dark-line)"
        strokeWidth="1.1"
      />
      <rect x="32" y="100" width="14" height="14" rx="3" fill="none" stroke="var(--orange-on-dark)" strokeWidth="1.8" />
      <path
        d="M35 107 l4 4 l7 -8"
        stroke="var(--orange-on-dark)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="54" y="104" width="50" height="6" rx="3" fill="var(--on-dark-muted)" opacity=".45" />
      <path
        d="M128 65 C 152 65 152 92 174 92"
        stroke="var(--orange-on-dark)"
        strokeWidth="1.6"
        strokeDasharray="2 5"
        strokeLinecap="round"
      />
      <circle cx="182" cy="92" r="10" fill="var(--navy-3)" stroke="var(--orange-on-dark)" strokeWidth="1.6" />
      <circle cx="182" cy="92" r="3" fill="var(--orange-on-dark)" />
      <path
        d="M106 85 C 148 85 148 60 190 60"
        stroke="var(--on-dark-line)"
        strokeWidth="1.4"
        strokeDasharray="2 5"
        strokeLinecap="round"
      />
      <circle cx="196" cy="60" r="7" fill="var(--navy-3)" stroke="var(--on-dark-line)" strokeWidth="1.4" />
    </>
  ),
  // This site - hardened, multilingual: address bar + lock + globe + locales.
  site: (
    <>
      {FRAME}
      <rect
        x="32"
        y="56"
        width="150"
        height="14"
        rx="7"
        fill="rgba(255,255,255,.06)"
        stroke="var(--on-dark-line)"
        strokeWidth="1.1"
      />
      <rect x="42" y="60" width="8" height="6" rx="1.5" fill="none" stroke="var(--orange-on-dark)" strokeWidth="1.4" />
      <path d="M44 60v-2a2 2 0 0 1 4 0v2" stroke="var(--orange-on-dark)" strokeWidth="1.3" strokeLinecap="round" />
      <rect x="58" y="61.5" width="90" height="3" rx="1.5" fill="var(--on-dark-muted)" opacity=".5" />

      <rect
        x="32"
        y="82"
        width="80"
        height="46"
        rx="8"
        fill="rgba(255,255,255,.045)"
        stroke="var(--on-dark-line)"
        strokeWidth="1.1"
      />
      <rect x="42" y="93" width="52" height="5" rx="2.5" fill="var(--on-dark-muted)" opacity=".45" />
      <rect x="42" y="105" width="38" height="5" rx="2.5" fill="var(--on-dark-muted)" opacity=".3" />
      <rect x="42" y="116" width="46" height="5" rx="2.5" fill="var(--orange-on-dark)" opacity=".85" />

      <rect
        x="120"
        y="82"
        width="86"
        height="46"
        rx="8"
        fill="rgba(255,255,255,.045)"
        stroke="var(--on-dark-line)"
        strokeWidth="1.1"
      />
      <circle cx="163" cy="105" r="16" fill="none" stroke="var(--orange-on-dark)" strokeWidth="1.4" />
      <line x1="147" y1="105" x2="179" y2="105" stroke="var(--orange-on-dark)" strokeWidth="1.2" />
      <ellipse cx="163" cy="105" rx="6.5" ry="16" fill="none" stroke="var(--orange-on-dark)" strokeWidth="1.2" />

      <rect x="32" y="136" width="22" height="12" rx="6" fill="none" stroke="var(--orange-on-dark)" strokeWidth="1.4" />
      <rect x="60" y="136" width="22" height="12" rx="6" fill="none" stroke="var(--on-dark-line)" strokeWidth="1.4" />
      <rect x="88" y="136" width="22" height="12" rx="6" fill="none" stroke="var(--on-dark-line)" strokeWidth="1.4" />
    </>
  ),
  // Security exercises - OWASP remediation: vulnerable line struck out, target/shield fix.
  secapp: (
    <>
      {FRAME}
      <rect x="32" y="58" width="94" height="6" rx="3" fill="var(--on-dark-muted)" opacity=".5" />
      <rect x="32" y="72" width="70" height="6" rx="3" fill="var(--on-dark-muted)" opacity=".35" />
      <rect x="32" y="86" width="82" height="6" rx="3" fill="var(--color-danger)" opacity=".85" />
      <line x1="30" y1="89" x2="118" y2="89" stroke="var(--color-danger)" strokeWidth="1.6" />
      <rect x="32" y="100" width="58" height="6" rx="3" fill="var(--on-dark-muted)" opacity=".3" />

      <circle cx="176" cy="108" r="34" fill="var(--navy-3)" stroke="var(--orange-on-dark)" strokeWidth="1.6" />
      <circle cx="176" cy="108" r="22" fill="none" stroke="var(--orange-on-dark)" strokeWidth="1.2" opacity=".55" />
      <circle cx="176" cy="108" r="11" fill="none" stroke="var(--orange-on-dark)" strokeWidth="1.2" opacity=".8" />
      <path
        d="m167 108 6 6 13-14"
        stroke="var(--orange-on-dark)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
};

export default ProjectCover;
