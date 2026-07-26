"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type ElementType,
  type FocusEvent as ReactFocusEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import styles from "./SlideHighlight.module.css";

export interface SlideHighlightProps {
  /** The link/item elements to wrap (e.g. a row of links, or `<li>` columns). */
  children: ReactNode;
  /** Extra class(es) on the wrapping element. */
  className?: string;
  /** Extra class(es) on the sliding highlight block (e.g. pill vs rounded-rect). */
  highlightClassName?: string;
  /** Tag for the wrapping element. Default "div" — safe to nest around `<ul>`
   * without producing invalid markup (the highlight lives next to the list,
   * never as a stray non-`<li>` child of it). */
  as?: ElementType;
  /** Selector (resolved via `closest()`) for "which ancestor is the highlight
   * target" when a pointer/focus event bubbles up from inside an item. */
  itemSelector?: string;
}

/**
 * Shared sliding hover-highlight: a single translucent rounded block glides
 * and resizes between sibling links so the highlight reads as one physical
 * object moving from item to item, instead of each link toggling its own
 * background independently.
 *
 * Implementation notes:
 * - Works via event delegation (pointerover / focus bubbling to the wrapper)
 *   so it adapts to any list of items passed as children — no per-item
 *   instrumentation required.
 * - Position/size are written directly to the DOM through refs (not React
 *   state): hovering never triggers a re-render, the glide is driven purely
 *   by the CSS transition on transform/width/height.
 * - The very first activation snaps instantly (no fly-in from the top-left
 *   origin); every move after that glides, including fading back in after a
 *   `pointerleave`, so the block reads as persistent, not re-spawned.
 * - `pointer-events: none` on the highlight means it never swallows clicks.
 */
export function SlideHighlight({
  children,
  className,
  highlightClassName,
  as: Tag = "div",
  itemSelector = "a",
}: SlideHighlightProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const highlightRef = useRef<HTMLSpanElement | null>(null);
  const activeItemRef = useRef<HTMLElement | null>(null);
  const hasPositionedRef = useRef(false);
  const restoreFrameRef = useRef<number | null>(null);
  const moveFrameRef = useRef<number | null>(null);

  const moveTo = useCallback((item: HTMLElement | null, instant = false) => {
    const container = containerRef.current;
    const highlight = highlightRef.current;
    if (!container || !highlight || !item) return;

    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const x = itemRect.left - containerRect.left + container.scrollLeft;
    const y = itemRect.top - containerRect.top + container.scrollTop;

    const snap = instant || !hasPositionedRef.current;
    if (snap) highlight.style.transition = "none";
    highlight.style.width = `${itemRect.width}px`;
    highlight.style.height = `${itemRect.height}px`;
    highlight.style.transform = `translate(${x}px, ${y}px)`;
    highlight.style.opacity = "1";
    if (snap) {
      // Hand transitions back to the stylesheet on the NEXT frame. This used
      // to read `highlight.offsetHeight` to flush the instant jump, which
      // forces a SYNCHRONOUS layout in the middle of a pointer handler
      // (read -> write -> read, the classic layout-thrash pattern). A rAF
      // callback runs before the next style/layout pass, so the snap has
      // already been committed with `transition: none` and restoring the
      // stylesheet value cannot animate it: same visual result, no forced
      // reflow. prefers-reduced-motion is still honoured by the stylesheet.
      if (restoreFrameRef.current !== null) {
        cancelAnimationFrame(restoreFrameRef.current);
      }
      restoreFrameRef.current = requestAnimationFrame(() => {
        restoreFrameRef.current = null;
        highlight.style.transition = "";
      });
      hasPositionedRef.current = true;
    }
    activeItemRef.current = item;
  }, []);

  const hide = useCallback(() => {
    const highlight = highlightRef.current;
    if (!highlight) return;
    highlight.style.opacity = "0";
    activeItemRef.current = null;
  }, []);

  const resolveItem = (target: EventTarget | null): HTMLElement | null => {
    if (!(target instanceof Element)) return null;
    return target.closest<HTMLElement>(itemSelector);
  };

  const handlePointerOver = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.pointerType === "touch") return; // no ghost highlight on tap/scroll
    const item = resolveItem(e.target);
    if (!item) return;
    // Batch the two getBoundingClientRect() reads into the next animation
    // frame rather than running them inline: pointerover can fire several
    // times per frame while the cursor sweeps a nav, and each inline call
    // would force its own layout right after the previous frame's writes.
    if (moveFrameRef.current !== null) {
      cancelAnimationFrame(moveFrameRef.current);
    }
    moveFrameRef.current = requestAnimationFrame(() => {
      moveFrameRef.current = null;
      moveTo(item);
    });
  };

  const handlePointerLeave = () => {
    hide();
  };

  const handleFocus = (e: ReactFocusEvent<HTMLElement>) => {
    const item = resolveItem(e.target);
    if (item) moveTo(item);
  };

  const handleBlur = (e: ReactFocusEvent<HTMLElement>) => {
    const next = e.relatedTarget as Node | null;
    if (!next || !containerRef.current?.contains(next)) hide();
  };

  // Re-measure on resize (viewport rotation, sidebar collapse, etc.) so a
  // stale rect never leaves the block floating over the wrong spot.
  useEffect(() => {
    const onResize = () => {
      if (activeItemRef.current) moveTo(activeItemRef.current, true);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (moveFrameRef.current !== null) {
        cancelAnimationFrame(moveFrameRef.current);
      }
      if (restoreFrameRef.current !== null) {
        cancelAnimationFrame(restoreFrameRef.current);
      }
    };
  }, [moveTo]);

  return (
    <Tag
      ref={containerRef as never}
      className={[styles.wrap, className].filter(Boolean).join(" ")}
      onPointerOver={handlePointerOver}
      onPointerLeave={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <span
        ref={highlightRef}
        aria-hidden="true"
        className={[styles.highlight, highlightClassName]
          .filter(Boolean)
          .join(" ")}
      />
      {children}
    </Tag>
  );
}

export default SlideHighlight;
