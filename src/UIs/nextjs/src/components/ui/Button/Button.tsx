"use client";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { useMagneticButton } from "@/hooks/useMagneticButton";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  magnetic?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  magnetic = true,
  children,
  className,
  ...props
}: ButtonProps) {
  const magneticRef = useMagneticButton<HTMLButtonElement>({
    strength: 0.3,
    disabled: !magnetic,
  });

  return (
    <button
      ref={magneticRef}
      className={`${styles.button} ${styles[variant]} btn-anim ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
}


