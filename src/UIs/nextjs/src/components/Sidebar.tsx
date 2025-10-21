"use client";

import { HomeIcon } from "@/components/icons/HomeIcon";
import { ServicesIcon } from "@/components/icons/ServicesIcon";
import { ProcessIcon } from "@/components/icons/ProcessIcon";
import { GridIcon } from "@/components/icons/GridIcon";
import { MailIcon } from "@/components/icons/MailIcon";
import { sections } from "@/config/nav";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { AboutIcon } from "@/components/icons/AboutIcon";

type Item = { href: string; label: string; icon?: ReactNode };

export default function Sidebar({ items }: { items?: Item[] }) {
  const pathname = usePathname();
  const useProvidedItems = Array.isArray(items) && items.length > 0;
  const providedIds = items?.map(i => i.href.replace(/^#/, '')) || [];
  const activeId = useScrollSpy(useProvidedItems ? providedIds : sections.map(x => x.id), 120);
  return (
    <aside
      className="sidebar"
      aria-label="Navigation latérale"
      onMouseEnter={() => { document?.body?.classList?.add('sidebar-hovered'); document?.body?.classList?.add('sidebar-open'); }}
      onMouseLeave={() => { document?.body?.classList?.remove('sidebar-hovered'); document?.body?.classList?.remove('sidebar-open'); }}
    >
      <nav className="sidebar-nav" aria-label="Navigation latérale">
        {useProvidedItems && items
          ? items.map((it) => {
              const id = it.href.replace(/^#/, '');
              const isActive = activeId === id;
              return (
                <a
                  key={it.href}
                  href={it.href}
                  className={"sidebar-link" + (isActive ? " is-active" : "")}
                  data-section={id}
                  aria-label={it.label}
                  aria-current={isActive ? "page" : undefined}
                >
                  {it.icon ? it.icon : null}
                  <span className="sidebar-link-text">{it.label}</span>
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
              return (
                <a
                  key={s.id}
                  href={s.href}
                  className={"sidebar-link" + (isActive ? " is-active" : "")}
                  data-section={s.id}
                  aria-label={s.label}
                  aria-current={isActive ? "page" : undefined}
                >
                  {Icon ? <Icon className="sidebar-link-icon" aria-hidden="true" /> : null}
                  <span className="sidebar-link-text">{s.label}</span>
                </a>
              );
            })}
      </nav>
    </aside>
  );
}



