"use client";

import React, { useEffect, useRef, useState } from "react";
import { TIMELINE_ITEMS } from "@/lib/aboutTimelineData";
import styles from './Timeline.module.css';

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLg, setIsLg] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = itemRefs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            setActiveIndex(index);
          }
        });
      },
      {
        threshold: [0, 0.3, 0.6, 1],
        rootMargin: "-15% 0px -15% 0px",
      }
    );

    itemRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  // Progression de scroll
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const { scrollTop, scrollHeight, clientHeight } = el;
      const progress = (scrollTop / Math.max(1, scrollHeight - clientHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
    };
    const el = containerRef.current;
    if (!el) return;

    const options: AddEventListenerOptions = { passive: true };
    el.addEventListener("scroll", handleScroll, options);
    handleScroll();

    return () => {
      el.removeEventListener("scroll", handleScroll, options);
    };
  }, []);

  // Responsive
  useEffect(() => {
    const update = () => {
      if (typeof window === "undefined") return;
      setIsLg(window.innerWidth >= 1024);
      setIsMobile(window.innerWidth < 768);
    };
    update();

    const options: AddEventListenerOptions = { passive: true };
    window.addEventListener("resize", update, options);
    return () => window.removeEventListener("resize", update, options);
  }, []);

  return (
    <div className={`${styles.timelineContainer} ${isMobile ? styles.mobile : ''}`}>
      {/* Background glow */}
      <div className={styles.backgroundGlow} />

      {/* Timeline dots - vertical (desktop only) */}
      {isLg && (
        <div className={styles.timelineRail}>
          <div className={styles.railContainer}>
            {/* Vertical line */}
            <div className={styles.railLine} />

            {/* Progress line */}
            <div
              className={styles.railProgress}
              style={{ height: `${(activeIndex / Math.max(1, TIMELINE_ITEMS.length - 1)) * 100}%` }}
            />

            {/* Dots */}
            {TIMELINE_ITEMS.map((item, index) => (
              <div
                key={index}
                className={styles.railDotWrapper}
                style={{ top: `${(index / Math.max(1, TIMELINE_ITEMS.length - 1)) * 100}%` }}
              >
                <div className={`${styles.railDot} ${index === activeIndex ? styles.railDotActive : ''} ${index <= activeIndex ? styles.railDotFilled : ''}`} />

                {index === activeIndex && (
                  <div className={styles.railLabel}>
                    <span>{item.year}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scrollable content */}
      <div
        ref={containerRef}
        className={`${styles.scrollableContent} ${isMobile ? styles.scrollableContentMobile : ''}`}
      >
        {/* Header sticky */}
        <div className={`${styles.timelineHeader} ${isMobile && scrollProgress > 10 ? styles.headerHidden : ''}`}>
          <div className={styles.headerContent}>
            <h1 className={styles.headerTitle}>Notre Histoire</h1>
            <div className={styles.headerAccent}>
              <div className={styles.headerAccentLine} />
              <p className={styles.headerSubtitle}>Parcours Smidjan</p>
            </div>
          </div>
        </div>

        <div className={styles.spacerTop} />

        {TIMELINE_ITEMS.map((item, index) => (
          <div
            key={item.year}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={`${styles.timelineItem} ${isMobile ? styles.timelineItemMobile : ''}`}
          >
            <div className={styles.itemContent}>
              <div className={styles.contentGrid}>
                {/* Year Display */}
                <div className={`${styles.yearDisplay} ${activeIndex === index ? styles.yearDisplayActive : ''}`}>
                  <div className={styles.yearContainer}>
                    <div className={styles.yearText}>{item.year}</div>
                    <div className={`${styles.yearGlow1} ${activeIndex === index ? styles.yearGlowActive : ''}`} />
                    <div className={`${styles.yearGlow2} ${activeIndex === index ? styles.yearGlowActive : ''}`} />
                  </div>
                </div>

                {/* Content */}
                <div className={`${styles.itemDetails} ${activeIndex === index ? styles.itemDetailsActive : ''}`}>
                  <div className={styles.detailsInner}>
                    {/* Index row */}
                    <div className={styles.indexRow}>
                      <span className={styles.indexNumber}>{String(index + 1).padStart(2, "0")}</span>
                      <div className={styles.indexLine} />
                    </div>

                    {/* Title */}
                    <h2 className={styles.itemTitle}>{item.title}</h2>

                    {/* Decorative row */}
                    <div className={styles.decoRow}>
                      <div className={styles.decoLineA} />
                      <div className={styles.decoDot} />
                      <div className={styles.decoLineB} />
                    </div>

                    {/* Description */}
                    <p className={styles.itemText}>{item.text}</p>

                    {/* Progress bar */}
                    <div className={styles.stepProgress}>
                      <div className={styles.stepMeta}>
                        <span>Étape</span>
                        <span>{index + 1} / {TIMELINE_ITEMS.length}</span>
                      </div>
                      <div className={styles.stepBar}>
                        <div
                          className={styles.stepFill}
                          style={{ width: `${((index + 1) / TIMELINE_ITEMS.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className={styles.spacerBottom} />
      </div>

      {/* Scroll indicator */}
      <div className={`${styles.scrollIndicator} ${scrollProgress > 5 ? styles.scrollIndicatorHidden : ''}`}>
        <div className={styles.scrollContent}>
          <span className={styles.scrollLabel}>Scroll</span>
          <div className={styles.scrollMouse}>
            <div className={styles.scrollWheel} />
          </div>
        </div>
      </div>
    </div>
  );
}
