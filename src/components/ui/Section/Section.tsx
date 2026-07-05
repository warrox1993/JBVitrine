import React from "react";
import { Container } from "../Container";
import styles from "./Section.module.css";

export interface SectionProps {
  children: React.ReactNode;
  /** Background variant. */
  variant?: "white" | "tint" | "tint3" | "navy";
  /** Paint the faint grid overlay (only meaningful on the navy variant). */
  gridBg?: boolean;
  /** Wrap children in a `.container`. Set false to control layout yourself. */
  contained?: boolean;
  id?: string;
  className?: string;
}

/**
 * Standard `<section>` with `--section-y` rhythm and an optional
 * background variant + navy grid overlay.
 */
export function Section({
  children,
  variant = "white",
  gridBg,
  contained = true,
  id,
  className,
}: SectionProps) {
  const cn = [styles.section, styles[variant], className].filter(Boolean).join(" ");
  return (
    <section id={id} className={cn}>
      {gridBg ? <div className={`${styles.gridBg} grid-bg`} aria-hidden="true" /> : null}
      {contained ? (
        <Container className={styles.inner}>{children}</Container>
      ) : (
        <div className={styles.inner}>{children}</div>
      )}
    </section>
  );
}

export default Section;
