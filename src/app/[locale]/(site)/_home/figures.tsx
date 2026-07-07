import React from "react";
import { getTranslations } from "next-intl/server";

const SANS = "system-ui,sans-serif";
const MONO = "ui-monospace,monospace";

/** Network architecture / defended-perimeter diagram. */
export async function TopologyFigure() {
  const t = await getTranslations("home");
  return (
    <svg
      viewBox="0 0 760 360"
      role="img"
      aria-label={t("fig.topology.aria")}
    >
      <rect x="230" y="20" width="500" height="320" rx="24" fill="#f5f7fa" stroke="#1c3a63" strokeWidth="1.6" strokeDasharray="3 7" />
      <text x="252" y="50" fontSize="11" fontWeight="700" letterSpacing="1.5" fill="#1c3a63" fontFamily={SANS}>{t("fig.topology.perimeter")}</text>

      <path d="M60 195c-19 0-34-14-34-32 0-16 12-29 28-32 4-21 23-37 46-37 22 0 41 14 47 34 17 2 30 16 30 33 0 18-16 34-36 34Z" fill="#ffffff" stroke="#657189" strokeWidth="1.6" strokeLinejoin="round" />
      <text x="30" y="250" fontSize="11" fontWeight="700" letterSpacing="1.5" fill="#657189" fontFamily={SANS}>{t("fig.topology.external")}</text>

      <path d="M490 180 L340 80" stroke="#1c3a63" strokeWidth="2" />
      <path d="M490 180 L640 80" stroke="#1c3a63" strokeWidth="2" />
      <path d="M490 180 L340 290" stroke="#1c3a63" strokeWidth="2" />
      <path d="M490 180 L640 290" stroke="#1c3a63" strokeWidth="2" />

      <path d="M190 175 H202" stroke="#d3dae6" strokeWidth="4" strokeLinecap="round" />
      <path d="M258 175 H430" stroke="#1c3a63" strokeWidth="4" strokeLinecap="round" />

      <path d="M230,143 L258,155 L258,183 C258,205 230,219 230,219 C230,219 202,205 202,183 L202,155 Z" fill="#fff3ea" stroke="#ff6a00" strokeWidth="1.8" />
      <rect x="222" y="178" width="16" height="13" rx="2" fill="none" stroke="#e85f00" strokeWidth="1.8" />
      <path d="M226 178v-6a4 4 0 0 1 8 0v6" fill="none" stroke="#e85f00" strokeWidth="1.8" strokeLinecap="round" />
      <text x="230" y="240" textAnchor="middle" fontSize="10.5" fontWeight="700" letterSpacing="1.2" fill="#e85f00" fontFamily={SANS}>{t("fig.topology.firewall")}</text>

      <rect x="430" y="145" width="120" height="70" rx="12" fill="#0b1f3a" />
      <path d="M448 165h86M448 183h86M448 201h64" stroke="#9fb0c9" strokeWidth="1.6" strokeLinecap="round" />
      <text x="490" y="238" textAnchor="middle" fontSize="10.5" fontWeight="700" letterSpacing="1" fill="#1c3a63" fontFamily={SANS}>{t("fig.topology.internal")}</text>

      <g transform="translate(415,130)">
        <circle r="10" fill="#0b1f3a" />
        <path d="M-4 -1v-2a4 4 0 0 1 8 0v2" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
        <rect x="-4.5" y="-1" width="9" height="7" rx="1.2" fill="#fff" />
      </g>
      <g transform="translate(565,235)">
        <circle r="10" fill="#0b1f3a" />
        <path d="M-4 -1v-2a4 4 0 0 1 8 0v2" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
        <rect x="-4.5" y="-1" width="9" height="7" rx="1.2" fill="#fff" />
      </g>

      <circle cx="340" cy="80" r="32" fill="#ffffff" stroke="#1c3a63" strokeWidth="1.6" />
      <g transform="translate(340,80)" fill="none" stroke="#1c3a63" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="-11" y="-10" width="22" height="15" rx="1.5" />
        <path d="M-15 8h30l3 6h-36z" />
      </g>

      <circle cx="640" cy="80" r="32" fill="#ffffff" stroke="#1c3a63" strokeWidth="1.6" />
      <g transform="translate(640,80)" fill="none" stroke="#1c3a63" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="-8" y="-14" width="16" height="28" rx="3" />
        <path d="M-3 9h6" />
      </g>

      <circle cx="340" cy="290" r="32" fill="#ffffff" stroke="#1c3a63" strokeWidth="1.6" />
      <g transform="translate(340,290)" fill="none" stroke="#1c3a63" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="0" cy="-9" rx="12" ry="4.5" />
        <path d="M-12 -9v16c0 2.5 5.4 4.5 12 4.5s12-2 12-4.5v-16" />
        <path d="M-12 -1c0 2.5 5.4 4.5 12 4.5s12-2 12-4.5" />
      </g>

      <circle cx="640" cy="290" r="32" fill="#ffffff" stroke="#1c3a63" strokeWidth="1.6" />
      <g transform="translate(640,290)" fill="none" stroke="#1c3a63" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="-14" y="-10" width="28" height="18" rx="1.5" />
        <path d="M-5 12h10M0 8v4" />
      </g>
    </svg>
  );
}

