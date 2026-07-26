"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./InternshipRibbon.module.css";

/** How long after load the pill slides in. */
const APPEAR_DELAY_MS = 1200;
/** How long it stays before retracting on its own (paused while held). */
const VISIBLE_MS = 9000;

/**
 * "Open to an internship" availability pill (bottom-right). It broadcasts
 * itself: slides in a short moment after load, holds long enough to read, then
 * retracts on its own — no manual dismiss. The pill is a LINK to the contact
 * page; hovering or focusing it pauses the auto-retract so it doesn't vanish
 * mid-click. Deluxe look, motion reduced under prefers-reduced-motion.
 *
 * ACCESSIBILITY — why it is built this way (a11y tree hygiene):
 *
 * 1. The retracted host uses `inert`, never `aria-hidden`. `aria-hidden="true"`
 *    only strips a subtree from the accessibility tree; it does NOT remove its
 *    descendants from the tab order. Wrapping the contact <Link> in it produced
 *    a link that assistive tech could not see but a keyboard could still reach —
 *    the "aria-hidden element must not contain focusable elements" failure, and
 *    an invisible focus stop during the 550 ms fade-out (the CSS delays
 *    `visibility` so the pill can animate out while still hit-testable).
 *    `inert` removes the subtree from BOTH the tab order and the a11y tree in
 *    one native attribute, so the two can never drift apart again.
 *
 * 2. The information itself is NOT hidden. "Open to an internship" is the single
 *    most useful fact on this site for a recruiter, including one using a screen
 *    reader or an AI agent reading the accessibility tree. Since the pill
 *    retracts on its own, a plain, permanently reachable text equivalent is
 *    rendered whenever the pill is not on screen — including in the
 *    server-rendered HTML, which is what crawlers and agents parse. Exactly one
 *    of the two is in the a11y tree at any moment, so nothing is announced twice.
 *
 * 3. Deliberately NOT a live region (`role="status"`/`aria-live`). The pill
 *    appears 1.2 s after load, unprompted; announcing it would interrupt a
 *    screen-reader user mid-sentence with something they never asked for. Static
 *    text they can reach on their own terms is the respectful equivalent.
 *
 * 4. The auto-retract is paused on focus as well as on hover (WCAG 2.2.1). A
 *    keyboard user who tabs into the pill must not have it — and their focus —
 *    yanked out from under them by a timer.
 */
export function InternshipRibbon() {
  const t = useTranslations("common");
  const [visible, setVisible] = useState(false);
  /** Visitor is hovering or keyboard-focused on the pill: hold it on screen. */
  const [held, setHeld] = useState(false);

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), APPEAR_DELAY_MS);
    return () => clearTimeout(show);
  }, []);

  // Retract on its own after the visible window — but not while the visitor is
  // hovering or focused (they're likely about to click through to contact).
  useEffect(() => {
    if (!visible || held) return;
    const hide = setTimeout(() => setVisible(false), VISIBLE_MS);
    return () => clearTimeout(hide);
  }, [visible, held]);

  return (
    <>
      {/* Text equivalent, live only while the pill is off screen (see note 2). */}
      {!visible && <p className="sr-only">{t("internship.srStatus")}</p>}

      <div
        className={`${styles.host} ${visible ? styles.show : ""}`}
        // `inert`, not `aria-hidden` — see note 1 above.
        inert={!visible}
      >
        <Link
          href="/contact"
          className={styles.ribbon}
          aria-label={t("internship.linkLabel")}
          onMouseEnter={() => setHeld(true)}
          onMouseLeave={() => setHeld(false)}
          onFocus={() => setHeld(true)}
          onBlur={() => setHeld(false)}
        >
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.label}>{t("internship.label")}</span>
        </Link>
      </div>
    </>
  );
}
