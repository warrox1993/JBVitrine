import React from "react";
import { getTranslations } from "next-intl/server";

/**
 * Inline SVG figures for the Conformité NIS2 / CyFun page.
 * Ported verbatim from the approved mockup (page-cyfun.html).
 * Pure presentational server components, no client JS.
 */

const SANS = "system-ui,-apple-system,Segoe UI,Roboto,sans-serif";
const MONO = "ui-monospace,Menlo,monospace";

/** The six CyFun functions arranged as a continuous clockwise cycle. */
export async function FunctionsRing() {
  const t = await getTranslations("conformite");
  return (
    <svg
      viewBox="0 0 520 460"
      width="520"
      height="460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto" }}
    >
      {/* cycle ring */}
      <circle
        cx="260"
        cy="215"
        r="140"
        stroke="#d3dae6"
        strokeWidth="1.5"
        strokeDasharray="3 8"
        strokeLinecap="round"
      />
      {/* direction chevrons (clockwise) */}
      <g stroke="#c3ccd9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <g transform="translate(400,215) rotate(90)">
          <path d="M-5 -5 L5 0 L-5 5" />
        </g>
        <g transform="translate(330,336) rotate(150)">
          <path d="M-5 -5 L5 0 L-5 5" />
        </g>
        <g transform="translate(190,336) rotate(210)">
          <path d="M-5 -5 L5 0 L-5 5" />
        </g>
        <g transform="translate(120,215) rotate(270)">
          <path d="M-5 -5 L5 0 L-5 5" />
        </g>
        <g transform="translate(190,94) rotate(330)">
          <path d="M-5 -5 L5 0 L-5 5" />
        </g>
      </g>
      <g
        transform="translate(330,94) rotate(30)"
        stroke="#ff6a00"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M-5 -5 L5 0 L-5 5" />
      </g>
      {/* center hub */}
      <circle cx="260" cy="215" r="58" fill="#0b1f3a" />
      <text
        x="260"
        y="209"
        textAnchor="middle"
        fontFamily={SANS}
        fontSize="18"
        fontWeight="800"
        fill="#ffffff"
        letterSpacing="-.01em"
      >
        CyFun
      </text>
      <text
        x="260"
        y="228"
        textAnchor="middle"
        fontFamily={SANS}
        fontSize="9.5"
        fontWeight="600"
        fill="#9fb0c9"
        letterSpacing=".02em"
      >
        aligné NIST CSF
      </text>
      <rect x="248" y="234" width="24" height="2.4" rx="1.2" fill="#ff6a00" />
      {/* nodes */}
      <g fontFamily={SANS} textAnchor="middle">
        {/* Govern (accent) */}
        <circle cx="260" cy="75" r="34" fill="#ffffff" stroke="#ff6a00" strokeWidth="2.2" />
        <text x="260" y="70" fontFamily={MONO} fontSize="9" fontWeight="700" fill="#657189">
          01
        </text>
        <text x="260" y="85" fontSize="12.5" fontWeight="700" fill="#0b1f3a">
          Govern
        </text>
        {/* Identify */}
        <circle cx="381" cy="145" r="34" fill="#ffffff" stroke="#1c3a63" strokeWidth="1.8" />
        <text x="381" y="140" fontFamily={MONO} fontSize="9" fontWeight="700" fill="#657189">
          02
        </text>
        <text x="381" y="155" fontSize="12" fontWeight="700" fill="#0b1f3a">
          Identify
        </text>
        {/* Protect */}
        <circle cx="381" cy="285" r="34" fill="#ffffff" stroke="#1c3a63" strokeWidth="1.8" />
        <text x="381" y="280" fontFamily={MONO} fontSize="9" fontWeight="700" fill="#657189">
          03
        </text>
        <text x="381" y="295" fontSize="12" fontWeight="700" fill="#0b1f3a">
          Protect
        </text>
        {/* Detect */}
        <circle cx="260" cy="355" r="34" fill="#ffffff" stroke="#1c3a63" strokeWidth="1.8" />
        <text x="260" y="350" fontFamily={MONO} fontSize="9" fontWeight="700" fill="#657189">
          04
        </text>
        <text x="260" y="365" fontSize="12" fontWeight="700" fill="#0b1f3a">
          Detect
        </text>
        {/* Respond */}
        <circle cx="139" cy="285" r="34" fill="#ffffff" stroke="#1c3a63" strokeWidth="1.8" />
        <text x="139" y="280" fontFamily={MONO} fontSize="9" fontWeight="700" fill="#657189">
          05
        </text>
        <text x="139" y="295" fontSize="12" fontWeight="700" fill="#0b1f3a">
          Respond
        </text>
        {/* Recover */}
        <circle cx="139" cy="145" r="34" fill="#ffffff" stroke="#1c3a63" strokeWidth="1.8" />
        <text x="139" y="140" fontFamily={MONO} fontSize="9" fontWeight="700" fill="#657189">
          06
        </text>
        <text x="139" y="155" fontSize="12" fontWeight="700" fill="#0b1f3a">
          Recover
        </text>
      </g>
    </svg>
  );
}

