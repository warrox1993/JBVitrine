'use client';

import React, { useState } from 'react';
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
  const [showInfo, setShowInfo] = useState<'ownership' | 'cms' | null>(null);

  const handleSelection = (wantsOwnership: boolean) => {
    onChange(wantsOwnership);
  };

  const canProceed = selected !== null;

  return (
    <div className={cls.step}>
      <div className={cls.header}>
        <span className={cls.stepNumber}>Etape 2</span>
        <h2 className={cls.title}>Souhaitez-vous etre proprietaire du code ?</h2>
        <p className={cls.subtitle}>
          Cette question determine l'approche technique de votre projet e-commerce
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
              <h3 className={cls.optionTitle}>Oui, je veux le code</h3>
            </div>
            <p className={cls.optionDescription}>
              Developpement sur mesure - Vous etes proprietaire a 100% du code source
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
                <span>Code 100% personnalise</span>
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
                <span>Liberte totale - aucune dependance</span>
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
                <span>Performances optimales</span>
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
                <span>Evolutivite illimitee</span>
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
              En savoir plus
            </button>

            {showInfo === 'ownership' && (
              <div className={cls.infoBox} onClick={(e) => e.stopPropagation()}>
                <h4 className={cls.infoTitle}>Developpement sur mesure</h4>
                <p className={cls.infoText}>
                  Nous developpons votre e-commerce avec les technologies modernes (Next.js, React, TypeScript).
                  Vous recevez le code source complet et en etes l'unique proprietaire.
                </p>
                <ul className={cls.infoList}>
                  <li>Aucun abonnement mensuel CMS</li>
                  <li>Aucune limite technique</li>
                  <li>Hebergement chez le prestataire de votre choix</li>
                  <li>Code maintenable par n'importe quel developpeur</li>
                  <li>Integrations API illimitees</li>
                </ul>
                <p className={cls.infoNote}>
                  <strong>Ideal pour:</strong> Projets evolutifs, besoins specifiques, volumes importants
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
              <h3 className={cls.optionTitle}>Non, je prefere un CMS</h3>
            </div>
            <p className={cls.optionDescription}>
              CMS Smidjan - Solution professionnelle complete avec backend e-commerce
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
                <span>Backend e-commerce 100% complet</span>
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
                <span>Installation: 2 500 EUR</span>
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
                <span>40h personnalisation front: GRATUIT</span>
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
                <span>Apres 40h: 50 EUR/heure HT</span>
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
                <span>Hebergement: 500 EUR/mois HT</span>
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
              En savoir plus
            </button>

            {showInfo === 'cms' && (
              <div className={cls.infoBox} onClick={(e) => e.stopPropagation()}>
                <h4 className={cls.infoTitle}>CMS Smidjan - Solution E-commerce Complete</h4>
                <p className={cls.infoText}>
                  Le CMS Smidjan est une solution e-commerce professionnelle developpee en interne
                  avec un backend complet comprenant toutes les fonctionnalites necessaires pour gerer
                  votre boutique en ligne.
                </p>
                <ul className={cls.infoList}>
                  <li>Backend e-commerce 100% complet et optimise</li>
                  <li>Gestion des produits, stock, commandes, clients</li>
                  <li>Paiements securises integres (Stripe, Mollie, PayPal)</li>
                  <li>Tableau de bord analytique en temps reel</li>
                  <li>Interface d'administration intuitive</li>
                  <li>Support technique Smidjan inclus</li>
                  <li>Mises a jour et securite gerees</li>
                </ul>
                <div className={cls.pricingBox}>
                  <h5 className={cls.pricingTitle}>Tarification CMS Smidjan:</h5>
                  <ul className={cls.pricingList}>
                    <li>
                      <strong>Installation complete:</strong> 2 500 EUR (configuration, backend, connexions paiement)
                    </li>
                    <li>
                      <strong>40 premieres heures:</strong> GRATUITES (personnalisation front-end, design, logo, couleurs)
                    </li>
                    <li>
                      <strong>Apres 40h:</strong> 50 EUR/heure HT (fonctionnalites supplementaires)
                    </li>
                    <li>
                      <strong>Hebergement:</strong> 500 EUR/mois HT (serveurs optimises, backup quotidien, monitoring 24/7)
                    </li>
                  </ul>
                </div>
                <p className={cls.infoNote}>
                  <strong>Ideal pour:</strong> Boutiques serieuses, evolution rapide, support professionnel, tranquillite d'esprit
                </p>
                <a
                  href="/cms-ecommerce"
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
                  Decouvrir le CMS Smidjan en detail
                </a>
              </div>
            )}
          </button>
        </div>
      </div>

      <div className={cls.footer}>
        <div className={cls.actions}>
          <button type="button" onClick={onBack} className={cls.btnSecondary}>
            Retour
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!canProceed}
            className={cls.btnPrimary}
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
}
