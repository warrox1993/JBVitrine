import React from "react";
import { Container } from "../../ui/Container";
import styles from "./StatsBand.module.css";

export interface StatItem {
  /** Big number/value. A trailing symbol can be emphasised via `accent`. */
  value: string;
  /** Optional accented suffix rendered in orange (e.g. "+", "%", "h"). */
  accent?: string;
  label: string;
}

export interface StatsBandProps {
  stats: StatItem[];
  title?: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
}

/** Dark navy band presenting headline stats. */
export function StatsBand({ stats, title, lead, className }: StatsBandProps) {
  const cn = [styles.stats, className].filter(Boolean).join(" ");
  return (
    <section className={cn}>
      <div className={`${styles.gridBg} grid-bg`} aria-hidden="true" />
      <Container className={styles.inner}>
        {title || lead ? (
          <div className={styles.head}>
            {title ? <h2>{title}</h2> : null}
            {lead ? <p>{lead}</p> : null}
          </div>
        ) : null}
        <div
          className={styles.grid}
          style={{ ["--cols" as string]: String(stats.length) }}
        >
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <div className={styles.n}>
                {s.value}
                {s.accent ? <em>{s.accent}</em> : null}
              </div>
              <div className={styles.l}>{s.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default StatsBand;
