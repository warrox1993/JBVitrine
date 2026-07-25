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

            {/* Portrait — real photo of Jean-Baptiste (adds a human face to the CV). */}
            <div className={styles.portrait}>
              <OptimizedImage
                src="/images/jean-baptiste-dhondt.jpg"
                alt={t("founder.portraitAria")}
                width={1080}
                height={1080}
                sizePreset="card"
                aspectRatio="square"
                priority
              />
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