/** Circular gauge: Basic already covers ~82% of common attacks. */
export function CoverageGauge({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Jauge de couverture : le niveau Basic couvre déjà environ 82 pour cent des attaques les plus courantes."
    >
      <circle cx="60" cy="60" r="46" stroke="#f1e3d6" strokeWidth="12" />
      <circle
        cx="60"
        cy="60"
        r="46"
        stroke="#ff6a00"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray="237 289"
        transform="rotate(-90 60 60)"
      />
      <text
        x="60"
        y="58"
        textAnchor="middle"
        fontFamily={SANS}
        fontSize="23"
        fontWeight="800"
        fill="#e85f00"
        letterSpacing="-.02em"
      >
        ~82%
      </text>
      <text
        x="60"
        y="76"
        textAnchor="middle"
        fontFamily={SANS}
        fontSize="9.5"
        fontWeight="700"
        fill="#a25518"
        letterSpacing=".1em"
      >
        COUVERT
      </text>
    </svg>
  );
}

/** Ascending step chart: coverage grows with the CyFun level. */
export function LevelsStepChart() {
  return (
    <svg
      viewBox="0 0 660 330"
      width="660"
      height="330"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto" }}
      fontFamily={SANS}
    >
      {/* quasi-complete guide */}
      <line x1="60" y1="62" x2="600" y2="62" stroke="#d3dae6" strokeWidth="1.5" strokeDasharray="4 6" />
      <text x="600" y="57" textAnchor="end" fontSize="11" fontWeight="600" fill="#657189">
        Protection quasi complète
      </text>
      {/* baseline */}
      <line x1="52" y1="252" x2="608" y2="252" stroke="#d3dae6" strokeWidth="1.5" />
      {/* ascending step line connecting bar tops */}
      <path
        d="M140 96 L330 73 L520 64"
        stroke="#1c3a63"
        strokeWidth="1.5"
        strokeDasharray="4 5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="140" cy="96" r="3.5" fill="#1c3a63" />
      <circle cx="330" cy="73" r="3.5" fill="#ff6a00" />
      <circle cx="520" cy="64" r="3.5" fill="#12294a" />
      {/* bars */}
      <rect x="80" y="96" width="120" height="156" rx="7" fill="#eef2f7" stroke="#1c3a63" strokeWidth="1.5" />
      <rect x="270" y="73" width="120" height="179" rx="7" fill="#fff3ea" stroke="#ff6a00" strokeWidth="2" />
      <rect x="460" y="64" width="120" height="188" rx="7" fill="#12294a" stroke="#12294a" strokeWidth="1.5" />
      {/* coverage values */}
      <text x="140" y="122" textAnchor="middle" fontSize="21" fontWeight="800" fill="#1c3a63" letterSpacing="-.02em">
        ~82%
      </text>
      <text x="330" y="102" textAnchor="middle" fontSize="21" fontWeight="800" fill="#e85f00" letterSpacing="-.02em">
        ~94%
      </text>
      <text x="520" y="94" textAnchor="middle" fontSize="21" fontWeight="800" fill="#ffffff" letterSpacing="-.02em">
        ≈100%
      </text>
      <text x="520" y="116" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#9fb0c9">
        quasi complet
      </text>
      {/* names */}
      <text x="140" y="279" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0b1f3a">
        Basic
      </text>
      <text x="330" y="279" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0b1f3a">
        Important
      </text>
      <text x="330" y="295" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#e85f00" letterSpacing=".02em">
        Recommandé PME
      </text>
      <text x="520" y="279" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0b1f3a">
        Essential
      </text>
      {/* level dots */}
      <g>
        <circle cx="129" cy="306" r="3.6" fill="#1c3a63" />
        <circle cx="140" cy="306" r="3.6" fill="#d3dae6" />
        <circle cx="151" cy="306" r="3.6" fill="#d3dae6" />
        <circle cx="319" cy="311" r="3.6" fill="#ff6a00" />
        <circle cx="330" cy="311" r="3.6" fill="#ff6a00" />
        <circle cx="341" cy="311" r="3.6" fill="#d3dae6" />
        <circle cx="509" cy="306" r="3.6" fill="#12294a" />
        <circle cx="520" cy="306" r="3.6" fill="#12294a" />
        <circle cx="531" cy="306" r="3.6" fill="#12294a" />
      </g>
    </svg>
  );
}

