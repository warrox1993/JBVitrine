import { CSSProperties } from "react";
import styles from "./ProgressBar.module.css";

export type ProgressBarProps = {
  /**
   * Current progress value
   */
  value: number;
  /**
   * Maximum value (default: 100)
   */
  max?: number;
  /**
   * Direction of the progress bar
   */
  direction?: "horizontal" | "vertical";
  /**
   * Optional className for custom styling
   */
  className?: string;
  /**
   * Optional aria-label for accessibility
   */
  ariaLabel?: string;
  /**
   * Optional color override
   */
  color?: string;
};

export function ProgressBar({
  value,
  max = 100,
  direction = "horizontal",
  className = "",
  ariaLabel,
  color,
}: ProgressBarProps) {
  // Percentage of the bar to fill, rounded to 1 decimal.
  const percentage = Number(((value / max) * 100).toFixed(1));
  const fillStyle: CSSProperties = {
    [direction === "horizontal" ? "width" : "height"]: `${percentage}%`,
  };

  if (color) {
    fillStyle.background = color;
  }

  return (
    <div
      className={`${styles.progressBar} ${styles[direction]} ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel || `Progress: ${percentage}%`}
    >
      <div className={styles.fill} style={fillStyle} />
    </div>
  );
}
