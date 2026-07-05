'use client';

import React, { useState, useEffect } from 'react';
import { useCsrfToken } from '@/hooks/useCsrfToken';
import cls from './ContactForm.module.css';

/**
 * Contact form — new navy/orange design (refonte-design).
 *
 * SECURED SUBMIT WIRING PRESERVED VERBATIM from SimpleContactForm:
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

// Accepted server whitelist values (do not change — see /api/contact/direct).
type ApiRequestType =
  | 'cv'
  | 'technical'
  | 'assistance'
  | 'bug'
  | 'partnership'
  | 'other';

interface DemandeOption {
  value: string;
  label: string;
  apiType: ApiRequestType;
}

// Mockup (cyber) labels → API whitelist value. Label is preserved in message.
const DEMANDE_OPTIONS: DemandeOption[] = [
  { value: 'diagnostic', label: 'Diagnostic gratuit', apiType: 'assistance' },
  { value: 'cyfun', label: 'Audit CyFun / NIS2', apiType: 'assistance' },
  { value: 'pentest', label: "Pentest / test d'intrusion", apiType: 'technical' },
  { value: 'dev', label: 'Développement web sécurisé', apiType: 'partnership' },
  { value: 'autre', label: 'Autre demande', apiType: 'other' },
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
  const [data, setData] = useState<FormState>(INITIAL);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  // Shared CSRF token hook (singleton — no duplicate API calls). Same as SimpleContactForm.
  const { csrfToken, error: csrfError } = useCsrfToken();

  useEffect(() => {
    if (csrfError) {
      console.error('[ContactForm] CSRF token error:', csrfError);
    }
  }, [csrfError]);

  // Load reCAPTCHA Enterprise on mount (identical to SimpleContactForm).
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

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};

    if (!DEMANDE_OPTIONS.some((o) => o.value === data.demande)) {
      newErrors.demande = 'Type de demande requis';
    }

    if (!data.email) {
      newErrors.email = 'Email requis';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
      newErrors.email = 'Email invalide';
    } else if (data.email.length > 254) {
      newErrors.email = 'Email trop long';
    }

    if (!data.name || data.name.trim().length < 2) {
      newErrors.name = 'Nom requis (minimum 2 caractères)';
    } else if (data.name.length > 100) {
      newErrors.name = 'Nom trop long (maximum 100 caractères)';
    } else if (/<|>|&lt;|&gt;/.test(data.name)) {
      newErrors.name = 'Caractères invalides détectés';
    }

    if (data.company && data.company.length > 100) {
      newErrors.company = "Nom d'entreprise trop long";
    } else if (data.company && /<|>|&lt;|&gt;/.test(data.company)) {
      newErrors.company = 'Caractères invalides détectés';
    }

    if (!data.message || data.message.trim().length < 10) {
      newErrors.message = 'Message requis (minimum 10 caractères)';
    } else if (data.message.length > 5000) {
      newErrors.message = 'Message trop long (maximum 5000 caractères)';
    }

    if (!data.rgpd) {
      newErrors.rgpd = 'Votre consentement est requis pour traiter la demande';
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
      setSubmitError('Token de sécurité manquant. Veuillez recharger la page.');
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
          // Continue — backend enforces reCAPTCHA presence/score.
        }
      }

      const selected =
        DEMANDE_OPTIONS.find((o) => o.value === data.demande) ?? DEMANDE_OPTIONS[4];

      // Preserve the real (cyber) demande label inside the message body so the
      // mapping to the API whitelist value doesn't lose information.
      const message = `Type de demande : ${selected.label}\n\n${data.message.trim()}`;

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
        throw new Error(err?.error || "Échec de l'envoi. Veuillez réessayer.");
      }

      await response.json().catch(() => ({}));
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Une erreur est survenue. Veuillez réessayer.'
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
        <div className={cls.success}>
          <div className={cls.successIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <h2 className={cls.successTitle}>Message envoyé&nbsp;!</h2>
          <p className={cls.successText}>
            Merci pour votre message. Un expert Smidjan vous répond sous 24&nbsp;h ouvrées.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cls.formCard}>
      <div className={cls.fcHead}>
        <div>
          <h2>Envoyez-nous votre demande</h2>
          <p>
            Décrivez votre besoin en quelques lignes. Plus vous êtes précis, plus notre
            première réponse sera utile.
          </p>
          <span className={cls.fcReassure}>
            <span className={cls.ic} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </span>
            Réponse d&apos;un expert sous 24&nbsp;h ouvrées
          </span>
        </div>
        <div className={cls.fcIllus} aria-hidden="true">
          <svg viewBox="0 0 88 84" fill="none">
            <rect x="6" y="18" width="58" height="40" rx="6" fill="#f5f7fa" stroke="#1c3a63" strokeWidth="2" />
            <path d="M8 22l25 18.2a4 4 0 0 0 4.6 0L62 22" stroke="#1c3a63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="63" cy="56" r="19" fill="#0b1f3a" />
            <rect x="54" y="54" width="18" height="15" rx="3" fill="none" stroke="#fff" strokeWidth="2" />
            <path d="M57 54v-4.5a6 6 0 0 1 12 0V54" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            <circle cx="63" cy="61.5" r="1.9" fill="#ff6a00" />
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
            <strong>Erreur</strong>
            <p>{submitError}</p>
          </div>
        </div>
      )}

      <form className={cls.form} onSubmit={handleSubmit} noValidate>
        <div className={cls.field}>
          <label htmlFor="demande">
            Type de demande <span className={cls.req} aria-hidden="true">*</span>
          </label>
          <div className={cls.selectWrap}>
            <select
              id="demande"
              name="demande"
              value={data.demande}
              onChange={(e) => update('demande', e.target.value)}
              className={errors.demande ? cls.inputError : ''}
              disabled={isSubmitting}
              required
            >
              {DEMANDE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          {errors.demande && <span className={cls.errorText}>{errors.demande}</span>}
        </div>

        <div className={cls.fieldRow}>
          <div className={cls.field}>
            <label htmlFor="name">
              Nom complet <span className={cls.req} aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              placeholder="Marie Dupont"
              value={data.name}
              onChange={(e) => update('name', e.target.value)}
              className={errors.name ? cls.inputError : ''}
              disabled={isSubmitting}
              required
            />
            {errors.name && <span className={cls.errorText}>{errors.name}</span>}
          </div>
          <div className={cls.field}>
            <label htmlFor="company">Entreprise</label>
            <input
              type="text"
              id="company"
              name="company"
              autoComplete="organization"
              placeholder="Votre société"
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
              E-mail professionnel <span className={cls.req} aria-hidden="true">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder="marie@entreprise.be"
              value={data.email}
              onChange={(e) => update('email', e.target.value)}
              className={errors.email ? cls.inputError : ''}
              disabled={isSubmitting}
              required
            />
            {errors.email && <span className={cls.errorText}>{errors.email}</span>}
          </div>
          <div className={cls.field}>
            <label htmlFor="phone">
              Téléphone <span className={cls.hint}>(facultatif)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              autoComplete="tel"
              placeholder="+32 4XX XX XX XX"
              value={data.phone}
              onChange={(e) => update('phone', e.target.value)}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className={cls.field}>
          <label htmlFor="message">
            Votre message <span className={cls.req} aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Décrivez votre contexte, votre secteur, l'échéance NIS2 qui vous concerne, ou l'incident que vous rencontrez…"
            value={data.message}
            onChange={(e) => update('message', e.target.value)}
            className={errors.message ? cls.inputError : ''}
            disabled={isSubmitting}
            required
          />
          {errors.message && <span className={cls.errorText}>{errors.message}</span>}
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
            J&apos;accepte que Smidjan traite les informations transmises pour répondre à ma
            demande, conformément à sa{' '}
            <a href="/mentions-legales#confidentialite">politique de confidentialité</a>. Aucune
            donnée n&apos;est cédée à des tiers.{' '}
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
              'Envoi en cours…'
            ) : (
              <>
                Envoyer ma demande
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
            Vos informations restent confidentielles
          </span>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
