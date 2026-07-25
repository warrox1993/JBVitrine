"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import styles from "./SiteHeader.module.css";
import { ThemeToggle } from "@/components/ui/ThemeToggle/ThemeToggle";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher/LocaleSwitcher";
import { Icon } from "@/components/ui/Icon/Icon";
import { BrandMark } from "@/components/ui/BrandMark/BrandMark";
import { social } from "@/config/site";

// Portfolio-oriented nav. "Services" is reframed as "Compétences"; the former
// "Approche" now lives inside "À propos" (/agence) and "Certifications" inside
// the new "CV" page — so both are dropped here to keep the bar uncluttered.
const NAV_LINKS = [
  { href: "/services", labelKey: "nav.competences" },
  { href: "/conformite-nis2", labelKey: "nav.conformite" },
  { href: "/agence", labelKey: "nav.agence" },
  { href: "/projets", labelKey: "nav.projets" },
  { href: "/cv", labelKey: "nav.cv" },
  { href: "/blog", labelKey: "nav.journal" },
] as const;

/**
 * Top-nav header — brand, nav links, a compact utilities cluster (language
 * switcher + GitHub/LinkedIn + theme) and a single CTA (+ mobile menu). The
 * social links and locale switcher live here as icon-sized controls so the bar
 * stays a portfolio "command center" without feeling crowded.
 *
 * Semi-sticky behaviour: the bar stays visible at the very top of the page
 * and while the user is actively scrolling (either direction); after a short
 * idle with no scroll (and past the top) it slides up out of view, reappearing
 * smoothly on the next scroll. It never hides while the mobile menu is open,
 * and auto-hide is disabled entirely under prefers-reduced-motion.
 */
export default function SiteHeader() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

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

  const headerRef = useRef<HTMLElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  // While the mobile menu is open: lock body scroll, close on Escape, and
  // restore focus to the hamburger when it closes (it behaves modally).
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        // Return focus to the trigger; clicking a link (route change) instead
        // lets the destination page manage focus, so we only do this on Escape.
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Semi-sticky: reveal on scroll activity, hide after idle when scrolled.
  // `hidden` is driven ONLY from the scroll handler / idle timer (async
  // callbacks — the pattern the set-state-in-effect lint allows); the effect
  // body itself never calls setState. The menu-open case is handled by the
  // derived `barHidden` below, not by resetting state here.
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    // Never auto-hide while the mobile menu is open (the menu anchors to the
    // bar); the derived `barHidden` keeps it shown, so we just skip wiring.
    if (open) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return; // keep the bar permanently visible; no motion.

    const TOP_ZONE = 12; // px: always show the bar this close to the top
    const IDLE_MS = 2200; // hide after this long without any scroll

    const clearIdle = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = null;
    };
    const scheduleHide = () => {
      clearIdle();
      idleTimer.current = setTimeout(() => {
        // Never hide the bar while one of its own controls holds keyboard
        // focus — that would push a focused link/CTA off-screen (WCAG 2.4.11).
        if (
          window.scrollY > TOP_ZONE &&
          !headerRef.current?.contains(document.activeElement)
        ) {
          setHidden(true);
        }
      }, IDLE_MS);
    };
    const onScroll = () => {
      if (window.scrollY <= TOP_ZONE) {
        setHidden(false);
        clearIdle();
        return;
      }
      // Any scroll (up or down) reveals the bar, then re-arms the idle timer.
      setHidden(false);
      scheduleHide();
    };
    // Reveal immediately when focus enters the header via the keyboard.
    const onFocusIn = () => {
      setHidden(false);
      clearIdle();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const headerEl = headerRef.current;
    headerEl?.addEventListener("focusin", onFocusIn);
    scheduleHide();
    return () => {
      window.removeEventListener("scroll", onScroll);
      headerEl?.removeEventListener("focusin", onFocusIn);
      clearIdle();
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // The bar is only ever hidden while the mobile menu is closed.
  const barHidden = hidden && !open;

  return (
    <header
      ref={headerRef}
      className={`${styles.site} ${barHidden ? styles.hidden : ""}`}
      data-hidden={barHidden || undefined}
    >
      <div className={styles.nav}>
        <Link className={styles.brand} href="/" aria-label={t("brand.ariaHome")}>
          <BrandMark className={styles.logo} />
          <span className={styles.brandText}>Smidjan</span>
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
          {/* Utilities repeated inside the mobile dropdown (hidden on desktop,
              where they live in the header row instead). */}
          <div className={styles.utilsMobile}>
            <LocaleSwitcher
              className={styles.lang}
              activeClassName={styles.langActive}
            />
            <span className={styles.socialRow}>
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={styles.social}
              >
                <Icon name="github" size={20} />
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={styles.social}
              >
                <Icon name="linkedin" size={20} />
              </a>
              <ThemeToggle />
            </span>
          </div>
        </nav>

        <div className={styles.cta}>
          {/* Desktop-only utilities cluster: language + social + theme. */}
          <div className={styles.utilsDesktop}>
            <LocaleSwitcher
              className={styles.lang}
              activeClassName={styles.langActive}
            />
            <span className={styles.socialRow}>
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={styles.social}
              >
                <Icon name="github" size={19} />
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={styles.social}
              >
                <Icon name="linkedin" size={19} />
              </a>
            </span>
            <ThemeToggle />
          </div>
          <Link className={styles.primary} href="/contact">
            {t("header.cta")}
          </Link>
          <button
            ref={toggleRef}
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
