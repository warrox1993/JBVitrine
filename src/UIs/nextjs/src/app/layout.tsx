// src/app/layout.tsx
// Critical CSS first (variables, breakpoints, typography)
import './styles/variables.css';
import './styles/breakpoints.css';
import './styles/typography.css'; // Unified typography (mobile-first)
import './globals.css';
import layoutStyles from './layout.module.css';

// Non-critical CSS loaded after (utilities, animations)
// These are deferred to reduce render-blocking
import './styles/utilities.css';
import '../styles/buttons.animations.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter, Instrument_Sans } from 'next/font/google';
import FXReady from './FXReady';
import { RootEffects } from '@/components/Effects/RootEffects';
import RouteProgressProvider from '@/app/RouteProgressProvider';
import SidebarRouterBridge from '@/components/SidebarRouterBridge';
import MainLayoutBridge from '@/components/MainLayoutBridge';
import Header from '@/components/Header';
import { SidebarMobileProvider } from '@/hooks/useSidebarMobile';
import { organizationSchema, websiteSchema, localBusinessSchema } from '@/lib/schema';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Optimized font loading with swap and subset for faster FCP/LCP
const inter = Inter({
    subsets: ['latin'],
    weight: ['400','700'],
    variable: '--font-base',
    display: 'swap', // Prevent FOIT (Flash of Invisible Text)
    preload: true,
    fallback: ['system-ui', '-apple-system', 'sans-serif'],
    adjustFontFallback: true
});

const instrument = Instrument_Sans({
    subsets: ['latin'],
    weight: ['400','700'],
    variable: '--font-display',
    display: 'swap', // Prevent FOIT
    preload: true,
    fallback: ['system-ui', '-apple-system', 'sans-serif'],
    adjustFontFallback: true
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
        'développement web',
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
                url: "https://smidjan.be/og-image.webp",
                width: 1200,
                height: 630,
                alt: 'Smidjan - Agence Web à Liège | Développement Web, Cybersécurité et IA en Belgique',
                type: 'image/webp',
            }
        ],
        locale: 'fr_BE',
        type: 'website',
    },

    twitter: {
        card: 'summary_large_image',
        title: 'Smidjan | Agence Web Liège - Développement & Cybersécurité',
        description: 'Agence digitale à Liège. Sites web sur mesure, sécurisés et performants pour toute la Belgique.',
        images: ['/og-image.webp'],
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
        google: 'z2A8hW5TKExnljJhX2nw2MvH-QWy9ptIOapbP-XA7Ys',
        // yandex: 'ton-code-yandex',
        // bing: 'ton-code-bing',
    },

    // Catégorie du site
    category: 'technology',

    // Autres métadonnées utiles
    other: {
        'geo.region': 'BE-WAL',
        'geo.placename': 'Liège',
        'geo.position': '50.6446374;5.5664509', // Coordonnées GPS Smidjan
        'contact:phone': '+32 475 20 55 62',
        'contact:email': 'smidjan.agency@outlook.com',
    },
};

export const viewport: Viewport = {
    themeColor: '#000000',
    width: 'device-width',
    initialScale: 1,
};

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="fr-BE" data-theme="light" suppressHydrationWarning>
            <head>
                {/* ... existing head ... */}
            </head>
            <body className={`${inter.variable} ${instrument.variable}`}>
                <FXReady />
                <SidebarMobileProvider>
                    <RootEffects>
                        <RouteProgressProvider />
                        <SidebarRouterBridge />
                        <Header />
                        <MainLayoutBridge className={layoutStyles.main}>{children}</MainLayoutBridge>
                    </RootEffects>
                </SidebarMobileProvider>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                {process.env.NODE_ENV === 'production' && (
                    <>
                        <Analytics />
                        <SpeedInsights />
                    </>
                )}
            </body>
        </html>
    );
}
