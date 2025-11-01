'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { Textarea } from '@/components/atoms/Textarea';
import { Label } from '@/components/atoms/Label';
import { Button } from '@/components/atoms/Button';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'libphonenumber-js';
import 'react-phone-number-input/style.css';
import cls from './ContactForm.module.css';

type FormData = {
    type: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    budget: string;
    timeline: string;
    message: string;
    consent: boolean;
    honeypot: string;
    formStartTime?: number; // Timestamp when form was loaded
};

type FieldErrors = Partial<Record<keyof FormData, string>>;

const initialFormData: FormData = {
    type: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '',
    timeline: '',
    message: '',
    consent: false,
    honeypot: '',
};

/**
 * Sanitize UTM parameters to prevent XSS and injection attacks
 * @param value - UTM parameter value from URL
 * @returns Sanitized string or null
 */
const sanitizeUTM = (value: string | null): string | null => {
    if (!value) return null;

    // Remove any HTML tags
    let cleaned = value.replace(/<[^>]*>?/gm, '');

    // Remove javascript: protocol
    cleaned = cleaned.replace(/javascript:/gi, '');

    // Remove event handlers
    cleaned = cleaned.replace(/on\w+\s*=/gi, '');

    // Limit length
    cleaned = cleaned.substring(0, 100);

    return cleaned.trim() || null;
};

