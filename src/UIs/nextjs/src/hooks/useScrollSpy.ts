"use client";
import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[], offset = 120) {
  const [activeId, setActiveId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!ids || ids.length === 0) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (elements.length === 0) return;

    const callback: IntersectionObserverCallback = (entries) => {
      // Choose the entry most in view (highest intersection ratio, with isIntersecting)
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));
      if (visible.length > 0) {
        const id = visible[0].target.getAttribute("id") || undefined;
        if (id) setActiveId(id);
      } else {
        // Fallback: pick the last section above the offset
        let candidate: string | undefined;
        for (const el of elements) {
          const rect = el.getBoundingClientRect();
          if (rect.top - offset <= 0) {
            candidate = el.id;
          }
        }
        if (candidate) setActiveId(candidate);
      }
    };

    const observer = new IntersectionObserver(callback, {
      // root is viewport
      root: null,
      rootMargin: `-${offset}px 0px -60% 0px`,
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    });

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [JSON.stringify(ids), offset]);

  return activeId;
}

