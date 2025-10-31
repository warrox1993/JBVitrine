"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import styles from "./Header.module.css";
import { sections } from "@/config/nav";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const trackedIds = useMemo(() => sections.map((section) => section.id), []);
  const activeId = useScrollSpy(trackedIds, 120);
  const navItems = useMemo(
    () => sections.filter((section) =>
      section.id !== "hero" &&
      section.id !== "services" &&
      section.id !== "contact" &&
      section.id !== "projects" &&
      section.id !== "process" &&
      section.id !== "home" &&
      section.id !== "cms"
    ),
    []
  );

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
        <Link
          href="/"
          className={`${styles["header-link"]}${pathname === "/" ? ` ${styles["header-link-active"]}` : ""}`}
          aria-current={pathname === "/" ? "page" : undefined}
        >
          Accueil
        </Link>
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
        <Link
          href="/services"
          className={`${styles["header-link"]}${pathname === "/services" ? ` ${styles["header-link-active"]}` : ""}`}
          aria-current={pathname === "/services" ? "page" : undefined}
        >
          Services
        </Link>
        <Link
          href="/cms-ecommerce"
          className={`${styles["header-link"]}${pathname === "/cms-ecommerce" ? ` ${styles["header-link-active"]}` : ""}`}
          aria-current={pathname === "/cms-ecommerce" ? "page" : undefined}
        >
          CMS
        </Link>
        <Link
          href="/contact"
          className={`${styles["header-link"]}${pathname === "/contact" ? ` ${styles["header-link-active"]}` : ""}`}
          aria-current={pathname === "/contact" ? "page" : undefined}
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}

