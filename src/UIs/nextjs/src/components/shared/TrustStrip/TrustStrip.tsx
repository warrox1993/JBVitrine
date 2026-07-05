import React from "react";
import { Container } from "../../ui/Container";
import { Icon, IconName } from "../../ui/Icon/Icon";
import styles from "./TrustStrip.module.css";

export interface TrustItem {
  icon: IconName;
  label: string;
}

export interface TrustStripProps {
  label?: string;
  items?: TrustItem[];
  className?: string;
}

/**
 * Honest reference-frameworks & engagements row.
 * NO certification claims — alignment / expertise wording only.
 */
export const DEFAULT_TRUST_ITEMS: TrustItem[] = [
  { icon: "shield", label: "Aligné ISO/IEC 27001" },
  { icon: "check-circle", label: "Expertise NIS2 & CyFun" },
  { icon: "code", label: "Approche OWASP" },
  { icon: "layers", label: "CyberFundamentals (CCB)" },
  { icon: "map-pin", label: "Local & réactif — Liège" },
  { icon: "users", label: "Accès direct à l'expert" },
];

export function TrustStrip({
  label = "Expertise, cadres de référence & engagements",
  items = DEFAULT_TRUST_ITEMS,
  className,
}: TrustStripProps) {
  const cn = [styles.trust, className].filter(Boolean).join(" ");
  return (
    <div className={cn}>
      <Container className={styles.wrap}>
        <div className={styles.label}>{label}</div>
        <div className={styles.row}>
          {items.map((item) => (
            <span key={item.label} className={styles.item}>
              <Icon name={item.icon} />
              {item.label}
            </span>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default TrustStrip;
