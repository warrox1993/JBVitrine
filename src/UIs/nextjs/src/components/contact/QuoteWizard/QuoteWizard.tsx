'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import {
  QuoteData,
  QuoteEstimate,
  ContactInfo,
  ProjectType,
  Feature,
  DesignLevel,
  SEOLevel,
  TimelineOption,
  QuoteSubmission,
} from './types';
import { calculateEstimate } from '@/lib/pricing/calculator';
import { calculateLeadScore } from '@/lib/pricing/leadScoring';
import {
  getProjectTypeConfig,
  getCategoriesForProjectType,
} from '@/lib/pricing/features';
import { Step1ProjectType } from './steps/Step1ProjectType';
import { StepCodeOwnership } from './steps/StepCodeOwnership';
import { StepCategorySelection } from './steps/StepCategorySelection';
import { Step4Summary } from './steps/Step4Summary';
import { Step5Contact } from './steps/Step5Contact';
import { QuotePreview } from './QuotePreview';
import { LeadScoreIndicator } from './LeadScoreIndicator';
import { EscapeBanner } from './EscapeBanner';
import { useLeadScoring } from '@/hooks/useLeadScoring';
import { ProgressBar } from '@/components/ui/ProgressBar/ProgressBar';
import cls from './QuoteWizard.module.css';

interface QuoteWizardProps {
  onSwitchToDirectContact?: () => void;
}

