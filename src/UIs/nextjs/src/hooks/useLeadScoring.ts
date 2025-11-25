/**
 * useLeadScoring Hook
 *
 * Hook personnalisé pour gérer tout le système de lead scoring
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import {
  BehavioralTracker,
  getTracker,
  RealTimeLeadScorer,
  LeadEnrichmentService,
  LeadScore,
  EnrichedLeadData,
} from "@/lib/leadScoring";
import { QuoteData } from "@/components/contact/QuoteWizard/types";

export function useLeadScoring(quoteData: QuoteData) {
  const [tracker, setTracker] = useState<BehavioralTracker | null>(null);
  const [scorer, setScorer] = useState<RealTimeLeadScorer | null>(null);
  const [leadScore, setLeadScore] = useState<LeadScore | null>(null);
  const [enrichedData, setEnrichedData] = useState<EnrichedLeadData | null>(
    null,
  );
  const [isEnriching, setIsEnriching] = useState(false);

  // Initialize tracker and scorer on mount (SINGLETON - only once per session)
  useEffect(() => {
    // getTracker() already returns a singleton, but we need to ensure
    // we're not creating multiple scorers
    const behavioralTracker = getTracker();
    const realTimeScorer = new RealTimeLeadScorer();

    setTracker(behavioralTracker);
    setScorer(realTimeScorer);

    // Mark wizard as started (only once)
    behavioralTracker.markWizardStarted();

    // DON'T destroy tracker on unmount - it's a singleton
    // It will only be destroyed when user leaves the page
    // return () => {
    //   behavioralTracker.destroy();
    // };
  }, []); // Empty deps = only runs once

  // Recalculate score whenever quoteData changes
  useEffect(() => {
    if (tracker && scorer) {
      const behavioral = tracker.getData();
      const score = scorer.calculateTotalScore(quoteData, behavioral);
      setLeadScore(score);
    }
  }, [quoteData, tracker, scorer]);

  // Track interaction
  const trackInteraction = useCallback(() => {
    if (scorer) {
      scorer.trackInteraction();
    }
  }, [scorer]);

  // Update current step
  const updateStep = useCallback(
    (step: number) => {
      if (scorer) {
        scorer.setCurrentStep(step);
      }
    },
    [scorer],
  );

  // Enrich lead data when email is provided
  const enrichLead = useCallback(
    async (email: string, company?: string) => {
      if (!email || isEnriching) return;

      setIsEnriching(true);

      try {
        const enrichmentService = new LeadEnrichmentService();
        const enriched = await enrichmentService.enrichLead(email, company);

        setEnrichedData(enriched);

        // Update scorer with enriched data
        if (scorer) {
          scorer.setEnrichedData(enriched);

          // Recalculate score with enrichment
          if (tracker) {
            const behavioral = tracker.getData();
            const newScore = scorer.calculateTotalScore(quoteData, behavioral);
            setLeadScore(newScore);
          }
        }

        return enriched;
      } catch (error) {
        console.error("Failed to enrich lead:", error);
        return null;
      } finally {
        setIsEnriching(false);
      }
    },
    [isEnriching, scorer, tracker, quoteData],
  );

  // Save complete lead to backend
  const saveCompleteLead = useCallback(
    async (contactInfo: any, estimate: any) => {
      if (!tracker || !leadScore) {
        console.error("Cannot save lead: missing tracker or score");
        return false;
      }

      const behavioral = tracker.getData();

      const leadData: EnrichedLeadData = enrichedData || {
        email: contactInfo.email,
        name: contactInfo.name,
        company: contactInfo.company,
        phone: contactInfo.phone,
        enrichmentScore: 0,
        confidenceLevel: "low",
      };

      try {
        const response = await fetch("/api/leadScoring/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lead: leadData,
            score: leadScore,
            quoteData,
            estimate,
            behavioral,
            timestamp: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save lead");
        }

        const result = await response.json();
        console.log("✅ Lead saved successfully:", result);

        return true;
      } catch (error) {
        console.error("❌ Failed to save lead:", error);
        return false;
      }
    },
    [tracker, leadScore, enrichedData, quoteData],
  );

  return {
    leadScore,
    enrichedData,
    isEnriching,
    trackInteraction,
    updateStep,
    enrichLead,
    saveCompleteLead,
    behavioral: tracker?.getData() || null,
  };
}
