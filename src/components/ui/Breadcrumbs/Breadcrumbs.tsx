import { Link } from "@/i18n/navigation";
import styles from "./Breadcrumbs.module.css";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Fil d'Ariane" className={styles.breadcrumbs}>
      <ol
        className={styles.breadcrumbsList}
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={index}
              className={styles.breadcrumbItem}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {item.href && !isLast ? (
                <Link href={item.href} itemProp="item" className={styles.breadcrumbLink}>
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <span itemProp="name" className={styles.breadcrumbCurrent}>
                  {item.label}
                </span>
              )}
              <meta itemProp="position" content={String(index + 1)} />
              {!isLast && <span className={styles.breadcrumbSeparator} aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
