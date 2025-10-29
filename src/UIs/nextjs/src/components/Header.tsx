"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import styles from "./Header.module.css";
import { sections } from "@/config/nav";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { usePathname } from "next/navigation";
import { SunIcon } from "@/components/icons/SunIcon";
import { MoonIcon } from "@/components/icons/MoonIcon";

type ThemeMode = "dark" | "light";

export default function Header() {
  const pathname = usePathname();
  const trackedIds = useMemo(() => sections.map((section) => section.id), []);
  const activeId = useScrollSpy(trackedIds, 120);
  const navItems = useMemo(
    () => sections.filter((section) => section.id !== "hero"),
    []
  );

  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof document === "undefined") {
      return "dark";
    }
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  });

  const toggleTheme = useCallback(() => {
    if (typeof document === "undefined") {
      return;
    }
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    setTheme(next as ThemeMode);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // storage might be unavailable; ignore
    }
  }, []);

  return (
    <header className={styles["header-root"]}>
      <div className={styles["header-left"]}>
        <Link href="/" aria-label="Go to homepage" className={styles.headerLogo}>
          <Image
            src="/images/logoheader/LogoHeader-removebg-preview.webp"
            alt="SMIDJAN logo"
            width={256}
            height={256}
            priority
            className={styles.logoHeader}
          />
          <div data-testid="brand-name" className={styles.brand}>
            SMIDJAN
          </div>
        </Link>
      </div>

      <nav className={styles["header-nav"]} aria-label="Navigation principale (haut)">
        {navItems.map((section) => {
          const isActive =
            section.id === "about"
              ? pathname?.startsWith("/about")
              : activeId === section.id;
          const linkClassName = `${styles["header-link"]}${
            isActive ? ` ${styles["header-link-active"]}` : ""
          }`;

          return (
            <a
              key={section.id}
              href={section.href}
              className={linkClassName}
              aria-current={isActive ? "page" : undefined}
            >
              {section.label}
            </a>
          );
        })}
        <button
          type="button"
          className={styles["theme-toggle"]}
          onClick={toggleTheme}
          aria-pressed={theme === "light"}
          aria-label={`Basculer en mode ${theme === "light" ? "sombre" : "clair"}`}
        >
          {theme === "light" ? <SunIcon aria-hidden="true" /> : <MoonIcon aria-hidden="true" />}
        </button>
      </nav>
    </header>
  );
}

