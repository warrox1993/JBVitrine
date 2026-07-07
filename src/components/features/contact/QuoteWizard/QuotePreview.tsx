'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { QuoteEstimate, QuoteData } from './types';
import { formatPriceRange, formatPrice } from '@/lib/pricing/calculator';
import { getProjectTypeConfig } from '@/lib/pricing/features';
import cls from './QuotePreview.module.css';

interface QuotePreviewProps {
  estimate: QuoteEstimate;
  quoteData: QuoteData;
}

export const QuotePreview = React.memo(function QuotePreview({ estimate, quoteData }: QuotePreviewProps) {
  const t = useTranslations('wizard');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileBarVisible, setIsMobileBarVisible] = useState(true);
  const mobileBarRef = useRef<HTMLDivElement>(null);

  const config = quoteData.projectType
    ? getProjectTypeConfig(quoteData.projectType)
    : null;

  // Hook to detect when scrolling reaches footer and hide mobile bar
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      // Mobile bar logic
      const wizard = mobileBarRef.current?.closest('[class*="wizard"]');
      if (wizard) {
        const wizardRect = wizard.getBoundingClientRect();
        const wizardBottom = wizardRect.bottom;
        const windowHeight = window.innerHeight;
        const offsetToHideLater = -75;

        if (wizardBottom <= windowHeight + offsetToHideLater) {
          setIsMobileBarVisible(false);
        } else {
          setIsMobileBarVisible(true);
        }
      }
    };

    // Run on mount and scroll
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  if (!config) return null;

  const complexityLabel =
    estimate.complexity === 'simple'
      ? t('common.complexitySimple')
      : estimate.complexity === 'medium'
        ? t('common.complexityMedium')
        : t('common.complexityComplex');

  // Desktop version (full detail)
  const desktopVersion = (
    <div className={cls.preview}>
      <div className={cls.sticky}>
        <h3 className={cls.title}>{t('preview.title')}</h3>

        <div className={cls.projectType}>
          <span className={cls.name}>{config.name}</span>
        </div>

        <div className={cls.price}>
          <div className={cls.priceLabel}>{t('common.budgetLabel')}</div>
          <div className={cls.priceValue}>
            {formatPriceRange(estimate.min, estimate.max)}
          </div>
        </div>

        <div className={cls.details}>
          <div className={cls.detailRow}>
            <span className={cls.detailLabel}>{t('common.delai')}</span>
            <span className={cls.detailValue}>{estimate.timeline}</span>
          </div>
          <div className={cls.detailRow}>
            <span className={cls.detailLabel}>{t('common.complexityLabel')}</span>
            <span className={cls.detailValue}>
              {complexityLabel}
            </span>
          </div>
          <div className={cls.detailRow}>
            <span className={cls.detailLabel}>{t('common.featuresLabel')}</span>
            <span className={cls.detailValue}>{estimate.totalFeatures}</span>
          </div>
        </div>

        <div className={cls.breakdown}>
          <h4 className={cls.breakdownTitle}>{t('preview.breakdownTitle')}</h4>
          <div className={cls.breakdownList}>
            {/* Show ALL items on desktop */}
            {estimate.breakdown.map((item, index) => (
              <div key={index} className={cls.breakdownItem}>
                <span className={cls.breakdownName}>{item.item}</span>
                <span className={cls.breakdownPrice}>
                  {item.price === 0 ? t('common.included') : formatPrice(item.price)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={cls.note}>
          {t('preview.note')}
        </div>
      </div>
    </div>
  );

  // Mobile version (sticky bottom bar)
  const mobileVersion = (
    <>
      {/* Mobile sticky bottom bar */}
      <div
        ref={mobileBarRef}
        className={cls.mobileBar}
        style={{
          opacity: isMobileBarVisible ? 1 : 0,
          transform: isMobileBarVisible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
        role="complementary"
        aria-label={t('preview.mobileBarAria')}
      >
        <button
          type="button"
          className={cls.mobileToggle}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-label={t('preview.mobileToggleAria')}
          aria-controls="mobile-quote-panel"
        >
          <div className={cls.mobileBarContent}>
            <div className={cls.mobileBarLeft}>
              <span className={cls.mobileBarLabel}>{t('common.budgetLabel')}</span>
              <span className={cls.mobileBarPrice}>
                {formatPriceRange(estimate.min, estimate.max)}
              </span>
            </div>
            <div className={cls.mobileBarIcon}>
              {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
            </div>
          </div>
        </button>

        {/* Expandable detail panel */}
        {isExpanded && (
          <div
            id="mobile-quote-panel"
            className={cls.mobilePanel}
            role="region"
            aria-label={t('preview.mobilePanelAria')}
          >
            <div className={cls.mobilePanelContent}>
              <div className={cls.projectType}>
                <span className={cls.name}>{config.name}</span>
              </div>

              <div className={cls.details}>
                <div className={cls.detailRow}>
                  <span className={cls.detailLabel}>{t('common.delai')}</span>
                  <span className={cls.detailValue}>{estimate.timeline}</span>
                </div>
                <div className={cls.detailRow}>
                  <span className={cls.detailLabel}>{t('common.complexityLabel')}</span>
                  <span className={cls.detailValue}>
                    {complexityLabel}
                  </span>
                </div>
                <div className={cls.detailRow}>
                  <span className={cls.detailLabel}>{t('common.featuresLabel')}</span>
                  <span className={cls.detailValue}>{estimate.totalFeatures}</span>
                </div>
              </div>

              <div className={cls.breakdown}>
                <h4 className={cls.breakdownTitle}>{t('preview.breakdownTitle')}</h4>
                <div className={cls.breakdownList}>
                  {estimate.breakdown.map((item, index) => (
                    <div key={index} className={cls.breakdownItem}>
                      <span className={cls.breakdownName}>{item.item}</span>
                      <span className={cls.breakdownPrice}>
                        {item.price === 0 ? t('common.included') : formatPrice(item.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={cls.note}>
                {t('preview.note')}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      <div className={cls.desktopOnly}>{desktopVersion}</div>
      <div className={cls.mobileOnly}>{mobileVersion}</div>
    </>
  );
});
