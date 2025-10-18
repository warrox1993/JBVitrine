"use client";

import { sections } from "@/config/nav";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export default function Header() {
  return (
    <header>
      <div className="navbar-brand" aria-label="Identité de la marque">
        <div className="navbar-icon" aria-hidden="true">V</div>
        <span className="navbar-text">VotreBrand</span>
      </div>
      <nav className="header-nav" aria-label="Navigation principale (haut)">
        {(() => {
          const items = sections.filter(s => s.id !== 'hero');
          const activeId = useScrollSpy(sections.map(x => x.id), 120);
          return items.map(s => (
            <a key={s.id} href={s.href} className="header-link" aria-current={activeId === s.id ? 'page' : undefined}>{s.label}</a>
          ));
        })()}
      </nav>
    </header>
  );
}



