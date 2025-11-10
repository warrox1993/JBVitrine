'use client';

import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { QuoteWizard } from '@/components/contact/QuoteWizard/QuoteWizard';
import { SimpleContactForm, ContactFormData } from '@/components/contact/SimpleContactForm';
import { ContactModeSelector, ContactMode } from '@/components/contact/ContactModeSelector';
import { Accordion } from '@/components/contact/Accordion';
import { Container } from '@/components/atoms/Container';
import { SectionWithBackground } from '@/components/ui/SectionWithBackground/SectionWithBackground';
import cls from './page.module.css';

const FAQ_ITEMS = [
  {
    q: 'Sous combien de temps répondez-vous ?',
    a: 'Sous 24h ouvrées. Pour les urgences, précisez-le dans le formulaire.',
  },
  {
    q: 'Travaillez-vous avec des petites structures ?',
    a: "Oui. Nos offres s'adaptent au périmètre et au budget.",
  },
  {
    q: 'Proposez-vous des audits sécurité seuls ?',
    a: 'Oui. Audit, durcissement, et monitoring sont disponibles à la carte.',
  },
  {
    q: 'Pouvez-vous reprendre un projet existant ?',
    a: 'Oui, après un audit technique rapide pour cadrer les risques.',
  },
];

export function UnifiedContactPage() {
  const [contactMode, setContactMode] = useState<ContactMode | null>(null);

  const handleDirectContactSubmit = async (data: ContactFormData) => {
    // Submit direct contact form
    const response = await fetch('/api/contact/direct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit contact form');
    }

    return response.json();
  };

  const switchToDirectContact = () => {
    setContactMode('direct');
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section */}
      <SectionWithBackground className={cls.hero} ariaLabel="hero-title" variant="dark">
        <Breadcrumb />

        <h1 id="hero-title" className={cls.heroTitle}>
          Parlons de votre projet
        </h1>
        <p className={cls.heroSub}>
          Performance. Sécurité. Simplicité. Dites-nous ce dont vous avez
          besoin, on revient vers vous sous 24h ouvrées.
        </p>

        {/* Micro-trust indicators */}
        <div className={cls.trust}>
          <div className={cls.trustItem}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M16.667 9.167v-.834a6.667 6.667 0 10-13.334 0v.834M5 9.167h10a1.667 1.667 0 011.667 1.666v5a1.667 1.667 0 01-1.667 1.667H5a1.667 1.667 0 01-1.667-1.667v-5A1.667 1.667 0 015 9.167z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Réponse sous 24h ouvrées</span>
          </div>
          <div className={cls.trustItem}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M8.333 10l1.667 1.667 3.333-3.334m5 1.667a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Devis clair et chiffré</span>
          </div>
          <div className={cls.trustItem}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M10 1.667l-7.5 3.75v5c0 4.688 3.229 9.073 7.5 10.417 4.271-1.344 7.5-5.729 7.5-10.417v-5l-7.5-3.75z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Données protégées (RGPD)</span>
          </div>
        </div>
      </SectionWithBackground>

      {/* Mode Selector */}
      <ContactModeSelector
        currentMode={contactMode}
        onModeChange={setContactMode}
        onBack={() => setContactMode(null)}
      />

      {/* Main Content - Wizard or Direct Form (only show if mode selected) */}
      {contactMode && (
        <SectionWithBackground
          className={cls.mainContent}
          ariaLabel="contact-form-title"
          variant="light"
        >
          {contactMode === 'wizard' ? (
            <QuoteWizard onSwitchToDirectContact={switchToDirectContact} />
          ) : (
            <SimpleContactForm
              onBack={() => setContactMode(null)}
              onSubmit={handleDirectContactSubmit}
            />
          )}
        </SectionWithBackground>
      )}

      {/* Service Area with Google Maps */}
      <SectionWithBackground className={cls.serviceArea} variant="light">
        <h2
          className={cls.sectionTitle}
          style={{ marginBottom: 'var(--space-4, 1rem)', textAlign: 'center' }}
        >
          Notre localisation à Liège
        </h2>
        <div
          className={cls.mapWrapper}
          style={{
            margin: '0 auto',
            maxWidth: '1000px',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}&q=50.6446374,5.5664509&zoom=13&language=fr&region=BE`}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation Smidjan à Liège, Belgique"
          />
        </div>
        <p
          className={cls.serviceText}
          style={{
            marginTop: 'var(--space-4, 1rem)',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          <MapPin
            size={20}
            style={{ flexShrink: 0, color: 'var(--color-accent-1)' }}
          />
          <span>
            Basés à Liège, nous intervenons dans toute la Wallonie (Namur,
            Charleroi, Verviers, Mons) ainsi qu'à Bruxelles et partout en
            Belgique.
          </span>
        </p>
      </SectionWithBackground>

      {/* FAQ Section */}
      <SectionWithBackground
        className={cls.faq}
        ariaLabel="faq-title"
        variant="dark"
      >
        <h2 id="faq-title" className={cls.sectionTitle}>
          Questions fréquentes
        </h2>
        <Accordion items={FAQ_ITEMS} />
      </SectionWithBackground>
    </>
  );
}
