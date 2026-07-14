import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import styles from "./Parcours.module.css";

type ParcoursItem = {
  period: string;
  title: string;
  desc: string;
};

/** Home "Parcours" block: vertical timeline of verifiable career facts. */
export async function Parcours() {
  const t = await getTranslations("home");
  const items = t.raw("parcours.items") as ParcoursItem[];

  return (
    <div className={styles.wrap}>
      <Reveal>
        <p className={styles.eyebrow}>{t("parcours.eyebrow")}</p>
        <h2 className={styles.title}>{t("parcours.title")}</h2>
      </Reveal>

      <Reveal stagger className={styles.timeline}>
        {items.map((item) => (
          <div key={`${item.period}-${item.title}`} className={styles.item}>
            <span className={styles.period}>{item.period}</span>
            <h3 className={styles.itemTitle}>{item.title}</h3>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        ))}
      </Reveal>

      <Reveal>
        <p className={styles.certs}>{t("parcours.certs")}</p>
      </Reveal>
    </div>
  );
}

export default Parcours;
