'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Target, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { LeadScore } from '@/lib/leadScoring/types';
import cls from './LeadScoreIndicator.module.css';

interface LeadScoreIndicatorProps {
  score: LeadScore | null;
  showDetails?: boolean;
  compact?: boolean;
}

export function LeadScoreIndicator({
  score,
  showDetails = false,
  compact = false
}: LeadScoreIndicatorProps) {
  const t = useTranslations('wizard');
  const [detailsExpanded, setDetailsExpanded] = useState(false);

  if (!score) return null;

  const gradeColors = {
    HOT: {
      bg: '#ff3b30',
      text: t('leadScore.gradeHot'),
      icon: '🔥',
      gradient: 'linear-gradient(135deg, #ff3b30, #ff6b00)'
    },
    WARM: {
      bg: '#ff9500',
      text: t('leadScore.gradeWarm'),
      icon: '⚡',
      gradient: 'linear-gradient(135deg, #ff9500, #ffb800)'
    },
    COLD: {
      bg: '#5856d6',
      text: t('leadScore.gradeCold'),
      icon: '❄️',
      gradient: 'linear-gradient(135deg, #5856d6, #7b7aff)'
    },
    SPAM: {
      bg: '#8e8e93',
      text: t('leadScore.gradeSpam'),
      icon: '⚠️',
      gradient: 'linear-gradient(135deg, #8e8e93, #aeaeb2)'
    },
  };

  const { bg, text, icon, gradient } = gradeColors[score.grade];

  // Compact version (just the circle)
  if (compact) {
    return (
      <div className={cls.compactIndicator}>
        <div className={cls.miniCircle} style={{ borderColor: bg } as any}>
          <span className={cls.miniScore}>{score.total}</span>
        </div>
        <span className={cls.miniText} style={{ color: bg }}>
          {icon} {text}
        </span>
      </div>
    );
  }

  // Full version
  return (
    <div className={cls.indicator}>
      {/* Score Circle */}
      <div className={cls.scoreCircle}>
        <svg viewBox="0 0 100 100" className={cls.progressRing}>
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="var(--color-border, #2b3342)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={bg}
            strokeWidth="8"
            strokeDasharray={`${score.total * 2.827} 282.7`}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            className={cls.progressCircle}
            style={{
              filter: `drop-shadow(0 0 8px ${bg}40)`,
            }}
          />
        </svg>
        <div className={cls.scoreValue}>
          <span className={cls.scoreNumber}>{score.total}</span>
          <span className={cls.scoreLabel}>/100</span>
        </div>
      </div>

      {/* Grade Info */}
      <div className={cls.scoreInfo}>
        <div
          className={cls.grade}
          style={{
            color: bg,
            background: `${bg}15`
          }}
        >
          <Target size={18} />
          <span>{icon} {text}</span>
        </div>
        <div className={cls.confidence}>
          <TrendingUp size={14} />
          <span>{t('leadScore.confidence', { value: score.confidence })}</span>
        </div>
      </div>

      {/* Expandable Breakdown */}
      {showDetails && (
        <>
          <button
            type="button"
            className={cls.toggleDetails}
            onClick={() => setDetailsExpanded(!detailsExpanded)}
            aria-expanded={detailsExpanded}
          >
            <span>{t('leadScore.toggleDetails')}</span>
            {detailsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {detailsExpanded && (
            <div className={cls.breakdown}>
              <div className={cls.breakdownList}>
                <div className={cls.breakdownItem}>
                  <span className={cls.breakdownLabel}>{t('leadScore.catProject')}</span>
                  <div className={cls.breakdownBarContainer}>
                    <div
                      className={cls.breakdownBar}
                      style={{
                        width: `${(score.breakdown.project / 30) * 100}%`,
                        background: gradient
                      }}
                    />
                  </div>
                  <span className={cls.breakdownValue}>{score.breakdown.project}/30</span>
                </div>

                <div className={cls.breakdownItem}>
                  <span className={cls.breakdownLabel}>{t('leadScore.catEngagement')}</span>
                  <div className={cls.breakdownBarContainer}>
                    <div
                      className={cls.breakdownBar}
                      style={{
                        width: `${(score.breakdown.engagement / 25) * 100}%`,
                        background: gradient
                      }}
                    />
                  </div>
                  <span className={cls.breakdownValue}>{score.breakdown.engagement}/25</span>
                </div>

                <div className={cls.breakdownItem}>
                  <span className={cls.breakdownLabel}>{t('leadScore.catCompletion')}</span>
                  <div className={cls.breakdownBarContainer}>
                    <div
                      className={cls.breakdownBar}
                      style={{
                        width: `${(score.breakdown.completion / 20) * 100}%`,
                        background: gradient
                      }}
                    />
                  </div>
                  <span className={cls.breakdownValue}>{score.breakdown.completion}/20</span>
                </div>

                <div className={cls.breakdownItem}>
                  <span className={cls.breakdownLabel}>{t('leadScore.catEnrichment')}</span>
                  <div className={cls.breakdownBarContainer}>
                    <div
                      className={cls.breakdownBar}
                      style={{
                        width: `${(score.breakdown.enrichment / 15) * 100}%`,
                        background: gradient
                      }}
                    />
                  </div>
                  <span className={cls.breakdownValue}>{score.breakdown.enrichment}/15</span>
                </div>

                <div className={cls.breakdownItem}>
                  <span className={cls.breakdownLabel}>{t('leadScore.catBehavioral')}</span>
                  <div className={cls.breakdownBarContainer}>
                    <div
                      className={cls.breakdownBar}
                      style={{
                        width: `${(score.breakdown.behavioral / 10) * 100}%`,
                        background: gradient
                      }}
                    />
                  </div>
                  <span className={cls.breakdownValue}>{score.breakdown.behavioral}/10</span>
                </div>
              </div>

              <div className={cls.breakdownNote}>
                {t('leadScore.note')}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
