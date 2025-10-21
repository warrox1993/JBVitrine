"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import { sections } from "@/config/nav";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header>
      {/* Left: Logo + Brand */}
      <div className="left cluster">
        <Link href="/" aria-label="Go to homepage" className={styles.headerLogo}>
          <Image
            src="/images/logoheader/LogoHeader-removebg-preview.webp"
            alt="SMIDJAN logo"
            width={256}
            height={256}
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
          return items.map(s => {
            const isActive = s.id === 'about' ? (pathname?.startsWith('/about')) : (activeId === s.id);
            return (
              <a
                key={s.id}
                href={s.href}
                className="header-link"
                aria-current={isActive ? 'page' : undefined}
              >
                {s.label}
              </a>
            );
          });
        })()}
      </nav>
    </header>
  );
}
