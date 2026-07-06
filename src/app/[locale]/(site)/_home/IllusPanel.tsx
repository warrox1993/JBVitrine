import React from "react";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import styles from "./IllusPanel.module.css";

export interface IllusPanelProps {
  eyebrow: string;
  title: React.ReactNode;
  text: React.ReactNode;
  /** Inline-SVG figure rendered on the right (or above on mobile). */
  figure: React.ReactNode;
  /** Tint the panel background (var(--bg-2)). */
  onTint?: boolean;
  /** Style for a full-navy Section backdrop (elevated dark slab, white text). */
  onDark?: boolean;
}

/** Two-column text + inline-SVG illustration panel. */
export function IllusPanel({ eyebrow, title, text, figure, onTint, onDark }: IllusPanelProps) {
  const cn = [styles.panel, onTint ? styles.onTint : "", onDark ? styles.onDark : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <Reveal className={cn}>
      <div className={styles.txt}>
        <Eyebrow onDark={onDark} className={styles.kickerMono}>
          {eyebrow}
        </Eyebrow>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <figure className={styles.fig}>{figure}</figure>
    </Reveal>
  );
}

export default IllusPanel;
