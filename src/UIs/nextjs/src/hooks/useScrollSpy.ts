"use client";

import { useEffect, useMemo, useState } from "react";

export function useScrollSpy(ids: string[], offset = 120): string | undefined {
  const [activeId, setActiveId] = useState<string | undefined>(undefined);

  const serializedIds = useMemo(
    () =>
      ids
        .map((id) => id.trim())
        .filter(Boolean)
        .join("|"),
    [ids],
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const currentIds = serializedIds
      ? serializedIds.split("|").filter(Boolean)
      : [];

    if (currentIds.length === 0) {
      return;
    }

    const elements = currentIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) {
      return;
    }

    const callback: IntersectionObserverCallback = (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
        );

      if (visibleEntries.length > 0) {
        const candidate =
          visibleEntries[0].target.getAttribute("id") ?? undefined;
        if (candidate) {
          setActiveId(candidate);
          return;
        }
      }

      let fallbackId: string | undefined;
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top - offset <= 0) {
          fallbackId = element.id;
        }
      });
      if (fallbackId) {
        setActiveId(fallbackId);
      }
    };

    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: `-${offset}px 0px -60% 0px`,
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    });

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [offset, serializedIds]);

  return activeId;
}
