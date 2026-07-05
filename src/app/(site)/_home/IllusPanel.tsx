import React from "react";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import styles from "./IllusPanel.module.css";

export interface IllusPanelProps {
  eyebrow: string;
  title: React.ReactNode;
  text: React.ReactNode;
  /** Inline-SVG figure rendered on the right (or above on mobile). */
  figure: React.ReactNode;
  /** Tint the panel background (var(--bg-2)). */
  onTint?: boolean;
}

/** Two-column text + inline-SVG illustration panel. */
export function IllusPanel({ eyebrow, title, text, figure, onTint }: IllusPanelProps) {
  const cn = [styles.panel, onTint ? styles.onTint : ""].filter(Boolean).join(" ");
  return (
    <div className={cn}>
      <div className={styles.txt}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <figure className={styles.fig}>{figure}</figure>
    </div>
  );
}

export default IllusPanel;
