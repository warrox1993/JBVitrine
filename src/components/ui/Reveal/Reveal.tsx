"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import styles from "./Reveal.module.css";

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
 * Reveal — lightweight scroll-triggered entrance animation (no dependencies).
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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
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
  }, [repeat]);

  const base = stagger ? styles.stagger : `${styles.reveal} ${styles[variant]}`;
  const cn = [base, shown ? styles.in : "", className].filter(Boolean).join(" ");

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
