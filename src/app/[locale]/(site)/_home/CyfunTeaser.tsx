import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/ui/Icon/Icon";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import styles from "./CyfunTeaser.module.css";

const BENEFITS = ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8"] as const;

/**
 * Home "CyFun" flagship-project teaser.
 * Asymmetric band: a wide feature column (left) carries the eyebrow +
 * heading and the 8-point benefits panel (the visual/graphic device); a
 * narrow rail (right) carries the supporting lead paragraph, the honesty
 * note and the CTA. ApprocheTeaser mirrors this band with the wide/narrow
 * sides swapped, so the two home teasers alternate down the page.
 * Renders ONLY the publishable i18n strings (see Global Constraints).
 * Do not add any internal implementation detail here beyond the
 * benefits already exposed through the `cyfun.*` messages.
 */
export async function CyfunTeaser() {
  const t = await getTranslations("home");

  return (
    <div className={styles.band}>
      <div className={styles.feature}>
        <Reveal variant="left">
          <p className={styles.eyebrow}>{t("cyfun.eyebrow")}</p>
          <h2 className={styles.title}>{t("cyfun.title")}</h2>
        </Reveal>

        <Reveal stagger className={styles.grid}>
          {BENEFITS.map((key) => (
            <div key={key} className={styles.item}>
              <span className={styles.check} aria-hidden="true">
                <Icon name="check" size={16} strokeWidth={2.4} />
              </span>
              <span>{t(`cyfun.${key}`)}</span>
            </div>
          ))}
        </Reveal>
      </div>

      <div className={styles.rail}>
        <Reveal variant="right">
          <p className={styles.lead}>{t("cyfun.lead")}</p>
        </Reveal>

        <Reveal variant="right" className={styles.honesty}>
          <p>{t("cyfun.honesty")}</p>
        </Reveal>

        <Reveal variant="right">
          <Link href="/conformite-nis2#methode-audit" className={styles.cta}>
            {t("cyfun.cta")}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </Reveal>
      </div>
    </div>
  );
}

export default CyfunTeaser;
