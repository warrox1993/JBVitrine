"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import styles from "./CursorGlow.module.css";

export function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;
    const onMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    const onLeave = () => setIsVisible(false);
    window.addEventListener("mousemove", onMove, { passive: true } as any);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove as any);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [isMobile, prefersReducedMotion]);

  if (isMobile || prefersReducedMotion || !isVisible) return null;
  return (
    <div
      className={styles.cursorGlow}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    />
  );
}


