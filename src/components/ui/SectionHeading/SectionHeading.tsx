import React from "react";
import { Eyebrow } from "../Eyebrow/Eyebrow";
import styles from "./SectionHeading.module.css";

export interface SectionHeadingProps {
  /** Orange kicker text above the title. */
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  /** Optional descriptive paragraph below the title. */
  lead?: React.ReactNode;
  /** Heading level for the title (default h2). */
  as?: "h1" | "h2" | "h3";
  center?: boolean;
  /** Style for navy backgrounds (white title, muted lead, tinted eyebrow). */
  onDark?: boolean;
  id?: string;
  className?: string;
}

/** Standard section header: eyebrow kicker, title and optional lead. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  as = "h2",
  center,
  onDark,
  id,
  className,
}: SectionHeadingProps) {
  const Tag = as;
  const cn = [
    styles.head,
    center ? styles.center : "",
    onDark ? styles.onDark : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cn}>
      {eyebrow ? <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow> : null}
      <Tag id={id} className={styles.title}>
        {title}
      </Tag>
      {lead ? <p className={styles.lead}>{lead}</p> : null}
    </div>
  );
}

export default SectionHeading;
