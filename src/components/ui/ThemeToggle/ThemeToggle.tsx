"use client";

import { useSyncExternalStore } from "react";
import { SunIcon } from "@/components/icons/SunIcon";
import { MoonIcon } from "@/components/icons/MoonIcon";
import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

// The <html data-theme> attribute is the source of truth (set before first
// paint by the inline no-flash script in the root layout). Reading it via
// useSyncExternalStore instead of useState+useEffect means there's no
// setState call in an effect body (react-hooks/set-state-in-effect): the
// MutationObserver subscription notifies React, which re-reads the snapshot.
function subscribeToTheme(callback: () => void) {
  if (typeof document === "undefined") return () => {};
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getThemeSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

// Unknown on the server; matches the no-flash script's default ("light")
// once hydrated, and useSyncExternalStore re-renders right after mount if
// the client snapshot differs (avoiding a hydration mismatch warning).
function getThemeServerSnapshot(): Theme | null {
  return null;
}

/**
 * Zero-dependency light/dark toggle. The initial `data-theme` is set before
 * first paint by the inline no-flash script in the root layout (from
 * localStorage `smidjan-theme`, else the OS preference). This button only
 * flips it and persists the explicit choice.
 */
export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getThemeServerSnapshot,
  );

  function toggle() {
    const next: Theme =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("smidjan-theme", next);
    } catch {
      /* localStorage unavailable (private mode): ignore */
    }
    // No local setState: the MutationObserver above picks up the attribute
    // change and useSyncExternalStore re-renders this component with it.
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
