import { getTranslations } from "next-intl/server";

import OptimizedImage from "@/components/ui/OptimizedImage";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Icon } from "@/components/ui/Icon/Icon";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import styles from "./Fondateur.module.css";

const CREDENTIALS = [
  "credDiploma",
  "credArmy",
  "credExpertise",
  "credReferentials",
] as const;

const SKILL_TAGS = [
  "skillReseaux",
  "skillPentest",
  "skillLinux",
  "skillCyberdefense",
  "skillConformite",
] as const;

const JOURNEY = [
  {
    key: false,
    tkey: "Start",
    icon: (
      <>
        <path d="m13 2-3 7h4l-3 7" />
        <path d="M5 12a7 7 0 0 1 14 0" />
      </>
    ),
  },
  {
    key: false,
    tkey: "Selftaught",
    icon: (
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4M7 8l3 2-3 2M13 12h3" />
      </>
    ),
  },
  {
    key: false,
    tkey: "Training",
    icon: (
      <>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </>
    ),
  },
  {
    key: true,
    tkey: "Army",
    icon: (
      <>
        <path d="M12 2 4 5v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3Z" />
        <path d="M12 8v4M12 16h.01" />
      </>
    ),
  },
  {
    key: false,
    tkey: "Today",
    icon: (
      <>
        <path d="M11 3a8 8 0 1 0 8 8" />
        <path d="M21 3l-9 9M21 3v5M21 3h-5" />
        <path d="m6 12 2 2 4-4" />
      </>
    ),
  },
];

/** "Le fondateur" - Jean-Baptiste Dhondt profile + professional journey. */
export async function Fondateur() {
  const t = await getTranslations("agence");
  return (
    <section className={styles.founderSec}>
      <Container>
        <Reveal className={styles.secHead}>
          <Eyebrow className={styles.kickerMono}>{t("founder.eyebrow")}</Eyebrow>
          <h2>
            {t.rich("founder.title", {
              accent: (c) => <span className="accent">{c}</span>,
            })}
          </h2>
          <p>{t("founder.lead")}</p>
        </Reveal>

        <div className={styles.grid}>
          {/* Profile card */}
          <Reveal as="aside" className={styles.profile}>
            <div className={`${styles.gridBg} grid-bg`} aria-hidden="true" />

            {/* Portrait placeholder illustration - to be replaced by a real photo */}
            <div
              className={styles.portrait}
              role="img"
              aria-label={t("founder.portraitAria")}
            >
              <svg viewBox="0 0 300 210" fill="none" aria-hidden="true">
                <circle cx="26" cy="26" r="1.4" fill="#fff" opacity=".14" />
                <circle cx="60" cy="14" r="1.4" fill="#fff" opacity=".14" />
                <circle cx="272" cy="188" r="1.4" fill="#fff" opacity=".14" />
                <circle cx="240" cy="200" r="1.4" fill="#fff" opacity=".14" />
                {/* geometric bust silhouette */}
                <circle cx="150" cy="78" r="42" fill="rgba(255,255,255,.10)" stroke="rgba(255,255,255,.38)" strokeWidth="1.6" />
                <path d="M66 214C66 156 102 128 150 128C198 128 234 156 234 214" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.34)" strokeWidth="1.6" />
                {/* camera / placeholder glyph, subtle */}
                <g opacity=".55" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="132" y="150" width="36" height="26" rx="4" />
                  <path d="M142 150l3-6h10l3 6" />
                  <circle cx="150" cy="163" r="7" />
                </g>
                {/* camera-frame crop ticks */}
                <g stroke="var(--orange-on-dark)" strokeWidth="2" strokeLinecap="round">
                  <path d="M14 30V14h16" />
                  <path d="M286 30V14h-16" />
                  <path d="M14 196v16h16" />
                  <path d="M286 196v16h-16" />
                </g>
              </svg>
              <span className={styles.portraitTag}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m21 15-5-5L5 21" />
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                </svg>
                {t("founder.photoSoon")}
              </span>
            </div>

            <div className={styles.top}>
              <div>
                <h3>{t("founder.name")}</h3>
                <div className={styles.role}>{t("founder.role")}</div>
              </div>
            </div>
            <blockquote className={styles.quote}>{t("founder.quote")}</blockquote>
            <ul className={styles.creds}>
              {CREDENTIALS.map((c) => (
                <li key={c}>
                  <Icon name="check" strokeWidth={2.2} />
                  {t(`founder.${c}`)}
                </li>
              ))}
            </ul>
            <div className={styles.foot}>
              {SKILL_TAGS.map((s) => (
                <span key={s}>{t(`founder.${s}`)}</span>
              ))}
            </div>
            <a
              href={t("founder.linkedinUrl")}
              target="_blank"
              rel="me noopener noreferrer"
              style={{
                display: "inline-flex",
                marginTop: "16px",
                fontWeight: 600,
                fontSize: "0.9rem",
                color: "var(--color-accent, #0b7a5b)",
                textDecoration: "underline",
                textUnderlineOffset: "2px",
              }}
            >
              {t("founder.linkedinLabel")}
            </a>
          </Reveal>

          {/* Narrative + journey */}
          <Reveal as="div" className={styles.narrative} variant="right">
            <Eyebrow className={styles.kickerMono}>{t("founder.journeyEyebrow")}</Eyebrow>
            <h3>
              {t.rich("founder.narrativeTitle", {
                accent: (c) => <span className="accent">{c}</span>,
              })}
            </h3>
            <p className={styles.intro}>{t("founder.intro")}</p>

            {/* Real photo: server infrastructure - technical expertise */}
            <figure className={styles.infraFigure}>
              <OptimizedImage
                src="/images/pages/agence/infrastructure.jpg"
                alt={t("founder.infraAlt")}
                width={1200}
                height={673}
                sizePreset="card"
                className={styles.infraImg}
              />
              <figcaption className={styles.infraCap}>{t("founder.infraCaption")}</figcaption>
            </figure>

            <ol className={styles.journey}>
              {JOURNEY.map((step) => (
                <li key={step.tkey} className={step.key ? styles.key : undefined}>
                  <div className={styles.dot}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {step.icon}
                    </svg>
                  </div>
                  <div className={styles.yr}>{t(`founder.step${step.tkey}Label`)}</div>
                  <h4>{t(`founder.step${step.tkey}Title`)}</h4>
                  <p>{t(`founder.step${step.tkey}Text`)}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export default Fondateur;
