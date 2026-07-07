import type { ReactNode } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import styles from "./page.module.css";

/**
 * Inline SVG illustrations for the /services pillars, ported from the
 * approved mockup (page-services.html). Colors reference the shared
 * navy/orange design tokens so they stay in sync with theme changes.
 * Each pillar also renders a real photo (PillarPhoto) alongside its
 * schematic SVG for a more concrete, human illustration.
 */

function VisualBox({ alt, children }: { alt?: boolean; children: ReactNode }) {
  const cn = [styles.visualBox, alt ? styles.visualBoxAlt : ""].filter(Boolean).join(" ");
  return <div className={cn}>{children}</div>;
}

/** Real photo shown above a pillar's SVG schematic, captioned with its one-line promise. */
function PillarPhoto({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: ReactNode;
}) {
  return (
    <div className={styles.photoBox}>
      <Image
        src={src}
        alt={alt}
        width={1400}
        height={933}
        sizes="(max-width: 720px) 100vw, 560px"
        className={styles.photoImg}
      />
      <p className={styles.photoCaption}>{caption}</p>
    </div>
  );
}

/** Pillar 01 - Sécuriser réseaux & infrastructure: firewall filtering traffic into a segmented network. */
export async function SecureVisual({ alt }: { alt?: boolean }) {
  const t = await getTranslations("services.visuals.secure");
  return (
    <Reveal variant="up">
    <VisualBox alt={alt}>
      <svg
        viewBox="0 0 480 250"
        role="img"
        aria-label={t("aria")}
      >
        <rect x="12" y="14" width="456" height="222" rx="16" fill="none" stroke="var(--line-2)" strokeWidth="1.5" strokeDasharray="3 6" />
        <circle cx="58" cy="125" r="30" fill="none" stroke="var(--navy-3)" strokeWidth="1.8" />
        <ellipse cx="58" cy="125" rx="30" ry="12" fill="none" stroke="var(--navy-3)" strokeWidth="1.3" />
        <line x1="58" y1="95" x2="58" y2="155" stroke="var(--navy-3)" strokeWidth="1.3" />
        <line x1="28" y1="125" x2="88" y2="125" stroke="var(--navy-3)" strokeWidth="1.3" />
        <text x="58" y="172" textAnchor="middle" fontSize="11" fill="var(--muted)" fontFamily="var(--sans)">{t("internet")}</text>

        <line x1="92" y1="125" x2="196" y2="125" stroke="var(--slate)" strokeWidth="1.6" strokeDasharray="5 5" />
        <line x1="150" y1="125" x2="150" y2="111" stroke="var(--slate)" strokeWidth="1.4" strokeDasharray="3 4" />
        <circle cx="150" cy="97" r="12" fill="var(--orange-t)" stroke="var(--orange)" strokeWidth="1.8" />
        <line x1="145" y1="92" x2="155" y2="102" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round" />
        <line x1="155" y1="92" x2="145" y2="102" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round" />

        <rect x="205" y="35" width="30" height="180" rx="5" fill="var(--bg-2)" stroke="var(--navy-3)" strokeWidth="2" />
        <line x1="205" y1="65" x2="235" y2="65" stroke="var(--line-2)" strokeWidth="1.3" />
        <line x1="205" y1="95" x2="235" y2="95" stroke="var(--line-2)" strokeWidth="1.3" />
        <line x1="205" y1="125" x2="235" y2="125" stroke="var(--line-2)" strokeWidth="1.3" />
        <line x1="205" y1="155" x2="235" y2="155" stroke="var(--line-2)" strokeWidth="1.3" />
        <line x1="205" y1="185" x2="235" y2="185" stroke="var(--line-2)" strokeWidth="1.3" />
        <g transform="translate(220,125) scale(2.3) translate(-12,-12)" fill="none" stroke="var(--navy)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
          <path d="m9 12 2 2 4-4" />
        </g>
        <text x="220" y="228" textAnchor="middle" fontSize="11" fill="var(--muted)" fontFamily="var(--sans)">{t("firewall")}</text>

        <circle cx="300" cy="125" r="7" fill="var(--navy-3)" />
        <line x1="235" y1="125" x2="293" y2="125" stroke="var(--navy-3)" strokeWidth="2" />
        <line x1="300" y1="125" x2="395" y2="62" stroke="var(--navy-3)" strokeWidth="1.5" />
        <line x1="300" y1="125" x2="395" y2="127" stroke="var(--navy-3)" strokeWidth="1.5" />
        <line x1="300" y1="125" x2="395" y2="192" stroke="var(--navy-3)" strokeWidth="1.5" />

        <rect x="395" y="35" width="75" height="55" rx="6" fill="#fff" stroke="var(--navy-3)" strokeWidth="1.5" />
        <line x1="407" y1="52" x2="458" y2="52" stroke="var(--line-2)" strokeWidth="1.3" />
        <line x1="407" y1="65" x2="458" y2="65" stroke="var(--line-2)" strokeWidth="1.3" />
        <circle cx="407" cy="78" r="2" fill="var(--navy-3)" />

        <rect x="395" y="100" width="75" height="55" rx="6" fill="#fff" stroke="var(--navy-3)" strokeWidth="1.5" />
        <rect x="405" y="108" width="55" height="28" rx="3" fill="none" stroke="var(--line-2)" strokeWidth="1.3" />
        <line x1="413" y1="148" x2="447" y2="148" stroke="var(--navy-3)" strokeWidth="1.5" />

        <rect x="395" y="165" width="75" height="55" rx="6" fill="#fff" stroke="var(--navy-3)" strokeWidth="1.5" />
        <ellipse cx="432" cy="178" rx="25" ry="7" fill="#fff" stroke="var(--line-2)" strokeWidth="1.3" />
        <line x1="407" y1="178" x2="407" y2="202" stroke="var(--line-2)" strokeWidth="1.3" />
        <line x1="457" y1="178" x2="457" y2="202" stroke="var(--line-2)" strokeWidth="1.3" />
        <ellipse cx="432" cy="202" rx="25" ry="7" fill="#fff" stroke="var(--line-2)" strokeWidth="1.3" />

        <text x="432" y="232" textAnchor="middle" fontSize="11" fill="var(--muted)" fontFamily="var(--sans)">{t("internalNetwork")}</text>
      </svg>
    </VisualBox>
    </Reveal>
  );
}