/** CyFun audit dashboard: per-domain maturity bars + global score ring. */
export async function AuditDashboardFigure() {
  const t = await getTranslations("home");
  return (
    <svg
      viewBox="0 0 720 320"
      role="img"
      aria-label={t("fig.audit.aria")}
    >
      <text x="30" y="34" fontSize="13" fontWeight="600" fill="#152238" fontFamily={SANS}>{t("fig.audit.governance")}</text>
      <rect x="30" y="42" width="320" height="10" rx="5" fill="#eef2f7" />
      <rect x="30" y="42" width="224" height="10" rx="5" fill="#1c3a63" />
      <text x="360" y="51" fontSize="12" fontWeight="700" fill="#42536b" fontFamily={MONO}>70%</text>

      <text x="30" y="88" fontSize="13" fontWeight="600" fill="#152238" fontFamily={SANS}>{t("fig.audit.access")}</text>
      <rect x="30" y="96" width="320" height="10" rx="5" fill="#eef2f7" />
      <rect x="30" y="96" width="144" height="10" rx="5" fill="#1c3a63" />
      <text x="360" y="105" fontSize="12" fontWeight="700" fill="#42536b" fontFamily={MONO}>45%</text>

      <text x="30" y="142" fontSize="13" fontWeight="600" fill="#152238" fontFamily={SANS}>{t("fig.audit.network")}</text>
      <rect x="30" y="150" width="320" height="10" rx="5" fill="#eef2f7" />
      <rect x="30" y="150" width="288" height="10" rx="5" fill="#1c3a63" />
      <text x="360" y="159" fontSize="12" fontWeight="700" fill="#42536b" fontFamily={MONO}>90%</text>

      <text x="30" y="196" fontSize="13" fontWeight="600" fill="#152238" fontFamily={SANS}>{t("fig.audit.detection")}</text>
      <rect x="30" y="204" width="320" height="10" rx="5" fill="#eef2f7" />
      <rect x="30" y="204" width="208" height="10" rx="5" fill="#1c3a63" />
      <text x="360" y="213" fontSize="12" fontWeight="700" fill="#42536b" fontFamily={MONO}>65%</text>

      <text x="30" y="250" fontSize="13" fontWeight="600" fill="#152238" fontFamily={SANS}>{t("fig.audit.backup")}</text>
      <rect x="30" y="258" width="320" height="10" rx="5" fill="#eef2f7" />
      <rect x="30" y="258" width="272" height="10" rx="5" fill="#1c3a63" />
      <text x="360" y="267" fontSize="12" fontWeight="700" fill="#42536b" fontFamily={MONO}>85%</text>

      <circle cx="560" cy="150" r="90" fill="none" stroke="#eef2f7" strokeWidth="18" />
      <circle cx="560" cy="150" r="90" fill="none" stroke="#ff6a00" strokeWidth="18" strokeLinecap="round" strokeDasharray="463.7 565.5" transform="rotate(-90 560 150)" />
      <text x="560" y="144" textAnchor="middle" fontSize="24" fontWeight="800" fill="#0b1f3a" fontFamily={MONO}>Basic</text>
      <text x="560" y="164" textAnchor="middle" fontSize="12" fill="#657189" fontFamily={SANS}>{t("fig.audit.scoreLabel")}</text>
      <text x="560" y="270" textAnchor="middle" fontSize="11" fill="#657189" fontFamily={SANS}>{t("fig.audit.scoreBasis")}</text>
    </svg>
  );
}

