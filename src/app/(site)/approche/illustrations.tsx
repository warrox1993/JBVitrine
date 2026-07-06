/**
 * Decorative inline SVG illustrations for the /approche page.
 * Ported from the approved corporate mockup (page-approche.html).
 * All are purely decorative - aria-hidden, no semantic content.
 */

/** Method roadmap: 4 milestone nodes connected by a dashed path. */
export function RoadmapIllustration() {
  return (
    <svg viewBox="0 0 1160 232" fill="none" aria-hidden="true">
      <path
        d="M130 160 L430 124 L730 88 L1030 52"
        stroke="#d3dae6"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="1 14"
      />
      <path
        d="M1030 52 L1096 32"
        stroke="#d3dae6"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="1 10"
        markerEnd="url(#rm-arrow)"
      />
      <defs>
        <marker
          id="rm-arrow"
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="6.5"
          markerHeight="6.5"
          orient="auto-start-reverse"
        >
          <path d="M1 1 L9 5 L1 9Z" fill="#9fb0c9" />
        </marker>
      </defs>

      {/* Node 1 : Diagnostic */}
      <circle
        cx="130"
        cy="160"
        r="32"
        fill="#ffffff"
        stroke="#0b1f3a"
        strokeWidth="2"
        style={{ filter: "drop-shadow(0 6px 10px rgba(11,31,58,.16))" }}
      />
      <g transform="translate(119,149)" stroke="#0b1f3a" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </g>
      <text x="130" y="218" textAnchor="middle" fontFamily="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" fontSize="14.5" fontWeight="700" fill="#0b1f3a">
        Diagnostic
      </text>

      {/* Node 2 : Priorisation */}
      <circle
        cx="430"
        cy="124"
        r="32"
        fill="#ffffff"
        stroke="#0b1f3a"
        strokeWidth="2"
        style={{ filter: "drop-shadow(0 6px 10px rgba(11,31,58,.16))" }}
      />
      <g transform="translate(419,113)" stroke="#0b1f3a" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 4h18M3 11h13M3 18h8" />
      </g>
      <text x="430" y="182" textAnchor="middle" fontFamily="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" fontSize="14.5" fontWeight="700" fill="#0b1f3a">
        Priorisation
      </text>

      {/* Node 3 : Remédiation */}
      <circle
        cx="730"
        cy="88"
        r="32"
        fill="#ffffff"
        stroke="#0b1f3a"
        strokeWidth="2"
        style={{ filter: "drop-shadow(0 6px 10px rgba(11,31,58,.16))" }}
      />
      <g transform="translate(719,77)" stroke="#0b1f3a" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6a2 2 0 0 0 2.8 2.8l6-6a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.3-.5-.5-2.3 2.5-2.5Z" />
      </g>
      <text x="730" y="146" textAnchor="middle" fontFamily="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" fontSize="14.5" fontWeight="700" fill="#0b1f3a">
        Remédiation
      </text>

      {/* Node 4 : Supervision & suivi */}
      <circle
        cx="1030"
        cy="52"
        r="32"
        fill="#ff6a00"
        stroke="#ff6a00"
        strokeWidth="2"
        style={{ filter: "drop-shadow(0 8px 14px rgba(255,106,0,.35))" }}
      />
      <g transform="translate(1019,41)" stroke="#ffffff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
        <circle cx="12" cy="12" r="3" />
      </g>
      <text x="1030" y="110" textAnchor="middle" fontFamily="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" fontSize="14.5" fontWeight="700" fill="#0b1f3a">
        Supervision
      </text>
    </svg>
  );
}