/** Pillar 02 - Tester audits & pentest: an app being probed and consigned into a severity-ranked audit report. */
export async function TestVisual({ alt }: { alt?: boolean }) {
  const t = await getTranslations("services.visuals.test");
  return (
    <Reveal variant="up">
    <PillarPhoto
      src="/images/pages/services/tester-ecrans.jpg"
      alt={t("photoAlt")}
      caption={t.rich("caption", { b: (c) => <b>{c}</b> })}
    />
    <VisualBox alt={alt}>
      <svg
        viewBox="0 0 480 250"
        role="img"
        aria-label={t("aria")}
      >
        <rect x="20" y="30" width="250" height="190" rx="10" fill="var(--bg-2)" stroke="var(--line-2)" strokeWidth="1.5" />
        <rect x="35" y="45" width="220" height="20" rx="4" fill="#fff" stroke="var(--navy-3)" strokeWidth="1.4" />
        <circle cx="45" cy="55" r="3" fill="var(--line-2)" />
        <circle cx="55" cy="55" r="3" fill="var(--line-2)" />
        <circle cx="65" cy="55" r="3" fill="var(--line-2)" />

        <rect x="35" y="80" width="100" height="55" rx="5" fill="#fff" stroke="var(--navy-3)" strokeWidth="1.4" />
        <line x1="45" y1="98" x2="125" y2="98" stroke="var(--line-2)" strokeWidth="1.3" />
        <line x1="45" y1="112" x2="110" y2="112" stroke="var(--line-2)" strokeWidth="1.3" />

        <rect x="145" y="80" width="110" height="55" rx="5" fill="var(--orange-t)" stroke="var(--orange)" strokeWidth="2" strokeDasharray="4 3" />
        <path d="M200 92 L211 111 189 111Z" fill="none" stroke="var(--orange)" strokeWidth="1.7" strokeLinejoin="round" />
        <line x1="200" y1="98" x2="200" y2="104" stroke="var(--orange)" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="200" cy="107.5" r="0.9" fill="var(--orange)" />

        <rect x="35" y="150" width="220" height="55" rx="5" fill="#fff" stroke="var(--navy-3)" strokeWidth="1.4" />
        <line x1="45" y1="168" x2="245" y2="168" stroke="var(--line-2)" strokeWidth="1.3" />
        <line x1="45" y1="185" x2="200" y2="185" stroke="var(--line-2)" strokeWidth="1.3" />

        <circle cx="200" cy="108" r="34" fill="var(--bg-2)" fillOpacity="0.55" stroke="var(--navy)" strokeWidth="2.4" />
        <line x1="224" y1="132" x2="252" y2="160" stroke="var(--navy)" strokeWidth="6" strokeLinecap="round" />

        <text x="145" y="232" textAnchor="middle" fontSize="11" fill="var(--muted)" fontFamily="var(--sans)">{t("appTested")}</text>

        <rect x="290" y="30" width="170" height="190" rx="10" fill="#fff" stroke="var(--line-2)" strokeWidth="1.5" />
        <g transform="translate(305,42) scale(0.7)" fill="none" stroke="var(--navy)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
          <path d="M14 2v6h6M9 15l2 2 4-4" />
        </g>
        <text x="322" y="52" fontSize="12" fill="var(--navy)" fontFamily="var(--sans)" style={{ fontWeight: 700 }}>{t("auditResults")}</text>
        <line x1="305" y1="64" x2="445" y2="64" stroke="var(--line)" strokeWidth="1.2" />

        <path d="M307 79 311 83 318 75" fill="none" stroke="#2f9e6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="326" y="83" fontSize="10.5" fill="var(--slate)" fontFamily="var(--sans)">{t("headers")}</text>

        <path d="M307 107 311 111 318 103" fill="none" stroke="#2f9e6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="326" y="111" fontSize="10.5" fill="var(--slate)" fontFamily="var(--sans)">{t("auth")}</text>

        <path d="M312 128 322 145 302 145Z" fill="none" stroke="var(--orange)" strokeWidth="1.6" strokeLinejoin="round" />
        <line x1="312" y1="134" x2="312" y2="139" stroke="var(--orange)" strokeWidth="1.6" strokeLinecap="round" />
        <text x="326" y="139" fontSize="10.5" fill="var(--orange-d)" fontFamily="var(--sans)" style={{ fontWeight: 700 }}>{t("sqlInjection")}</text>

        <path d="M307 163 311 167 318 159" fill="none" stroke="#2f9e6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="326" y="167" fontSize="10.5" fill="var(--slate)" fontFamily="var(--sans)">{t("tls")}</text>

        <circle cx="308" cy="200" r="4" fill="none" stroke="var(--line-2)" strokeWidth="1.3" />
        <text x="316" y="203" fontSize="9" fill="var(--muted)" fontFamily="var(--sans)">{t("low")}</text>
        <circle cx="356" cy="200" r="4" fill="none" stroke="var(--line-2)" strokeWidth="1.3" />
        <text x="364" y="203" fontSize="9" fill="var(--muted)" fontFamily="var(--sans)">{t("medium")}</text>
        <circle cx="403" cy="200" r="4" fill="var(--orange)" stroke="var(--orange)" strokeWidth="1.3" />
        <text x="411" y="203" fontSize="9" fill="var(--muted)" fontFamily="var(--sans)">{t("critical")}</text>

        <text x="375" y="232" textAnchor="middle" fontSize="11" fill="var(--muted)" fontFamily="var(--sans)">{t("pentestReport")}</text>
      </svg>
    </VisualBox>
    </Reveal>
  );
}

