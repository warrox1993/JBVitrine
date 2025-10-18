"use client";

import { HomeIcon } from "@/components/icons/HomeIcon";
import { ServicesIcon } from "@/components/icons/ServicesIcon";
import { ProcessIcon } from "@/components/icons/ProcessIcon";
import { GridIcon } from "@/components/icons/GridIcon";
import { MailIcon } from "@/components/icons/MailIcon";
import { sections } from "@/config/nav";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export default function Sidebar() {
  return (
    <aside
      className="sidebar"
      aria-label="Navigation latérale"
      onMouseEnter={() => document?.body?.classList?.add('sidebar-hovered')}
      onMouseLeave={() => document?.body?.classList?.remove('sidebar-hovered')}
    >
      <nav className="sidebar-nav" aria-label="Navigation latérale">
        {sections.map((s) => {
          const activeId = useScrollSpy(sections.map(x => x.id), 120);
          const Icon = s.id === 'hero' ? HomeIcon : s.id === 'projects' ? GridIcon : s.id === 'process' ? ProcessIcon : s.id === 'services' ? ServicesIcon : s.id === 'contact' ? MailIcon : undefined;
          return (
            <a key={s.id} href={s.href} className={"sidebar-link" + (activeId === s.id ? " is-active" : "")} data-section={s.id} aria-label={s.label} aria-current={activeId === s.id ? "page" : undefined}>
              {Icon ? <Icon className="sidebar-link-icon" aria-hidden="true" /> : null}
              <span className="sidebar-link-text">{s.label}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}



