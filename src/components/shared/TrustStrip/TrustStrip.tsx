import React from "react";
import { getTranslations } from "next-intl/server";
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

interface TrustItemDef {
  icon: IconName;
  key: string;
}

/**
 * Honest reference-frameworks & engagements row.
 * NO certification claims - alignment / expertise wording only.
 * Labels are resolved from the "common" namespace at render time; callers
 * can still override with fully-formed `items` (display strings).
 */
export const DEFAULT_TRUST_ITEMS: TrustItemDef[] = [
  { icon: "shield", key: "trust.items.iso" },
  { icon: "check-circle", key: "trust.items.nis2" },
  { icon: "code", key: "trust.items.owasp" },
  { icon: "layers", key: "trust.items.cyfun" },
  { icon: "map-pin", key: "trust.items.local" },
  { icon: "users", key: "trust.items.expert" },
];

export async function TrustStrip({
  label,
  items,
  className,
}: TrustStripProps) {
  const t = await getTranslations("common");
  const resolvedLabel = label ?? t("trust.label");
  const resolvedItems: TrustItem[] =
    items ??
    DEFAULT_TRUST_ITEMS.map((def) => ({
      icon: def.icon,
      label: t(def.key),
    }));
  const cn = [styles.trust, className].filter(Boolean).join(" ");
  return (
    <div className={cn}>
      <Container className={styles.wrap}>
        <div className={styles.label}>{resolvedLabel}</div>
        <div className={styles.row}>
          {resolvedItems.map((item) => (
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