/** Pillar 03 - Développer secure by design: a code editor window with a validated security function. */
export async function DevVisual({ alt }: { alt?: boolean }) {
  const t = await getTranslations("services.visuals.dev");
  return (
    <Reveal variant="up">
    <PillarPhoto
      src="/images/pages/services/developper-architecture.jpg"
      alt={t("photoAlt")}
      caption={t.rich("caption", { b: (c) => <b>{c}</b> })}
    />
    <VisualBox alt={alt}>
      <svg
        viewBox="0 0 480 250"
        role="img"
        aria-label={t("aria")}
      >
        <rect x="40" y="30" width="340" height="190" rx="12" fill="#fff" stroke="var(--navy-3)" strokeWidth="2" />
        <line x1="40" y1="64" x2="380" y2="64" stroke="var(--line)" strokeWidth="1.3" />
        <circle cx="58" cy="47" r="4" fill="var(--line-2)" />
        <circle cx="74" cy="47" r="4" fill="var(--line-2)" />
        <circle cx="90" cy="47" r="4" fill="var(--line-2)" />
        <g transform="translate(338,35) scale(0.55)" fill="none" stroke="var(--navy-3)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m8 6-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" />
        </g>

        <rect x="60" y="82" width="60" height="8" rx="3" fill="var(--navy-3)" />
        <rect x="126" y="82" width="140" height="8" rx="3" fill="var(--line-2)" />
        <rect x="80" y="104" width="40" height="8" rx="3" fill="var(--navy-3)" />
        <rect x="126" y="104" width="170" height="8" rx="3" fill="var(--line-2)" />
        <rect x="80" y="126" width="200" height="8" rx="3" fill="var(--bg-3)" />
        <rect x="80" y="148" width="70" height="8" rx="3" fill="var(--orange)" />
        <rect x="156" y="148" width="110" height="8" rx="3" fill="var(--line-2)" />
        <rect x="60" y="170" width="50" height="8" rx="3" fill="var(--navy-3)" />
        <rect x="116" y="170" width="150" height="8" rx="3" fill="var(--line-2)" />
        <rect x="60" y="192" width="180" height="8" rx="3" fill="var(--bg-3)" />

        <circle cx="350" cy="205" r="30" fill="#fff" stroke="var(--line-2)" strokeWidth="1.5" />
        <g transform="translate(350,205) scale(2.3) translate(-12,-12)" fill="none" stroke="var(--navy)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
          <path d="m9 12 2 2 4-4" />
        </g>

        <text x="240" y="245" textAnchor="middle" fontSize="11" fill="var(--muted)" fontFamily="var(--sans)">{t("securityByDesign")}</text>
      </svg>
    </VisualBox>
    </Reveal>
  );
}

