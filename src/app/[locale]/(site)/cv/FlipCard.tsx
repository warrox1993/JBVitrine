"use client";

import { useState, type KeyboardEvent, type ReactNode } from "react";
import styles from "./FlipCard.module.css";

export interface FlipCardProps {
  icon?: ReactNode;
  status: string;
  statusVariant: "done" | "progress";
  name: string;
  description: string;
  verifyHref?: string;
  verifyLabel?: string;
  whyTitle: string;
  whyText: string;
  hint: string;
  /** Label shown on the back to flip back to the front (localized, falls back to hint). */
  backHint?: string;
}

/**
 * FlipCard — a certification card that flips on the Y axis to reveal
 * the "why" behind the certification. Clickable and keyboard-operable
 * (Enter/Space), with a focus-visible ring. Respects reduced motion by
 * disabling the rotation transition (instant swap) while keeping the
 * flip functional.
 */
export function FlipCard({
  icon,
  status,
  statusVariant,
  name,
  description,
  verifyHref,
  verifyLabel,
  whyTitle,
  whyText,
  hint,
  backHint,
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  function toggle() {
    setFlipped((prev) => !prev);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
      event.preventDefault();
      toggle();
    }
  }

  const statusClass = statusVariant === "done" ? styles.statusDone : styles.statusProgress;

  return (
    <div
      className={styles.card}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      onClick={toggle}
      onKeyDown={handleKeyDown}
    >
      <div className={`${styles.inner} ${flipped ? styles.flipped : ""}`}>
        <div className={`${styles.face} ${styles.front}`}>
          {icon ? <div className={styles.icon}>{icon}</div> : null}
          <span className={`${styles.status} ${statusClass}`}>{status}</span>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.desc}>{description}</p>
          {verifyHref ? (
            <a
              href={verifyHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.verify}
              onClick={(event) => event.stopPropagation()}
            >
              {verifyLabel}
            </a>
          ) : null}
          <span className={styles.hint} aria-hidden="true">
            {hint}
          </span>
        </div>
        <div className={`${styles.face} ${styles.back}`}>
          <h4 className={styles.whyTitle}>{whyTitle}</h4>
          <p className={styles.whyText}>{whyText}</p>
          <span className={styles.backHint} aria-hidden="true">
            {backHint ?? hint}
          </span>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
