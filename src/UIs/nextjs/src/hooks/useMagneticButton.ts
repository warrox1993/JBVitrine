"use client";
import { useRef, useEffect } from "react";

interface UseMagneticButtonOptions {
  strength?: number;
  disabled?: boolean;
}

export function useMagneticButton<T extends HTMLElement>({
  strength = 0.3,
  disabled = false,
}: UseMagneticButtonOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (disabled) return;
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = "translate(0, 0)";
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, disabled]);

  return ref;
}