/** Pillar 04 - Se conformer CyFun/NIS2: three ascending tiers (Basic/Important/Essential) reaching a validation mark. */
export async function ComplyVisual({ alt }: { alt?: boolean }) {
  const t = await getTranslations("services.visuals.comply");
  return (
    <Reveal variant="up">
    <PillarPhoto
      src="/images/pages/services/conformer-audit.jpg"
      alt={t("photoAlt")}
      caption={t.rich("caption", { b: (c) => <b>{c}</b> })}
    />
    <VisualBox alt={alt}>
      <svg
        viewBox="0 0 480 226"
        role="img"
        aria-label={t("aria")}
      >
        <rect x="40" y="140" width="110" height="50" rx="8" fill="var(--bg-2)" stroke="var(--line-2)" strokeWidth="1.5" />
        <rect x="175" y="95" width="110" height="95" rx="8" fill="var(--bg-3)" stroke="var(--line-2)" strokeWidth="1.5" />
        <rect x="310" y="45" width="110" height="145" rx="8" fill="var(--orange-t)" stroke="var(--orange)" strokeWidth="2" />

        <g transform="translate(95,165) scale(1.3) translate(-12,-12)" fill="none" stroke="var(--navy-3)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
          <path d="m9 12 2 2 4-4" />
        </g>
        <g transform="translate(230,128) scale(1.5) translate(-12,-12)" fill="none" stroke="var(--navy-3)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
          <path d="m9 12 2 2 4-4" />
        </g>
        <g transform="translate(365,82) scale(1.8) translate(-12,-12)" fill="none" stroke="var(--orange-d)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
          <path d="m9 12 2 2 4-4" />
        </g>

        <path d="M95 140 L230 95 L365 45" fill="none" stroke="var(--line-2)" strokeWidth="1.5" strokeDasharray="4 5" />
        <circle cx="95" cy="140" r="4" fill="var(--success-ink, #2f9e6b)" />
        <circle cx="230" cy="95" r="4" fill="var(--success-ink, #2f9e6b)" />
        <circle cx="365" cy="45" r="4" fill="var(--success-ink, #2f9e6b)" />

        <circle cx="365" cy="22" r="14" fill="var(--orange-t)" stroke="var(--success-ink, #2f9e6b)" strokeWidth="1.8" />
        <path d="M358 22 363 27 372 17" fill="none" stroke="var(--success-ink, #2f9e6b)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        <text x="95" y="207" textAnchor="middle" fontSize="12" fill="var(--muted)" fontFamily="var(--sans)" style={{ fontWeight: 600 }}>Basic</text>
        <text x="230" y="207" textAnchor="middle" fontSize="12" fill="var(--muted)" fontFamily="var(--sans)" style={{ fontWeight: 600 }}>Important</text>
        <text x="365" y="207" textAnchor="middle" fontSize="12" fill="var(--orange-d)" fontFamily="var(--sans)" style={{ fontWeight: 700 }}>Essential</text>
      </svg>
    </VisualBox>
    </Reveal>
  );
}
