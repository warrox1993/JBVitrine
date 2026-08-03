import React from "react";
import styles from "./ProjectCover.module.css";

export type ProjectCoverKey = "clawkwerk" | "site" | "beecuit" | "pdfrunner";

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
  // Au Fil des Saveurs - boutique en ligne : vitrine produits, panier, paiement
  // protégé (cadenas sur la carte) et sélecteur de langues.
  beecuit: (
    <>
      {FRAME}
      <rect x="32" y="56" width="52" height="42" rx="8" fill="rgba(255,255,255,.05)" stroke="var(--on-dark-line)" strokeWidth="1.1" />
      <circle cx="58" cy="73" r="11" fill="none" stroke="var(--orange-on-dark)" strokeWidth="1.4" />
      <rect x="42" y="88" width="32" height="4" rx="2" fill="var(--on-dark-muted)" opacity=".45" />

      <rect x="94" y="56" width="52" height="42" rx="8" fill="rgba(255,255,255,.05)" stroke="var(--on-dark-line)" strokeWidth="1.1" />
      <circle cx="120" cy="73" r="11" fill="none" stroke="var(--on-dark-line)" strokeWidth="1.4" />
      <rect x="104" y="88" width="32" height="4" rx="2" fill="var(--on-dark-muted)" opacity=".3" />

      {/* Panier */}
      <path
        d="M160 62h6l7 30h26l6-20h-33"
        fill="none"
        stroke="var(--orange-on-dark)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="178" cy="99" r="3.2" fill="var(--orange-on-dark)" />
      <circle cx="193" cy="99" r="3.2" fill="var(--orange-on-dark)" />

      {/* Carte bancaire verrouillée */}
      <rect x="32" y="112" width="76" height="34" rx="6" fill="rgba(255,255,255,.045)" stroke="var(--on-dark-line)" strokeWidth="1.1" />
      <line x1="32" y1="122" x2="108" y2="122" stroke="var(--on-dark-line)" strokeWidth="1.2" />
      <rect x="42" y="130" width="24" height="4" rx="2" fill="var(--on-dark-muted)" opacity=".4" />
      <rect x="86" y="127" width="12" height="9" rx="1.6" fill="none" stroke="var(--orange-on-dark)" strokeWidth="1.4" />
      <path d="M89 127v-3a3 3 0 0 1 6 0v3" stroke="var(--orange-on-dark)" strokeWidth="1.3" strokeLinecap="round" />

      {/* Quatre langues */}
      <rect x="122" y="118" width="20" height="11" rx="5.5" fill="none" stroke="var(--orange-on-dark)" strokeWidth="1.3" />
      <rect x="148" y="118" width="20" height="11" rx="5.5" fill="none" stroke="var(--on-dark-line)" strokeWidth="1.3" />
      <rect x="174" y="118" width="20" height="11" rx="5.5" fill="none" stroke="var(--on-dark-line)" strokeWidth="1.3" />
      <rect x="122" y="135" width="20" height="11" rx="5.5" fill="none" stroke="var(--on-dark-line)" strokeWidth="1.3" />
    </>
  ),

  // ConvertPDF - conversion bureautique : document source, flèche, document
  // converti, plus une onde audio pour la transcription locale.
  pdfrunner: (
    <>
      {FRAME}
      <path
        d="M40 58h38l14 14v50H40z"
        fill="rgba(255,255,255,.05)"
        stroke="var(--on-dark-line)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M78 58v14h14" fill="none" stroke="var(--on-dark-line)" strokeWidth="1.2" strokeLinejoin="round" />
      <rect x="50" y="84" width="30" height="4" rx="2" fill="var(--on-dark-muted)" opacity=".45" />
      <rect x="50" y="94" width="22" height="4" rx="2" fill="var(--on-dark-muted)" opacity=".3" />

      <path
        d="M104 90h26m-8-7 8 7-8 7"
        fill="none"
        stroke="var(--orange-on-dark)"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M144 58h38l14 14v50h-52z"
        fill="rgba(255,255,255,.05)"
        stroke="var(--orange-on-dark)"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M182 58v14h14" fill="none" stroke="var(--orange-on-dark)" strokeWidth="1.2" strokeLinejoin="round" />
      <rect x="154" y="84" width="30" height="4" rx="2" fill="var(--orange-on-dark)" opacity=".7" />
      <rect x="154" y="94" width="22" height="4" rx="2" fill="var(--orange-on-dark)" opacity=".45" />

      {/* Onde audio : la transcription locale */}
      <g stroke="var(--on-dark-muted)" strokeWidth="2.2" strokeLinecap="round" opacity=".55">
        <line x1="46" y1="136" x2="46" y2="142" />
        <line x1="56" y1="131" x2="56" y2="147" />
        <line x1="66" y1="127" x2="66" y2="151" />
        <line x1="76" y1="133" x2="76" y2="145" />
        <line x1="86" y1="129" x2="86" y2="149" />
        <line x1="96" y1="135" x2="96" y2="143" />
      </g>
    </>
  ),
};

export default ProjectCover;
