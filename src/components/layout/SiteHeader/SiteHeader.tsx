"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import styles from "./SiteHeader.module.css";
import { ThemeToggle } from "@/components/ui/ThemeToggle/ThemeToggle";
import { Icon } from "@/components/ui/Icon/Icon";

const NAV_LINKS = [
  { href: "/services", labelKey: "nav.services" },
  { href: "/conformite-nis2", labelKey: "nav.conformite" },
  { href: "/approche", labelKey: "nav.approche" },
  { href: "/agence", labelKey: "nav.agence" },
  { href: "/certifications", labelKey: "nav.certifications" },
  { href: "/projets", labelKey: "nav.projets" },
  { href: "/blog", labelKey: "nav.journal" },
] as const;

const SOCIAL_LINKS = [
  { key: "github", href: "https://github.com/warrox1993", icon: "github" as const, ariaKey: "header.githubAria" },
  {
    key: "linkedin",
    href: "https://www.linkedin.com/in/jean-baptistedhondt",
    icon: "linkedin" as const,
    ariaKey: "header.linkedinAria",
  },
] as const;

/**
 * Sticky top-nav header: brand, nav links, GitHub/LinkedIn icons, orange CTA
 * + mobile menu. Client component: active link via usePathname, hamburger
 * toggle via state. Ported from the approved corporate mockup (phone swapped
 * for profile links: the phone number stays in the footer and contact page).
 */
export default function SiteHeader() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on route change. Derived during render (React's
  // "adjusting state when a prop changes" pattern) instead of an effect: an
  // effect here would run setOpen(false) one render *after* the pathname
  // already changed, causing an extra re-render and a lint error
  // (react-hooks/set-state-in-effect). Tracking the previous pathname lets us
  // reset synchronously in the same render as the navigation.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

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
        <Link className={styles.brand} href="/" aria-label={t("brand.ariaHome")}>
          <svg
            className={styles.logo}
            viewBox="0 0 40 40"
            fill="none"
            aria-hidden="true"
          >
            <rect width="40" height="40" rx="9" fill="#0C1A16" />
            <path
              d="M20 8l9 3.4v6.9c0 5.6-3.7 10.7-9 12.3-5.3-1.6-9-6.7-9-12.3v-6.9L20 8Z"
              fill="none"
              stroke="#0B7A5B"
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
            <small>{t("brand.tagline")}</small>
          </span>
        </Link>

        <nav
          id="site-nav"
          className={`${styles.main} ${open ? styles.open : ""}`}
          aria-label={t("header.navAria")}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? styles.active : undefined}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {t(link.labelKey)}
            </Link>
          ))}
          <span className={styles.themeMobile}>
            <ThemeToggle />
          </span>
        </nav>

        <div className={styles.cta}>
          <span className={styles.themeDesktop}>
            <ThemeToggle />
          </span>
          <span className={styles.social}>
            {SOCIAL_LINKS.map(({ key, href, icon, ariaKey }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(ariaKey)}
              >
                <Icon name={icon} size={19} />
              </a>
            ))}
          </span>
          <Link className={styles.primary} href="/contact">
            {t("header.cta")}
          </Link>
          <button
            type="button"
            className={styles.toggle}
            aria-label={open ? t("header.closeMenu") : t("header.openMenu")}
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
