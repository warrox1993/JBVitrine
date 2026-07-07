'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { SEOLevel, QuoteData, ProjectType } from '../types';
import { getPricingMatrix } from '@/lib/pricing/matrices';
import { formatPrice } from '@/lib/pricing/calculator';
import cls from './Step3DesignSEO.module.css';

interface Step3DesignSEOProps {
  projectType: ProjectType;
  quoteData: QuoteData;
  onUpdate: (updates: Partial<QuoteData>) => void;
  onNext: () => void;
  onBack: () => void;
  stepNumber?: number;
  totalSteps?: number;
}

export function Step3DesignSEO({
  projectType,
  quoteData,
  onUpdate,
  onNext,
  onBack,
  stepNumber,
  totalSteps,
}: Step3DesignSEOProps) {
  const t = useTranslations('wizard');
  const matrix = getPricingMatrix(projectType);
  const { seo, animations, training } = quoteData;

  return (
    <div className={cls.step}>
      <header className={cls.header}>
        <span className={cls.stepNumber}>
          {t('common.stepSlash', { step: stepNumber || 3, total: totalSteps || 5 })}
        </span>
        <h2 className={cls.title}>{t('step3.title')}</h2>
        <p className={cls.subtitle}>
          {t('step3.subtitle')}
        </p>
      </header>

      <div className={cls.sections}>
        {/* SEO Section */}
        <section className={cls.section}>
          <h3 className={cls.sectionTitle}>{t('step3.seoSectionTitle')}</h3>
          <div className={cls.options}>
            {(['none', 'basic', 'advanced'] as SEOLevel[]).map((level) => {
              const price = matrix.seo[level];
              const names = {
                none: t('step3.seoNoneName'),
                basic: t('step3.seoBasicName'),
                advanced: t('step3.seoAdvancedName'),
              };
              const descriptions = {
                none: t('step3.seoNoneDesc'),
                basic: t('step3.seoBasicDesc'),
                advanced: t('step3.seoAdvancedDesc'),
              };

              return (
                <button
                  key={level}
                  type="button"
                  className={`${cls.optionCard} ${seo === level ? cls.selected : ''}`}
                  onClick={() => onUpdate({ seo: level })}
                >
                  <div className={cls.optionHeader}>
                    <h4>{names[level]}</h4>
                    <span className={cls.optionPrice}>
                      {price === 0 ? t('step3.free') : `+${formatPrice(price)}`}
                    </span>
                  </div>
                  <p className={cls.optionDescription}>{descriptions[level]}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Additional Services */}
        <section className={cls.section}>
          <h3 className={cls.sectionTitle}>{t('step3.servicesSectionTitle')}</h3>
          <div className={cls.checkboxes}>
            <label className={cls.checkbox}>
              <input
                type="checkbox"
                checked={animations}
                onChange={(e) => onUpdate({ animations: e.target.checked })}
              />
              <span>{t('step3.animationsLabel')}</span>
            </label>
            <label className={cls.checkbox}>
              <input
                type="checkbox"
                checked={training}
                onChange={(e) => onUpdate({ training: e.target.checked })}
              />
              <span>{t('step3.trainingLabel', { price: formatPrice(matrix.services.training) })}</span>
            </label>
          </div>
        </section>
      </div>

      <footer className={cls.footer}>
        <button type="button" className={cls.btnSecondary} onClick={onBack}>
          {t('common.back')}
        </button>
        <button
          type="button"
          className={cls.btnPrimary}
          onClick={onNext}
          disabled={!seo}
        >
          {t('step3.next')}
        </button>
      </footer>
    </div>
  );
}
