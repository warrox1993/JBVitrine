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
 * SectionRail — fine « colonne vertébrale » fixée dans la gouttière gauche sur
 * grand écran. Elle surligne la section en cours de lecture (scroll-spy par
 * IntersectionObserver) et défile en douceur vers la cible au clic, en
 * respectant `prefers-reduced-motion`. Masquée sous 1280px pour ne jamais
 * encombrer les mises en page étroites.
 *
 * Partagée par toutes les pages à sections : l'accueil, les pages de contenu
 * et les articles du journal (où les entrées viennent de `tableOfContents`).
 * Elle ne suppose rien de son contenu — seulement que chaque `id` correspond à
 * un élément réellement présent dans le document.
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
    // `data-section-rail` est le point d'accroche des styles globaux : les
    // classes des CSS Modules sont hachées, donc inutilisables depuis une
    // feuille globale. C'est lui qui déclenche la réservation de la voie du
    // rail dans globals.css.
    <nav className={styles.rail} aria-label={ariaLabel} data-section-rail="">
      <ul className={styles.list}>
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`${styles.link} ${isActive ? styles.active : ""}`}
                aria-current={isActive ? "true" : undefined}
                // Les titres de section d'article dépassent la largeur du rail
                // et sont abrégés par une ellipse : l'infobulle native rend le
                // libellé complet lisible sans élargir la colonne.
                title={item.label}
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