export function ContactForm() {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [globalError, setGlobalError] = useState<string>('');

    // Initialize form start time on mount
    useEffect(() => {
        setFormData(prev => ({ ...prev, formStartTime: Date.now() }));
    }, []);

    const validateField = (name: keyof FormData, value: string | boolean): string => {
        switch (name) {
            case 'type':
                return !value ? 'Veuillez sélectionner un type de demande' : '';
            case 'name':
                if (!value) return 'Le nom est requis';
                if (typeof value === 'string') {
                    if (value.length < 2 || value.length > 80) {
                        return 'Le nom doit contenir entre 2 et 80 caractères';
                    }
                    // Reject names containing numbers
                    if (/\d/.test(value)) {
                        return 'Le nom ne peut pas contenir de chiffres';
                    }
                    // Reject names with excessive special characters
                    if (/[^a-zA-ZÀ-ÿ\s\-'.]/g.test(value)) {
                        return 'Le nom contient des caractères non autorisés';
                    }
                }
                return '';
            case 'email':
                if (!value) return 'L\'email est requis';
                // Improved email regex (RFC 5322 simplified)
                const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                return !emailRegex.test(String(value)) ? 'Email invalide' : '';
            case 'phone':
                if (value && typeof value === 'string') {
                    // Use libphonenumber-js for accurate validation
                    try {
                        if (!isValidPhoneNumber(value)) {
                            return 'Numéro de téléphone invalide';
                        }
                    } catch (error) {
                        return 'Format de téléphone invalide';
                    }
                }
                return '';
            case 'company':
                if (value && typeof value === 'string') {
                    if (value.length > 100) {
                        return 'Le nom de l\'entreprise est trop long (max 100 caractères)';
                    }
                    // Reject if contains suspicious patterns
                    if (/<script|javascript:|onerror=/i.test(value)) {
                        return 'Caractères non autorisés détectés';
                    }
                }
                return '';
            case 'message':
                if (!value) return 'La description est requise';
                if (typeof value === 'string' && (value.length < 30 || value.length > 1500)) {
                    return 'La description doit contenir entre 30 et 1 500 caractères';
                }
                return '';
            case 'consent':
                return !value ? 'Vous devez accepter les conditions' : '';
            default:
                return '';
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

        setFormData(prev => ({ ...prev, [name]: fieldValue }));

        // Clear error when user starts typing
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FieldErrors = {};

        (Object.keys(formData) as Array<keyof FormData>).forEach(key => {
            // Validate all fields except honeypot, budget, timeline, and formStartTime
            if (key !== 'honeypot' && key !== 'budget' && key !== 'timeline' && key !== 'formStartTime') {
                const error = validateField(key, formData[key]);
                if (error) newErrors[key] = error;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setGlobalError('');

        // Honeypot check
        if (formData.honeypot) {
            console.warn('Bot detected');
            return;
        }

        // Timestamp validation - detect bots that fill forms too quickly
        if (formData.formStartTime) {
            const fillTime = Date.now() - formData.formStartTime;
            const minFillTime = 3000; // 3 seconds minimum (human can't fill a form faster)

            if (fillTime < minFillTime) {
                console.warn('Form filled too quickly - possible bot');
                setGlobalError('Veuillez ralentir. Prenez le temps de remplir le formulaire correctement.');
                return;
            }
        }

        // Client-side rate limiting (3 submissions per hour)
        const rateLimitKey = 'contact_form_submissions';
        const rateLimitWindow = 60 * 60 * 1000; // 1 hour in ms
        const maxSubmissions = 3;

        try {
            const storedData = localStorage.getItem(rateLimitKey);
            const submissions: number[] = storedData ? JSON.parse(storedData) : [];
            const now = Date.now();

            // Filter out old submissions outside the time window
            const recentSubmissions = submissions.filter(timestamp => now - timestamp < rateLimitWindow);

            if (recentSubmissions.length >= maxSubmissions) {
                setGlobalError('Vous avez atteint la limite de soumissions. Veuillez réessayer dans une heure ou nous contacter directement à jeanbaptiste.dhondt1@gmail.com.');
                setStatus('error');
                return;
            }

            // Store this submission timestamp
            recentSubmissions.push(now);
            localStorage.setItem(rateLimitKey, JSON.stringify(recentSubmissions));
        } catch (error) {
            // If localStorage is not available, continue anyway (privacy mode, etc.)
            console.warn('Rate limiting unavailable:', error);
        }

        if (!validateForm()) {
            return;
        }

        setStatus('submitting');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: formData.type,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone || null,
                    company: formData.company || null,
                    budget: formData.budget || null,
                    timeline: formData.timeline || null,
                    message: formData.message,
                    consent: formData.consent,
                    formStartTime: formData.formStartTime,
                    utm: {
                        source: sanitizeUTM(new URLSearchParams(window.location.search).get('utm_source')),
                        campaign: sanitizeUTM(new URLSearchParams(window.location.search).get('utm_campaign')),
                    },
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.fieldErrors) {
                    setErrors(data.fieldErrors);
                }
                throw new Error(data.message || 'Une erreur est survenue');
            }

            setStatus('success');
            setFormData(initialFormData);
        } catch (error) {
            setStatus('error');
            setGlobalError(error instanceof Error ? error.message : 'Un souci est survenu. Réessayez dans quelques minutes, ou écrivez-nous à jeanbaptiste.dhondt1@gmail.com.');
        }
    };

    if (status === 'success') {
        return (
            <div className={cls.success} role="status" aria-live="polite">
                <h3 className={cls.successTitle}>Bien reçu.</h3>
                <p className={cls.successText}>
                    Merci, on vous répond sous 24h ouvrées. Vous recevrez un accusé par email.
                </p>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={cls.form}
            noValidate
            data-analytics="contact-form"
        >
            {/* Honeypot field */}
            <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
            />

            <div className={cls.field}>
                <Label htmlFor="type" required>Type de demande</Label>
                <Select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    aria-invalid={!!errors.type}
                    aria-describedby={errors.type ? 'type-error' : undefined}
                >
                    <option value="">Sélectionner...</option>
                    <option value="projet">Projet/Devis</option>
                    <option value="support">Support/Question</option>
                    <option value="partenariat">Partenariat</option>
                </Select>
                {errors.type && <span id="type-error" className={cls.error} role="alert">{errors.type}</span>}
            </div>

            <div className={cls.field}>
                <Label htmlFor="name" required>Nom complet</Label>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ex. Marie Dupont"
                    required
                    maxLength={80}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && <span id="name-error" className={cls.error} role="alert">{errors.name}</span>}
            </div>

            <div className={cls.field}>
                <Label htmlFor="email" required>Email professionnel</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre.email@exemple.com"
                    required
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && <span id="email-error" className={cls.error} role="alert">{errors.email}</span>}
            </div>

            <div className={cls.field}>
                <Label htmlFor="phone">Téléphone</Label>
                <PhoneInput
                    id="phone"
                    international
                    defaultCountry="BE"
                    countries={['BE', 'FR', 'NL', 'LU', 'DE', 'GB', 'ES', 'IT', 'PT', 'CH', 'AT']}
                    value={formData.phone}
                    onChange={(value) => {
                        setFormData(prev => ({ ...prev, phone: value || '' }));
                        if (errors.phone) {
                            setErrors(prev => ({ ...prev, phone: '' }));
                        }
                    }}
                    placeholder="Entrez votre numéro"
                    className={cls.phoneInput}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && <span id="phone-error" className={cls.error} role="alert">{errors.phone}</span>}
            </div>

            <div className={cls.field}>
                <Label htmlFor="company">Entreprise</Label>
                <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Nom de votre entreprise"
                    maxLength={100}
                    aria-invalid={!!errors.company}
                    aria-describedby={errors.company ? 'company-error' : undefined}
                />
                {errors.company && <span id="company-error" className={cls.error} role="alert">{errors.company}</span>}
            </div>

            <div className={cls.row}>
                <div className={cls.field}>
                    <Label htmlFor="budget">Budget estimé</Label>
                    <Select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                    >
                        <option value="">Non spécifié</option>
                        <option value="<2000">&lt; 2 000 €</option>
                        <option value="2-5k">2 000 - 5 000 €</option>
                        <option value="5-10k">5 000 - 10 000 €</option>
                        <option value="10-25k">10 000 - 25 000 €</option>
                        <option value=">25k">&gt; 25 000 €</option>
                    </Select>
                </div>

                <div className={cls.field}>
                    <Label htmlFor="timeline">Délai souhaité</Label>
                    <Select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                    >
                        <option value="">Non spécifié</option>
                        <option value="asap">ASAP (1-2 semaines)</option>
                        <option value="1m">1 mois</option>
                        <option value="2-3m">2-3 mois</option>
                        <option value=">3m">&gt; 3 mois</option>
                    </Select>
                </div>
            </div>

            <div className={cls.field}>
                <Label htmlFor="message" required>Description du besoin</Label>
                <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Contexte, objectifs, périmètre, exemples…"
                    required
                    minLength={30}
                    maxLength={1500}
                    rows={6}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                />
                <span className={cls.charCount}>
                    {formData.message.length} / 1 500 caractères
                </span>
                {errors.message && <span id="message-error" className={cls.error} role="alert">{errors.message}</span>}
            </div>

            <div className={cls.field}>
                <label className={cls.checkboxLabel}>
                    <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        required
                        aria-invalid={!!errors.consent}
                        aria-describedby={errors.consent ? 'consent-error' : undefined}
                    />
                    <span>
                        J'accepte que Smidjan traite ces informations pour répondre à ma demande.
                        Aucune vente de données. <a href="/privacy" className={cls.link}>Politique de confidentialité</a>.
                    </span>
                </label>
                {errors.consent && <span id="consent-error" className={cls.error} role="alert">{errors.consent}</span>}
            </div>

            {globalError && (
                <div className={cls.globalError} role="alert">
                    <strong>Un souci est survenu.</strong>
                    <p>{globalError}</p>
                </div>
            )}

            <Button
                type="submit"
                disabled={status === 'submitting'}
                data-cta="submit-contact"
                className={cls.submit}
            >
                {status === 'submitting' ? 'Envoi en cours...' : 'Envoyer ma demande'}
            </Button>
        </form>
    );
}
