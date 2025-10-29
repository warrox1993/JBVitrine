// src/app/layout.tsx
import './styles/variables.css';
import './styles/typography.css';
import './styles/utilities.css';
import './globals.css';
import '../styles/buttons.animations.css';
import layoutStyles from './layout.module.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter, Instrument_Sans } from 'next/font/google';
import FXReady from './FXReady';
import { RootEffects } from '@/components/Effects/RootEffects';
import RouteProgressProvider from '@/app/RouteProgressProvider';
import SidebarRouterBridge from '@/components/SidebarRouterBridge';
import Header from '@/components/Header';
import { organizationSchema, websiteSchema } from '@/lib/schema';

const inter = Inter({
    subsets: ['latin'],
    weight: ['400','700'],
    variable: '--font-base',
    display: 'swap',
    preload: true
});

const instrument = Instrument_Sans({
    subsets: ['latin'],
    weight: ['400','700'],
    variable: '--font-display',
    display: 'swap',
    preload: true
});

export const metadata: Metadata = {
    title: {
        default: 'Smidjan | Agence Web Liège - Développement, Cybersécurité & IA en Belgique',
        template: '%s | Smidjan - Agence Digitale Liège',
    },
    description:
        'Agence digitale à Liège spécialisée en développement web sur mesure, cybersécurité et IA. Services pour toute la Belgique et la Wallonie. Sites performants, sécurisés et optimisés SEO.',
    keywords: [
        // Localisation géographique (CRITIQUE pour le SEO local)
        'agence web Liège',
        'développement web Liège',
        'agence digitale Liège',
        'création site internet Liège',
        'agence web Wallonie',
        'développement web Belgique',
        'agence digitale Belgique',
        'web agency Liège',

        // Services principaux
        'développement web sur mesure',
        'création site web professionnel',
        'application web React',
        'développement Next.js',
        'site e-commerce Belgique',

        // Cybersécurité
        'cybersécurité Belgique',
        'audit sécurité web',
        'tests SAST DAST',
        'sécurisation site web',
        'protection données RGPD',

        // IA et automatisation
        'automatisation IA',
        'intelligence artificielle entreprise',
        'automatisation n8n',
        'intégration IA',

        // Design et UX
        'design UI/UX',
        'refonte site web',
        'optimisation expérience utilisateur',

        // SEO et performance
        'SEO technique',
        'optimisation performances web',
        'référencement naturel',
        'site web rapide',

        // Villes et régions ciblées
        'Namur',
        'Charleroi',
        'Mons',
        'Verviers',
        'Tournai',
        'Bruxelles',
    ],
    authors: [{ name: 'Smidjan', url: 'https://smidjan.be' }],
    creator: 'Smidjan - Agence Digitale Liège',
    publisher: 'Smidjan',

    // IMPORTANT: Remplace par ton vrai domaine dès que disponible
    metadataBase: new URL('https://smidjan.be'),

    alternates: {
        canonical: '/',
        languages: {
            'fr-BE': '/',
            'fr': '/',
        }
    },

    openGraph: {
        title: 'Smidjan | Agence Web à Liège - Développement, Cybersécurité & IA',
        description:
            'Agence digitale basée à Liège, Belgique. Développement web sur mesure, cybersécurité, automatisation IA. Services pour toute la Wallonie et la Belgique.',
        url: 'https://smidjan.be',
        siteName: 'Smidjan',
        images: [
            {
                url: "https://smidjan.be/logo.png",
                width: 512,
                height: 512,
                alt: 'Smidjan — Agence Digitale à Liège, Belgique'
            }
        ],
        locale: 'fr_BE',
        type: 'website',
    },

    twitter: {
        card: 'summary_large_image',
        title: 'Smidjan | Agence Web Liège - Développement & Cybersécurité',
        description: 'Agence digitale à Liège. Sites web sur mesure, sécurisés et performants pour toute la Belgique.',
        images: ['/og-image.png'],
        // Ajoute ton Twitter si tu en as un
        // creator: '@smidjan',
        // site: '@smidjan',
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    // Informations de vérification (à ajouter quand tu as les codes)
    verification: {
        // google: 'ton-code-google-search-console',
        // yandex: 'ton-code-yandex',
        // bing: 'ton-code-bing',
    },

    // Catégorie du site
    category: 'technology',

    // Autres métadonnées utiles
    other: {
        'geo.region': 'BE-WAL',
        'geo.placename': 'Liège',
        'geo.position': '50.6326;5.5797', // Coordonnées de Liège
    },
};

export const viewport: Viewport = {
    themeColor: '#000000',
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="fr-BE">
        <head>
            {/* Preconnect pour améliorer les performances */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

            {/* Favicons */}
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link rel="icon" href="/icon.svg" type="image/svg+xml" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/manifest.json" />

            {/* Schema.org pour le SEO local */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
        </head>
        <body className={`${inter.variable} ${instrument.variable}`}>
        <FXReady />
        <RootEffects>
            <RouteProgressProvider />
            <SidebarRouterBridge />
            <Header />
            <main id="main" className={layoutStyles.main}>{children}</main>
        </RootEffects>
        </body>
        </html>
    );
}
