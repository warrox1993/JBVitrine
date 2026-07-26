"use client";

import { useEffect, useState, type MouseEvent } from "react";
import styles from "./SectionRail.module.css";

export interface SectionRailItem {
  id: string;
  label: string;
}

export interface SectionRailProps {
  items: SectionRailItem[];
  /** Optional, localized label for the nav landmark (defaults to a neutral string). */
  ariaLabel?: string;
}

/**
 * SectionRail — a slim sticky "spine" for the home page, fixed in the left
 * gutter on wide viewports only. Highlights the section currently in view
 * (IntersectionObserver scroll-spy) and smooth-scrolls to the target on
 * click, respecting `prefers-reduced-motion`. Hidden entirely below 1280px
 * so it never crowds narrower layouts.
 */
export function SectionRail({ items, ariaLabel = "Sommaire" }: SectionRailProps) {
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
      // Shrink the observed viewport to a thin band around the vertical
      // center so a section only counts as "active" once it dominates the view.
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
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

  if (items.length === 0) return null;

  return (
    <nav className={styles.rail} aria-label={ariaLabel}>
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
                <span className={styles.label}>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default SectionRail;
