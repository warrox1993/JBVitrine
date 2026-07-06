import React from "react";
import { Icon } from "../../ui/Icon/Icon";
import styles from "./Faq.module.css";

export interface FaqItem {
  question: string;
  /** Answer - plain string, or rich nodes (e.g. multiple <p>). */
  answer: React.ReactNode;
}

export interface FaqProps {
  items: FaqItem[];
  /** Open the first item by default. */
  defaultOpenFirst?: boolean;
  className?: string;
}

/**
 * Accessible FAQ accordion built on native <details>/<summary>.
 * No JavaScript required - server component by default.
 */
export function Faq({ items, defaultOpenFirst = false, className }: FaqProps) {
  const cn = [styles.list, className].filter(Boolean).join(" ");
  return (
    <div className={cn}>
      {items.map((item, i) => (
        <details
          key={item.question}
          className={styles.qa}
          open={defaultOpenFirst && i === 0}
        >
          <summary className={styles.summary}>
            <span className={styles.q}>{item.question}</span>
            <Icon name="chevron-down" className={styles.chev} strokeWidth={2.2} />
          </summary>
          <div className={styles.ans}>
            {typeof item.answer === "string" ? <p>{item.answer}</p> : item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}

export default Faq;
