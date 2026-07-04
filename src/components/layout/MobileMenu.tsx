"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./MobileMenu.module.css";
import { sections } from "@/config/nav";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Fermer le menu lors du changement de page
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Close menu on route change is intentional
    setIsOpen(false);
  }, [pathname]);

  // Empêcher le scroll du body quand le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navItems = sections.filter((section) =>
    section.id !== "hero" &&
    section.id !== "services" &&
    section.id !== "contact" &&
    section.id !== "projects" &&
    section.id !== "process" &&
    section.id !== "home" &&
    section.id !== "cms"
  );

  return (
    <>
      {/* Bouton hamburger */}
      <button
        className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Menu mobile */}
      <nav
        id="mobile-menu"
        className={`${styles.mobileNav} ${isOpen ? styles.mobileNavOpen : ""}`}
        aria-label="Navigation mobile"
      >
        <div className={styles.mobileNavContent}>
          <Link
            href="/"
            className={`${styles.mobileLink} ${pathname === "/" ? styles.mobileLinkActive : ""}`}
          >
            Accueil
          </Link>

          {navItems.map((section) => {
            const isActive = section.id === "about" ? pathname?.startsWith("/about") : false;
            return (
              <a
                key={section.id}
                href={section.href}
                className={`${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ""}`}
              >
                {section.label}
              </a>
            );
          })}

          <Link
            href="/services"
            className={`${styles.mobileLink} ${pathname === "/services" ? styles.mobileLinkActive : ""}`}
          >
            Services
          </Link>

          <Link
            href="/cms-ecommerce"
            className={`${styles.mobileLink} ${pathname === "/cms-ecommerce" ? styles.mobileLinkActive : ""}`}
          >
            CMS
          </Link>

          <Link
            href="/blog"
            className={`${styles.mobileLink} ${pathname?.startsWith("/blog") ? styles.mobileLinkActive : ""}`}
          >
            Blog
          </Link>

          <Link
            href="/contact"
            className={`${styles.mobileLink} ${pathname === "/contact" ? styles.mobileLinkActive : ""}`}
          >
            Contact
          </Link>
        </div>
      </nav>
    </>
  );
}
