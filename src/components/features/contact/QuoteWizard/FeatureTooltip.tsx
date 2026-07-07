'use client';

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { Info } from 'lucide-react';
import cls from './FeatureTooltip.module.css';

interface FeatureTooltipProps {
  content: string;
}

// Parse simple markdown to HTML
function parseMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}

export function FeatureTooltip({ content }: FeatureTooltipProps) {
  const t = useTranslations('wizard');
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, placement: 'bottom' });
  const [isMounted, setIsMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const htmlContent = useMemo(() => parseMarkdown(content), [content]);

  // Calculate optimal position avoiding viewport edges
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const gap = 8;
    const margin = 16;

    let top = 0;
    let left = 0;
    let placement = 'bottom';

    // Try bottom first (preferred)
    top = triggerRect.bottom + gap;
    left = triggerRect.left;

    // Check if tooltip fits below
    const fitsBelow = top + tooltipRect.height + margin <= viewportHeight;

    // If doesn't fit below, try above
    if (!fitsBelow) {
      top = triggerRect.top - tooltipRect.height - gap;
      placement = 'top';
    }

    // Adjust horizontal position if overflowing
    if (left + tooltipRect.width + margin > viewportWidth) {
      // Align to right edge
      left = viewportWidth - tooltipRect.width - margin;
    }

    // Ensure not cut off on left
    if (left < margin) {
      left = margin;
    }

    setPosition({ top, left, placement });
  }, []);

  // Show tooltip with delay cancellation
  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsVisible(true);
  }, []);

  // Hide tooltip with delay to prevent flickering
  const handleMouseLeave = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    hoverTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 100);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  const handleFocus = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsVisible(true);
  }, []);

  const handleBlur = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 100);
  }, []);

  // Recalculate position when visible
  useEffect(() => {
    if (isVisible) {
      // Wait for tooltip to render, then calculate position
      requestAnimationFrame(() => {
        calculatePosition();
      });
      // Recalculate on scroll/resize
      window.addEventListener('scroll', calculatePosition, true);
      window.addEventListener('resize', calculatePosition);
      return () => {
        window.removeEventListener('scroll', calculatePosition, true);
        window.removeEventListener('resize', calculatePosition);
      };
    }
  }, [isVisible, calculatePosition]);

  // Check if we're in browser
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional mount detection
    setIsMounted(true);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const tooltipElement = isVisible && isMounted ? (
    <div
      ref={tooltipRef}
      className={`${cls.tooltip} ${cls[`placement-${position.placement}`]}`}
      style={{
        '--tooltip-top': `${position.top}px`,
        '--tooltip-left': `${position.left}px`,
      } as React.CSSProperties}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="tooltip"
    >
      <div
        className={cls.tooltipContent}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  ) : null;

  return (
    <>
      <div className={cls.tooltipContainer}>
        <button
          ref={triggerRef}
          type="button"
          className={cls.trigger}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label={t('tooltip.moreInfo')}
          aria-expanded={isVisible}
        >
          <Info size={16} />
        </button>
      </div>
      {isMounted && createPortal(tooltipElement, document.body)}
    </>
  );
}
