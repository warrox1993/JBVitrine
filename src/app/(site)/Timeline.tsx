"use client";

import React, { useEffect, useState } from "react";
import { TIMELINE_ITEMS } from "@/lib/aboutTimelineData";
import { ChevronUp, ChevronDown } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar/ProgressBar";
import styles from './Timeline.module.css';

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLg, setIsLg] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Navigation handlers (must be defined before keyboard navigation useEffect)
  const handleNext = () => {
    setDirection('next');
    setActiveIndex(prev => {
      // Loop back to start when reaching the end
      if (prev >= TIMELINE_ITEMS.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  };

  const handlePrev = () => {
    setDirection('prev');
    setActiveIndex(prev => {
      // Loop to end when at the start
      if (prev <= 0) {
        return TIMELINE_ITEMS.length - 1;
      }
      return prev - 1;
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch/Swipe support for mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe up → Next
      handleNext();
    }
    if (touchEnd - touchStart > 50) {
      // Swipe down → Previous
      handlePrev();
    }
  };

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

  // Reset direction after transition
  useEffect(() => {
    if (direction) {
      const timer = setTimeout(() => setDirection(null), 600);
      return () => clearTimeout(timer);
    }
  }, [direction]);

  // Auto-scroll functionality
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex(prev => {
        // Loop back to start when reaching the end
        if (prev >= TIMELINE_ITEMS.length - 1) {
          setDirection('next');
          return 0;
        }
        setDirection('next');
        return prev + 1;
      });
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused, activeIndex]);

  const activeItem = TIMELINE_ITEMS[activeIndex];

  return (
    <div
      className={`${styles.timelineContainer} ${isMobile ? styles.mobile : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background glow */}
      <div className={styles.backgroundGlow} />

      {/* Timeline dots - vertical (desktop only) */}
      {isLg && (
        <div className={styles.timelineRail}>
          <div className={styles.railContainer}>
            {/* Vertical line */}
            <div className={styles.railLine} />

            {/* Progress line */}
            <div className={styles.railProgress}>
              <ProgressBar
                value={activeIndex}
                max={Math.max(1, TIMELINE_ITEMS.length - 1)}
                direction="vertical"
                ariaLabel={`Progression: ${activeIndex + 1} sur ${TIMELINE_ITEMS.length}`}
              />
            </div>

            {/* Dots */}
            {TIMELINE_ITEMS.map((item, index) => (
              <button
                key={index}
                className={styles.railDotWrapper}
                style={{ top: `${(index / Math.max(1, TIMELINE_ITEMS.length - 1)) * 100}%` }}
                onClick={() => {
                  setDirection(index > activeIndex ? 'next' : 'prev');
                  setActiveIndex(index);
                }}
                aria-label={`Aller à l'année ${item.year}`}
              >
                <div className={`${styles.railDot} ${index === activeIndex ? styles.railDotActive : ''} ${index <= activeIndex ? styles.railDotFilled : ''}`} />

                {index === activeIndex && (
                  <div className={styles.railLabel}>
                    <span>{item.year}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main content - Single section display */}
      <div className={styles.contentWrapper}>
        {/* Header */}
        <div className={styles.timelineHeader}>
          <div className={styles.headerContent}>
            <h1 className={styles.headerTitle}>Notre Histoire</h1>
            <div className={styles.headerAccent}>
              <div className={styles.headerAccentLine} />
              <p className={styles.headerSubtitle}>Parcours Smidjan</p>
            </div>
          </div>
        </div>

        {/* Active Timeline Item */}
        <div
          className={`${styles.timelineItem} ${direction ? styles[`slide${direction === 'next' ? 'Next' : 'Prev'}`] : ''}`}
          key={activeItem.year}
        >
          <div className={styles.itemContent}>
            <div className={styles.contentGrid}>
              {/* Year Display */}
              <div className={`${styles.yearDisplay} ${styles.yearDisplayActive}`}>
                <div className={styles.yearContainer}>
                  <div className={styles.yearText}>{activeItem.year}</div>
                  <div className={`${styles.yearGlow1} ${styles.yearGlowActive}`} />
                  <div className={`${styles.yearGlow2} ${styles.yearGlowActive}`} />
                </div>
              </div>

              {/* Content */}
              <div className={`${styles.itemDetails} ${styles.itemDetailsActive}`}>
                <div className={styles.detailsInner}>
                  {/* Index row */}
                  <div className={styles.indexRow}>
                    <span className={styles.indexNumber}>{String(activeIndex + 1).padStart(2, "0")}</span>
                    <div className={styles.indexLine} />
                  </div>

                  {/* Title */}
                  <h2 className={styles.itemTitle}>{activeItem.title}</h2>

                  {/* Decorative row */}
                  <div className={styles.decoRow}>
                    <div className={styles.decoLineA} />
                    <div className={styles.decoDot} />
                    <div className={styles.decoLineB} />
                  </div>

                  {/* Description */}
                  <p className={styles.itemText}>{activeItem.text}</p>

                  {/* Progress bar */}
                  <div className={styles.stepProgress}>
                    <div className={styles.stepMeta}>
                      <span>Étape</span>
                      <span>{activeIndex + 1} / {TIMELINE_ITEMS.length}</span>
                    </div>
                    <div className={styles.stepBar}>
                      <ProgressBar
                        value={activeIndex + 1}
                        max={TIMELINE_ITEMS.length}
                        ariaLabel={`Étape ${activeIndex + 1} sur ${TIMELINE_ITEMS.length}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls - Discrete arrows only */}
      <button
        onClick={handlePrev}
        className={`${styles.navArrow} ${styles.navArrowUp}`}
        aria-label="Section précédente"
      >
        <ChevronUp size={28} />
      </button>

      <button
        onClick={handleNext}
        className={`${styles.navArrow} ${styles.navArrowDown}`}
        aria-label="Section suivante"
      >
        <ChevronDown size={28} />
      </button>

      {/* Keyboard hint */}
      {!isMobile && (
        <div className={styles.keyboardHint}>
          <span>Utilisez les flèches ↑ ↓ pour naviguer</span>
        </div>
      )}
    </div>
  );
}
