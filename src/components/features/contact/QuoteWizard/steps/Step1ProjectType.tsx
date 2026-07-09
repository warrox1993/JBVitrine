'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { Globe, ShoppingCart, Monitor, Shield, Bot, Info } from 'lucide-react';
import { ProjectType } from '../types';
import { projectTypeConfigs } from '@/lib/pricing/features';
import cls from './Step1ProjectType.module.css';

interface Step1ProjectTypeProps {
  selected: ProjectType | null;
  onChange: (type: ProjectType) => void;
  onNext: () => void;
}

export function Step1ProjectType({ selected, onChange, onNext }: Step1ProjectTypeProps) {
  const t = useTranslations('wizard');
  const [showInfo, setShowInfo] = useState<ProjectType | null>(null);
  const [bubblePosition, setBubblePosition] = useState({ top: 0, left: 0, placement: 'bottom' });
  const [isMounted, setIsMounted] = useState(false);
  const infoButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const infoBubbleRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Icon mapping for project types
  const projectIcons: Record<ProjectType, React.ReactNode> = {
    siteVitrine: <Globe size={32} />,
    ecommerce: <ShoppingCart size={32} />,
    appWeb: <Monitor size={32} />,
    auditCyber: <Shield size={32} />,
    aiAutomation: <Bot size={32} />,
    cmsBlog: <Globe size={32} />, // Fallback, though filtered out
  };

  // Detailed explanations for each project type
  const projectInfo: Record<ProjectType, {
    title: string;
    explanation: string;
    blogUrl: string;
  }> = {
    siteVitrine: {
      title: t('step1.info.siteVitrine.title'),
      explanation: t('step1.info.siteVitrine.explanation'),
      blogUrl: "/blog/creer-boutique-en-ligne-nextjs-belgique"
    },
    ecommerce: {
      title: t('step1.info.ecommerce.title'),
      explanation: t('step1.info.ecommerce.explanation'),
      blogUrl: "/blog/creer-boutique-en-ligne-nextjs-belgique"
    },
    appWeb: {
      title: t('step1.info.appWeb.title'),
      explanation: t('step1.info.appWeb.explanation'),
      blogUrl: "/blog/creer-boutique-en-ligne-nextjs-belgique"
    },
    auditCyber: {
      title: t('step1.info.auditCyber.title'),
      explanation: t('step1.info.auditCyber.explanation'),
      blogUrl: "/blog/securiser-application-web-owasp-belgique"
    },
    aiAutomation: {
      title: t('step1.info.aiAutomation.title'),
      explanation: t('step1.info.aiAutomation.explanation'),
      blogUrl: "/blog/automatiser-workflows-n8n-ia-entreprise"
    },
    cmsBlog: {
      title: t('step1.info.cmsBlog.title'),
      explanation: t('step1.info.cmsBlog.explanation'),
      blogUrl: "/blog"
    }
  };

  const handleSelect = (type: ProjectType) => {
    console.log('Step1: Project type selected:', type);
    onChange(type);
    console.log('Step1: Auto-advancing to next step');
    onNext();
  };

  // Calculate optimal position for info bubble
  const calculateBubblePosition = useCallback(() => {
    if (!showInfo || !infoButtonRefs.current[showInfo] || !infoBubbleRef.current) return;

    const button = infoButtonRefs.current[showInfo];
    const buttonRect = button.getBoundingClientRect();
    const bubbleRect = infoBubbleRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const gap = 8;
    const margin = 16;

    let top = 0;
    let left = 0;
    let placement = 'bottom';

    // Try bottom first
    top = buttonRect.bottom + gap;
    left = buttonRect.left;

    // Check if fits below
    const fitsBelow = top + bubbleRect.height + margin <= viewportHeight;

    if (!fitsBelow) {
      top = buttonRect.top - bubbleRect.height - gap;
      placement = 'top';
    }

    // Adjust horizontal if overflowing
    if (left + bubbleRect.width + margin > viewportWidth) {
      left = viewportWidth - bubbleRect.width - margin;
    }

    if (left < margin) {
      left = margin;
    }

    setBubblePosition({ top, left, placement });
  }, [showInfo]);

  const handleMouseEnter = useCallback((type: ProjectType) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setShowInfo(type);
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    hoverTimeoutRef.current = setTimeout(() => {
      setShowInfo(null);
    }, 100);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  const handleFocus = useCallback((type: ProjectType) => () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setShowInfo(type);
  }, []);

  const handleBlur = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setShowInfo(null);
    }, 100);
  }, []);

  useEffect(() => {
    if (showInfo) {
      requestAnimationFrame(() => {
        calculateBubblePosition();
      });
      window.addEventListener('scroll', calculateBubblePosition, true);
      window.addEventListener('resize', calculateBubblePosition);
      return () => {
        window.removeEventListener('scroll', calculateBubblePosition, true);
        window.removeEventListener('resize', calculateBubblePosition);
      };
    }
  }, [showInfo, calculateBubblePosition]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional mount detection
    setIsMounted(true);
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  console.log('Step1ProjectType render - selected:', selected);

  return (
    <>
    <div className={cls.step}>
      <header className={cls.header}>
        <h2 className={cls.title}>{t('step1.title')}</h2>
      </header>

      <div className={cls.grid}>
        {(Object.keys(projectTypeConfigs) as ProjectType[])
          .filter((type) => type !== 'cmsBlog') // Blog is included in siteVitrine features
          .map((type) => {
          const config = projectTypeConfigs[type];
          const isSelected = selected === type;

          return (
            <div key={type} className={cls.cardWrapper}>
              <button
                type="button"
                className={`${cls.card} ${isSelected ? cls.selected : ''}`}
                onClick={() => handleSelect(type)}
                aria-pressed={isSelected}
              >
                <div className={cls.cardIcon}>{projectIcons[type]}</div>
                <h3 className={cls.cardTitle}>{config.name}</h3>
                <p className={cls.cardDescription}>{config.description}</p>
                {isSelected && (
                  <div className={cls.selectedIndicator} aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" fill="currentColor" />
                      <path
                        d="M9 12l2 2 4-4"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </button>

              {/* Info button */}
              <button
                ref={(el) => { infoButtonRefs.current[type] = el; }}
                type="button"
                className={cls.infoBtn}
                onMouseEnter={handleMouseEnter(type)}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                onFocus={handleFocus(type)}
                onBlur={handleBlur}
                aria-label={t('step1.infoBtnAria', { name: config.name })}
                aria-expanded={showInfo === type}
              >
                <Info size={18} />
              </button>
            </div>
          );
        })}
      </div>

      <footer className={cls.footer}>
        <p className={cls.footerNote}>
          {t.rich('step1.footerNote', { b: (c) => <strong>{c}</strong> })}
        </p>
      </footer>
    </div>
    {/* Info bubble portal */}
    {isMounted && showInfo && projectInfo[showInfo] && createPortal(
      <div
        ref={infoBubbleRef}
        className={`${cls.infoBubble} ${cls[`placement-${bubblePosition.placement}`]}`}
        style={{
          '--bubble-top': `${bubblePosition.top}px`,
          '--bubble-left': `${bubblePosition.left}px`,
        } as React.CSSProperties}
        onMouseEnter={handleMouseEnter(showInfo)}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <h4 className={cls.infoBubbleTitle}>{projectInfo[showInfo].title}</h4>
        <p className={cls.infoBubbleText}>{projectInfo[showInfo].explanation}</p>
        <a
          href={projectInfo[showInfo].blogUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cls.infoBubbleLink}
        >
          {t('step1.infoBubbleLink')}
        </a>
      </div>,
      document.body
    )}
    </>
  );
}
