import React from "react";
import { getTranslations } from "next-intl/server";
import { Container } from "../../ui/Container";
import { Button } from "../../ui/Button/Button";
import { Icon, IconName } from "../../ui/Icon/Icon";
import styles from "./ServicePillar.module.css";

export interface PillarCapability {
  title: string;
  description: string;
}

export interface PillarAudience {
  /** Small uppercase label, e.g. "Pour qui" or "Quand". */
  label: string;
  text: string;
  icon?: IconName;
}

export interface ServicePillarProps {
  /** Anchor id (e.g. "securiser"). */
  id?: string;
  /** Zero-padded index shown before the kicker (e.g. "01"). */
  index?: string;
  icon: IconName | React.ReactNode;
  kicker: string;
  title: string;
  intro: string;
  /** "Ce que nous mettons en place" capability grid. */
  capabilities: PillarCapability[];
  /** Right panel who/when rows. */
  audience?: PillarAudience[];
  /** "Livrables" checklist. */
  deliverables: string[];
  ctaLabel: string;
  ctaHref: string;
  /** Optional inline SVG figure rendered under the intro. */
  visual?: React.ReactNode;
  /** Alternate (tinted) background - for zebra striping pillars. */
  alt?: boolean;
  className?: string;
}

function isIconName(v: ServicePillarProps["icon"]): v is IconName {
  return typeof v === "string";
}

/** Full-width service pillar with capabilities, audience, deliverables and CTA. */
export async function ServicePillar({
  id,
  index,
  icon,
  kicker,
  title,
  intro,
  capabilities,
  audience = [],
  deliverables,
  ctaLabel,
  ctaHref,
  visual,
  alt,
  className,
}: ServicePillarProps) {
  const cn = [styles.pillar, alt ? styles.alt : "", className].filter(Boolean).join(" ");
  const t = await getTranslations("sharedui");
  return (
    <section id={id} className={cn}>
      <Container>
        <div className={styles.head}>
          <div className={styles.ico}>
            {isIconName(icon) ? <Icon name={icon} strokeWidth={1.7} /> : icon}
          </div>
          <div>
            <div className={styles.kick}>
              {index ? <span className={styles.idx}>{index}</span> : null}
              {index ? " · " : null}
              {kicker}
            </div>
            <h2 className={styles.title}>{title}</h2>
          </div>
        </div>

        <div className={styles.body}>
          <div>
            <p className={styles.intro}>{intro}</p>
            {visual ? <div>{visual}</div> : null}
            <h3 className={styles.subH}>{t("pillar.capabilitiesHead")}</h3>
            <div className={styles.capGrid}>
              {capabilities.map((c) => (
                <div key={c.title} className={styles.cap}>
                  <Icon name="check" strokeWidth={2.4} />
                  <div>
                    <b>{c.title}</b>
                    <span>{c.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className={styles.panel}>
            {audience.length > 0 ? (
              <div className={styles.who}>
                {audience.map((a) => (
                  <div key={a.label} className={styles.whoRow}>
                    <div className={styles.ic}>
                      <Icon name={a.icon ?? "users"} />
                    </div>
                    <div>
                      <b>{a.label}</b>
                      <p>{a.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            <div className={styles.deliver}>
              <h3 className={styles.deliverHead}>
                <Icon name="file-check" />
                {t("pillar.deliverablesHead")}
              </h3>
              <ul>
                {deliverables.map((d) => (
                  <li key={d}>
                    <Icon name="check" strokeWidth={2.4} />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <Button as="a" href={ctaHref} variant="primary" className={styles.cta}>
              {ctaLabel}
              <Icon name="arrow-right" strokeWidth={2.2} />
            </Button>
          </aside>
        </div>
      </Container>
    </section>
  );
}

export default ServicePillar;
