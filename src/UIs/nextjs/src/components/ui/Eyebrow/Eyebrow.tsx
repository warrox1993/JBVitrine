import React from "react";
import styles from "./Eyebrow.module.css";

export interface EyebrowProps {
  children: React.ReactNode;
  /** Use the lighter orange tint for navy backgrounds. */
  onDark?: boolean;
  className?: string;
  as?: "span" | "div" | "p";
}

/** Orange uppercase section kicker with a leading dash. */
export function Eyebrow({ children, onDark, className, as = "span" }: EyebrowProps) {
  const Tag = as;
  const cn = [styles.eyebrow, onDark ? styles.onDark : "", className]
    .filter(Boolean)
    .join(" ");
  return <Tag className={cn}>{children}</Tag>;
}

export default Eyebrow;
