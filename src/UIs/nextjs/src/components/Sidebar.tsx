"use client";

import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { sections } from "@/config/nav";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { HomeIcon } from "@/components/icons/HomeIcon";
import { ServicesIcon } from "@/components/icons/ServicesIcon";
import { ProcessIcon } from "@/components/icons/ProcessIcon";
import { GridIcon } from "@/components/icons/GridIcon";
import { MailIcon } from "@/components/icons/MailIcon";
import { AboutIcon } from "@/components/icons/AboutIcon";
import styles from "./Sidebar.module.css";

type Item = { href: string; label: string; icon?: ReactNode };

export default function Sidebar({ items }: { items?: ReadonlyArray<Item> }) {
  const pathname = usePathname();
  const useProvidedItems = Array.isArray(items) && items.length > 0;
  const providedIds = items?.map(i => i.href.replace(/^#/, '')) || [];
  const activeId = useScrollSpy(useProvidedItems ? providedIds : sections.map(x => x.id), 120);
  const renderIcon = (icon?: ReactNode) => {
    if (!icon) {
      return null;
    }
    if (isValidElement(icon)) {
      const safeProps = icon.props as { className?: string; "aria-hidden"?: string };
      const existingClass = safeProps.className;
      const combinedClass = [styles["sidebar-link-icon"], existingClass].filter(Boolean).join(" ");
      return cloneElement(icon as ReactElement<Record<string, unknown>>, {
        className: combinedClass,
        "aria-hidden": safeProps["aria-hidden"] ?? "true",
      });
    }
    return icon;
  };
  return (
    <aside
      className={styles["sidebar-root"]}
      aria-label="Navigation latérale"
      onMouseEnter={() => { document?.body?.classList?.add('sidebar-hovered'); document?.body?.classList?.add('sidebar-open'); }}
      onMouseLeave={() => { document?.body?.classList?.remove('sidebar-hovered'); document?.body?.classList?.remove('sidebar-open'); }}
    >
      <nav className={styles["sidebar-nav"]} aria-label="Navigation latérale">
        {useProvidedItems && items
          ? items.map((it) => {
              const id = it.href.replace(/^#/, '');
              const isActive = activeId === id;
              const linkClassName = `${styles["sidebar-link"]}${isActive ? ` ${styles["sidebar-link-active"]}` : ""}`;
              return (
                <a
                  key={it.href}
                  href={it.href}
                  className={linkClassName}
                  data-section={id}
                  aria-label={it.label}
                  aria-current={isActive ? "page" : undefined}
                >
                  {renderIcon(it.icon)}
                  <span className={styles["sidebar-link-text"]}>{it.label}</span>
                </a>
              );
            })
          : sections.map((s) => {
              const isActive = s.id === 'about' ? (pathname?.startsWith('/about')) : (activeId === s.id);
              const Icon = s.id === 'hero'
                ? HomeIcon
                : s.id === 'projects'
                ? GridIcon
                : s.id === 'process'
                ? ProcessIcon
                : s.id === 'services'
                ? ServicesIcon
                : s.id === 'about'
                ? AboutIcon
                : s.id === 'contact'
                ? MailIcon
                : undefined;
              const linkClassName = `${styles["sidebar-link"]}${isActive ? ` ${styles["sidebar-link-active"]}` : ""}`;
              return (
                <a
                  key={s.id}
                  href={s.href}
                  className={linkClassName}
                  data-section={s.id}
                  aria-label={s.label}
                  aria-current={isActive ? "page" : undefined}
                >
                  {Icon ? <Icon className={styles["sidebar-link-icon"]} aria-hidden="true" /> : null}
                  <span className={styles["sidebar-link-text"]}>{s.label}</span>
                </a>
              );
            })}
      </nav>
    </aside>
  );
}



