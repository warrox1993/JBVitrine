'use client';

import React from 'react';
import { DesignLevel, SEOLevel, QuoteData, ProjectType } from '../types';
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
  const matrix = getPricingMatrix(projectType);
  const { seo, animations, maintenance, training, hosting } = quoteData;

  return (
    <div className={cls.step}>
      <header className={cls.header}>
        <span className={cls.stepNumber}>
          Étape {stepNumber || 3}/{totalSteps || 5}
        </span>
        <h2 className={cls.title}>SEO et services additionnels</h2>
        <p className={cls.subtitle}>
          Choisissez votre niveau de référencement et les services complémentaires
        </p>
      </header>

      <div className={cls.sections}>
        {/* SEO Section */}
        <section className={cls.section}>
          <h3 className={cls.sectionTitle}>SEO (Référencement)</h3>
          <div className={cls.options}>
            {(['none', 'basic', 'advanced'] as SEOLevel[]).map((level) => {
              const price = matrix.seo[level];
              const names = {
                none: 'Aucun',
                basic: 'SEO de base',
                advanced: 'SEO avancé',
              };
              const descriptions = {
                none: 'Pas d\'optimisation SEO',
                basic: 'Meta tags, sitemap, schema.org, optimisation technique',
                advanced: 'Stratégie complète, mots-clés, contenu optimisé, backlinks',
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
                      {price === 0 ? 'Gratuit' : `+${formatPrice(price)}`}
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
          <h3 className={cls.sectionTitle}>Services additionnels</h3>
          <div className={cls.checkboxes}>
            <label className={cls.checkbox}>
              <input
                type="checkbox"
                checked={animations}
                onChange={(e) => onUpdate({ animations: e.target.checked })}
              />
              <span>Animations avancées (+600€)</span>
            </label>
            <label className={cls.checkbox}>
              <input
                type="checkbox"
                checked={training}
                onChange={(e) => onUpdate({ training: e.target.checked })}
              />
              <span>Formation équipe (+{formatPrice(matrix.services.training)})</span>
            </label>
          </div>
        </section>
      </div>

      <footer className={cls.footer}>
        <button type="button" className={cls.btnSecondary} onClick={onBack}>
          ← Retour
        </button>
        <button
          type="button"
          className={cls.btnPrimary}
          onClick={onNext}
          disabled={!seo}
        >
          Voir le récapitulatif →
        </button>
      </footer>
    </div>
  );
}
