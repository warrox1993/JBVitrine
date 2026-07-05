import React from "react";
import styles from "./StatHook.module.css";

export interface StatHookProps {
  /** Big highlighted figure (e.g. "~82%"). */
  value: string;
  /** Supporting text; may include rich nodes. */
  children: React.ReactNode;
  className?: string;
}

/** Big-number hook on an orange tint (e.g. attack-coverage stat). */
export function StatHook({ value, children, className }: StatHookProps) {
  const cn = [styles.hook, className].filter(Boolean).join(" ");
  return (
    <div className={cn}>
      <div className={styles.big}>{value}</div>
      <div className={styles.txt}>{children}</div>
    </div>
  );
}

export default StatHook;
