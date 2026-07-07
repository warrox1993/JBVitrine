import React from "react";
import { getTranslations } from "next-intl/server";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Icon } from "@/components/ui/Icon/Icon";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import styles from "./WhySmidjan.module.css";

const SVG = {
  strokeWidth: 1.8,
  fill: "none" as const,
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

const WHY_ICONS: Record<string, React.ReactNode> = {
  local: (
    <svg {...SVG}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  pragmatism: (
    <svg {...SVG}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6a2 2 0 0 0 2.8 2.8l6-6a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.3-.5-.5-2.3 2.5-2.5Z" />
    </svg>
  ),
  partner: (
    <svg {...SVG}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  expert: (
    <svg {...SVG}>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </svg>
  ),
};

const WHY_KEYS = ["local", "pragmatism", "partner", "expert"] as const;

/** "Pourquoi Smidjan" differentiators grid + founder card. */
export async function WhySmidjan() {
  const t = await getTranslations("home");
  return (
    <div className={styles.grid}>
      <Reveal variant="left">
        <Eyebrow onDark className={styles.kickerMono}>{t("why.eyebrow")}</Eyebrow>
        <h2 className={styles.title}>
          {t.rich("why.title", {
            accent: (c) => <span className="accent">{c}</span>,
          })}
        </h2>
        <p className={styles.lead}>
          {t.rich("why.lead", {
            b: (c) => <b>{c}</b>,
          })}
        </p>
        <Reveal stagger className={styles.list}>
          {WHY_KEYS.map((key) => (
            <div key={key} className={styles.item}>
              <div className={styles.ic} aria-hidden="true">
                {WHY_ICONS[key]}
              </div>
              <div>
                <h3>{t(`why.items.${key}.title`)}</h3>
                <p>
                  {t.rich(`why.items.${key}.text`, {
                    b: (c) => <b>{c}</b>,
                  })}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </Reveal>

      <Reveal variant="right" delay={100} className={styles.founder}>
        <div className={`${styles.gridBg} grid-bg`} aria-hidden="true" />
        <div className={styles.top}>
          <div className={styles.avatar} aria-hidden="true">
            JB
          </div>
          <div>
            <h3>{t("why.founderName")}</h3>
            <div className={styles.role}>{t("why.founderRole")}</div>
          </div>
        </div>
        <blockquote className={styles.quote}>{t("why.quote")}</blockquote>
        <ul className={styles.creds}>
          <li>
            <Icon name="check" strokeWidth={2.2} />
            {t("why.cred1")}
          </li>
          <li>
            <Icon name="check" strokeWidth={2.2} />
            {t("why.cred2")}
          </li>
          <li>
            <Icon name="check" strokeWidth={2.2} />
            {t("why.cred3")}
          </li>
        </ul>
      </Reveal>
    </div>
  );
}

export default WhySmidjan;
