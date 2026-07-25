"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./InternshipRibbon.module.css";

/** How long after load the pill slides in. */
const APPEAR_DELAY_MS = 1200;
/** How long it stays before retracting on its own (paused while hovered). */
const VISIBLE_MS = 9000;

/**
 * "Open to an internship" availability pill (bottom-right). It broadcasts
 * itself: slides in a short moment after load, holds long enough to read, then
 * retracts on its own — no manual dismiss. The pill is a LINK to the contact
 * page; hovering it pauses the auto-retract so it doesn't vanish mid-click.
 * Deluxe look, motion reduced under prefers-reduced-motion.
 */
export function InternshipRibbon() {
  const t = useTranslations("common");
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), APPEAR_DELAY_MS);
    return () => clearTimeout(show);
  }, []);

  // Retract on its own after the visible window — but not while the visitor is
  // hovering (they're likely about to click through to contact).
  useEffect(() => {
    if (!visible || hovered) return;
    const hide = setTimeout(() => setVisible(false), VISIBLE_MS);
    return () => clearTimeout(hide);
  }, [visible, hovered]);

  return (
    <div
      className={`${styles.host} ${visible ? styles.show : ""}`}
      aria-hidden={!visible}
    >
      <Link
        href="/contact"
        className={styles.ribbon}
        aria-label={`${t("internship.label")} — ${t("header.cta")}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.label}>{t("internship.label")}</span>
      </Link>
    </div>
  );
}
