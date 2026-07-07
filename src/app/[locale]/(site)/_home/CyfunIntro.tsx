import React from "react";
import { getTranslations, getLocale } from "next-intl/server";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Icon } from "@/components/ui/Icon/Icon";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { StatHook } from "@/components/shared";
import { CONTENT_LAST_VERIFIED } from "@/lib/schema";
import styles from "./CyfunIntro.module.css";

/** CyFun flagship intro: explainer + attack-coverage hook + NIS2 deadline card. */
export async function CyfunIntro() {
  const t = await getTranslations("home");
  const locale = await getLocale();
  const verifiedDate = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(new Date(CONTENT_LAST_VERIFIED));
  return (
    <Reveal className={styles.intro}>
      <div>
        <Eyebrow className={styles.kickerMono}>{t("cyfun.eyebrow")}</Eyebrow>
        <h2 className={styles.title}>
          {t.rich("cyfun.title", {
            accent: (c) => <span className="accent">{c}</span>,
          })}
        </h2>
        <p className={styles.lead}>
          {t.rich("cyfun.lead", {
            b: (c) => <b>{c}</b>,
          })}
        </p>
        <StatHook className={styles.hook} value={t("cyfun.hookValue")}>
          {t.rich("cyfun.hook", {
            b: (c) => <b>{c}</b>,
          })}
        </StatHook>
        <p className={styles.sources}>
          {t("cyfun.verified", { date: verifiedDate })} {t("cyfun.sourcesLabel")}{" "}
          <a
            href="https://ccb.belgium.be/fr/cyberfundamentals-framework"
            target="_blank"
            rel="noopener noreferrer"
          >
            CyberFundamentals (CCB)
          </a>
          {" · "}
          <a
            href="https://eur-lex.europa.eu/eli/dir/2022/2555/oj"
            target="_blank"
            rel="noopener noreferrer"
          >
            Directive NIS2 (EUR-Lex)
          </a>
        </p>
      </div>

      <aside className={styles.deadline}>
        <div className={styles.row}>
          <div className={styles.cal}>
            <span className={styles.m}>{t("cyfun.calMonth")}</span>
            <span className={styles.d}>{t("cyfun.calDay")}</span>
            <span className={styles.y}>{t("cyfun.calYear")}</span>
          </div>
          <div>
            <h3>{t("cyfun.deadlineTitle")}</h3>
            <p>{t("cyfun.deadlineText")}</p>
          </div>
        </div>
        <div className={styles.fine}>
          <Icon name="alert-circle" />
          <span>{t("cyfun.fine")}</span>
        </div>
      </aside>
    </Reveal>
  );
}

export default CyfunIntro;
