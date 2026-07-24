// src/app/layout.tsx
// Critical CSS first (variables, breakpoints, typography)
import './styles/variables.css';
import './styles/breakpoints.css';
import './styles/typography.css'; // Unified typography (mobile-first)
import './globals.css';

// Non-critical CSS loaded after (utilities, animations)
// These are deferred to reduce render-blocking
import './styles/utilities.css';
import '../styles/buttons.animations.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import FXReady from './FXReady';
import { RootEffects } from '@/components/Effects/RootEffects';
import RouteProgressProvider from '@/app/RouteProgressProvider';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';

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

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['500','600','700'],
    variable: '--font-display',
    display: 'swap',
    preload: true,
    fallback: ['system-ui', '-apple-system', 'sans-serif'],
    adjustFontFallback: true
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['500','700'],
    variable: '--font-mono',
    display: 'swap',
    preload: false,
    fallback: ['ui-monospace', 'SFMono-Regular', 'monospace'],
    adjustFontFallback: true
});

export const metadata: Metadata = {
    title: {
        default: 'Jean-Baptiste Dhondt (Smidjan) | Sécurité cloud, réseau, infra & web, Wallonie',
        // Les pages définissent des titres auto-brandés ("… | Smidjan : …"),
        // donc pas de suffixe pour éviter de dupliquer "Smidjan".
        template: '%s',
    },
    description:
        'Jean-Baptiste Dhondt (Smidjan), praticien en cybersécurité en Wallonie : sécurité cloud, réseau, infrastructure et web, et préparation à la conformité NIS2 / CyberFundamentals (CCB). Je montre mon travail, avec des preuves.',
authors: [{ name: 'Smidjan', url: 'https://smidjan.be' }],
    creator: 'Smidjan',
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
        title: 'Jean-Baptiste Dhondt (Smidjan) | Sécurité cloud, réseau, infra & web, Wallonie',
        description:
            'Praticien en cybersécurité en Wallonie : sécurité cloud, réseau, infrastructure et web, et préparation à la conformité NIS2 / CyberFundamentals. Je montre mon travail, avec des preuves.',
        url: 'https://smidjan.be',
        siteName: 'Smidjan',
        images: [
            {
                url: "https://smidjan.be/og-image.webp",
                width: 1200,
                height: 630,
                alt: 'Jean-Baptiste Dhondt, Smidjan : sécurité cloud, réseau, infra et web en Wallonie',
                type: 'image/webp',
            }
        ],
        locale: 'fr_BE',
        type: 'website',
    },

    twitter: {
        card: 'summary_large_image',
        title: 'Jean-Baptiste Dhondt (Smidjan) | Sécurité cloud, réseau, infra & web, Wallonie',
        description: 'Praticien sécurité cloud, réseau, infra & web en Wallonie. Préparation NIS2 / CyFun. Transparence totale.',
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
        'contact:phone': '+32475205562',
        'contact:email': 'jeanbaptiste.dhondt1@gmail.com',
    },
};

export const viewport: Viewport = {
    themeColor: '#0b1f3a',
    width: 'device-width',
    initialScale: 1,
};

import { ToastHost } from '@/components/feedback/ToastHost';

export default async function RootLayout({ children }: { children: ReactNode }) {
    const locale = await getLocale();
    const t = await getTranslations({ locale, namespace: 'common' });
    // CSP nonce forwarded by src/middleware.ts (x-nonce request header). Needed
    // so this inline script is allowed under the nonce-based script-src.
    const nonce = (await headers()).get('x-nonce') ?? undefined;
    return (
        <html lang={locale} data-theme="light" suppressHydrationWarning>
            <head>
                <meta name="color-scheme" content="dark light" />
                {/* No-flash theme init: apply the user's explicit stored choice
                    before first paint; default to light otherwise. Dark is
                    opt-in via the header toggle for now (not OS-auto) until the
                    dark theme is visually signed off. To follow the OS instead,
                    swap the fallback to: (m?'dark':'light'). Zero-dependency. */}
                <script
                    nonce={nonce}
                    dangerouslySetInnerHTML={{
                        __html:
                            "(function(){try{var s=localStorage.getItem('smidjan-theme');document.documentElement.setAttribute('data-theme',(s==='dark'||s==='light')?s:'light');}catch(e){}})();",
                    }}
                />
            </head>
            <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
                {/* Skip-to-content: visually hidden until keyboard focus, then
                    pinned top-left above the sticky header so keyboard/screen
                    reader users can bypass the nav and jump to <main id="main">. */}
                <a href="#main" className="skip-link">
                    {t('a11y.skipToContent')}
                </a>
                <FXReady />
                <NextIntlClientProvider>
                    <RootEffects>
                        <RouteProgressProvider />
                        {children}
                    </RootEffects>
                </NextIntlClientProvider>
                <ToastHost />
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
