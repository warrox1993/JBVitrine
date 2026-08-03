import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon/Icon";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { Section } from "@/components/ui/Section/Section";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { ProcessSteps } from "@/components/shared/ProcessSteps/ProcessSteps";

import styles from "./Demarche.module.css";

const methodStepKeys = ["diagnostic", "priorisation", "remediation", "supervision"] as const;

type ValueItem = {
  icon: IconName;
  title: string;
  text: ReactNode;
  pin?: string;
};

/**
 * "Ma démarche" — philosophy, working method and values. Formerly the standalone
 * /approche page; folded into "À propos" (/agence) so the story lives in one
 * place and the header stays lean. Reads the existing `approche` message
 * namespace so no copy is duplicated or lost.
 */
export async function Demarche() {
  const t = await getTranslations("approche");

  const b = (chunks: ReactNode) => <b>{chunks}</b>;
  const accent = (chunks: ReactNode) => <span className="accent">{chunks}</span>;

  const values: ValueItem[] = [
    {
      icon: "users",
      title: t("why.items.acces.title"),
      text: t("why.items.acces.text"),
      pin: t("why.items.acces.pin"),
    },
    {
      icon: "alert-circle",
      title: t("refs.honestyTitle"),
      text: t.rich("refs.honestyText", { b }),
    },
    {
      icon: "target",
      title: t("why.items.pragmatisme.title"),
      text: t("why.items.pragmatisme.text"),
      pin: t("why.items.pragmatisme.pin"),
    },
    {
      icon: "check",
      title: t("ai.cards.decision.title"),
      text: t("ai.cards.decision.text"),
    },
  ];

  return (
    <>
      {/* ===== Ma façon de travailler ===== */}
      <Section id="demarche" variant="white">
        <Reveal>
          <SectionHeading
            eyebrow={t("philosophy.eyebrow")}
            title={t.rich("philosophy.title", { accent })}
            lead={t.rich("philosophy.lead", { b })}
          />
          <blockquote className={styles.quote}>{t.rich("philosophy.quote", { b })}</blockquote>
        </Reveal>
      </Section>

      {/* ===== Method (4 steps) ===== */}
      <Section variant="tint" id="method">
        <Reveal>
          <SectionHeading
            eyebrow={t("method.eyebrow")}
            title={t.rich("method.title", { accent })}
            lead={t("method.lead")}
          />
        </Reveal>

        <div className={styles.overview}>
          <ProcessSteps
            kicker={t("method.overviewKicker")}
            steps={methodStepKeys.map((key) => ({
              title: t(`steps.${key}.title`),
              description: t(`steps.${key}.kick`),
            }))}
          />
        </div>
      </Section>

      {/* ===== Values ===== */}
      <Section variant="white">
        <Reveal>
          <Eyebrow>{t("why.eyebrow")}</Eyebrow>
          <p className={styles.valuesLead}>{t("why.lead")}</p>
        </Reveal>
        <Reveal as="div" stagger className={styles.whyGrid}>
          {values.map((item) => (
            <div key={item.title} className={styles.whyItem}>
              <div className={styles.whyIcon}>
                <Icon name={item.icon} size={24} />
              </div>
              <div>
                <h3 className={styles.whyTitle}>{item.title}</h3>
                <p className={styles.whyText}>{item.text}</p>
                {item.pin ? (
                  <span className={styles.whyPin}>
                    <Icon name="check" size={14} strokeWidth={2.4} />
                    {item.pin}
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </Reveal>
      </Section>
    </>
  );
}

export default Demarche;
