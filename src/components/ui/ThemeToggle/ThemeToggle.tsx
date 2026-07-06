"use client";

import { useEffect, useState } from "react";
import { SunIcon } from "@/components/icons/SunIcon";
import { MoonIcon } from "@/components/icons/MoonIcon";
import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

/**
 * Zero-dependency light/dark toggle. The initial `data-theme` is set before
 * first paint by the inline no-flash script in the root layout (from
 * localStorage `smidjan-theme`, else the OS preference). This button only
 * flips it and persists the explicit choice.
 */
export function ThemeToggle() {
  // Starts null so SSR and first client render match (avoids hydration
  // mismatch); the real theme is read from the <html> attribute after mount.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  function toggle() {
    const next: Theme =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("smidjan-theme", next);
    } catch {
      /* localStorage unavailable (private mode) — ignore */
    }
    setTheme(next);
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      title={isDark ? "Mode clair" : "Mode sombre"}
    >
      {isDark ? (
        <SunIcon aria-hidden="true" />
      ) : (
        <MoonIcon aria-hidden="true" />
      )}
    </button>
  );
}
