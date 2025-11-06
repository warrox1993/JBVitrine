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
        canonical: '/contact',
    },
    openGraph: {
        title: 'Contact — Smidjan',
        description: 'Démarrez un projet ou posez vos questions.',
        type: 'website',
        url: 'https://smidjan.be/contact',
        images: [
            {
                url: 'https://smidjan.be/og/contact-og.webp',
                width: 1200,
                height: 630,
                alt: 'Contactez Smidjan - Agence Web à Liège pour votre projet',
                type: 'image/webp',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact — Smidjan',
        description: 'Démarrez un projet ou posez vos questions.',
        images: ['/og/contact-og.webp'],
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
            {/* JSON-LD Structured Data - ContactPage */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'ContactPage',
                        name: 'Contact — Smidjan',
                        url: 'https://smidjan.be/contact',
                        about: {
                            '@type': 'Organization',
                            name: 'Smidjan',
                            url: 'https://smidjan.be',
                            email: 'jeanbaptiste.dhondt1@gmail.com',
                            address: {
                                '@type': 'PostalAddress',
                                addressLocality: 'Liège',
                                addressRegion: 'Wallonie',
                                addressCountry: 'BE',
                            },
                        },
                        contactPoint: {
                            '@type': 'ContactPoint',
                            contactType: 'sales',
                            email: 'jeanbaptiste.dhondt1@gmail.com',
                            availableLanguage: ['fr-BE', 'fr'],
                            areaServed: ['BE', 'Wallonie'],
                        },
                    }),
                }}
            />
            {/* JSON-LD Structured Data - FAQPage */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: FAQ_ITEMS.map((faq) => ({
                            '@type': 'Question',
                            name: faq.q,
                            acceptedAnswer: {
                                '@type': 'Answer',
                                text: faq.a,
                            },
                        })),
                    }),
                }}
            />
            {/* JSON-LD Structured Data - BreadcrumbList */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            {
                                '@type': 'ListItem',
                                position: 1,
                                name: 'Accueil',
                                item: 'https://smidjan.be',
                            },
                            {
                                '@type': 'ListItem',
                                position: 2,
                                name: 'Contact',
                                item: 'https://smidjan.be/contact',
                            },
                        ],
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

                {/* Service Area with Google Maps */}
                <SectionWithBackground className={cls.serviceArea} variant="light">
                    <h2 className={cls.sectionTitle} style={{ marginBottom: 'var(--space-4, 1rem)', textAlign: 'center' }}>
                        Notre localisation à Liège
                    </h2>
                    <div className={cls.mapWrapper} style={{ margin: '0 auto', maxWidth: '1000px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2530.4891234!2d5.5797!3d50.6326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDM3JzU3LjQiTiA1wrAzNCc0Ni45IkU!5e0!3m2!1sfr!2sbe!4v1699999999999"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Localisation Smidjan à Liège, Belgique"
                        />
                    </div>
                    <p className={cls.serviceText} style={{ marginTop: 'var(--space-4, 1rem)', textAlign: 'center' }}>
                        📍 Basés à Liège, nous intervenons dans toute la Wallonie (Namur, Charleroi, Verviers, Mons) ainsi qu'à Bruxelles et partout en Belgique.
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
