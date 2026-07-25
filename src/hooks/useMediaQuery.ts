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
