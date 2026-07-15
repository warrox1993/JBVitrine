'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useCsrfToken } from '@/hooks/useCsrfToken';
import cls from './ContactForm.module.css';

/**
 * Contact form: new navy/orange design (refonte-design).
 *
 * SECURED SUBMIT WIRING PRESERVED VERBATIM from the previous contact form:
 *  - useCsrfToken() singleton hook; submit blocked while token missing.
 *  - reCAPTCHA Enterprise loaded on mount + executed with action "contact_form".
 *  - POST /api/contact/direct with the exact payload shape:
 *    { requestType, email, name, company?, phone?, message, csrfToken, recaptchaToken }.
 *
 * Only presentation + the request-type labels changed. The mockup's
 * cyber-oriented "demande" values are NOT accepted by the API whitelist
 * (cv|technical|assistance|bug|partnership|other), so they are mapped to an
 * accepted value client-side (`apiType`) while the human-readable label is
 * prepended to the message so nothing is lost for the recipient. The API is
 * NOT modified.
 */

// Accepted server whitelist values (do not change, see /api/contact/direct).
type ApiRequestType =
  | 'cv'
  | 'technical'
  | 'assistance'
  | 'bug'
  | 'partnership'
  | 'other';

interface DemandeOption {
  value: string;
  labelKey: string;
  apiType: ApiRequestType;
}

// Mockup (cyber) labels → API whitelist value. Label is preserved in message.
const DEMANDE_OPTIONS: DemandeOption[] = [
  { value: 'diagnostic', labelKey: 'form.options.diagnostic', apiType: 'assistance' },
  { value: 'cyfun', labelKey: 'form.options.cyfun', apiType: 'assistance' },
  { value: 'pentest', labelKey: 'form.options.pentest', apiType: 'technical' },
  { value: 'dev', labelKey: 'form.options.dev', apiType: 'partnership' },
  { value: 'autre', labelKey: 'form.options.autre', apiType: 'other' },
];

interface FormState {
  demande: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  rgpd: boolean;
}

const INITIAL: FormState = {
  demande: 'diagnostic',
  name: '',
  company: '',
  email: '',
  phone: '',
  message: '',
  rgpd: false,
};

