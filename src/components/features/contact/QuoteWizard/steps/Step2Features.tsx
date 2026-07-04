'use client';

import React, { useState, useEffect } from 'react';
import { ProjectType, Feature } from '../types';
import {
  getFeaturesByCategory,
  getCategoryName,
  getProjectTypeConfig,
} from '@/lib/pricing/features';
import { getFeaturePrice } from '@/lib/pricing/matrices';
import { formatPrice } from '@/lib/pricing/calculator';
import cls from './Step2Features.module.css';

interface Step2FeaturesProps {
  projectType: ProjectType;
  selectedFeatures: Feature[];
  onChange: (features: Feature[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step2Features({
  projectType,
  selectedFeatures: initialFeatures,
  onChange,
  onNext,
  onBack,
}: Step2FeaturesProps) {
  const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>(initialFeatures);
  const featuresByCategory = getFeaturesByCategory(projectType);
  const config = getProjectTypeConfig(projectType);

  // Initialize with default selections on mount
  useEffect(() => {
    if (initialFeatures.length === 0) {
      // Get default selected features
      const defaultFeatures = config.features.filter((f) => f.selected);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedFeatures(defaultFeatures);
      onChange(defaultFeatures);
    } else {
      setSelectedFeatures(initialFeatures);
    }
  }, [projectType]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFeatureToggle = (feature: Feature) => {
    const isCurrentlySelected = selectedFeatures.some((f) => f.id === feature.id);

    let newSelection: Feature[];

    if (isCurrentlySelected) {
      // Deselect
      newSelection = selectedFeatures.filter((f) => f.id !== feature.id);
    } else {
      // Select
      newSelection = [...selectedFeatures, { ...feature, selected: true }];
    }

    // Special handling for mutually exclusive features (e.g., page count)
    if (feature.category === 'scope' || feature.category === 'catalog') {
      // For scope/catalog categories, only one can be selected
      newSelection = newSelection.filter(
        (f) => f.category !== feature.category || f.id === feature.id
      );
      if (!isCurrentlySelected) {
        newSelection.push({ ...feature, selected: true });
      }
    }

    setSelectedFeatures(newSelection);
    onChange(newSelection);
  };

  const isFeatureSelected = (featureId: string): boolean => {
    return selectedFeatures.some((f) => f.id === featureId);
  };

  const canProceed = selectedFeatures.length > 0;

  return (
    <div className={cls.step}>
      <header className={cls.header}>
        <span className={cls.stepNumber}>Étape 2/5</span>
        <h2 className={cls.title}>
          {config.name} : De quoi avez-vous besoin ?
        </h2>
        <p className={cls.subtitle}>
          Sélectionnez les fonctionnalités qui correspondent à votre projet
        </p>
      </header>

      <div className={cls.content}>
        {Object.entries(featuresByCategory).map(([category, features]) => (
          <section key={category} className={cls.category}>
            <h3 className={cls.categoryTitle}>
              {getCategoryName(category, projectType)}
            </h3>
            <div className={cls.featureGrid}>
              {features.map((feature) => {
                const isSelected = isFeatureSelected(feature.id);
                const pricing = getFeaturePrice(projectType, feature.id);
                const isMutuallyExclusive =
                  feature.category === 'scope' || feature.category === 'catalog';

                return (
                  <button
                    key={feature.id}
                    type="button"
                    className={`${cls.featureCard} ${isSelected ? cls.selected : ''} ${isMutuallyExclusive ? cls.exclusive : ''}`}
                    onClick={() => handleFeatureToggle(feature)}
                    aria-pressed={isSelected}
                  >
                    <div className={cls.featureHeader}>
                      <div className={cls.checkbox} aria-hidden="true">
                        {isSelected && (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M13 4L6 11L3 8"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <h4 className={cls.featureName}>{feature.name}</h4>
                    </div>

                    <p className={cls.featureDescription}>
                      {feature.description}
                    </p>

                    {pricing && pricing.min > 0 && (
                      <div className={cls.featurePrice}>
                        +{formatPrice(pricing.min)}
                        {pricing.max > pricing.min &&
                          ` - ${formatPrice(pricing.max)}`}
                      </div>
                    )}
                    {pricing && pricing.min === 0 && (
                      <div className={cls.featurePriceIncluded}>Inclus</div>
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <footer className={cls.footer}>
        <div className={cls.summary}>
          <span className={cls.summaryLabel}>Fonctionnalités sélectionnées :</span>
          <span className={cls.summaryCount}>{selectedFeatures.length}</span>
        </div>

        <div className={cls.actions}>
          <button type="button" className={cls.btnSecondary} onClick={onBack}>
            ← Retour
          </button>
          <button
            type="button"
            className={cls.btnPrimary}
            onClick={onNext}
            disabled={!canProceed}
          >
            Étape suivante →
          </button>
        </div>
      </footer>
    </div>
  );
}
