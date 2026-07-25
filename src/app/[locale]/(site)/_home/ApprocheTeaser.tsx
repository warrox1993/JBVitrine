import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import styles from "./ApprocheTeaser.module.css";

/** Home "Approche" block: centered editorial excerpt ("D'où ça vient") + link to the full page. */
export async function ApprocheTeaser() {
  const t = await getTranslations("home");

  return (
    <Reveal className={styles.inner}>
      <p className={styles.eyebrow}>{t("approche.eyebrow")}</p>
      <h2 className={styles.title}>{t("approche.title")}</h2>
      <p className={styles.lead}>{t("approche.p1")}</p>
      <p className={styles.lead}>{t("approche.p2")}</p>
      <Link href="/agence#method" className={styles.cta}>
        {t("approche.cta")}
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </Reveal>
  );
}

export default ApprocheTeaser;
