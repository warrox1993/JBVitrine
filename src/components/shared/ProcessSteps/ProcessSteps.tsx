import React from "react";
import styles from "./ProcessSteps.module.css";

export interface ProcessStep {
  title: string;
  description: string;
  /** Optional custom label instead of the auto index (e.g. "01"). */
  label?: string;
}

export interface ProcessStepsProps {
  steps: ProcessStep[];
  /** Small uppercase kicker above the row. */
  kicker?: string;
  className?: string;
}

/** Numbered process steps (typically 4) with a connecting line. */
export function ProcessSteps({ steps, kicker, className }: ProcessStepsProps) {
  const cn = [styles.process, className].filter(Boolean).join(" ");
  return (
    <div className={cn}>
      {kicker ? <div className={styles.kicker}>{kicker}</div> : null}
      <ol
        className={styles.steps}
        style={{ ["--cols" as string]: String(steps.length) }}
      >
        {steps.map((step, i) => (
          <li key={step.title} className={styles.step}>
            <div className={styles.num}>{step.label ?? String(i + 1).padStart(2, "0")}</div>
            <h4 className={styles.stepTitle}>{step.title}</h4>
            <p className={styles.stepDesc}>{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ProcessSteps;
