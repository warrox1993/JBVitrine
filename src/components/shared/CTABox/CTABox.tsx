import React from "react";
import { Container } from "../../ui/Container";
import { Button } from "../../ui/Button/Button";
import { Icon } from "../../ui/Icon/Icon";
import styles from "./CTABox.module.css";

export interface CTAAction {
  label: string;
  href: string;
  variant?: "primary" | "light" | "ghostD" | "navy";
}

export interface CTABoxProps {
  title: React.ReactNode;
  text?: React.ReactNode;
  /** Primary + secondary actions rendered as buttons. */
  actions: CTAAction[];
  /** Small reassurance items with a green check (e.g. "Sans engagement"). */
  reassurances?: string[];
  /** Tint the outer band instead of white. */
  tint?: boolean;
  id?: string;
  className?: string;
}

/** Navy final-CTA box used at the foot of every page. */
export function CTABox({
  title,
  text,
  actions,
  reassurances,
  tint,
  id,
  className,
}: CTABoxProps) {
  const cn = [styles.final, tint ? styles.tint : "", className].filter(Boolean).join(" ");
  return (
    <section id={id} className={cn}>
      <Container>
        <div className={styles.box}>
          <div className={`${styles.gridBg} grid-bg`} aria-hidden="true" />
          <div className={styles.in}>
            <h2>{title}</h2>
            {text ? <p>{text}</p> : null}
            <div className={styles.btns}>
              {actions.map((a, i) => (
                <Button
                  key={a.href + a.label}
                  as="a"
                  href={a.href}
                  variant={a.variant ?? (i === 0 ? "primary" : "ghostD")}
                >
                  {a.label}
                </Button>
              ))}
            </div>
            {reassurances && reassurances.length > 0 ? (
              <div className={styles.sub}>
                {reassurances.map((r) => (
                  <span key={r}>
                    <Icon name="check" />
                    {r}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CTABox;
