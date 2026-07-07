'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Clock, Globe, ShoppingCart, Monitor, Shield, Bot } from 'lucide-react';
import { QuoteEstimate, QuoteData, ProjectType } from '../types';
import { formatPriceRange, formatPrice } from '@/lib/pricing/calculator';
import { getProjectTypeConfig } from '@/lib/pricing/features';
import cls from './Step4Summary.module.css';

interface Step4SummaryProps {
  estimate: QuoteEstimate;
  quoteData: QuoteData;
  onNext: () => void;
  onBack: () => void;
  stepNumber?: number;
  totalSteps?: number;
}

export function Step4Summary({
  estimate,
  quoteData,
  onNext,
  onBack,
  stepNumber,
  totalSteps,
}: Step4SummaryProps) {
  const t = useTranslations('wizard');
  const config = quoteData.projectType
    ? getProjectTypeConfig(quoteData.projectType)
    : null;

  // Icon mapping for project types
  const projectIcons: Record<ProjectType, React.ReactNode> = {
    siteVitrine: <Globe size={28} />,
    ecommerce: <ShoppingCart size={28} />,
    appWeb: <Monitor size={28} />,
    auditCyber: <Shield size={28} />,
    aiAutomation: <Bot size={28} />,
    cmsBlog: <Globe size={28} />,
  };

  if (!config) return null;

  // Group breakdown by category
  const breakdownByCategory = {
    base: estimate.breakdown.filter((item) => item.category === 'base'),
    features: estimate.breakdown.filter((item) => item.category === 'feature'),
    design: estimate.breakdown.filter((item) => item.category === 'design'),
    seo: estimate.breakdown.filter((item) => item.category === 'seo'),
    services: estimate.breakdown.filter((item) => item.category === 'service'),
  };

  const getDesignLabel = () => {
    if (quoteData.design === 'template') return t('step4.designTemplate');
    if (quoteData.design === 'semi-custom') return t('step4.designSemiCustom');
    if (quoteData.design === 'custom') return t('step4.designCustom');
    return t('step4.designUndefined');
  };

  const getSEOLabel = () => {
    if (quoteData.seo === 'none') return t('step4.seoNone');
    if (quoteData.seo === 'basic') return t('step4.seoBasic');
    if (quoteData.seo === 'advanced') return t('step4.seoAdvanced');
    return t('step4.seoUndefined');
  };

  const getTimelineLabel = () => {
    if (quoteData.timeline === 'asap') return t('step4.timelineAsap');
    if (quoteData.timeline === '1m') return t('step4.timeline1m');
    if (quoteData.timeline === '2-3m') return t('step4.timeline23m');
    if (quoteData.timeline === '>3m') return t('step4.timelineGt3m');
    if (quoteData.timeline === 'flexible') return t('step4.timelineFlexible');
    return t('step4.timelineUndefined');
  };

  return (
    <div className={cls.step}>
      <div className={cls.header}>
        <div className={cls.stepNumber}>
          {t('common.stepSur', { step: stepNumber || 4, total: totalSteps || 5 })}
        </div>
        <h2 className={cls.title}>{t('step4.title')}</h2>
        <p className={cls.subtitle}>
          {t('step4.subtitle')}
        </p>
      </div>

      <div className={cls.content}>
        {/* Project Overview */}
        <section className={cls.overview}>
          <div className={cls.projectHeader}>
            <span className={cls.projectIcon}>
              {quoteData.projectType && projectIcons[quoteData.projectType]}
            </span>
            <div>
              <h3 className={cls.projectTitle}>{config.name}</h3>
              <p className={cls.projectDescription}>{config.description}</p>
            </div>
          </div>

          <div className={cls.priceCard}>
            <div className={cls.priceLabel}>{t('common.budgetLabel')}</div>
            <div className={cls.priceValue}>
              {formatPriceRange(estimate.min, estimate.max)}
            </div>
            <div className={cls.priceNote}>
              {t('step4.priceNote')}
            </div>
          </div>

          <div className={cls.metaInfo}>
            <div className={cls.metaItem}>
              <span className={cls.metaLabel}>{t('step4.metaDelai')}</span>
              <span className={cls.metaValue}>{estimate.timeline}</span>
            </div>
            <div className={cls.metaItem}>
              <span className={cls.metaLabel}>{t('common.complexityLabel')}</span>
              <span className={cls.metaValue}>
                {estimate.complexity === 'simple' && t('common.complexitySimple')}
                {estimate.complexity === 'medium' && t('common.complexityMedium')}
                {estimate.complexity === 'complex' && t('common.complexityComplex')}
              </span>
            </div>
            <div className={cls.metaItem}>
              <span className={cls.metaLabel}>{t('common.featuresLabel')}</span>
              <span className={cls.metaValue}>
                {t('step4.featuresValue', { count: estimate.totalFeatures })}
              </span>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className={cls.section}>
          <h3 className={cls.sectionTitle}>{t('step4.sectionIncluded')}</h3>

          {/* Base */}
          {breakdownByCategory.base.length > 0 && (
            <div className={cls.breakdownGroup}>
              <h4 className={cls.categoryTitle}>{t('step4.catBase')}</h4>
              <ul className={cls.itemList}>
                {breakdownByCategory.base.map((item, index) => (
                  <li key={index} className={cls.item}>
                    <span className={cls.itemName}>{item.item}</span>
                    <span className={cls.itemPrice}>
                      {item.price === 0 ? t('common.included') : formatPrice(item.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Features */}
          {breakdownByCategory.features.length > 0 && (
            <div className={cls.breakdownGroup}>
              <h4 className={cls.categoryTitle}>{t('step4.catFeatures')}</h4>
              <ul className={cls.itemList}>
                {breakdownByCategory.features.map((item, index) => (
                  <li key={index} className={cls.item}>
                    <span className={cls.itemName}>• {item.item}</span>
                    <span className={cls.itemPrice}>
                      {item.price === 0 ? t('common.included') : `+${formatPrice(item.price)}`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Design & SEO */}
          <div className={cls.breakdownGroup}>
            <h4 className={cls.categoryTitle}>{t('step4.catDesign')}</h4>
            <ul className={cls.itemList}>
              <li className={cls.item}>
                <span className={cls.itemName}>• {getDesignLabel()}</span>
                <span className={cls.itemPrice}>
                  {breakdownByCategory.design[0]?.price === 0
                    ? t('common.included')
                    : breakdownByCategory.design[0]
                      ? `+${formatPrice(breakdownByCategory.design[0].price)}`
                      : t('common.included')}
                </span>
              </li>
              <li className={cls.item}>
                <span className={cls.itemName}>• {getSEOLabel()}</span>
                <span className={cls.itemPrice}>
                  {breakdownByCategory.seo[0]?.price === 0
                    ? t('common.included')
                    : breakdownByCategory.seo[0]
                      ? `+${formatPrice(breakdownByCategory.seo[0].price)}`
                      : t('common.included')}
                </span>
              </li>
              {quoteData.animations && (
                <li className={cls.item}>
                  <span className={cls.itemName}>• {t('step4.animationsItem')}</span>
                  <span className={cls.itemPrice}>+600 €</span>
                </li>
              )}
            </ul>
          </div>

          {/* Services */}
          {(quoteData.maintenance || quoteData.training || quoteData.hosting) && (
            <div className={cls.breakdownGroup}>
              <h4 className={cls.categoryTitle}>{t('step4.catServices')}</h4>
              <ul className={cls.itemList}>
                {breakdownByCategory.services.map((item, index) => (
                  <li key={index} className={cls.item}>
                    <span className={cls.itemName}>• {item.item}</span>
                    <span className={cls.itemPrice}>
                      {item.price === 0 ? t('common.included') : formatPrice(item.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Timeline Preference */}
        {quoteData.timeline && (
          <section className={cls.timelineSection}>
            <h3 className={cls.sectionTitle}>{t('step4.timelineSectionTitle')}</h3>
            <div className={cls.timelineCard}>
              <Clock size={20} className={cls.timelineIcon} />
              <span className={cls.timelineText}>{getTimelineLabel()}</span>
            </div>
          </section>
        )}

        {/* Important Note */}
        <div className={cls.notice}>
          <div className={cls.noticeContent}>
            <h4 className={cls.noticeTitle}>{t('step4.noticeTitle')}</h4>
            <p className={cls.noticeText}>
              {t('step4.noticeText')}
            </p>
          </div>
        </div>
      </div>

      <div className={cls.footer}>
        <button type="button" onClick={onBack} className={cls.btnSecondary}>
          {t('step4.back')}
        </button>
        <button type="button" onClick={onNext} className={cls.btnPrimary}>
          {t('step4.next')}
        </button>
      </div>
    </div>
  );
}
