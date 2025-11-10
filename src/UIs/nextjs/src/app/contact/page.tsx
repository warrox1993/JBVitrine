import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Container } from '@/components/atoms/Container';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground/AnimatedBackground';
import { ContactPageClient } from './ContactPageClient';
import cls from './page.module.css';

// Dynamic imports for heavy components (QuoteWizard ~50KB)
const UnifiedContactPage = dynamic(() => import('./UnifiedContactPage').then(mod => ({ default: mod.UnifiedContactPage })), {
  ssr: true,
  loading: () => <div style={{ minHeight: '400px' }}>Chargement...</div>,
});

const Footer = dynamic(() => import('@/components/sections/Footer/Footer').then(mod => ({ default: mod.Footer })), {
  ssr: true,
});

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

export default function ContactPage() {
    return (
        <ContactPageClient>
            <div className={cls.contactPageWrapper}>
            {/* Animated Background */}
            <AnimatedBackground variant="light" />
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
                {/* Unified Contact Page with Wizard and Direct Form */}
                <UnifiedContactPage />
            </Container>

            <div className={cls.footerWrapper}>
                <Footer />
            </div>
            </div>
        </ContactPageClient>
    );
}
