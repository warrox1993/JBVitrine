'use client';

import React, { useState, useEffect } from 'react';
import { ContactInfo, QuoteEstimate, QuoteData, TimelineOption } from '../types';
import { formatPriceRange } from '@/lib/pricing/calculator';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useCsrfToken } from '@/hooks/useCsrfToken';
import 'react-phone-number-input/style.css';
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

// Extended ContactInfo with security fields
interface SecureContactInfo extends ContactInfo {
  honeypot?: string;
  formStartTime?: number;
  csrfToken?: string;
  recaptchaToken?: string;
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
  const [formData, setFormData] = useState<SecureContactInfo>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    consent: false,
    honeypot: '', // Anti-bot honeypot
    formStartTime: undefined,
    csrfToken: undefined,
    recaptchaToken: undefined,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactInfo, string>>>({});
  const [selectedTimeline, setSelectedTimeline] = useState<TimelineOption | null>(
    quoteData.timeline
  );
  const [globalError, setGlobalError] = useState<string>('');

  // Use shared CSRF token hook (singleton pattern - no duplicate API calls)
  const { csrfToken, isLoading: csrfLoading, error: csrfError } = useCsrfToken();

  // Sync CSRF token to form data when it changes
  useEffect(() => {
    if (csrfToken) {
      setFormData((prev) => ({ ...prev, csrfToken }));
      console.log('[Step5Contact] CSRF token synced from shared hook');
    }
    if (csrfError) {
      console.error('[Step5Contact] CSRF token error:', csrfError);
    }
  }, [csrfToken, csrfError]);

