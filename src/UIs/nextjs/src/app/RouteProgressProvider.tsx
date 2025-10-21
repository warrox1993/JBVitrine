"use client";
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function RouteProgressProvider() {
  const pathname = usePathname();
  // Avoid triggering the progress bar on the very first page load
  const isFirstRenderRef = useRef(true);
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }
    let cancelled = false;
    let t1: any, t2: any, t3: any, poll: any;

    const kick = () => {
      const p = (window as any).__progress;
      if (!p) return false;
      p.set(15);
      t1 = setTimeout(() => p.set(55), 120);
      t2 = setTimeout(() => p.set(85), 240);
      t3 = setTimeout(() => p.done(), 420);
      return true;
    };

    if (!kick()) {
      poll = setInterval(() => {
        if (cancelled) return;
        if (kick()) clearInterval(poll);
      }, 16);
    }

    return () => {
      cancelled = true;
      if (poll) clearInterval(poll);
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      const p = (window as any).__progress;
      if (p && typeof p.done === 'function') p.done();
    };
  }, [pathname]);
  return null;
}
