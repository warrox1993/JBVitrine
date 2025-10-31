"use client";

import { AnimatedBackground } from "@/components/ui/AnimatedBackground/AnimatedBackground";
import { ReactNode } from "react";

interface SectionWithBackgroundProps {
  id?: string;
  className?: string;
  variant?: "light" | "dark";
  children: ReactNode;
  ariaLabel?: string;
}

export function SectionWithBackground({
  id,
  className,
  variant = "dark",
  children,
  ariaLabel
}: SectionWithBackgroundProps) {
  return (
    <section
      id={id}
      className={className}
      aria-label={ariaLabel}
      style={{ position: "relative", overflow: "hidden", isolation: "isolate" }}
    >
      <AnimatedBackground variant={variant} />
      {children}
    </section>
  );
}
