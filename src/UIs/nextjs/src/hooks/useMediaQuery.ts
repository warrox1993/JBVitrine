"use client";

import { useEffect, useState } from "react";

const resolveMatch = (query: string): boolean => {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return false;
  }
  return window.matchMedia(query).matches;
};

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => resolveMatch(query));

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
