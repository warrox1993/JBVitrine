import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import styles from "./RecruiterBand.module.css";

const LINKEDIN = "https://www.linkedin.com/in/jean-baptistedhondt";
const GITHUB = "https://github.com/warrox1993";

/** Home recruiter band: availability/location/focus + direct links. Placed under the hero. */
export async function RecruiterBand() {
  const t = await getTranslations("home");
  const facts = [
    { k: t("recruiter.availK"), v: t("recruiter.availV") },
    { k: t("recruiter.locK"), v: t("recruiter.locV") },
    { k: t("recruiter.focusK"), v: t("recruiter.focusV") },
  ];

  return (
    <section className={styles.band} aria-label={t("recruiter.eyebrow")}>
      <Container>
        <Reveal className={styles.inner}>
          <p className={styles.eyebrow}>{t("recruiter.eyebrow")}</p>
          <dl className={styles.facts}>
            {facts.map((f) => (
              <div key={f.k} className={styles.fact}>
                <dt className={styles.k}>{f.k}</dt>
                <dd className={styles.v}>{f.v}</dd>
              </div>
            ))}
          </dl>
          <div className={styles.ctas}>
            <a className={styles.ctaPrimary} href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              {t("recruiter.ctaLinkedin")}
            </a>
            <Link className={styles.ctaGhost} href="/agence">
              {t("recruiter.ctaParcours")}
            </Link>
            <a className={styles.ctaGhost} href={GITHUB} target="_blank" rel="noopener noreferrer">
              {t("recruiter.ctaGithub")}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default RecruiterBand;