export function QuoteWizard({ onSwitchToDirectContact }: QuoteWizardProps = {}) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formStartTime] = useState(Date.now());

  const [quoteData, setQuoteData] = useState<QuoteData>({
    projectType: null,
    codeOwnership: null,
    features: [],
    design: null,
    seo: null,
    animations: false,
    maintenance: false,
    training: false,
    hosting: false,
    timeline: null,
  });

  const [estimate, setEstimate] = useState<QuoteEstimate | null>(null);

  // Lead Scoring Hook
  const {
    leadScore,
    enrichedData,
    isEnriching,
    trackInteraction,
    updateStep,
    enrichLead,
    saveCompleteLead,
  } = useLeadScoring(quoteData);

  // State to track features by category
  const [featuresByCategory, setFeaturesByCategory] = useState<
    Record<string, Feature[]>
  >({});

  // Calculate categories and total steps dynamically
  const categories = useMemo(() => {
    if (!quoteData.projectType) return [];
    return getCategoriesForProjectType(quoteData.projectType);
  }, [quoteData.projectType]);

  // Check if this is an e-commerce project (requires code ownership step)
  const hasCodeOwnershipStep = quoteData.projectType === 'ecommerce';

  // Dynamic step structure:
  // Step 1: Project Type
  // Step 2 (optional, only for e-commerce): Code Ownership
  // Steps 2/3 to N: Categories (one per category)
  // Step N+1: Summary
  // Step N+2: Contact
  const totalSteps = useMemo(() => {
    if (!quoteData.projectType) return 4; // Default 4 steps
    const codeOwnershipSteps = hasCodeOwnershipStep ? 1 : 0;
    return 1 + codeOwnershipSteps + categories.length + 2; // 1 (project type) + code ownership (if ecommerce) + categories + 2 (summary + contact)
  }, [categories, quoteData.projectType, hasCodeOwnershipStep]);

  const codeOwnershipStepNumber = hasCodeOwnershipStep ? 2 : 0;
  const firstCategoryStepNumber = hasCodeOwnershipStep ? 3 : 2;
  const summaryStepNumber = firstCategoryStepNumber + categories.length;
  const contactStepNumber = summaryStepNumber + 1;

  // Calculate estimate whenever quoteData changes
  useEffect(() => {
    if (quoteData.projectType) {
      try {
        const newEstimate = calculateEstimate(quoteData);
        setEstimate(newEstimate);
      } catch (error) {
        console.error('Error calculating estimate:', error);
      }
    }
  }, [quoteData]);

  // Sync features from featuresByCategory to quoteData
  useEffect(() => {
    const allFeatures = Object.values(featuresByCategory).flat();
    setQuoteData((prev) => ({ ...prev, features: allFeatures }));
  }, [featuresByCategory]);

  // Update lead scoring step tracker
  useEffect(() => {
    updateStep(currentStep);
  }, [currentStep, updateStep]);

  // Step 1: Project Type
  const handleProjectTypeSelect = (projectType: ProjectType) => {
    const config = getProjectTypeConfig(projectType);
    setQuoteData((prev) => ({
      ...prev,
      projectType,
      features: config.features.filter((f) => f.selected),
    }));

    // Initialize featuresByCategory with default selections
    const initialFeatures: Record<string, Feature[]> = {};
    const projectCategories = getCategoriesForProjectType(projectType);
    projectCategories.forEach((category) => {
      const categoryFeatures = config.features.filter(
        (f) => f.category === category && f.selected
      );
      if (categoryFeatures.length > 0) {
        initialFeatures[category] = categoryFeatures;
      }
    });
    setFeaturesByCategory(initialFeatures);

    // Auto-advance to next step immediately after selection
    const scrollY = window.scrollY;
    const isEcommerce = projectType === 'ecommerce';
    // If ecommerce: go to step 2 (code ownership), otherwise: go to first category step
    const categories = getCategoriesForProjectType(projectType);
    const firstCategoryStep = isEcommerce ? 3 : 2;
    const nextStep = isEcommerce ? 2 : firstCategoryStep;
    setCurrentStep(nextStep);
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  };

  const handleStep1Next = () => {
    // This is now only called if there's a manual "Next" button (which we removed)
    // Keeping for backward compatibility but shouldn't be used
    if (quoteData.projectType) {
      const scrollY = window.scrollY;
      const nextStep = hasCodeOwnershipStep ? 2 : firstCategoryStepNumber;
      setCurrentStep(nextStep);
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollY);
      });
    }
  };

  // Step 2 (E-commerce only): Code Ownership
  const handleCodeOwnershipSelect = (wantsOwnership: boolean) => {
    setQuoteData((prev) => ({
      ...prev,
      codeOwnership: wantsOwnership,
    }));
  };

  const handleCodeOwnershipNext = () => {
    if (quoteData.codeOwnership !== null) {
      // Save current scroll position before step change
      const scrollY = window.scrollY;
      setCurrentStep(firstCategoryStepNumber);
      // Restore scroll position after React renders
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollY);
      });
    }
  };

  // Category Steps (Steps 2/3 to N)
  const handleCategoryFeaturesChange = (category: string, features: Feature[]) => {
    setFeaturesByCategory((prev) => ({
      ...prev,
      [category]: features,
    }));
  };

  const handleNext = () => {
    // Save current scroll position before step change
    const scrollY = window.scrollY;
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    // Restore scroll position after React renders
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  };

  const handleBack = () => {
    // Save current scroll position before step change
    const scrollY = window.scrollY;
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    // Restore scroll position after React renders
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  };

  // Design & SEO Step
  const handleDesignSEOUpdate = (updates: Partial<QuoteData>) => {
    setQuoteData((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = async (contactInfo: ContactInfo) => {
    if (!estimate) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Enrich lead data if not already done
      if (!enrichedData && contactInfo.email) {
        await enrichLead(contactInfo.email, contactInfo.company);
      }

      // Save to new lead scoring system
      const savedToNewSystem = await saveCompleteLead(contactInfo, estimate);

      // Calculate old lead score for backward compatibility
      const oldLeadScore = calculateLeadScore(estimate, quoteData, contactInfo);

      // Get UTM parameters from URL (if available)
      const urlParams =
        typeof window !== 'undefined'
          ? new URLSearchParams(window.location.search)
          : null;

      const submission: QuoteSubmission = {
        estimate,
        quoteData,
        contactInfo,
        leadScore: oldLeadScore,
        utm: urlParams
          ? {
              source: urlParams.get('utm_source'),
              campaign: urlParams.get('utm_campaign'),
              medium: urlParams.get('utm_medium'),
            }
          : undefined,
        timestamp: Date.now(),
        formStartTime,
      };

      // Submit to old API for backward compatibility
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi de la demande');
      }

      const result = await response.json();

      // Success
      setSubmitSuccess(true);
      setIsSubmitting(false);

      // Track conversion (if analytics available)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'quote_submission', {
          event_category: 'quote',
          event_label: quoteData.projectType,
          value: estimate.min,
          lead_score: leadScore?.total || 0,
          lead_grade: leadScore?.grade || 'UNKNOWN',
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Une erreur est survenue. Veuillez réessayer.'
      );
      setIsSubmitting(false);
    }
  };

  // Debug logging
  console.log('QuoteWizard render - currentStep:', currentStep);
  console.log('QuoteWizard render - projectType:', quoteData.projectType);
  console.log('QuoteWizard render - submitSuccess:', submitSuccess);
  console.log('QuoteWizard render - leadScore:', leadScore);
  console.log('QuoteWizard render - estimate:', estimate ? 'exists' : 'null');

  // Success screen
  if (submitSuccess) {
    return (
      <div className={cls.wizard}>
        <div className={cls.success}>
          <div className={cls.successIcon}>
            <CheckCircle size={48} strokeWidth={2.5} />
          </div>
          <h2 className={cls.successTitle}>Demande envoyée avec succès</h2>
          <p className={cls.successText}>
            Merci pour votre confiance. Nous avons bien reçu votre demande et vous
            enverrons un devis détaillé par email dans les 24 heures.
          </p>
          <div className={cls.successInfo}>
            <h3 className={cls.successInfoTitle}>Et maintenant ?</h3>
            <ul className={cls.successList}>
              <li>Vous recevrez un email de confirmation</li>
              <li>Notre équipe analysera votre projet</li>
              <li>Nous vous contacterons pour affiner les détails</li>
              <li>Vous recevrez un devis personnalisé</li>
            </ul>
          </div>
          <button
            onClick={() => (window.location.href = '/')}
            className={cls.btnPrimary}
          >
            Retour à l&apos;accueil
          </button>
        </div>
      </div>
    );
  }

  // Render helper function
  const renderCurrentStep = () => {
    // Step 1: Project Type
    if (currentStep === 1) {
      return (
        <Step1ProjectType
          selected={quoteData.projectType}
          onChange={handleProjectTypeSelect}
          onNext={handleStep1Next}
        />
      );
    }

    if (!quoteData.projectType) return null;

    // Step 2 (E-commerce only): Code Ownership
    if (hasCodeOwnershipStep && currentStep === codeOwnershipStepNumber) {
      return (
        <StepCodeOwnership
          selected={quoteData.codeOwnership}
          onChange={handleCodeOwnershipSelect}
          onNext={handleCodeOwnershipNext}
          onBack={handleBack}
        />
      );
    }

    // Steps 2/3 to N: Category Steps
    const categoryStepIndex = currentStep - firstCategoryStepNumber; // 0-indexed category
    if (categoryStepIndex >= 0 && categoryStepIndex < categories.length) {
      const category = categories[categoryStepIndex];
      return (
        <StepCategorySelection
          key={`category-${category}`}
          projectType={quoteData.projectType}
          category={category}
          selectedFeatures={featuresByCategory[category] || []}
          onChange={(features) => handleCategoryFeaturesChange(category, features)}
          onNext={handleNext}
          onBack={handleBack}
          stepNumber={currentStep}
          totalSteps={totalSteps}
        />
      );
    }

    // Summary Step
    if (currentStep === summaryStepNumber && estimate) {
      return (
        <Step4Summary
          estimate={estimate}
          quoteData={quoteData}
          onNext={handleNext}
          onBack={handleBack}
          stepNumber={summaryStepNumber}
          totalSteps={totalSteps}
        />
      );
    }

    // Contact Step
    if (currentStep === contactStepNumber && estimate) {
      return (
        <Step5Contact
          estimate={estimate}
          quoteData={quoteData}
          onSubmit={handleSubmit}
          onBack={handleBack}
          isSubmitting={isSubmitting}
          stepNumber={contactStepNumber}
          totalSteps={totalSteps}
        />
      );
    }

    return null;
  };

  // Show error if submission failed
  const showError = submitError && !isSubmitting;

  return (
    <div className={cls.wizard}>
      {/* Progress Bar */}
      <div className={cls.progressBar}>
        <ProgressBar
          value={currentStep}
          max={totalSteps}
          ariaLabel={`Étape ${currentStep} sur ${totalSteps}`}
        />
      </div>

      {/* Escape Banner - show from step 2 onwards */}
      {currentStep >= 2 && onSwitchToDirectContact && (
        <EscapeBanner onSwitch={onSwitchToDirectContact} />
      )}

      <div className={cls.layout}>
        {/* Main Content */}
        <div className={cls.main}>
          {showError && (
            <div className={cls.errorBanner}>
              <AlertCircle size={24} className={cls.errorIcon} />
              <div>
                <strong>Erreur</strong>
                <p>{submitError}</p>
              </div>
            </div>
          )}

          {renderCurrentStep()}
        </div>

        {/* Sidebar Container for Desktop Layout (visible from step 2+) */}
        {currentStep >= 2 && estimate && quoteData.projectType && (
          <aside className={cls.sidebar} aria-label="Aperçu du devis">
            {/* Empty on mobile - QuotePreview renders outside on mobile */}
          </aside>
        )}
      </div>

      {/* Quote Preview - Positioned for desktop sidebar and mobile fixed bar (visible from step 2+) */}
      {currentStep >= 2 && estimate && quoteData.projectType && (
        <div className={cls.quotePreviewWrapper}>
          <QuotePreview estimate={estimate} quoteData={quoteData} />
        </div>
      )}
    </div>
  );
}
