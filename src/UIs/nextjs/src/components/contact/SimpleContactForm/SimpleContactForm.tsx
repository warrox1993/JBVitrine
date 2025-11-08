'use client';

import React, { useState, useEffect } from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { ArrowLeft, Send, CheckCircle, AlertCircle, Briefcase, Wrench, HelpCircle, Bug, Handshake, MoreHorizontal } from 'lucide-react';
import cls from './SimpleContactForm.module.css';

interface SimpleContactFormProps {
  onBack: () => void;
  onSubmit: (data: ContactFormData) => Promise<void>;
}

export type RequestType = 'cv' | 'technical' | 'assistance' | 'bug' | 'partnership' | 'other';

export interface ContactFormData {
  requestType: RequestType;
  email: string;
  name: string;
  company?: string;
  phone?: string;
  message: string;
  csrfToken?: string;
}

export function SimpleContactForm({ onBack, onSubmit }: SimpleContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    requestType: '' as RequestType,
    email: '',
    name: '',
    company: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  // Fetch CSRF token and load reCAPTCHA on mount
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('/api/csrf/token');
        if (response.ok) {
          const data = await response.json();
          setCsrfToken(data.token);
          console.log('✅ CSRF token fetched successfully');
        }
      } catch (error) {
        console.error('❌ Failed to fetch CSRF token:', error);
      }
    };

    fetchCsrfToken();

    // Load reCAPTCHA v3 script
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_ID;
    console.log('🔑 reCAPTCHA Site ID:', siteKey ? siteKey.substring(0, 20) + '...' : '❌ NOT FOUND');

    if (!siteKey) {
      console.error('❌ NEXT_PUBLIC_RECAPTCHA_SITE_ID is not defined');
      return;
    }

    if (!document.getElementById('recaptcha-script')) {
      const script = document.createElement('script');
      script.id = 'recaptcha-script';
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      script.onload = () => {
        console.log('✅ reCAPTCHA script loaded successfully');
        // Wait for grecaptcha to be ready
        setTimeout(() => {
          if (typeof window !== 'undefined' && (window as any).grecaptcha) {
            console.log('✅ grecaptcha is ready');
          } else {
            console.error('❌ grecaptcha is not available');
          }
        }, 1000);
      };
      script.onerror = () => {
        console.error('❌ Failed to load reCAPTCHA script');
      };
      document.head.appendChild(script);
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    // Request type validation
    const validTypes = ['cv', 'technical', 'assistance', 'bug', 'partnership', 'other'];
    if (!formData.requestType || !validTypes.includes(formData.requestType)) {
      newErrors.requestType = 'Type de demande requis';
    }

    // Email validation - stricter regex
    if (!formData.email) {
      newErrors.email = 'Email requis';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    } else if (formData.email.length > 254) {
      newErrors.email = 'Email trop long';
    }

    // Name validation - prevent XSS
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Nom requis (minimum 2 caractères)';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Nom trop long (maximum 100 caractères)';
    } else if (/<|>|&lt;|&gt;/.test(formData.name)) {
      newErrors.name = 'Caractères invalides détectés';
    }

    // Company validation
    if (formData.company && formData.company.length > 100) {
      newErrors.company = 'Nom d\'entreprise trop long';
    } else if (formData.company && /<|>|&lt;|&gt;/.test(formData.company)) {
      newErrors.company = 'Caractères invalides détectés';
    }

    // Phone validation with libphonenumber
    if (formData.phone && !isValidPhoneNumber(formData.phone)) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }

    // Message validation - length and XSS prevention
    if (!formData.message || formData.message.trim().length < 10) {
      newErrors.message = 'Message requis (minimum 10 caractères)';
    } else if (formData.message.length > 5000) {
      newErrors.message = 'Message trop long (maximum 5000 caractères)';
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
      // Generate reCAPTCHA token
      let recaptchaToken = '';
      if (typeof window !== 'undefined' && (window as any).grecaptcha) {
        try {
          recaptchaToken = await (window as any).grecaptcha.execute(
            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_ID,
            { action: 'contact_form' }
          );
        } catch (error) {
          console.error('reCAPTCHA error:', error);
          // Continue without reCAPTCHA if it fails (backend will handle)
        }
      }

      // Include CSRF token and reCAPTCHA token in submission
      await onSubmit({
        ...formData,
        csrfToken,
        recaptchaToken
      } as any);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Success screen
  if (submitSuccess) {
    return (
      <div className={cls.container}>
        <div className={cls.success}>
          <div className={cls.successIcon}>
            <CheckCircle size={64} strokeWidth={2} />
          </div>
          <h2 className={cls.successTitle}>Message envoyé !</h2>
          <p className={cls.successText}>
            Merci pour votre message. Notre équipe vous contactera dans les 24 heures.
          </p>
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

  return (
    <div className={cls.container}>
      <button onClick={onBack} className={cls.backButton}>
        <ArrowLeft size={20} />
        Retour au choix
      </button>

      <div className={cls.header}>
        <h2 className={cls.title}>Envoyez-nous votre demande</h2>
        <p className={cls.subtitle}>
          Choisissez le type de demande et décrivez-nous votre besoin. Nous vous recontacterons rapidement.
        </p>
      </div>

      {submitError && (
        <div className={cls.errorBanner}>
          <AlertCircle size={24} />
          <div>
            <strong>Erreur</strong>
            <p>{submitError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className={cls.form}>
        {/* Request Type */}
        <div className={cls.field}>
          <label htmlFor="requestType" className={cls.label}>
            Type de demande <span className={cls.required}>*</span>
          </label>
          <select
            id="requestType"
            name="requestType"
            value={formData.requestType}
            onChange={handleChange}
            className={`${cls.input} ${errors.requestType ? cls.inputError : ''}`}
            disabled={isSubmitting}
          >
            <option value="">Sélectionnez le type de demande</option>
            <option value="cv">Candidature (CV)</option>
            <option value="technical">Problème technique (site/projet existant)</option>
            <option value="assistance">Demande d&apos;assistance</option>
            <option value="bug">Signaler un bug sur le site</option>
            <option value="partnership">Proposition de partenariat</option>
            <option value="other">Autre demande</option>
          </select>
          {errors.requestType && <span className={cls.errorText}>{errors.requestType}</span>}
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
            placeholder="vous@entreprise.be"
            disabled={isSubmitting}
          />
          {errors.email && <span className={cls.errorText}>{errors.email}</span>}
        </div>

        {/* Name */}
        <div className={cls.field}>
          <label htmlFor="name" className={cls.label}>
            Nom et prénom <span className={cls.required}>*</span>
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
          {errors.name && <span className={cls.errorText}>{errors.name}</span>}
        </div>

        {/* Company (optional) */}
        <div className={cls.field}>
          <label htmlFor="company" className={cls.label}>
            Entreprise <span className={cls.optional}>(optionnel)</span>
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

        {/* Phone (optional) */}
        <div className={cls.field}>
          <label htmlFor="phone" className={cls.label}>
            Téléphone <span className={cls.optional}>(optionnel)</span>
          </label>
          <PhoneInput
            international
            defaultCountry="BE"
            value={formData.phone}
            onChange={(value) => {
              setFormData((prev) => ({ ...prev, phone: value || '' }));
              if (errors.phone) {
                setErrors((prev) => ({ ...prev, phone: undefined }));
              }
            }}
            className={`${cls.phoneInput} ${errors.phone ? cls.inputError : ''}`}
            disabled={isSubmitting}
            placeholder="+32 XXX XX XX XX"
          />
          {errors.phone && <span className={cls.errorText}>{errors.phone}</span>}
        </div>

        {/* Message */}
        <div className={cls.field}>
          <label htmlFor="message" className={cls.label}>
            Votre message <span className={cls.required}>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`${cls.textarea} ${errors.message ? cls.inputError : ''}`}
            placeholder="Décrivez votre demande en détail..."
            rows={8}
            disabled={isSubmitting}
          />
          {errors.message && <span className={cls.errorText}>{errors.message}</span>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={cls.btnPrimary}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>Envoi en cours...</>
          ) : (
            <>
              <Send size={20} />
              Envoyer ma demande
            </>
          )}
        </button>

        <p className={cls.privacy}>
          En soumettant ce formulaire, vous acceptez que nous utilisions vos
          données pour vous recontacter au sujet de votre projet.
        </p>
      </form>
    </div>
  );
}
