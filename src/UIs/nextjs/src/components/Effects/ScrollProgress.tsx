"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ScrollProgress.module.css";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  // Mount portal first
  useEffect(() => { setMounted(true); }, []);

  // After portal mounted and refs available, wire up logic
  useEffect(() => {
    if (!mounted) return;
    const bar = barRef.current;
    if (!bar) return;

    let ticking = false;
    let route = 0; // internal route progress (0..1)
    let userArmed = false; // becomes true only after explicit user interaction

    const setVisibility = (visible: boolean) => {
      if (visible) {
        bar.style.removeProperty('display');
        bar.style.opacity = '1';
      } else {
        bar.style.opacity = '0';
        bar.style.display = 'none';
      }
    };

    const update = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const max = (doc.scrollHeight - doc.clientHeight) || 1;
      const p = Math.min(1, Math.max(0, scrollTop / max));
      bar.style.setProperty('--scroll', p.toFixed(5));
      bar.setAttribute('aria-valuenow', String(Math.round(p * 100)));
      // Only show bar on route progress OR if user explicitly interacted and there is scroll progress
      const visible = route > 0 || (userArmed && p > 0);
      setVisibility(visible);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    // Ensure hidden by default on first paint
    setVisibility(false);
    update();
    window.addEventListener('scroll', onScroll, { passive: true } as any);
    window.addEventListener('resize', onScroll, { passive: true } as any);
    const onVis = () => { if (document.visibilityState === 'visible') onScroll(); };
    document.addEventListener('visibilitychange', onVis);

    // Arm only after explicit user interactions (not UA scroll restoration or anchor jumps)
    const arm = () => {
      if (!userArmed) {
        userArmed = true;
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      }
    };
    const onKey = (e: KeyboardEvent) => {
      const keys = ['PageDown','PageUp','ArrowDown','ArrowUp','Home','End',' '];
      if (keys.includes(e.key)) arm();
    };
    window.addEventListener('pointerdown', arm, { passive: true } as any);
    window.addEventListener('wheel', arm, { passive: true } as any);
    window.addEventListener('touchstart', arm, { passive: true } as any);
    window.addEventListener('keydown', onKey as any);

    (window as any).__progress = {
      set: (pct: number) => {
        const clamped = Math.max(0, Math.min(100, pct));
        route = clamped / 100;
        bar.style.setProperty('--route', String(route));
        // Ensure bar becomes visible during route progress
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      done: () => {
        route = 0;
        bar.style.setProperty('--route', '0');
        // Re-evaluate visibility; hide if no scroll progress
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      }
    };

    return () => {
      window.removeEventListener('scroll', onScroll as any);
      window.removeEventListener('resize', onScroll as any);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pointerdown', arm as any);
      window.removeEventListener('wheel', arm as any);
      window.removeEventListener('touchstart', arm as any);
      window.removeEventListener('keydown', onKey as any);
      delete (window as any).__progress;
    };
  }, [mounted]);

  const node = (
    <div
      ref={barRef}
      className={styles.progressBar}
      style={{ opacity: 0, display: 'none' }}
      role="progressbar"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div ref={innerRef} className={styles.progressFill} />
    </div>
  );

  // Render via portal to escape any local stacking contexts
  return mounted ? createPortal(node, document.body) : null;
}
