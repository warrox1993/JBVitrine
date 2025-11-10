'use client';

import React, { useState, useEffect } from 'react';
import { ProjectType, Feature } from '../types';
import {
  getCategoryName,
  getCategoryDescription,
  getProjectTypeConfig,
  isCategoryMutuallyExclusive,
} from '@/lib/pricing/features';
import { getFeaturePrice } from '@/lib/pricing/matrices';
import { formatPrice } from '@/lib/pricing/calculator';
import { FeatureTooltip } from '../FeatureTooltip';
import cls from './StepCategorySelection.module.css';

interface StepCategorySelectionProps {
  projectType: ProjectType;
  category: string;
  selectedFeatures: Feature[];
  onChange: (features: Feature[]) => void;
  onNext: () => void;
  onBack: () => void;
  stepNumber: number;
  totalSteps: number;
}

export function StepCategorySelection({
  projectType,
  category,
  selectedFeatures: initialFeatures,
  onChange,
  onNext,
  onBack,
  stepNumber,
  totalSteps,
}: StepCategorySelectionProps) {
  const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>(initialFeatures);
  const config = getProjectTypeConfig(projectType);
  const categoryFeatures = config.features.filter((f) => f.category === category);
  const isMutuallyExclusive = isCategoryMutuallyExclusive(projectType, category);
  const categoryTitle = getCategoryName(category, projectType);
  const categoryDesc = getCategoryDescription(projectType, category);

  // Initialize with default selections on mount
  useEffect(() => {
    if (initialFeatures.length === 0) {
      // Get default selected features for this category
      const defaultFeatures = categoryFeatures.filter((f) => f.selected);
      setSelectedFeatures(defaultFeatures);
      onChange(defaultFeatures);
    } else {
      setSelectedFeatures(initialFeatures);
    }
  }, [projectType, category]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFeatureToggle = (feature: Feature) => {
    const isCurrentlySelected = selectedFeatures.some((f) => f.id === feature.id);

    let newSelection: Feature[];

    if (isMutuallyExclusive) {
      // Radio behavior: only one can be selected
      if (isCurrentlySelected) {
        // Don't allow deselecting in mutually exclusive mode
        return;
      }
      newSelection = [{ ...feature, selected: true }];
    } else {
      // Checkbox behavior: multiple selections allowed
      if (isCurrentlySelected) {
        newSelection = selectedFeatures.filter((f) => f.id !== feature.id);
      } else {
        newSelection = [...selectedFeatures, { ...feature, selected: true }];
      }
    }

    setSelectedFeatures(newSelection);
    onChange(newSelection);
  };

  const isFeatureSelected = (featureId: string): boolean => {
    return selectedFeatures.some((f) => f.id === featureId);
  };

  // For non-exclusive categories (checkbox mode), allow proceeding with 0 selections
  // For exclusive categories (radio mode), require at least 1 selection
  // Exception: "pages" category always requires a selection (cannot skip)
  const canProceed = category === 'pages'
    ? selectedFeatures.length > 0
    : (!isMutuallyExclusive || selectedFeatures.length > 0);

  return (
    <div className={cls.step}>
      <header className={cls.header}>
        <span className={cls.stepNumber}>
          Étape {stepNumber}/{totalSteps}
        </span>
        <h2 className={cls.title}>{categoryTitle}</h2>
        <p className={cls.subtitle}>{categoryDesc}</p>
        {isMutuallyExclusive && (
          <p className={cls.hint}>
            Sélectionnez une seule option pour cette catégorie
          </p>
        )}
      </header>

      <div className={cls.content}>
        <div className={cls.featureGrid}>
          {categoryFeatures.map((feature) => {
            const isSelected = isFeatureSelected(feature.id);
            const pricing = getFeaturePrice(projectType, feature.id);

            return (
              <button
                key={feature.id}
                type="button"
                className={`${cls.featureCard} ${isSelected ? cls.selected : ''} ${isMutuallyExclusive ? cls.exclusive : ''}`}
                onClick={() => handleFeatureToggle(feature)}
                aria-pressed={isSelected}
              >
                {feature.explanation && (
                  <div className={cls.tooltipPosition}>
                    <FeatureTooltip content={feature.explanation} />
                  </div>
                )}
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

                <p className={cls.featureDescription}>{feature.description}</p>

                {pricing && pricing.min > 0 && (
                  <div className={cls.featurePrice}>
                    +{formatPrice(pricing.min)}
                    {pricing.max > pricing.min && ` - ${formatPrice(pricing.max)}`}
                  </div>
                )}
                {pricing && pricing.min === 0 && (
                  <div className={cls.featurePriceIncluded}>Inclus</div>
                )}
              </button>
            );
          })}

          {/* "None of the above" option for mutually exclusive categories */}
          {/* Exclude "None" option for critical categories like "pages" where a choice is required */}
          {isMutuallyExclusive && category !== 'pages' && (
            <button
              key="none"
              type="button"
              className={`${cls.featureCard} ${selectedFeatures.length === 0 ? cls.selected : ''} ${cls.exclusive}`}
              onClick={() => {
                setSelectedFeatures([]);
                onChange([]);
              }}
              aria-pressed={selectedFeatures.length === 0}
            >
              <div className={cls.featureHeader}>
                <div className={cls.checkbox} aria-hidden="true">
                  {selectedFeatures.length === 0 && (
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
                <h4 className={cls.featureName}>Aucune de ces propositions</h4>
              </div>
              <p className={cls.featureDescription}>
                Passez cette étape si aucune des options ne correspond à votre besoin
              </p>
              <div className={cls.featurePriceIncluded}>Gratuit</div>
            </button>
          )}
        </div>
      </div>

      <footer className={cls.footer}>
        <div className={cls.summary}>
          <span className={cls.summaryLabel}>
            {isMutuallyExclusive ? 'Option sélectionnée' : 'Options sélectionnées'} :
          </span>
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
