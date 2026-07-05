import React from "react";
import { Icon, IconName } from "../../ui/Icon/Icon";
import { LinkMore } from "../../ui/LinkMore/LinkMore";
import styles from "./ServiceCard.module.css";

export interface ServiceCardProps {
  /** Named icon, or a custom node rendered inside the navy tile. */
  icon: IconName | React.ReactNode;
  /** Small orange uppercase kicker (e.g. "Sécuriser"). */
  kicker?: string;
  title: string;
  description: string;
  /** Short bullet list (capabilities). */
  bullets?: string[];
  /** Optional "En savoir plus" link. */
  href?: string;
  linkLabel?: string;
  className?: string;
}

function isIconName(v: ServiceCardProps["icon"]): v is IconName {
  return typeof v === "string";
}

/** Compact service card used in the home + services grids. */
export function ServiceCard({
  icon,
  kicker,
  title,
  description,
  bullets,
  href,
  linkLabel = "En savoir plus",
  className,
}: ServiceCardProps) {
  const cn = [styles.svc, className].filter(Boolean).join(" ");
  return (
    <article className={cn}>
      <div className={styles.ico}>{isIconName(icon) ? <Icon name={icon} strokeWidth={1.7} /> : icon}</div>
      {kicker ? <div className={styles.kick}>{kicker}</div> : null}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{description}</p>
      {bullets && bullets.length > 0 ? (
        <ul className={styles.list}>
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      ) : null}
      {href ? (
        <LinkMore href={href} className={styles.more}>
          {linkLabel}
        </LinkMore>
      ) : null}
    </article>
  );
}

export default ServiceCard;
