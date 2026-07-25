"use client";

import { useEffect, useState } from "react";
import styles from "./JourneyRail.module.css";

export interface JourneyRailStep {
  /** Must match the `id` set on the corresponding <li> in the journey <ol>. */
  id: string;
  number: string;
  label: string;
}

interface JourneyRailProps {
  steps: JourneyRailStep[];
}

/**
 * Sticky "year rail" for the founder's journey list (agence page).
 *
 * Purely a decorative scroll-spy: it highlights whichever numbered entry is
 * currently in view in the `<ol>` it sits next to. Every label it shows
 * already exists, accessibly, inside that list — so the rail is
 * `aria-hidden` to avoid announcing the same information twice to
 * assistive tech; it's a wayfinding aid for sighted users only.
 *
 * Kept as a small client island (IntersectionObserver, same pattern as
 * `Reveal`/`SecurityScan`) so the parent `Fondateur` stays an async server
 * component. Degrades gracefully: before hydration / with JS disabled it's
 * simply absent from the a11y tree and the first step stays highlighted,
 * while the real content in the `<ol>` is unaffected either way.
 */
export function JourneyRail({ steps }: JourneyRailProps) {
  const [activeId, setActiveId] = useState<string>(steps[0]?.id ?? "");

  useEffect(() => {
    const targets = steps
      .map((step) => document.getElementById(step.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      // Treat an entry as "current" once it crosses a band near the top of
      // the viewport, rather than requiring it to be fully in view.
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );
    for (const el of targets) io.observe(el);
    return () => io.disconnect();
  }, [steps]);

  return (
    <div className={styles.track}>
      <div className={styles.rail} aria-hidden="true">
        <ul className={styles.railList}>
          {steps.map((step) => {
            const isActive = step.id === activeId;
            return (
              <li
                key={step.id}
                className={
                  isActive ? `${styles.railItem} ${styles.active}` : styles.railItem
                }
              >
                <span className={styles.railNum}>{step.number}</span>
                <span className={styles.railLabel}>{step.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default JourneyRail;
