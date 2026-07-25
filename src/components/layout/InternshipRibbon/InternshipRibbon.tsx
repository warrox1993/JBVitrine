"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./InternshipRibbon.module.css";

/** How long after load the ribbon slides in. */
const APPEAR_DELAY_MS = 1200;
/** How long it stays before retracting on its own. */
const VISIBLE_MS = 9000;

/**
 * "Open to an internship" corner ribbon (bottom-right). It broadcasts itself:
 * slides in a short moment after the page opens, holds long enough to read,
 * then retracts on its own — there is NO manual dismiss by design. Deluxe look:
 * emerald band, gold trim, a pulsing gold status dot and a single gold sheen
 * sweep on entry. Motion is reduced under prefers-reduced-motion.
 */
export function InternshipRibbon() {
  const t = useTranslations("common");
  const [visible, setVisible] = useState(false);

  // Slide in a moment after load. setState lives in the async timeout callback,
  // not the effect body (the pattern the set-state-in-effect lint allows).
  useEffect(() => {
    const show = setTimeout(() => setVisible(true), APPEAR_DELAY_MS);
    return () => clearTimeout(show);
  }, []);

  // Once shown, retract on its own after the visible window.
  useEffect(() => {
    if (!visible) return;
    const hide = setTimeout(() => setVisible(false), VISIBLE_MS);
    return () => clearTimeout(hide);
  }, [visible]);

  return (
    <div
      className={`${styles.host} ${visible ? styles.show : ""}`}
      aria-hidden={!visible}
    >
      <div className={styles.ribbon}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.label}>{t("internship.label")}</span>
      </div>
    </div>
  );
}