/** Four-milestone roadmap from Cadrage to Suivi continu. */
export function Roadmap() {
  return (
    <svg
      viewBox="0 0 720 148"
      width="720"
      height="148"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto" }}
      fontFamily={SANS}
    >
      {/* connecting road */}
      <path d="M90 52 H463" stroke="#d3dae6" strokeWidth="2" strokeLinecap="round" />
      <path d="M463 52 H630" stroke="#ff6a00" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 0" />
      {/* milestones */}
      <g textAnchor="middle">
        {/* 1 */}
        <circle cx="90" cy="52" r="22" fill="#0b1f3a" />
        <text x="90" y="58" fontSize="16" fontWeight="700" fill="#ffffff" fontFamily={MONO}>
          1
        </text>
        <text x="90" y="96" fontSize="12.5" fontWeight="700" fill="#0b1f3a">
          Cadrage
        </text>
        <text x="90" y="113" fontSize="11" fill="#657189">
          &amp; auto-évaluation
        </text>
        {/* 2 */}
        <circle cx="277" cy="52" r="22" fill="#0b1f3a" />
        <text x="277" y="58" fontSize="16" fontWeight="700" fill="#ffffff" fontFamily={MONO}>
          2
        </text>
        <text x="277" y="96" fontSize="12.5" fontWeight="700" fill="#0b1f3a">
          Remédiation
        </text>
        <text x="277" y="113" fontSize="11" fill="#657189">
          analyse d&apos;écart &amp; correctifs
        </text>
        {/* 3 */}
        <circle cx="463" cy="52" r="22" fill="#0b1f3a" />
        <text x="463" y="58" fontSize="16" fontWeight="700" fill="#ffffff" fontFamily={MONO}>
          3
        </text>
        <text x="463" y="96" fontSize="12.5" fontWeight="700" fill="#0b1f3a">
          Vérification
        </text>
        <text x="463" y="113" fontSize="11" fill="#657189">
          support à la soumission
        </text>
        {/* 4 (goal) */}
        <circle cx="630" cy="52" r="22" fill="#ff6a00" />
        <path
          d="M621 52 l6 6 10-12"
          stroke="#ffffff"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x="630" y="96" fontSize="12.5" fontWeight="700" fill="#0b1f3a">
          Suivi continu
        </text>
        <text x="630" y="113" fontSize="11" fill="#657189">
          prêt &amp; maintenu
        </text>
      </g>
    </svg>
  );
}
