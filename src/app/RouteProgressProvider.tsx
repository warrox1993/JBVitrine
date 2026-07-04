"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type ProgressController = {
  set: (value: number) => void;
  done: () => void;
};

declare global {
  interface Window {
    __progress?: ProgressController;
  }
}

export default function RouteProgressProvider(): null {
  const pathname = usePathname();
  // Avoid triggering the progress bar on the very first page load
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    let cancelled = false;
    let tickOne: ReturnType<typeof setTimeout> | undefined;
    let tickTwo: ReturnType<typeof setTimeout> | undefined;
    let tickThree: ReturnType<typeof setTimeout> | undefined;
    let poll: ReturnType<typeof setInterval> | undefined;

    const kick = (): boolean => {
      const progress = window.__progress;
      if (!progress) return false;

      progress.set(15);
      tickOne = setTimeout(() => progress.set(55), 120);
      tickTwo = setTimeout(() => progress.set(85), 240);
      tickThree = setTimeout(() => progress.done(), 420);
      return true;
    };

    if (!kick()) {
      poll = setInterval(() => {
        if (cancelled) return;
        if (kick()) {
          clearInterval(poll);
          poll = undefined;
        }
      }, 16);
    }

    return () => {
      cancelled = true;
      if (poll) {
        clearInterval(poll);
      }
      if (tickOne) clearTimeout(tickOne);
      if (tickTwo) clearTimeout(tickTwo);
      if (tickThree) clearTimeout(tickThree);

      const progress = window.__progress;
      if (progress) {
        progress.done();
      }
    };
  }, [pathname]);

  return null;
}
