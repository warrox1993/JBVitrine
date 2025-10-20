"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import { sections } from "@/config/nav";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export default function Header() {
  return (
    <header>
      {/* Left: Logo + Brand */}
      <div className="left cluster">
        <Link href="/" aria-label="Go to homepage" className={styles.headerLogo}>
          <Image
            src="/images/logoheader/LogoHead.webp"
            alt="SMIDJAN logo"
            width={72}
            height={72}
            priority
            className={styles.logoHeader}
          />
          <div data-testid="brand-name" className={styles.brand}>SMIDJAN</div>
        </Link>
      </div>

      {/* Right: existing nav remains unchanged */}
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
