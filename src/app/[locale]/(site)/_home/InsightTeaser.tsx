import React from "react";
import { getTranslations, getLocale } from "next-intl/server";
import { Button } from "@/components/ui/Button/Button";
import { Icon } from "@/components/ui/Icon/Icon";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { CONTENT_LAST_VERIFIED } from "@/lib/schema";
import styles from "./InsightTeaser.module.css";

/** Journal / guide teaser: NIS2 & CyFun, links to the on-site guide page. */
export async function InsightTeaser() {
  const t = await getTranslations("home");
  const locale = await getLocale();
  const verifiedDate = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(new Date(CONTENT_LAST_VERIFIED));
  return (
    <div className={styles.card}>
      <Reveal variant="left" className={styles.body}>
        <div className={styles.kick}>{t("insight.kick")}</div>
        <h2>
          {t.rich("insight.title", {
            accent: (c) => <span className="accent">{c}</span>,
          })}
        </h2>
        <p>
          {t.rich("insight.text", {
            b: (c) => <b>{c}</b>,
            date: verifiedDate,
          })}
        </p>
        <Button
          as="a"
          href="/conformite-nis2"
          variant="navy"
          className={styles.cta}
          trailingIcon={<Icon name="arrow-right" strokeWidth={2.2} />}
        >
          {t("insight.cta")}
        </Button>
      </Reveal>
      <Reveal variant="right" delay={100} className={styles.visual}>
        <div className={`${styles.gridBg} grid-bg`} aria-hidden="true" />
        <div className={styles.mock} aria-hidden="true">
          <div className={styles.hd}>
            <div className={styles.tag}>{t("insight.mockTag")}</div>
            <h5>{t("insight.mockTitle")}</h5>
          </div>
          <div className={styles.bd}>
            <div className={styles.bar} />
            <div className={`${styles.bar} ${styles.s}`} />
            <div className={`${styles.bar} ${styles.o}`} />
            <div className={styles.bar} />
            <div className={`${styles.bar} ${styles.s}`} />
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default InsightTeaser;
