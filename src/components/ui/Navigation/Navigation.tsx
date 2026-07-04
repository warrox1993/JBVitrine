"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MenuIcon } from "@/components/icons/MenuIcon";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import styles from "./Navigation.module.css";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const scrollOptions: AddEventListenerOptions = { passive: true };
    window.addEventListener("scroll", handleScroll, scrollOptions);
    return () => window.removeEventListener("scroll", handleScroll, scrollOptions);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const nav = navRef.current;
    if (!nav) return;
    const focusable = nav.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          last?.focus();
          e.preventDefault();
        }
      } else if (document.activeElement === last) {
        first?.focus();
        e.preventDefault();
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onTab);
    document.addEventListener("keydown", onEsc);
    first?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onTab);
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav ref={navRef} className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`} aria-label="Navigation principale">
      <div className="container">
        <div className={styles.wrapper}>
          <Link href="/" className={styles.logo} aria-label="Retour à l'accueil">
            YourBrand
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={styles.menuButton}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
            aria-controls="nav-menu"
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          <ul id="nav-menu" className={`${styles.links} ${isOpen ? styles.open : ""}`} role="list">
            {NAVIGATION_ITEMS.map((item) => (
              <li key={item.href} role="listitem">
                <Link href={item.href} className={styles.link} onClick={() => setIsOpen(false)} aria-label={`Aller à la section ${item.label}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}


