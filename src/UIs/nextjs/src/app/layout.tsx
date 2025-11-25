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
        'contact:email': 'contact.smidjan@outlook.com',
    },
};

export const viewport: Viewport = {
    themeColor: '#000000',
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="fr-BE" data-theme="dark" suppressHydrationWarning>
            <head>
                {/* Critical CSS inline - Instant render (KISS) */}
                <style dangerouslySetInnerHTML={{
                    __html: `:root{--color-bg:#0f1115;--color-text-1:#f6f7f9;--color-text-2:#c8cdd6;--color-accent-1:#ff6a00;--color-primary:#ff6a00;--space-2:.5rem;--space-3:1rem;--space-4:1.5rem;--text-base:clamp(1rem,.95rem + .25vw,1.125rem);--text-xl:clamp(1.375rem,1.2rem + .75vw,1.75rem);--text-4xl:clamp(3rem,2rem + 4vw,5rem);--dur-2:180ms;--ease-standard:cubic-bezier(.2,.6,.2,1)}*,*::before,*::after{box-sizing:border-box}html,body{margin:0;padding:0;min-height:100%;overflow-x:hidden}body{font-family:system-ui,-apple-system,sans-serif;font-size:var(--text-base);line-height:1.6;color:var(--color-text-1);background-color:var(--color-bg)}h1{font-size:clamp(1.75rem,8vw,var(--text-4xl));line-height:1.2;margin:0 0 1rem;font-weight:800}p{margin:0 0 1rem;color:var(--color-text-2)}a{color:var(--color-accent-1);text-decoration:none}header{position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(15,17,21,.8);backdrop-filter:blur(8px)}.skipToContent{position:absolute;top:-100px;left:0;padding:var(--space-3) var(--space-4);background:var(--color-accent-1);color:#fff;z-index:100;transition:top var(--dur-2) var(--ease-standard)}.skipToContent:focus{top:0}[data-fx-ready="false"] .fx-animation{opacity:0;transform:translateY(20px)}`
                }} />

                <script
                    id="smidjan-theme-init"
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{var stored=localStorage.getItem('theme');var prefersLight=window.matchMedia('(prefers-color-scheme: light)').matches;var theme=stored||(prefersLight?'light':'dark');document.documentElement.setAttribute('data-theme', theme);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`
                    }}
                />
                {/* Critical Resource Hints - Optimize connection times (saves ~100-200ms) */}
                {/* Google Fonts - Must be first to prevent render-blocking */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                {/* Vercel Analytics - Preconnect for faster metrics */}
                <link rel="preconnect" href="https://vitals.vercel-insights.com" />

                {/* DNS-Prefetch for secondary resources (non-blocking) */}
                <link rel="dns-prefetch" href="https://vercel-insights.com" />
                <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />

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
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
                />
            </head>
            <body className={`${inter.variable} ${instrument.variable}`}>
                <FXReady />
                <SidebarMobileProvider>
                    <RootEffects>
                        <RouteProgressProvider />
                        <SidebarRouterBridge />
                        <Header />
                        <main id="main" className={layoutStyles.main}>{children}</main>
                    </RootEffects>
                </SidebarMobileProvider>
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
