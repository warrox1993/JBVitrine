"use client";
import { useEffect, useRef } from "react";
import styles from "./ScrollProgress.module.css";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let ticking = false;

    const update = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const max = (doc.scrollHeight - doc.clientHeight) || 1;
      const p = Math.min(1, Math.max(0, scrollTop / max));
      bar.style.setProperty('--progress', p.toFixed(5));
      bar.setAttribute('aria-valuenow', String(Math.round(p * 100)));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    // init + listeners
    update();
    window.addEventListener('scroll', onScroll, { passive: true } as any);
    window.addEventListener('resize', onScroll, { passive: true } as any);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') onScroll();
    });

    return () => {
      window.removeEventListener('scroll', onScroll as any);
      window.removeEventListener('resize', onScroll as any);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className={styles.progressBar}
      role="progressbar"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={styles.progressFill} />
    </div>
  );
}
