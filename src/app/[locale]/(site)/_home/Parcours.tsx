import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import styles from "./Parcours.module.css";

type ParcoursItem = {
  period: string;
  title: string;
  desc: string;
};

/**
 * Home "Parcours" block: a scannable index of verifiable career facts,
 * laid out as title-left / year-right rows (no vertical rail/timeline).
 */
export async function Parcours() {
  const t = await getTranslations("home");
  const items = t.raw("parcours.items") as ParcoursItem[];

  return (
    <>
      <Reveal>
        <p className={styles.eyebrow}>{t("parcours.eyebrow")}</p>
        <h2 className={styles.title}>{t("parcours.title")}</h2>
      </Reveal>

      <Reveal stagger className={styles.list}>
        {items.map((item, index) => (
          <div key={`${item.period}-${item.title}`} className={styles.item}>
            <span className={styles.index} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className={styles.itemTitle}>{item.title}</h3>
            <span className={styles.period}>{item.period}</span>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        ))}
      </Reveal>

      <Reveal>
        <p className={styles.certs}>{t("parcours.certs")}</p>
      </Reveal>
    </>
  );
}

export default Parcours;
