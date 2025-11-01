import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';
import { Accordion } from '@/components/contact/Accordion';
import { Card, CardBody } from '@/components/atoms/Card';
import { Container } from '@/components/atoms/Container';
import { Footer } from '@/components/sections/Footer/Footer';
import { SectionWithBackground } from '@/components/ui/SectionWithBackground/SectionWithBackground';
import { ContactPageClient } from './ContactPageClient';
import cls from './page.module.css';

export const metadata: Metadata = {
    title: 'Contact — Smidjan, agence web, cybersécurité & IA',
    description: 'Contactez Smidjan pour un projet web (Next.js/TypeScript/CMS), un audit cybersécurité, ou une automatisation/IA. Réponse sous 24h ouvrées.',
    alternates: {
        canonical: 'https://www.smidjan.dev/contact',
    },
    openGraph: {
        title: 'Contact — Smidjan',
        description: 'Démarrez un projet ou posez vos questions.',
        type: 'website',
        url: 'https://www.smidjan.dev/contact',
        images: [
            {
                url: '/og/contact-og.jpg',
                width: 1200,
                height: 630,
                alt: 'Contact Smidjan',
            },
        ],
    },
    robots: {
        index: true,
        follow: true,
    },
};

const FAQ_ITEMS = [
    {
        q: 'Sous combien de temps répondez-vous ?',
        a: 'Sous 24h ouvrées. Pour les urgences, précisez-le dans le formulaire.',
    },
    {
        q: 'Travaillez-vous avec des petites structures ?',
        a: 'Oui. Nos offres s\'adaptent au périmètre et au budget.',
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

export default function ContactPage() {
    return (
        <ContactPageClient>
            <div className={cls.contactPageWrapper}>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'ContactPage',
                        name: 'Contact — Smidjan',
                        url: 'https://www.smidjan.dev/contact',
                        about: {
                            '@type': 'Organization',
                            name: 'Smidjan',
                            url: 'https://www.smidjan.dev',
                            email: 'jeanbaptiste.dhondt1@gmail.com',
                            address: {
                                '@type': 'PostalAddress',
                                addressLocality: 'Liège',
                                addressCountry: 'BE',
                            },
                            sameAs: ['https://www.linkedin.com/company/smidjan'],
                        },
                        contactPoint: {
                            '@type': 'ContactPoint',
                            contactType: 'sales',
                            email: 'jeanbaptiste.dhondt1@gmail.com',
                            availableLanguage: ['fr', 'en'],
                            areaServed: 'EU',
                        },
                    }),
                }}
            />

            <Container className={cls.contactContainer}>
                {/* Hero Section */}
                <SectionWithBackground className={cls.hero} ariaLabel="hero-title" variant="dark">
                    <h1 id="hero-title" className={cls.heroTitle}>
                        Parlons de votre projet
                    </h1>
                    <p className={cls.heroSub}>
                        Performance. Sécurité. Simplicité. Dites-nous ce dont vous avez besoin, on revient vers vous sous 24h ouvrées.
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

                {/* Three Contact Pathways */}
                <SectionWithBackground className={cls.pathways} ariaLabel="pathways-title" variant="light">
                    <h2 id="pathways-title" className="sr-only">
                        Choisissez votre type de contact
                    </h2>
                    <div className={cls.pathwaysGrid}>
                        <Card className={cls.pathwayCard}>
                            <CardBody>
                                <h3 className={cls.pathwayTitle}>Projet & Devis</h3>
                                <p className={cls.pathwayText}>
                                    Un site, une refonte, un e-commerce, un audit sécurité ou un POC IA.
                                </p>
                                <a href="#form" className={cls.pathwayLink}>
                                    Décrire mon besoin
                                </a>
                            </CardBody>
                        </Card>

                        <Card className={cls.pathwayCard}>
                            <CardBody>
                                <h3 className={cls.pathwayTitle}>Support & Questions</h3>
                                <p className={cls.pathwayText}>
                                    Une question technique, un bug, un conseil rapide.
                                </p>
                                <a href="#form" className={cls.pathwayLink}>
                                    Écrire au support
                                </a>
                            </CardBody>
                        </Card>

                        <Card className={cls.pathwayCard}>
                            <CardBody>
                                <h3 className={cls.pathwayTitle}>Partenariats</h3>
                                <p className={cls.pathwayText}>
                                    Agences, studios, freelances : construisons ensemble.
                                </p>
                                <a href="#form" className={cls.pathwayLink}>
                                    Proposer une collaboration
                                </a>
                            </CardBody>
                        </Card>
                    </div>
                </SectionWithBackground>

                {/* Main Content: Form */}
                <SectionWithBackground id="form" className={cls.mainContent} ariaLabel="form-title" variant="dark">
                    <div className={cls.formWrapper}>
                        <h2 id="form-title" className={cls.sectionTitle}>
                            Formulaire de contact
                        </h2>
                        <ContactForm />
                    </div>
                </SectionWithBackground>

                {/* Service Area */}
                <SectionWithBackground className={cls.serviceArea} variant="light">
                    <p className={cls.serviceText}>
                        Nous travaillons à Liège et à distance (Belgique, Europe).
                    </p>
                </SectionWithBackground>

                {/* FAQ Section */}
                <SectionWithBackground className={cls.faq} ariaLabel="faq-title" variant="dark">
                    <h2 id="faq-title" className={cls.sectionTitle}>
                        Questions fréquentes
                    </h2>
                    <Accordion items={FAQ_ITEMS} />
                </SectionWithBackground>
            </Container>

            <div className={cls.footerWrapper}>
                <Footer />
            </div>
            </div>
        </ContactPageClient>
    );
}
