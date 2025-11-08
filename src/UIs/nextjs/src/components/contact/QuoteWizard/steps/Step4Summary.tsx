'use client';

import React from 'react';
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
    if (quoteData.design === 'template') return 'Design template';
    if (quoteData.design === 'semi-custom') return 'Design semi-personnalisé';
    if (quoteData.design === 'custom') return 'Design sur mesure';
    return 'Non défini';
  };

  const getSEOLabel = () => {
    if (quoteData.seo === 'none') return 'Aucun';
    if (quoteData.seo === 'basic') return 'SEO de base';
    if (quoteData.seo === 'advanced') return 'SEO avancé';
    return 'Non défini';
  };

  const getTimelineLabel = () => {
    if (quoteData.timeline === 'asap') return 'Dès que possible';
    if (quoteData.timeline === '1m') return '1 mois';
    if (quoteData.timeline === '2-3m') return '2-3 mois';
    if (quoteData.timeline === '>3m') return 'Plus de 3 mois';
    if (quoteData.timeline === 'flexible') return 'Flexible';
    return 'Non défini';
  };

  return (
    <div className={cls.step}>
      <div className={cls.header}>
        <div className={cls.stepNumber}>
          Étape {stepNumber || 4} sur {totalSteps || 5}
        </div>
        <h2 className={cls.title}>Récapitulatif de votre projet</h2>
        <p className={cls.subtitle}>
          Vérifiez les détails avant de nous transmettre votre demande
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
            <div className={cls.priceLabel}>Budget estimé</div>
            <div className={cls.priceValue}>
              {formatPriceRange(estimate.min, estimate.max)}
            </div>
            <div className={cls.priceNote}>
              Prix indicatif - sera affiné lors de notre échange
            </div>
          </div>

          <div className={cls.metaInfo}>
            <div className={cls.metaItem}>
              <span className={cls.metaLabel}>Délai estimé</span>
              <span className={cls.metaValue}>{estimate.timeline}</span>
            </div>
            <div className={cls.metaItem}>
              <span className={cls.metaLabel}>Complexité</span>
              <span className={cls.metaValue}>
                {estimate.complexity === 'simple' && 'Simple'}
                {estimate.complexity === 'medium' && 'Moyen'}
                {estimate.complexity === 'complex' && 'Complexe'}
              </span>
            </div>
            <div className={cls.metaItem}>
              <span className={cls.metaLabel}>Fonctionnalités</span>
              <span className={cls.metaValue}>
                {estimate.totalFeatures} sélectionnées
              </span>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className={cls.section}>
          <h3 className={cls.sectionTitle}>Ce qui est inclus</h3>

          {/* Base */}
          {breakdownByCategory.base.length > 0 && (
            <div className={cls.breakdownGroup}>
              <h4 className={cls.categoryTitle}>Base</h4>
              <ul className={cls.itemList}>
                {breakdownByCategory.base.map((item, index) => (
                  <li key={index} className={cls.item}>
                    <span className={cls.itemName}>{item.item}</span>
                    <span className={cls.itemPrice}>
                      {item.price === 0 ? 'Inclus' : formatPrice(item.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Features */}
          {breakdownByCategory.features.length > 0 && (
            <div className={cls.breakdownGroup}>
              <h4 className={cls.categoryTitle}>Fonctionnalités</h4>
              <ul className={cls.itemList}>
                {breakdownByCategory.features.map((item, index) => (
                  <li key={index} className={cls.item}>
                    <span className={cls.itemName}>• {item.item}</span>
                    <span className={cls.itemPrice}>
                      {item.price === 0 ? 'Inclus' : `+${formatPrice(item.price)}`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Design & SEO */}
          <div className={cls.breakdownGroup}>
            <h4 className={cls.categoryTitle}>Design & Optimisation</h4>
            <ul className={cls.itemList}>
              <li className={cls.item}>
                <span className={cls.itemName}>• {getDesignLabel()}</span>
                <span className={cls.itemPrice}>
                  {breakdownByCategory.design[0]?.price === 0
                    ? 'Inclus'
                    : breakdownByCategory.design[0]
                      ? `+${formatPrice(breakdownByCategory.design[0].price)}`
                      : 'Inclus'}
                </span>
              </li>
              <li className={cls.item}>
                <span className={cls.itemName}>• {getSEOLabel()}</span>
                <span className={cls.itemPrice}>
                  {breakdownByCategory.seo[0]?.price === 0
                    ? 'Inclus'
                    : breakdownByCategory.seo[0]
                      ? `+${formatPrice(breakdownByCategory.seo[0].price)}`
                      : 'Inclus'}
                </span>
              </li>
              {quoteData.animations && (
                <li className={cls.item}>
                  <span className={cls.itemName}>• Animations avancées</span>
                  <span className={cls.itemPrice}>+600 €</span>
                </li>
              )}
            </ul>
          </div>

          {/* Services */}
          {(quoteData.maintenance || quoteData.training || quoteData.hosting) && (
            <div className={cls.breakdownGroup}>
              <h4 className={cls.categoryTitle}>Services additionnels</h4>
              <ul className={cls.itemList}>
                {breakdownByCategory.services.map((item, index) => (
                  <li key={index} className={cls.item}>
                    <span className={cls.itemName}>• {item.item}</span>
                    <span className={cls.itemPrice}>
                      {item.price === 0 ? 'Inclus' : formatPrice(item.price)}
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
            <h3 className={cls.sectionTitle}>Votre délai souhaité</h3>
            <div className={cls.timelineCard}>
              <Clock size={20} className={cls.timelineIcon} />
              <span className={cls.timelineText}>{getTimelineLabel()}</span>
            </div>
          </section>
        )}

        {/* Important Note */}
        <div className={cls.notice}>
          <div className={cls.noticeContent}>
            <h4 className={cls.noticeTitle}>Prochaine étape</h4>
            <p className={cls.noticeText}>
              Cette estimation sera affinée lors d&apos;un entretien personnalisé
              pour s&apos;assurer qu&apos;elle correspond parfaitement à vos
              besoins. Vous recevrez un devis détaillé par email.
            </p>
          </div>
        </div>
      </div>

      <div className={cls.footer}>
        <button type="button" onClick={onBack} className={cls.btnSecondary}>
          ← Modifier
        </button>
        <button type="button" onClick={onNext} className={cls.btnPrimary}>
          Continuer vers le formulaire
        </button>
      </div>
    </div>
  );
}
