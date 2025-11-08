'use client';

import React, { useState } from 'react';
import { ContactInfo, QuoteEstimate, QuoteData, TimelineOption } from '../types';
import { formatPriceRange } from '@/lib/pricing/calculator';
import cls from './Step5Contact.module.css';

interface Step5ContactProps {
  estimate: QuoteEstimate;
  quoteData: QuoteData;
  onSubmit: (contactInfo: ContactInfo) => void;
  onBack: () => void;
  isSubmitting: boolean;
  stepNumber?: number;
  totalSteps?: number;
}

export function Step5Contact({
  estimate,
  quoteData,
  onSubmit,
  onBack,
  isSubmitting,
  stepNumber,
  totalSteps,
}: Step5ContactProps) {
  const [formData, setFormData] = useState<ContactInfo>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactInfo, string>>>({});
  const [selectedTimeline, setSelectedTimeline] = useState<TimelineOption | null>(
    quoteData.timeline
  );

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactInfo, string>> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    // Phone validation (optional but validated if provided)
    if (formData.phone.trim()) {
      const phoneRegex = /^[\d\s+()-]{8,}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Numéro de téléphone invalide';
      }
    }

    // Company validation (optional)
    // No validation needed - optional field

    // Consent validation
    if (!formData.consent) {
      newErrors.consent = 'Vous devez accepter la politique de confidentialité';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error for this field
    if (errors[name as keyof ContactInfo]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleTimelineChange = (timeline: TimelineOption) => {
    setSelectedTimeline(timeline);
  };

  return (
    <div className={cls.step}>
      <div className={cls.header}>
        <div className={cls.stepNumber}>
          Étape {stepNumber || 5} sur {totalSteps || 5}
        </div>
        <h2 className={cls.title}>Recevez votre devis détaillé</h2>
        <p className={cls.subtitle}>
          Partagez vos coordonnées pour recevoir votre estimation personnalisée
        </p>
      </div>

      <div className={cls.layout}>
        {/* Form */}
        <form onSubmit={handleSubmit} className={cls.form}>
          {/* Name */}
          <div className={cls.field}>
            <label htmlFor="name" className={cls.label}>
              Nom complet <span className={cls.required}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`${cls.input} ${errors.name ? cls.inputError : ''}`}
              placeholder="Jean Dupont"
              disabled={isSubmitting}
            />
            {errors.name && <span className={cls.error}>{errors.name}</span>}
          </div>

          {/* Email */}
          <div className={cls.field}>
            <label htmlFor="email" className={cls.label}>
              Email professionnel <span className={cls.required}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${cls.input} ${errors.email ? cls.inputError : ''}`}
              placeholder="jean@entreprise.be"
              disabled={isSubmitting}
            />
            {errors.email && <span className={cls.error}>{errors.email}</span>}
          </div>

          {/* Phone */}
          <div className={cls.field}>
            <label htmlFor="phone" className={cls.label}>
              Téléphone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`${cls.input} ${errors.phone ? cls.inputError : ''}`}
              placeholder="+32 4 XX XX XX XX"
              disabled={isSubmitting}
            />
            {errors.phone && <span className={cls.error}>{errors.phone}</span>}
          </div>

          {/* Company */}
          <div className={cls.field}>
            <label htmlFor="company" className={cls.label}>
              Entreprise
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={cls.input}
              placeholder="Nom de votre entreprise"
              disabled={isSubmitting}
            />
          </div>

          {/* Timeline (if not already selected) */}
          {!quoteData.timeline && (
            <div className={cls.field}>
              <label className={cls.label}>Quand souhaitez-vous démarrer ?</label>
              <div className={cls.timelineOptions}>
                {[
                  { value: 'asap', label: 'Dès que possible' },
                  { value: '1m', label: 'Dans 1 mois' },
                  { value: '2-3m', label: 'Dans 2-3 mois' },
                  { value: '>3m', label: 'Plus de 3 mois' },
                  { value: 'flexible', label: 'Je suis flexible' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleTimelineChange(option.value as TimelineOption)}
                    className={`${cls.timelineBtn} ${
                      selectedTimeline === option.value ? cls.timelineSelected : ''
                    }`}
                    disabled={isSubmitting}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message */}
          <div className={cls.field}>
            <label htmlFor="message" className={cls.label}>
              Détails supplémentaires
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={cls.textarea}
              placeholder="Décrivez votre projet en quelques mots, posez vos questions..."
              rows={4}
              disabled={isSubmitting}
            />
            <span className={cls.hint}>
              Plus vous nous en dites, plus notre devis sera précis
            </span>
          </div>

          {/* Consent */}
          <div className={cls.field}>
            <label className={cls.checkboxLabel}>
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                className={cls.checkbox}
                disabled={isSubmitting}
              />
              <span className={errors.consent ? cls.checkboxTextError : ''}>
                J&apos;accepte que Smidjan traite mes données pour me recontacter
                au sujet de ma demande.{' '}
                <a
                  href="/legal/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cls.link}
                >
                  Politique de confidentialité
                </a>
                <span className={cls.required}> *</span>
              </span>
            </label>
            {errors.consent && (
              <span className={cls.error}>{errors.consent}</span>
            )}
          </div>

          {/* Footer */}
          <div className={cls.footer}>
            <button
              type="button"
              onClick={onBack}
              className={cls.btnSecondary}
              disabled={isSubmitting}
            >
              ← Retour
            </button>
            <button
              type="submit"
              className={cls.btnPrimary}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className={cls.spinner} />
                  Envoi en cours...
                </>
              ) : (
                <>Envoyer ma demande</>
              )}
            </button>
          </div>
        </form>

        {/* Sidebar Summary */}
        <aside className={cls.sidebar}>
          <div className={cls.summaryCard}>
            <h3 className={cls.summaryTitle}>Votre demande</h3>

            <div className={cls.summarySection}>
              <div className={cls.summaryLabel}>Budget estimé</div>
              <div className={cls.summaryValue}>
                {formatPriceRange(estimate.min, estimate.max)}
              </div>
            </div>

            <div className={cls.summarySection}>
              <div className={cls.summaryLabel}>Délai</div>
              <div className={cls.summaryValue}>{estimate.timeline}</div>
            </div>

            <div className={cls.summarySection}>
              <div className={cls.summaryLabel}>Fonctionnalités</div>
              <div className={cls.summaryValue}>
                {estimate.totalFeatures} sélectionnées
              </div>
            </div>

            <div className={cls.summaryDivider} />

            <div className={cls.guarantees}>
              <h4 className={cls.guaranteesTitle}>Nos garanties</h4>
              <ul className={cls.guaranteesList}>
                <li>Réponse sous 24h</li>
                <li>Devis détaillé et gratuit</li>
                <li>Pas d&apos;engagement</li>
                <li>Données sécurisées (RGPD)</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
