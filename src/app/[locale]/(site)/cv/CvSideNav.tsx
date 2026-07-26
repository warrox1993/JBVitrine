"use client";

import { useEffect, useState, type MouseEvent } from "react";
import styles from "./CvSideNav.module.css";

export interface CvSideNavItem {
  id: string;
  label: string;
}

export interface CvSideNavProps {
  items: CvSideNavItem[];
  /** Small kicker above the list (e.g. "Sur cette page"). Also used as the nav's aria-label. */
  heading?: string;
}

/**
 * CvSideNav — the sticky sidebar's anchor list for the /cv split-screen
 * layout. Highlights the section currently in view (IntersectionObserver
 * scroll-spy) and smooth-scrolls to the target on click, respecting
 * `prefers-reduced-motion`. Falls back to the browser's native anchor jump
 * (via `scroll-margin-top` on the target sections) if JS hasn't hydrated yet.
 */
export function CvSideNav({ items, heading }: CvSideNavProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  // Stable dependency: the observer only cares about WHICH ids to watch, and the
  // parent re-creates `items` as a fresh array on every render. Joining the ids
  // gives a primitive that changes only when the sections actually change.
  // (Previously the component wrote `itemsRef.current = items` during render,
  // which mutates a ref in the render phase — unsafe under concurrent React.)
  const ids = items.map((item) => item.id).join("|");

  useEffect(() => {
    const sections = ids
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        // Several sections can intersect the thin "active band" at once
        // (short sections); keep the one closest to the top of the viewport.
        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        setActiveId(topMost.target.id);
      },
      // Shrink the observed viewport to a thin band just under the floating
      // header pill so a section only counts as "active" once its heading
      // has actually cleared the header.
      { rootMargin: "-112px 0px -65% 0px", threshold: 0 },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  function handleClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id);
    if (!target) return; // let the native #hash jump handle it
    event.preventDefault();
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    setActiveId(id);
    window.history.replaceState(null, "", `#${id}`);
  }

  return (
    <nav className={styles.nav} aria-label={heading}>
      {heading ? <span className={styles.heading}>{heading}</span> : null}
      <ul className={styles.list}>
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`${styles.link} ${isActive ? styles.active : ""}`}
                aria-current={isActive ? "true" : undefined}
                onClick={(event) => handleClick(event, item.id)}
              >
                <span className={styles.dash} aria-hidden="true" />
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default CvSideNav;
