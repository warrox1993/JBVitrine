'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import cls from './StepCodeOwnership.module.css';

interface StepCodeOwnershipProps {
  selected: boolean | null;
  onChange: (wantsOwnership: boolean) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepCodeOwnership({
  selected,
  onChange,
  onNext,
  onBack,
}: StepCodeOwnershipProps) {
  const t = useTranslations('wizard');
  const [showInfo, setShowInfo] = useState<'ownership' | 'cms' | null>(null);

  const handleSelection = (wantsOwnership: boolean) => {
    onChange(wantsOwnership);
  };

  const canProceed = selected !== null;

  return (
    <div className={cls.step}>
      <div className={cls.header}>
        <span className={cls.stepNumber}>{t('codeOwnership.stepNumber')}</span>
        <h2 className={cls.title}>{t('codeOwnership.title')}</h2>
        <p className={cls.subtitle}>
          {t('codeOwnership.subtitle')}
        </p>
      </div>

      <div className={cls.content}>
        <div className={cls.optionsGrid}>
          {/* Option 1: Code propriétaire (Custom Development) */}
          <button
            type="button"
            className={`${cls.optionCard} ${selected === true ? cls.selected : ''}`}
            onClick={() => handleSelection(true)}
          >
            <div className={cls.optionHeader}>
              <div className={cls.checkbox}>
                {selected === true && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.333 4L6 11.333 2.667 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <h3 className={cls.optionTitle}>{t('codeOwnership.ownership.title')}</h3>
            </div>
            <p className={cls.optionDescription}>
              {t('codeOwnership.ownership.description')}
            </p>
            <div className={cls.optionFeatures}>
              <div className={cls.featureItem}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={cls.featureIcon}
                >
                  <path
                    d="M16.667 5.833L7.5 15 3.333 10.833"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{t('codeOwnership.ownership.feat1')}</span>
              </div>
              <div className={cls.featureItem}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={cls.featureIcon}
                >
                  <path
                    d="M16.667 5.833L7.5 15 3.333 10.833"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{t('codeOwnership.ownership.feat2')}</span>
              </div>
              <div className={cls.featureItem}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={cls.featureIcon}
                >
                  <path
                    d="M16.667 5.833L7.5 15 3.333 10.833"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{t('codeOwnership.ownership.feat3')}</span>
              </div>
              <div className={cls.featureItem}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={cls.featureIcon}
                >
                  <path
                    d="M16.667 5.833L7.5 15 3.333 10.833"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{t('codeOwnership.ownership.feat4')}</span>
              </div>
            </div>
            <button
              type="button"
              className={cls.infoButton}
              onClick={(e) => {
                e.stopPropagation();
                setShowInfo(showInfo === 'ownership' ? null : 'ownership');
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M10 13.333V10M10 6.667h.008"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              {t('codeOwnership.learnMore')}
            </button>

            {showInfo === 'ownership' && (
              <div className={cls.infoBox} onClick={(e) => e.stopPropagation()}>
                <h4 className={cls.infoTitle}>{t('codeOwnership.ownership.infoTitle')}</h4>
                <p className={cls.infoText}>
                  {t('codeOwnership.ownership.infoText')}
                </p>
                <ul className={cls.infoList}>
                  <li>{t('codeOwnership.ownership.infoList1')}</li>
                  <li>{t('codeOwnership.ownership.infoList2')}</li>
                  <li>{t('codeOwnership.ownership.infoList3')}</li>
                  <li>{t('codeOwnership.ownership.infoList4')}</li>
                  <li>{t('codeOwnership.ownership.infoList5')}</li>
                </ul>
                <p className={cls.infoNote}>
                  {t.rich('codeOwnership.ownership.infoNote', { b: (c) => <strong>{c}</strong> })}
                </p>
              </div>
            )}
          </button>

          {/* Option 2: Solution CMS Smidjan */}
          <button
            type="button"
            className={`${cls.optionCard} ${selected === false ? cls.selected : ''}`}
            onClick={() => handleSelection(false)}
          >
            <div className={cls.optionHeader}>
              <div className={cls.checkbox}>
                {selected === false && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.333 4L6 11.333 2.667 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <h3 className={cls.optionTitle}>{t('codeOwnership.cms.title')}</h3>
            </div>
            <p className={cls.optionDescription}>
              {t('codeOwnership.cms.description')}
            </p>
            <div className={cls.optionFeatures}>
              <div className={cls.featureItem}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={cls.featureIcon}
                >
                  <path
                    d="M16.667 5.833L7.5 15 3.333 10.833"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{t('codeOwnership.cms.feat1')}</span>
              </div>
              <div className={cls.featureItem}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={cls.featureIcon}
                >
                  <path
                    d="M16.667 5.833L7.5 15 3.333 10.833"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{t('codeOwnership.cms.feat2')}</span>
              </div>
              <div className={cls.featureItem}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={cls.featureIcon}
                >
                  <path
                    d="M16.667 5.833L7.5 15 3.333 10.833"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{t('codeOwnership.cms.feat3')}</span>
              </div>
              <div className={cls.featureItem}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={cls.featureIcon}
                >
                  <path
                    d="M16.667 5.833L7.5 15 3.333 10.833"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{t('codeOwnership.cms.feat4')}</span>
              </div>
              <div className={cls.featureItem}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={cls.featureIcon}
                >
                  <path
                    d="M16.667 5.833L7.5 15 3.333 10.833"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{t('codeOwnership.cms.feat5')}</span>
              </div>
            </div>
            <button
              type="button"
              className={cls.infoButton}
              onClick={(e) => {
                e.stopPropagation();
                setShowInfo(showInfo === 'cms' ? null : 'cms');
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M10 13.333V10M10 6.667h.008"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              {t('codeOwnership.learnMore')}
            </button>

            {showInfo === 'cms' && (
              <div className={cls.infoBox} onClick={(e) => e.stopPropagation()}>
                <h4 className={cls.infoTitle}>{t('codeOwnership.cms.infoTitle')}</h4>
                <p className={cls.infoText}>
                  {t('codeOwnership.cms.infoText')}
                </p>
                <ul className={cls.infoList}>
                  <li>{t('codeOwnership.cms.infoList1')}</li>
                  <li>{t('codeOwnership.cms.infoList2')}</li>
                  <li>{t('codeOwnership.cms.infoList3')}</li>
                  <li>{t('codeOwnership.cms.infoList4')}</li>
                  <li>{t('codeOwnership.cms.infoList5')}</li>
                  <li>{t('codeOwnership.cms.infoList6')}</li>
                  <li>{t('codeOwnership.cms.infoList7')}</li>
                </ul>
                <div className={cls.pricingBox}>
                  <h5 className={cls.pricingTitle}>{t('codeOwnership.cms.pricingTitle')}</h5>
                  <ul className={cls.pricingList}>
                    <li>
                      {t.rich('codeOwnership.cms.pricingInstall', { b: (c) => <strong>{c}</strong> })}
                    </li>
                    <li>
                      {t.rich('codeOwnership.cms.pricingHours', { b: (c) => <strong>{c}</strong> })}
                    </li>
                    <li>
                      {t.rich('codeOwnership.cms.pricingAfter', { b: (c) => <strong>{c}</strong> })}
                    </li>
                    <li>
                      {t.rich('codeOwnership.cms.pricingHosting', { b: (c) => <strong>{c}</strong> })}
                    </li>
                  </ul>
                </div>
                <p className={cls.infoNote}>
                  {t.rich('codeOwnership.cms.infoNote', { b: (c) => <strong>{c}</strong> })}
                </p>
                <a
                  href="/services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cls.cmsLink}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 3.333v13.334M16.667 10H3.333"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.333 16.667L10 20l-3.333-3.333"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {t('codeOwnership.cms.cmsLink')}
                </a>
              </div>
            )}
          </button>
        </div>
      </div>

      <div className={cls.footer}>
        <div className={cls.actions}>
          <button type="button" onClick={onBack} className={cls.btnSecondary}>
            {t('codeOwnership.back')}
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!canProceed}
            className={cls.btnPrimary}
          >
            {t('codeOwnership.next')}
          </button>
        </div>
      </div>
    </div>
  );
}
