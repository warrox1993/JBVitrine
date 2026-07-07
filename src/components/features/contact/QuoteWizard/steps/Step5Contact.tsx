'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ContactInfo, QuoteData, TimelineOption } from '../types';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useCsrfToken } from '@/hooks/useCsrfToken';
import 'react-phone-number-input/style.css';
import cls from './Step5Contact.module.css';

interface Step5ContactProps {
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
  quoteData,
  onSubmit,
  onBack,
  isSubmitting,
  stepNumber,
  totalSteps,
}: Step5ContactProps) {
  const t = useTranslations('wizard');
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
  const { csrfToken, error: csrfError } = useCsrfToken();

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
      newErrors.name = t('step5.errors.nameRequired');
    } else if (formData.name.trim().length < 2 || formData.name.trim().length > 80) {
      newErrors.name = t('step5.errors.nameLength');
    } else if (/\d/.test(formData.name)) {
      newErrors.name = t('step5.errors.nameNoDigits');
    } else if (/[^a-zA-ZÀ-ÿ\s\-'.]/g.test(formData.name)) {
      newErrors.name = t('step5.errors.nameInvalidChars');
    }

    // Email validation - RFC 5322 simplified (from ContactForm)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!formData.email.trim()) {
      newErrors.email = t('step5.errors.emailRequired');
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('step5.errors.emailInvalid');
    }

    // Phone validation (optional but validated if provided)
    if (formData.phone.trim()) {
      try {
        if (!isValidPhoneNumber(formData.phone)) {
          newErrors.phone = t('step5.errors.phoneInvalid');
        }
      } catch {
        newErrors.phone = t('step5.errors.phoneFormat');
      }
    }

    // Company validation - XSS protection (from ContactForm)
    if (formData.company && formData.company.length > 100) {
      newErrors.company = t('step5.errors.companyTooLong');
    } else if (formData.company && /<script|javascript:|onerror=/i.test(formData.company)) {
      newErrors.company = t('step5.errors.companyInvalidChars');
    }

    // Message validation - Max only (no minimum required)
    if (formData.message && formData.message.length > 1500) {
      newErrors.message = t('step5.errors.messageTooLong');
    }

    // Consent validation
    if (!formData.consent) {
      newErrors.consent = t('step5.errors.consentRequired');
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
        setGlobalError(t('step5.globalSlowDown'));
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
        setGlobalError(t('step5.globalRateLimit'));
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
          {t('common.stepSur', { step: stepNumber || 5, total: totalSteps || 5 })}
        </div>
        <h2 className={cls.title}>{t('step5.title')}</h2>
        <p className={cls.subtitle}>
          {t('step5.subtitle')}
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
              {t('step5.labelName')} <span className={cls.required}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`${cls.input} ${errors.name ? cls.inputError : ''}`}
              placeholder={t('step5.placeholderName')}
              disabled={isSubmitting}
            />
            {errors.name && <span className={cls.error}>{errors.name}</span>}
          </div>

          {/* Email */}
          <div className={cls.field}>
            <label htmlFor="email" className={cls.label}>
              {t('step5.labelEmail')} <span className={cls.required}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${cls.input} ${errors.email ? cls.inputError : ''}`}
              placeholder={t('step5.placeholderEmail')}
              disabled={isSubmitting}
            />
            {errors.email && <span className={cls.error}>{errors.email}</span>}
          </div>

          {/* Phone */}
          <div className={cls.field}>
            <label htmlFor="phone" className={cls.label}>
              {t('step5.labelPhone')}
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
              {t('step5.labelCompany')}
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={`${cls.input} ${errors.company ? cls.inputError : ''}`}
              placeholder={t('step5.placeholderCompany')}
              disabled={isSubmitting}
            />
            {errors.company && <span className={cls.error}>{errors.company}</span>}
          </div>

          {/* Timeline (if not already selected) */}
          {!quoteData.timeline && (
            <div className={cls.field}>
              <label className={cls.label}>{t('step5.timelineQuestion')}</label>
              <div className={cls.timelineOptions}>
                {[
                  { value: 'asap', label: t('step5.timelineAsap') },
                  { value: '1m', label: t('step5.timeline1m') },
                  { value: '2-3m', label: t('step5.timeline23m') },
                  { value: '>3m', label: t('step5.timelineGt3m') },
                  { value: 'flexible', label: t('step5.timelineFlexible') },
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
              {t('step5.labelMessage')}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`${cls.textarea} ${errors.message ? cls.inputError : ''}`}
              placeholder={t('step5.placeholderMessage')}
              rows={4}
              disabled={isSubmitting}
            />
            {errors.message && <span className={cls.error}>{errors.message}</span>}
            <span className={cls.hint}>
              {t('step5.messageHint')}
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
                {t.rich('step5.consent', {
                  privacy: (c) => (
                    <a
                      href="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cls.link}
                    >
                      {c}
                    </a>
                  ),
                  rgpd: (c) => (
                    <a
                      href="/legal-notice"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cls.link}
                    >
                      {c}
                    </a>
                  ),
                })}
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
            {t.rich('step5.recaptcha', {
              privacy: (c) => (
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent-1)' }}>
                  {c}
                </a>
              ),
              terms: (c) => (
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent-1)' }}>
                  {c}
                </a>
              ),
            })}
          </div>

          {/* Footer */}
          <div className={cls.footer}>
            <button
              type="button"
              onClick={onBack}
              className={cls.btnSecondary}
              disabled={isSubmitting}
            >
              {t('common.back')}
            </button>
            <button
              type="submit"
              className={cls.btnPrimary}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className={cls.spinner} />
                  {t('step5.submitting')}
                </>
              ) : (
                <>{t('step5.submit')}</>
              )}
            </button>
          </div>
        </form>


      </div>
    </div>
  );
}
