import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { social } from "@/config/site";
import styles from "./RecruiterBand.module.css";

/**
 * Home recruiter facts panel: availability/location/focus + direct links.
 * Placed under the hero. Recomposed from a thin single-line strip into a
 * compact standing panel — a small grid of labelled fact cells (mono label +
 * value, each its own tidy card) inside one elevated panel, with a CTA row
 * below. Same content/i18n keys as before, just a tidier, more scannable
 * layout. `dt`/`dd` stay the only children of each `dl` group `div` (valid
 * `<dl>` content model); the availability dot lives inside its `<dd>`.
 */
export async function RecruiterBand() {
  const t = await getTranslations("home");
  const facts = [
    { id: "avail", k: t("recruiter.availK"), v: t("recruiter.availV") },
    { id: "loc", k: t("recruiter.locK"), v: t("recruiter.locV") },
    { id: "focus", k: t("recruiter.focusK"), v: t("recruiter.focusV") },
  ];

  return (
    <section className={styles.band} aria-label={t("recruiter.eyebrow")}>
      <Container>
        <Reveal className={styles.inner}>
          <div className={styles.panel}>
            <p className={styles.eyebrow}>{t("recruiter.eyebrow")}</p>
            <dl className={styles.grid}>
              {facts.map((f) => (
                <div key={f.id} className={styles.cell}>
                  <dt className={styles.k}>{f.k}</dt>
                  <dd className={styles.v}>
                    {f.id === "avail" && <span className={styles.dot} aria-hidden="true" />}
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
            <div className={styles.ctas}>
              <a className={styles.ctaPrimary} href={social.linkedin} target="_blank" rel="noopener noreferrer">
                {t("recruiter.ctaLinkedin")}
              </a>
              <Link className={styles.ctaGhost} href="/cv">
                {t("recruiter.ctaCv")}
              </Link>
              <Link className={styles.ctaGhost} href="/agence">
                {t("recruiter.ctaParcours")}
              </Link>
              <a className={styles.ctaGhost} href={social.github} target="_blank" rel="noopener noreferrer">
                {t("recruiter.ctaGithub")}
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default RecruiterBand;
