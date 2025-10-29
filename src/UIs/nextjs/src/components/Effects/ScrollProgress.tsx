"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./ScrollProgress.module.css";

type PassiveListenerOptions = AddEventListenerOptions;

const passiveOptions: PassiveListenerOptions = { passive: true };

export function ScrollProgress(): React.ReactPortal | null {
  const barRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const isBrowser = typeof window !== "undefined";

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    const bar = barRef.current;
    const fill = fillRef.current;

    if (!bar || !fill) {
      return;
    }

    let ticking = false;
    let route = 0;
    let scrollProgress = 0;

    const setFillScale = (value: number) => {
      fill.style.transform = `scaleX(${Math.min(Math.max(value, 0), 1)})`;
    };

    const setVisibility = (visible: boolean) => {
      if (visible) {
        bar.style.display = "block";
        bar.style.opacity = "1";
      } else {
        bar.style.opacity = "0";
        setTimeout(() => {
          if (bar.style.opacity === "0") {
            bar.style.display = "none";
          }
        }, 150);
      }
    };

    const update = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const max = doc.scrollHeight - doc.clientHeight || 1;
      scrollProgress = Math.min(1, Math.max(0, scrollTop / max));

      // Si on a scrollé, on montre la progression du scroll
      // Sinon, on montre la progression de route (chargement)
      const isScrolling = scrollTop > 5;
      const displayValue = isScrolling ? scrollProgress : Math.max(scrollProgress, route);

      setFillScale(displayValue);
      bar.setAttribute("aria-valuenow", String(Math.round(displayValue * 100)));
      setVisibility(isScrolling || route > 0);
      ticking = false;
    };

    const requestUpdate = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    const handleScroll = () => requestUpdate();
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        requestUpdate();
      }
    };

    setFillScale(0);
    requestUpdate();

    window.addEventListener("scroll", handleScroll, passiveOptions);
    window.addEventListener("resize", handleScroll, passiveOptions);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    window.__progress = {
      set: (pct: number) => {
        const clamped = Math.max(0, Math.min(100, pct));
        route = clamped / 100;
        requestUpdate();
      },
      done: () => {
        route = 0;
        requestUpdate();
      },
    };

    return () => {
      window.removeEventListener("scroll", handleScroll, passiveOptions);
      window.removeEventListener("resize", handleScroll, passiveOptions);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      delete window.__progress;
    };
  }, [isBrowser]);

  if (!isBrowser) {
    return null;
  }

  const node = (
    <div
      ref={barRef}
      className={styles.progressBar}
      role="progressbar"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div ref={fillRef} className={styles.progressFill} />
    </div>
  );

  return createPortal(node, document.body);
}
