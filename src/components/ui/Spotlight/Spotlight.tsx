"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import styles from "./Spotlight.module.css";

/** Attribute consumers add to each card that should react to the pointer. */
export const SPOTLIGHT_CARD_ATTR = "data-spotlight-card";
const CARD_SELECTOR = `[${SPOTLIGHT_CARD_ATTR}]`;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const FINE_HOVER_QUERY = "(hover: hover) and (pointer: fine)";

export interface SpotlightProps {
  children: ReactNode;
  className?: string;
}

/**
 * Spotlight: pointer-tracked "scanner" highlight for a group of cards.
 * A single delegated `pointermove` listener sits on the wrapper (not one per
 * card); while the pointer is over a descendant marked `data-spotlight-card`
 * it writes `--mx`/`--my` (px, relative to that card's own box) so the
 * card's CSS radial glow (`Spotlight.module.css` `.glow`/`.edge` classes)
 * can follow the cursor. Purely presentational — children are typically
 * server-rendered (Links, articles); this wrapper renders as `display:
 * contents` so it never affects layout.
 *
 * No-ops entirely on touch/coarse pointers and under
 * `prefers-reduced-motion`: those fall back to the static corner glow
 * defined in the CSS (no JS, no listeners attached).
 */
export function Spotlight({ children, className = "" }: SpotlightProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef<{ x: number; y: number; target: EventTarget | null } | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (typeof window === "undefined" || !window.matchMedia) return;
    // Reduced motion or no fine pointer (touch/coarse): skip tracking
    // entirely, the CSS static fallback takes over.
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;
    if (!window.matchMedia(FINE_HOVER_QUERY).matches) return;

    const applyToCard = () => {
      frameRef.current = null;
      const pointer = pointerRef.current;
      if (!pointer) return;
      const target = pointer.target as Element | null;
      const card = target?.closest<HTMLElement>(CARD_SELECTOR) ?? null;
      if (!card || !root.contains(card)) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${pointer.x - rect.left}px`);
      card.style.setProperty("--my", `${pointer.y - rect.top}px`);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY, target: event.target };
      // rAF-throttle: only one scheduled write per frame, always using the
      // latest pointer position captured above.
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(applyToCard);
    };

    const handlePointerLeave = () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      pointerRef.current = null;
    };

    root.addEventListener("pointermove", handlePointerMove);
    root.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      root.removeEventListener("pointermove", handlePointerMove);
      root.removeEventListener("pointerleave", handlePointerLeave);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div ref={rootRef} className={`${styles.root} ${className}`.trim()}>
      {children}
    </div>
  );
}

export default Spotlight;