/** Audit report checklist + verification seal - "proof, not promises". */
export function ProofVisual() {
  return (
    <svg viewBox="0 0 560 232" fill="none" aria-hidden="true">
      <rect x="16" y="16" width="528" height="200" rx="16" fill="#ffffff" stroke="#d3dae6" strokeWidth="1.5" />
      <rect x="40" y="40" width="20" height="20" rx="4" fill="#0b1f3a" />
      <path d="M46 50h8M46 55h8" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="72" y="42" width="150" height="10" rx="5" fill="#0b1f3a" />
      <rect x="72" y="58" width="96" height="7" rx="3.5" fill="#d3dae6" />
      <line x1="40" y1="80" x2="520" y2="80" stroke="#e2e7ef" strokeWidth="1.5" />

      <g>
        <rect x="40" y="98" width="18" height="18" rx="5" fill="#0b1f3a" />
        <path d="M45 107l3.2 3.2L54 104" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="70" y="103" width="300" height="8" rx="4" fill="#eef2f7" stroke="#e2e7ef" />
      </g>
      <g>
        <rect x="40" y="130" width="18" height="18" rx="5" fill="#0b1f3a" />
        <path d="M45 139l3.2 3.2L54 136" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="70" y="135" width="260" height="8" rx="4" fill="#eef2f7" stroke="#e2e7ef" />
      </g>
      <g>
        <rect x="40" y="162" width="18" height="18" rx="5" fill="#0b1f3a" />
        <path d="M45 171l3.2 3.2L54 168" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="70" y="167" width="320" height="8" rx="4" fill="#eef2f7" stroke="#e2e7ef" />
      </g>

      {/* Verification seal: the single orange accent */}
      <circle cx="482" cy="188" r="30" fill="#ffffff" stroke="#ff6a00" strokeWidth="2.5" />
      <circle cx="482" cy="188" r="23" fill="none" stroke="#ff6a00" strokeWidth="1.2" strokeDasharray="3 4" opacity=".65" />
      <path d="M469 188l8.5 8.5L497 176" stroke="#e85f00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Human expert + AI node, connected by a verified-outcome shield. */
export function AiIllustration() {
  return (
    <svg viewBox="0 0 900 250" fill="none" aria-hidden="true">
      {/* Human figure (left) */}
      <circle cx="180" cy="86" r="27" stroke="#dfe7f2" strokeWidth="2" fill="rgba(255,255,255,.04)" />
      <path
        d="M126 214c0-52 24-84 54-84s54 32 54 84"
        stroke="#dfe7f2"
        strokeWidth="2"
        fill="rgba(255,255,255,.04)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Connector: human -> shield */}
      <line x1="238" y1="140" x2="405" y2="140" stroke="rgba(255,255,255,.28)" strokeWidth="1.6" strokeDasharray="1 9" strokeLinecap="round" />
      <circle cx="295" cy="140" r="3" fill="#ff9a4d" />
      <circle cx="345" cy="140" r="3" fill="#ff9a4d" opacity=".6" />

      {/* Shared shield (verified outcome) */}
      <g transform="translate(420,104)">
        <path d="M30 4 6 12v18c0 22 14 34 24 40 10-6 24-18 24-40V12L30 4Z" stroke="#ff9a4d" strokeWidth="2" fill="rgba(255,106,0,.12)" strokeLinejoin="round" />
        <path d="M20 32l7 7 13-15" stroke="#ff9a4d" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Connector: shield -> AI node */}
      <line x1="495" y1="140" x2="662" y2="140" stroke="rgba(255,255,255,.28)" strokeWidth="1.6" strokeDasharray="1 9" strokeLinecap="round" />
      <circle cx="555" cy="140" r="3" fill="#ff9a4d" opacity=".6" />
      <circle cx="605" cy="140" r="3" fill="#ff9a4d" />

      {/* AI node (right): hexagon with a small internal network */}
      <path d="M720 86 764 111 764 161 720 186 676 161 676 111Z" stroke="#dfe7f2" strokeWidth="2" fill="rgba(255,255,255,.04)" strokeLinejoin="round" />
      <circle cx="720" cy="136" r="6" fill="#dfe7f2" />
      <circle cx="700" cy="118" r="3.4" fill="#dfe7f2" opacity=".8" />
      <circle cx="742" cy="122" r="3.4" fill="#dfe7f2" opacity=".8" />
      <circle cx="704" cy="156" r="3.4" fill="#dfe7f2" opacity=".8" />
      <line x1="720" y1="136" x2="700" y2="118" stroke="#dfe7f2" strokeWidth="1.3" />
      <line x1="720" y1="136" x2="742" y2="122" stroke="#dfe7f2" strokeWidth="1.3" />
      <line x1="720" y1="136" x2="704" y2="156" stroke="#dfe7f2" strokeWidth="1.3" />
    </svg>
  );
}