export function ContactForm() {
  const t = useTranslations('contact');
  const [data, setData] = useState<FormState>(INITIAL);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const successRef = useRef<HTMLDivElement>(null);

  // Shared CSRF token hook (singleton, no duplicate API calls).
  const { csrfToken, error: csrfError } = useCsrfToken();

  useEffect(() => {
    if (csrfError) {
      console.error('[ContactForm] CSRF token error:', csrfError);
    }
  }, [csrfError]);

  // Move focus to the success message so screen readers announce the outcome.
  useEffect(() => {
    if (submitSuccess) successRef.current?.focus();
  }, [submitSuccess]);

  // Load reCAPTCHA Enterprise on mount.
  useEffect(() => {
    const loadRecaptcha = async () => {
      const { RECAPTCHA_SITE_KEY } = await import('@/config/recaptcha');

      if (!RECAPTCHA_SITE_KEY) {
        console.error('❌ RECAPTCHA_SITE_KEY is not defined');
        return;
      }

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

  // Pre-fill the form when the visitor arrives from the NIS2 self-check ("?nis2=...").
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('nis2')) {
      setData((prev) => ({
        ...prev,
        demande: 'diagnostic',
        message: prev.message || t('form.nis2Intro'),
      }));
    }
  }, [t]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};

    if (!DEMANDE_OPTIONS.some((o) => o.value === data.demande)) {
      newErrors.demande = t('form.errors.demande');
    }

    if (!data.email) {
      newErrors.email = t('form.errors.emailRequired');
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
      newErrors.email = t('form.errors.emailInvalid');
    } else if (data.email.length > 254) {
      newErrors.email = t('form.errors.emailTooLong');
    }

    if (!data.name || data.name.trim().length < 2) {
      newErrors.name = t('form.errors.nameRequired');
    } else if (data.name.length > 100) {
      newErrors.name = t('form.errors.nameTooLong');
    } else if (/<|>|&lt;|&gt;/.test(data.name)) {
      newErrors.name = t('form.errors.invalidChars');
    }

    if (data.company && data.company.length > 100) {
      newErrors.company = t('form.errors.companyTooLong');
    } else if (data.company && /<|>|&lt;|&gt;/.test(data.company)) {
      newErrors.company = t('form.errors.invalidChars');
    }

    if (!data.message || data.message.trim().length < 10) {
      newErrors.message = t('form.errors.messageRequired');
    } else if (data.message.length > 5000) {
      newErrors.message = t('form.errors.messageTooLong');
    }

    if (!data.rgpd) {
      newErrors.rgpd = t('form.errors.rgpd');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!csrfToken) {
      setSubmitError(t('form.errors.csrf'));
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Generate reCAPTCHA Enterprise token (action MUST be "contact_form").
      let recaptchaToken = '';
      if (typeof window !== 'undefined' && (window as any).grecaptcha?.enterprise) {
        try {
          const { RECAPTCHA_SITE_KEY } = await import('@/config/recaptcha');
          await (window as any).grecaptcha.enterprise.ready(async () => {
            recaptchaToken = await (window as any).grecaptcha.enterprise.execute(
              RECAPTCHA_SITE_KEY,
              { action: 'contact_form' }
            );
          });
        } catch (error) {
          console.error('reCAPTCHA Enterprise error:', error);
          // Continue, backend enforces reCAPTCHA presence/score.
        }
      }

      const selected =
        DEMANDE_OPTIONS.find((o) => o.value === data.demande) ?? DEMANDE_OPTIONS[4];

      // Preserve the real (cyber) demande label inside the message body so the
      // mapping to the API whitelist value doesn't lose information.
      const message = `${t('form.messagePrefix')} ${t(selected.labelKey)}\n\n${data.message.trim()}`;

      // Exact payload shape expected by /api/contact/direct.
      const payload = {
        requestType: selected.apiType, // whitelisted value
        email: data.email.trim(),
        name: data.name.trim(),
        company: data.company.trim() || undefined,
        phone: data.phone.trim() || undefined,
        message,
        csrfToken,
        recaptchaToken,
      };

      const response = await fetch('/api/contact/direct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error || t('form.errors.submit'));
      }

      await response.json().catch(() => ({}));
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : t('form.errors.generic')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  if (submitSuccess) {
    return (
      <div className={cls.formCard}>
        <div className={cls.success} ref={successRef} tabIndex={-1} role="status" aria-live="polite">
          <div className={cls.successIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <h2 className={cls.successTitle}>{t('form.success.title')}</h2>
          <p className={cls.successText}>
            {t('form.success.text')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cls.formCard}>
      <div className={cls.fcHead}>
        <div>
          <h2>{t('form.title')}</h2>
          <p>
            {t('form.subtitle')}
          </p>
          <span className={cls.fcReassure}>
            <span className={cls.ic} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </span>
            {t('form.reassure')}
          </span>
        </div>
        <div className={cls.fcIllus} aria-hidden="true">
          <svg viewBox="0 0 88 84" fill="none">
            <rect x="6" y="18" width="58" height="40" rx="6" fill="#f5f7fa" stroke="#1e3a32" strokeWidth="2" />
            <path d="M8 22l25 18.2a4 4 0 0 0 4.6 0L62 22" stroke="#1e3a32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="63" cy="56" r="19" fill="#0c1a16" />
            <rect x="54" y="54" width="18" height="15" rx="3" fill="none" stroke="#fff" strokeWidth="2" />
            <path d="M57 54v-4.5a6 6 0 0 1 12 0V54" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            <circle cx="63" cy="61.5" r="1.9" fill="#0b7a5b" />
          </svg>
        </div>
      </div>

      {submitError && (
        <div className={cls.errorBanner} style={{ margin: '24px 34px 0' }} role="alert">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          <div>
            <strong>{t('form.errorLabel')}</strong>
            <p>{submitError}</p>
          </div>
        </div>
      )}

      <form className={cls.form} onSubmit={handleSubmit} noValidate>
        <div className={cls.field}>
          <label htmlFor="demande">
            {t('form.labels.demande')} <span className={cls.req} aria-hidden="true">*</span>
          </label>
          <div className={cls.selectWrap}>
            <select
              id="demande"
              name="demande"
              value={data.demande}
              onChange={(e) => update('demande', e.target.value)}
              className={errors.demande ? cls.inputError : ''}
              aria-invalid={errors.demande ? true : undefined}
              aria-describedby={errors.demande ? 'demande-error' : undefined}
              disabled={isSubmitting}
              required
            >
              {DEMANDE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {t(o.labelKey)}
                </option>
              ))}
            </select>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          {errors.demande && <span id="demande-error" role="alert" className={cls.errorText}>{errors.demande}</span>}
        </div>

        <div className={cls.fieldRow}>
          <div className={cls.field}>
            <label htmlFor="name">
              {t('form.labels.name')} <span className={cls.req} aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              placeholder={t('form.placeholders.name')}
              value={data.name}
              onChange={(e) => update('name', e.target.value)}
              className={errors.name ? cls.inputError : ''}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? 'name-error' : undefined}
              disabled={isSubmitting}
              required
            />
            {errors.name && <span id="name-error" role="alert" className={cls.errorText}>{errors.name}</span>}
          </div>
          <div className={cls.field}>
            <label htmlFor="company">{t('form.labels.company')}</label>
            <input
              type="text"
              id="company"
              name="company"
              autoComplete="organization"
              placeholder={t('form.placeholders.company')}
              value={data.company}
              onChange={(e) => update('company', e.target.value)}
              className={errors.company ? cls.inputError : ''}
              disabled={isSubmitting}
            />
            {errors.company && <span className={cls.errorText}>{errors.company}</span>}
          </div>
        </div>

        <div className={cls.fieldRow}>
          <div className={cls.field}>
            <label htmlFor="email">
              {t('form.labels.email')} <span className={cls.req} aria-hidden="true">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder={t('form.placeholders.email')}
              value={data.email}
              onChange={(e) => update('email', e.target.value)}
              className={errors.email ? cls.inputError : ''}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? 'email-error' : undefined}
              disabled={isSubmitting}
              required
            />
            {errors.email && <span id="email-error" role="alert" className={cls.errorText}>{errors.email}</span>}
          </div>
          <div className={cls.field}>
            <label htmlFor="phone">
              {t('form.labels.phone')} <span className={cls.hint}>{t('form.labels.phoneHint')}</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              autoComplete="tel"
              placeholder={t('form.placeholders.phone')}
              value={data.phone}
              onChange={(e) => update('phone', e.target.value)}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className={cls.field}>
          <label htmlFor="message">
            {t('form.labels.message')} <span className={cls.req} aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            placeholder={t('form.placeholders.message')}
            value={data.message}
            onChange={(e) => update('message', e.target.value)}
            className={errors.message ? cls.inputError : ''}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? 'message-error' : undefined}
            disabled={isSubmitting}
            required
          />
          {errors.message && <span id="message-error" role="alert" className={cls.errorText}>{errors.message}</span>}
        </div>

        <div className={`${cls.consent} ${errors.rgpd ? cls.inputError : ''}`}>
          <input
            type="checkbox"
            id="rgpd"
            name="rgpd"
            checked={data.rgpd}
            onChange={(e) => update('rgpd', e.target.checked)}
            disabled={isSubmitting}
            required
          />
          <label htmlFor="rgpd">
            {t.rich('form.consent', {
              link: (c) => <a href="/confidentialite">{c}</a>,
            })}{' '}
            <span className={cls.req} aria-hidden="true">*</span>
          </label>
        </div>
        {errors.rgpd && (
          <span className={cls.errorText} style={{ marginTop: '-16px', marginBottom: '16px' }}>
            {errors.rgpd}
          </span>
        )}

        <div className={cls.formFoot}>
          <button
            type="submit"
            className={cls.submitBtn}
            disabled={isSubmitting || !csrfToken}
          >
            {isSubmitting ? (
              t('form.submitting')
            ) : (
              <>
                {t('form.submit')}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />
                </svg>
              </>
            )}
          </button>
          <span className={cls.note}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
            </svg>
            {t('form.note')}
          </span>
        </div>

        <p style={{ margin: '14px 34px 4px', fontSize: '0.72rem', lineHeight: 1.5, color: 'var(--color-text-muted, #657189)' }}>
          {t.rich('form.recaptcha', {
            privacy: (c) => (
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">{c}</a>
            ),
            terms: (c) => (
              <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">{c}</a>
            ),
          })}
        </p>
      </form>
    </div>
  );
}

export default ContactForm;
