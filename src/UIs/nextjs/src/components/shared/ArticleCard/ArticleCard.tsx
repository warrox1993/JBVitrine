import React from "react";
import Link from "next/link";
import { Icon } from "../../ui/Icon/Icon";
import { LinkMore } from "../../ui/LinkMore/LinkMore";
import styles from "./ArticleCard.module.css";

export interface ArticleCardProps {
  title: string;
  href: string;
  /** Category label shown as the orange kicker. */
  category?: string;
  excerpt?: string;
  /** Formatted publication date (e.g. "20 juin 2026"). */
  date?: string;
  /** Reading time label (e.g. "7 min"). */
  readingTime?: string;
  /** Optional decorative cover graphic (inline SVG). */
  cover?: React.ReactNode;
  linkLabel?: string;
  className?: string;
}

/** Journal / related-articles card. */
export function ArticleCard({
  title,
  href,
  category,
  excerpt,
  date,
  readingTime,
  cover,
  linkLabel = "Lire",
  className,
}: ArticleCardProps) {
  const cn = [styles.card, className].filter(Boolean).join(" ");
  return (
    <article className={cn}>
      {cover ? <div className={styles.cover}>{cover}</div> : null}
      {category ? <div className={styles.kick}>{category}</div> : null}
      <h3 className={styles.title}>
        <Link href={href}>{title}</Link>
      </h3>
      {excerpt ? <p className={styles.excerpt}>{excerpt}</p> : null}
      {date || readingTime ? (
        <div className={styles.meta}>
          {date ? (
            <span>
              <Icon name="calendar" />
              {date}
            </span>
          ) : null}
          {readingTime ? (
            <span>
              <Icon name="clock" />
              {readingTime}
            </span>
          ) : null}
        </div>
      ) : null}
      <LinkMore href={href} className={styles.more}>
        {linkLabel}
      </LinkMore>
    </article>
  );
}

export default ArticleCard;
