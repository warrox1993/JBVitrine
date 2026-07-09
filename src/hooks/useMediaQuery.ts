"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  // Deterministic `false` on the server AND the first client render, so SSR and
  // hydration match. The effect below sets the real value on mount.
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    ) {
      return;
    }

    const mediaList = window.matchMedia(query);
    const updateMatches = (event?: MediaQueryListEvent) => {
      const nextMatch = event ? event.matches : mediaList.matches;
      setMatches(nextMatch);
    };

    updateMatches();
    mediaList.addEventListener("change", updateMatches);

    return () => mediaList.removeEventListener("change", updateMatches);
  }, [query]);

  return matches;
}

/**
 * Breakpoint hooks prédéfinis (basés sur notre système)
 * Meilleures pratiques 2025
 */

export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 767px)");
}

export function useIsTablet(): boolean {
  return useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
}

export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}

export function useIsTouch(): boolean {
  return useMediaQuery("(hover: none) and (pointer: coarse)");
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function usePrefersDarkMode(): boolean {
  return useMediaQuery("(prefers-color-scheme: dark)");
}

export function usePrefersHighContrast(): boolean {
  return useMediaQuery("(prefers-contrast: high)");
}

/**
 * Hook pour device type complet
 */
export interface DeviceType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouch: boolean;
  prefersReducedMotion: boolean;
  prefersDarkMode: boolean;
}

export function useDevice(): DeviceType {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();
  const isTouch = useIsTouch();
  const prefersReducedMotion = usePrefersReducedMotion();
  const prefersDarkMode = usePrefersDarkMode();

  return {
    isMobile,
    isTablet,
    isDesktop,
    isTouch,
    prefersReducedMotion,
    prefersDarkMode,
  };
}
