import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/ui/Icon/Icon";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import styles from "./ApprocheTeaser.module.css";

/**
 * Home "Approche" block: personal-origin editorial excerpt ("D'où ça vient").
 * Asymmetric band mirroring CyfunTeaser with the sides swapped — a narrow
 * rail (left) carries the excerpt paragraphs + CTA, a wide feature column
 * (right) carries the eyebrow + heading and a decorative quote mark. The
 * heading stays first in markup (sane reading order); only its visual
 * placement flips to the right column via CSS `order`.
 */
export async function ApprocheTeaser() {
  const t = await getTranslations("home");

  return (
    <div className={styles.band}>
      <Reveal variant="right" className={styles.feature}>
        <p className={styles.eyebrow}>{t("approche.eyebrow")}</p>
        <h2 className={styles.title}>{t("approche.title")}</h2>
        <span className={styles.mark} aria-hidden="true">
          <Icon name="quote" size={44} strokeWidth={1.5} />
        </span>
      </Reveal>

      <Reveal variant="left" className={styles.rail}>
        <p className={styles.lead}>{t("approche.p1")}</p>
        <p className={styles.lead}>{t("approche.p2")}</p>
        <Link href="/agence#method" className={styles.cta}>
          {t("approche.cta")}
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </Reveal>
    </div>
  );
}

export default ApprocheTeaser;
