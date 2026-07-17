import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import styles from "./Capabilities.module.css";

const CARDS = [
  { key: "c1", href: "/services" },
  { key: "c2", href: "/services" },
  { key: "c3", href: "/services" },
  { key: "c4", href: "/services" },
  { key: "c5", href: "/certifications" },
] as const;

/** Home "Capabilities" block: 5 index-mono cards (cloud, réseau/infra, web, IA, sécurité offensive). */
export async function Capabilities() {
  const t = await getTranslations("home");

  return (
    <>
      <Reveal>
        <p className={styles.eyebrow}>{t("capabilities.eyebrow")}</p>
        <h2 className={styles.title}>{t("capabilities.title")}</h2>
      </Reveal>

      <Reveal stagger className={styles.grid}>
        {CARDS.map(({ key, href }) => (
          <Link key={key} href={href} className={styles.card}>
            <span className={styles.index} aria-hidden="true">
              {t(`capabilities.${key}.index`)}
            </span>
            <h3 className={styles.cardTitle}>{t(`capabilities.${key}.title`)}</h3>
            <p className={styles.line}>{t(`capabilities.${key}.line`)}</p>
            <span className={styles.arrow} aria-hidden="true">
              &rarr;
            </span>
          </Link>
        ))}
      </Reveal>
    </>
  );
}

export default Capabilities;
