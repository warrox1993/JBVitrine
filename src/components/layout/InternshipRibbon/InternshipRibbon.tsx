"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./InternshipRibbon.module.css";

const STORAGE_KEY = "smidjan.internshipRibbon.dismissed";
const APPEAR_DELAY_MS = 3000;

/**
 * Sober "open to an internship" diagonal ribbon pinned to the bottom-right
 * corner. It fades/slides in 3s after the page opens (deluxe-cyber look: deep
 * near-black band, emerald hairline + status dot), can be dismissed with the ×
 * or Escape, and stays dismissed for the rest of the browser session. Auto-hide
 * of motion is respected via CSS (prefers-reduced-motion).
 */
export function InternshipRibbon() {
  const t = useTranslations("common");
  // The host always renders but stays visibility:hidden until `visible` flips,
  // so there is never a flash for a visitor who already dismissed it (we simply
  // never schedule the reveal in that case). `visible` is only ever set inside
  // the timeout callback — no synchronous setState in the effect body.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      dismissed = false;
    }
    if (dismissed) return;

    const timer = setTimeout(() => setVisible(true), APPEAR_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* storage unavailable — dismissing for this render is enough */
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, dismiss]);

  // The host always renders (SSR-stable), but stays visibility:hidden until
  // `visible` flips — so a dismissed visitor simply never sees it, no flash.
  return (
    <div
      className={`${styles.host} ${visible ? styles.show : ""}`}
      aria-hidden={!visible}
    >
      <div className={styles.ribbon}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.label}>{t("internship.label")}</span>
      </div>
      <button
        type="button"
        className={styles.close}
        onClick={dismiss}
        aria-label={t("internship.close")}
        tabIndex={visible ? 0 : -1}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
