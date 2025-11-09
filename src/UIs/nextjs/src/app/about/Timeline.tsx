"use client";

import React, { useEffect, useState } from "react";
import { TIMELINE_ITEMS } from "@/lib/aboutTimelineData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from './Timeline.module.css';

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLg, setIsLg] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);

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
  }, [activeIndex]);

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

  // Navigation handlers
  const handleNext = () => {
    if (activeIndex < TIMELINE_ITEMS.length - 1) {
      setDirection('next');
      setActiveIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setDirection('prev');
      setActiveIndex(prev => prev - 1);
    }
  };

  // Reset direction after transition
  useEffect(() => {
    if (direction) {
      const timer = setTimeout(() => setDirection(null), 600);
      return () => clearTimeout(timer);
    }
  }, [direction]);

  const activeItem = TIMELINE_ITEMS[activeIndex];

  return (
    <div
      className={`${styles.timelineContainer} ${isMobile ? styles.mobile : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
            <div
              className={styles.railProgress}
              style={{ height: `${(activeIndex / Math.max(1, TIMELINE_ITEMS.length - 1)) * 100}%` }}
            />

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
                      <div
                        className={styles.stepFill}
                        style={{ width: `${((activeIndex + 1) / TIMELINE_ITEMS.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className={styles.navigationControls}>
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className={`${styles.navButton} ${styles.navButtonPrev}`}
          aria-label="Section précédente"
        >
          <ChevronLeft size={24} />
          <span className={styles.navButtonText}>Précédent</span>
        </button>

        <div className={styles.progressIndicator}>
          <span className={styles.progressText}>
            {activeItem.year}
          </span>
          <div className={styles.progressDots}>
            {TIMELINE_ITEMS.map((_, index) => (
              <button
                key={index}
                className={`${styles.progressDot} ${index === activeIndex ? styles.progressDotActive : ''}`}
                onClick={() => {
                  setDirection(index > activeIndex ? 'next' : 'prev');
                  setActiveIndex(index);
                }}
                aria-label={`Aller à la section ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={activeIndex === TIMELINE_ITEMS.length - 1}
          className={`${styles.navButton} ${styles.navButtonNext}`}
          aria-label="Section suivante"
        >
          <span className={styles.navButtonText}>Suivant</span>
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Keyboard hint */}
      {!isMobile && (
        <div className={styles.keyboardHint}>
          <span>Utilisez les flèches ← → pour naviguer</span>
        </div>
      )}
    </div>
  );
}