/** Belgium map with Liège located and data hosted in-country. */
export async function BelgiumMapFigure() {
  const t = await getTranslations("home");
  return (
    <svg
      viewBox="0 0 640 360"
      role="img"
      aria-label={t("fig.belgium.aria")}
    >
      <path d="M180,40 L260,35 L300,70 L330,60 L350,110 L320,150 L340,190 L310,230 L330,270 L290,300 L240,285 L210,310 L160,290 L140,250 L100,255 L90,200 L120,170 L100,130 L140,110 L130,70 Z" fill="#eef2f7" stroke="#1c3a63" strokeWidth="1.6" strokeLinejoin="round" />
      <text x="150" y="70" fontSize="11" fontWeight="700" letterSpacing="1.5" fill="#657189" fontFamily={SANS}>{t("fig.belgium.country")}</text>

      <path d="M292 182 L330 150" stroke="#1c3a63" strokeWidth="1.3" />
      <circle cx="280" cy="190" r="14" fill="none" stroke="#ff6a00" strokeWidth="1.6" opacity=".55" />
      <circle cx="280" cy="190" r="7" fill="#ff6a00" />
      <text x="336" y="148" fontSize="14" fontWeight="700" fill="#0b1f3a" fontFamily={SANS}>{t("fig.belgium.city")}</text>
      <text x="336" y="165" fontSize="10.5" fill="#657189" fontFamily={SANS}>{t("fig.belgium.citySub")}</text>

      <path d="M300 195 C355 195 380 195 435 195" fill="none" stroke="#1c3a63" strokeWidth="1.4" strokeDasharray="2 7" strokeLinecap="round" />

      <path d="M500,120 L555,140 L555,200 C555,235 500,258 500,258 C500,258 445,235 445,200 L445,140 Z" fill="#f5f7fa" stroke="#1c3a63" strokeWidth="1.8" />
      <g transform="translate(500,180)" fill="none" stroke="#1c3a63" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="0" cy="-16" rx="22" ry="7" />
        <path d="M-22 -16v20c0 4 10 7 22 7s22-3 22-7v-20" />
        <path d="M-22 -3c0 4 10 7 22 7s22-3 22-7" />
      </g>
      <g transform="translate(517,207)">
        <circle r="12" fill="#0b1f3a" />
        <path d="M-4.5 -1.5v-2.5a4.5 4.5 0 0 1 9 0v2.5" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="-5" y="-1.5" width="10" height="8" rx="1.3" fill="#fff" />
      </g>
      <text x="500" y="285" textAnchor="middle" fontSize="12.5" fontWeight="600" fill="#0b1f3a" fontFamily={SANS}>{t("fig.belgium.hosted")}</text>
      <text x="500" y="302" textAnchor="middle" fontSize="11" fill="#657189" fontFamily={SANS}>{t("fig.belgium.hostedSub")}</text>
    </svg>
  );
}
