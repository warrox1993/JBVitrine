import { getTranslations } from "next-intl/server";

import OptimizedImage from "@/components/ui/OptimizedImage";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Icon } from "@/components/ui/Icon/Icon";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { Link } from "@/i18n/navigation";
import styles from "./Fondateur.module.css";

const CREDENTIALS = [
  "credDiploma",
  "credArmy",
  "credExpertise",
  "credReferentials",
] as const;

const SKILL_TAGS = [
  "skillReseaux",
  "skillGRC",
  "skillLinux",
  "skillCyberdefense",
  "skillConformite",
] as const;

/** Chronological steps rendered as a numbered (01–05) journey list. */
const JOURNEY = [
  { key: false, tkey: "Start" },
  { key: false, tkey: "Selftaught" },
  { key: false, tkey: "Training" },
  { key: true, tkey: "Army" },
  { key: false, tkey: "Today" },
] as const;

/** "Le fondateur" - Jean-Baptiste Dhondt profile + professional journey. */
export async function Fondateur() {
  const t = await getTranslations("agence");

  // Resolve each step's copy once; reused by both the numbered <ol> and its
  // sticky year-rail so the two stay perfectly in sync.
  const journeySteps = JOURNEY.map((step, i) => ({
    id: `journey-${step.tkey}`,
    number: String(i + 1).padStart(2, "0"),
    label: t(`founder.step${step.tkey}Label`),
    title: t(`founder.step${step.tkey}Title`),
    text: t(`founder.step${step.tkey}Text`),
    key: step.key,
  }));

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
              {journeySteps.map((step) => (
                <li
                  key={step.id}
                  id={step.id}
                  className={step.key ? styles.key : undefined}
                >
                  <span className={styles.num} aria-hidden="true">
                    {step.number}
                  </span>
                  <div className={styles.entryBody}>
                    <div className={styles.yr}>{step.label}</div>
                    <h4>{step.title}</h4>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link href="/maintenant" className={styles.nowLink}>
              {t("founder.nowLink")}
              <Icon name="arrow-right" size={16} strokeWidth={2.2} />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export default Fondateur;
