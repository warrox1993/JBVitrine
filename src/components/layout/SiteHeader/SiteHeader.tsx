"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SiteHeader.module.css";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/conformite-nis2", label: "Conformité NIS2" },
  { href: "/approche", label: "Approche" },
  { href: "/agence", label: "Agence" },
  { href: "/blog", label: "Journal" },
] as const;

/**
 * Sticky top-nav header — brand, nav links, phone, orange CTA + mobile menu.
 * Client component: active link via usePathname, hamburger toggle via state.
 * Ported from the approved corporate mockup.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={styles.site}>
      <div className={styles.nav}>
        <Link className={styles.brand} href="/" aria-label="Smidjan, accueil">
          <svg
            className={styles.logo}
            viewBox="0 0 40 40"
            fill="none"
            aria-hidden="true"
          >
            <rect width="40" height="40" rx="9" fill="#0b1f3a" />
            <path
              d="M20 8l9 3.4v6.9c0 5.6-3.7 10.7-9 12.3-5.3-1.6-9-6.7-9-12.3v-6.9L20 8Z"
              fill="none"
              stroke="#ff6a00"
              strokeWidth="2"
            />
            <path
              d="M15.8 20.2l3 3 5.4-6"
              stroke="#fff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={styles.brandText}>
            Smidjan
            <small>Cybersécurité · Liège</small>
          </span>
        </Link>

        <nav
          id="site-nav"
          className={`${styles.main} ${open ? styles.open : ""}`}
          aria-label="Navigation principale"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? styles.active : undefined}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.cta}>
          <a className={styles.tel} href="tel:+3242680000">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
            </svg>
            04 268 00 00
          </a>
          <Link className={styles.primary} href="/contact">
            Diagnostic gratuit
          </Link>
          <button
            type="button"
            className={styles.toggle}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
