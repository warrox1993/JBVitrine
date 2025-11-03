"use client";

import { AnimatedBackground } from "@/components/ui/AnimatedBackground/AnimatedBackground";
import { ReactNode } from "react";

interface SectionWithBackgroundProps {
  id?: string;
  className?: string;
  variant?: "light" | "dark";
  children: ReactNode;
  ariaLabel?: string;
  allowOverflow?: boolean;
}

export function SectionWithBackground({
  id,
  className,
  variant = "dark",
  children,
  ariaLabel,
  allowOverflow = false
}: SectionWithBackgroundProps) {
  return (
    <section
      id={id}
      className={className}
      aria-label={ariaLabel}
      style={{
        position: "relative",
        overflow: allowOverflow ? "visible" : "hidden",
        isolation: "isolate"
      }}
    >
      <AnimatedBackground variant={variant} />
      {children}
    </section>
  );
}
