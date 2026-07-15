"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ElementType,
  type ReactNode,
} from "react";
import styles from "./Reveal.module.css";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return typeof window !== "undefined" && !!window.matchMedia
    ? window.matchMedia(REDUCED_MOTION_QUERY).matches
    : false;
}

function getReducedMotionServerSnapshot() {
  return false;
}

/**
 * Tracks `prefers-reduced-motion` via useSyncExternalStore instead of
 * useState+useEffect: it's the React-endorsed way to read an external browser
 * API without a setState call inside the effect body (which would trip
 * react-hooks/set-state-in-effect).
 */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

export type RevealVariant = "up" | "fade" | "scale" | "left" | "right";

export interface RevealProps {
  children: ReactNode;
  /** Element to render (default div). Use to BE a grid/flex item, e.g. as="article". */
  as?: ElementType;
  /** Entrance style for single-element reveal (ignored when `stagger`). */
  variant?: RevealVariant;
  /** Stagger the direct children in sequence instead of animating the wrapper. */
  stagger?: boolean;
  /** Extra delay in ms before the entrance (single-element reveal only). */
  delay?: number;
  className?: string;
  /** Re-animate every time it enters the viewport (default: once). */
  repeat?: boolean;
}

/**
 * Reveal: lightweight scroll-triggered entrance animation (no dependencies).
 * Renders SSR content immediately for crawlers; the initial hidden state and the
 * transition are pure CSS, and `prefers-reduced-motion` disables all motion.
 * RSC-friendly: it's a client wrapper that renders server children passed in.
 */
export function Reveal({
  children,
  as,
  variant = "up",
  stagger = false,
  delay = 0,
  className = "",
  repeat = false,
}: RevealProps) {
  const Tag = (as || "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Reduced motion is handled below via `prefersReducedMotion` directly
    // (no setState needed here): skip wiring the observer entirely.
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        // setState inside the observer's async callback, not the effect body
        // itself: this is the legitimate "subscribe to an external system"
        // case react-hooks/set-state-in-effect allows.
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            if (!repeat) io.disconnect();
          } else if (repeat) {
            setShown(false);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [repeat, prefersReducedMotion]);

  const isShown = prefersReducedMotion || shown;
  const base = stagger ? styles.stagger : `${styles.reveal} ${styles[variant]}`;
  const cn = [base, isShown ? styles.in : "", className].filter(Boolean).join(" ");

  return (
    <Tag
      ref={ref as never}
      className={cn}
      style={delay && !stagger ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