  // Initialize form start time and reCAPTCHA on mount
  useEffect(() => {
    setFormData((prev) => ({ ...prev, formStartTime: Date.now() }));

    // Load reCAPTCHA Enterprise script
    const loadRecaptcha = async () => {
      const { RECAPTCHA_SITE_KEY } = await import('@/config/recaptcha');

      if (!RECAPTCHA_SITE_KEY) {
        console.error('❌ RECAPTCHA_SITE_KEY is not defined');
        return;
      }

      console.log('🔑 reCAPTCHA Enterprise Site ID loaded');

      if (!document.getElementById('recaptcha-script')) {
        const script = document.createElement('script');
        script.id = 'recaptcha-script';
        script.src = `https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_SITE_KEY}`;
        script.async = true;
        script.onload = () => {
          console.log('✅ reCAPTCHA Enterprise script loaded successfully');
        };
        script.onerror = () => {
          console.error('❌ Failed to load reCAPTCHA Enterprise script');
        };
        document.head.appendChild(script);
      }
    };

    loadRecaptcha();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactInfo, string>> = {};

    // Name validation - STRICT (from ContactForm)
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    } else if (formData.name.trim().length < 2 || formData.name.trim().length > 80) {
      newErrors.name = 'Le nom doit contenir entre 2 et 80 caractères';
    } else if (/\d/.test(formData.name)) {
      newErrors.name = 'Le nom ne peut pas contenir de chiffres';
    } else if (/[^a-zA-ZÀ-ÿ\s\-'.]/g.test(formData.name)) {
      newErrors.name = 'Le nom contient des caractères non autorisés';
    }

    // Email validation - RFC 5322 simplified (from ContactForm)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    // Phone validation (optional but validated if provided)
    if (formData.phone.trim()) {
      try {
        if (!isValidPhoneNumber(formData.phone)) {
          newErrors.phone = 'Numéro de téléphone invalide';
        }
      } catch (error) {
        newErrors.phone = 'Format de téléphone invalide';
      }
    }

    // Company validation - XSS protection (from ContactForm)
    if (formData.company && formData.company.length > 100) {
      newErrors.company = "Le nom de l'entreprise est trop long (max 100 caractères)";
    } else if (formData.company && /<script|javascript:|onerror=/i.test(formData.company)) {
      newErrors.company = 'Caractères non autorisés détectés';
    }

    // Message validation - Min/Max (from ContactForm)
    if (formData.message && formData.message.trim()) {
      if (formData.message.length < 10 || formData.message.length > 1500) {
        newErrors.message = 'Le message doit contenir entre 10 et 1 500 caractères';
      }
    }

    // Consent validation
    if (!formData.consent) {
      newErrors.consent = 'Vous devez accepter la politique de confidentialité';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError('');

    // ============================================
    // SECURITY CHECKS (from ContactForm)
    // ============================================

    // 1. Honeypot check - Bot detection
    if (formData.honeypot) {
      console.warn('🤖 Bot detected via honeypot');
      return; // Silent fail - don't tell bots they failed
    }

    // 2. FormStartTime check - Too fast = bot
    if (formData.formStartTime) {
      const fillTime = Date.now() - formData.formStartTime;
      const minFillTime = 3000; // 3 seconds minimum

      if (fillTime < minFillTime) {
        console.warn('⚡ Form filled too quickly - possible bot');
        setGlobalError('Veuillez ralentir. Prenez le temps de remplir le formulaire correctement.');
        return;
      }
    }

    // 3. Rate limiting - Max 20 submissions per hour (from ContactForm)
    const rateLimitKey = 'quote_wizard_submissions';
    const rateLimitWindow = 60 * 60 * 1000; // 1 hour in ms
    const maxSubmissions = 20;

    try {
      const storedData = localStorage.getItem(rateLimitKey);
      const submissions: number[] = storedData ? JSON.parse(storedData) : [];
      const now = Date.now();

      const recentSubmissions = submissions.filter(
        (timestamp) => now - timestamp < rateLimitWindow
      );

      if (recentSubmissions.length >= maxSubmissions) {
        setGlobalError(
          'Vous avez atteint la limite de soumissions. Veuillez réessayer dans une heure ou nous contacter directement à smidjan.agency@outlook.com'
        );
        return;
      }

      // Store this submission timestamp
      recentSubmissions.push(now);
      localStorage.setItem(rateLimitKey, JSON.stringify(recentSubmissions));
    } catch (error) {
      console.warn('Rate limiting unavailable:', error);
    }

    // 4. Validate form
    if (!validateForm()) {
      return;
    }

    // 5. Generate reCAPTCHA Enterprise token
    // ⚠️ CRITICAL FIX: Use Promise wrapper to properly await the callback
    let recaptchaToken = '';
    if (typeof window !== 'undefined' && (window as any).grecaptcha?.enterprise) {
      try {
        const { RECAPTCHA_SITE_KEY } = await import('@/config/recaptcha');
        console.log('[Step5Contact] 🔐 Starting reCAPTCHA token generation...');

        // Wrap in Promise to properly await the callback
        recaptchaToken = await new Promise<string>((resolve, reject) => {
          const timeout = setTimeout(() => {
            console.error('[Step5Contact] ⏱️ reCAPTCHA timeout after 10s');
            reject(new Error('reCAPTCHA timeout'));
          }, 10000);

          (window as any).grecaptcha.enterprise.ready(async () => {
            try {
              console.log('[Step5Contact] 🔄 grecaptcha.ready callback executing...');
              const token = await (window as any).grecaptcha.enterprise.execute(
                RECAPTCHA_SITE_KEY,
                { action: 'quote_submission' }
              );
              clearTimeout(timeout);
              console.log('[Step5Contact] ✅ reCAPTCHA token generated:', token ? `${token.length} chars` : 'EMPTY');
              resolve(token || '');
            } catch (error) {
              clearTimeout(timeout);
              console.error('[Step5Contact] ❌ grecaptcha.execute error:', error);
              reject(error);
            }
          });
        });
      } catch (error) {
        console.error('[Step5Contact] ❌ reCAPTCHA Enterprise error:', error);
        // Continue without reCAPTCHA if it fails (backend will handle)
      }
    } else {
      console.warn('[Step5Contact] ⚠️ grecaptcha.enterprise not available');
    }

    console.log('[Step5Contact] 📋 Final token status:', {
      hasRecaptchaToken: !!recaptchaToken,
      tokenLength: recaptchaToken?.length || 0,
      hasCsrfToken: !!formData.csrfToken,
    });

    // Prepare clean ContactInfo (with reCAPTCHA token AND CSRF token)
    const contactInfo: ContactInfo = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      message: formData.message,
      consent: formData.consent,
      recaptchaToken: recaptchaToken || undefined,
      csrfToken: formData.csrfToken || undefined, // ✅ FIX: Include CSRF token
    };

    // Call parent's onSubmit with clean ContactInfo
    onSubmit(contactInfo);
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
          {/* Global Error */}
          {globalError && (
            <div className={cls.globalError} style={{
              padding: '0.75rem',
              background: '#ff4444',
              color: 'white',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-3)',
              fontSize: 'var(--text-sm)'
            }}>
              {globalError}
            </div>
          )}

          {/* Honeypot field - HIDDEN from humans, visible to bots */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

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
            <PhoneInput
              id="phone"
              international
              defaultCountry="BE"
              countries={['BE', 'FR', 'NL', 'LU', 'DE', 'GB', 'ES', 'IT', 'PT', 'CH', 'AT']}
              value={formData.phone}
              onChange={(value) => {
                setFormData((prev) => ({ ...prev, phone: value || '' }));
                if (errors.phone) {
                  setErrors((prev) => ({ ...prev, phone: undefined }));
                }
              }}
              className={`${cls.input} ${errors.phone ? cls.inputError : ''}`}
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
              className={`${cls.input} ${errors.company ? cls.inputError : ''}`}
              placeholder="Nom de votre entreprise"
              disabled={isSubmitting}
            />
            {errors.company && <span className={cls.error}>{errors.company}</span>}
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
              className={`${cls.textarea} ${errors.message ? cls.inputError : ''}`}
              placeholder="Décrivez votre projet en quelques mots, posez vos questions..."
              rows={4}
              disabled={isSubmitting}
            />
            {errors.message && <span className={cls.error}>{errors.message}</span>}
            <span className={cls.hint}>
              Plus vous nous en dites, plus notre devis sera précis (entre 10 et 1 500 caractères)
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
                au sujet de ma demande conformément à la{' '}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cls.link}
                >
                  politique de confidentialité
                </a>
                {' '}et au{' '}
                <a
                  href="/legal-notice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cls.link}
                >
                  RGPD
                </a>
                <span className={cls.required}> *</span>
              </span>
            </label>
            {errors.consent && (
              <span className={cls.error}>{errors.consent}</span>
            )}
          </div>

          {/* reCAPTCHA Badge Notice */}
          <div style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-3)',
            marginTop: 'var(--space-2)',
            fontStyle: 'italic'
          }}>
            Ce site est protégé par reCAPTCHA et soumis à la{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent-1)' }}>
              politique de confidentialité
            </a>{' '}
            et aux{' '}
            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent-1)' }}>
              conditions d&apos;utilisation
            </a>{' '}
            de Google.
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


      </div>
    </div>
  );
}
