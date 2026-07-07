import React from "react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Icon } from "@/components/ui/Icon/Icon";
import styles from "./LegalLayout.module.css";

export type LegalPageKey = "mentions" | "confidentialite" | "cgv";

const NAV_ITEMS: { key: LegalPageKey; href: string }[] = [
  { key: "mentions", href: "/mentions-legales" },
  { key: "confidentialite", href: "/confidentialite" },
  { key: "cgv", href: "/cgv" },
];

export interface LegalLayoutProps {
  /** Which of the three legal pages is rendering - drives the nav + breadcrumb. */
  active: LegalPageKey;
  eyebrow: string;
  title: string;
  lead: string;
  /** Decorative hero illustration (e.g. from LegalVisuals). Hidden below 760px. */
  visual?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Shared reading layout for the three legal pages. Provides the page
 * header (eyebrow/title/lead/visual), the sticky cross-page nav (becomes
 * a horizontal chip row on tablet/mobile) and the ~72ch reading column.
 * Server component - no client JS needed (active state comes from the
 * page itself, not from route matching).
 */
export async function LegalLayout({ active, eyebrow, title, lead, visual, children }: LegalLayoutProps) {
  const t = await getTranslations("legal");
  const navLabelFor = (key: LegalPageKey) => t(`nav.items.${key}`);
  const activeItem = NAV_ITEMS.find((item) => item.key === active);

  return (
    <div>
      <section className={styles.pageHero}>
        <div className="wrap">
          <Breadcrumb items={activeItem ? [{ label: navLabelFor(activeItem.key), href: activeItem.href }] : undefined} />
          <div className={styles.heroInner}>
            <div className={styles.heroText}>
              <Eyebrow>{eyebrow}</Eyebrow>
              <h1 className={styles.heroTitle}>{title}</h1>
              <p className={styles.heroLead}>{lead}</p>
            </div>
            {visual ? (
              <div className={styles.heroVisual} aria-hidden="true">
                {visual}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={`wrap ${styles.grid}`}>
          <nav className={styles.nav} aria-label={t("nav.aria")}>
            <span className={styles.navLabel}>{t("nav.label")}</span>
            <ul className={styles.navList}>
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className={item.key === active ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
                    aria-current={item.key === active ? "page" : undefined}
                  >
                    {navLabelFor(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <article className={styles.content}>{children}</article>
        </div>
      </section>
    </div>
  );
}

/** Orange "model - needs legal validation" disclaimer banner. */
export function LegalBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.banner} role="note">
      <Icon name="alert-triangle" />
      <p>{children}</p>
    </div>
  );
}

/** A numbered `<h2>` block within the reading column. */
export function LegalSection({
  id,
  num,
  title,
  icon,
  children,
}: {
  id: string;
  num: string;
  title: string;
  /** Optional decorative icon badge shown top-right (hidden below 640px). */
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-h`}>
      {icon ? (
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.num}>{num}</span>
            <h2 id={`${id}-h`} className={styles.sectionTitle}>
              {title}
            </h2>
          </div>
          <div className={styles.iconBadge} aria-hidden="true">
            {icon}
          </div>
        </div>
      ) : (
        <>
          <span className={styles.num}>{num}</span>
          <h2 id={`${id}-h`} className={styles.sectionTitle}>
            {title}
          </h2>
        </>
      )}
      {children}
    </section>
  );
}

/** Grey informational callout (e.g. transparency / status notes). */
export function LegalCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.callout}>
      <Icon name="shield-check" strokeWidth={1.8} />
      <p>{children}</p>
    </div>
  );
}

/** Dashed "[à compléter]"-style placeholder token - never a real value. */
export function Placeholder({ children }: { children: React.ReactNode }) {
  return <span className={styles.placeholder}>{children}</span>;
}

/** Inline styled link used inside legal prose. */
export function LegalLink(props: React.ComponentProps<"a">) {
  const { className, ...rest } = props;
  return <a className={[styles.inlineLink, className].filter(Boolean).join(" ")} {...rest} />;
}

/** Responsive table wrapper for the cookies/durations tables. */
export function LegalTable({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>{children}</table>
    </div>
  );
}

export default LegalLayout;
