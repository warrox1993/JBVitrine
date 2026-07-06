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
import { Inter, Instrument_Sans } from 'next/font/google';
import FXReady from './FXReady';
import { RootEffects } from '@/components/Effects/RootEffects';
import RouteProgressProvider from '@/app/RouteProgressProvider';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

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
        default: 'Smidjan | Cybersécurité & conformité NIS2 pour les PME (Liège, Wallonie)',
        // Les pages définissent des titres auto-brandés ("… | Smidjan : …"),
        // donc pas de suffixe pour éviter de dupliquer "Smidjan".
        template: '%s',
    },
    description:
        'Smidjan sécurise les réseaux, l\'infrastructure et les applications des PME wallonnes et les met en conformité NIS2 / CyberFundamentals (CCB). Audit, pentest, remédiation. Diagnostic gratuit à Liège.',
    keywords: [
        // Cœur de métier : cybersécurité
        'cybersécurité PME Liège',
        'cybersécurité Wallonie',
        'cybersécurité Belgique',
        'sécurité des réseaux et infrastructure',
        'audit de sécurité informatique',
        'test d\'intrusion pentest Liège',
        'sécurisation des systèmes PME',

        // Conformité NIS2 / CyFun : offre phare
        'conformité NIS2 Belgique',
        'NIS2 PME',
        'CyberFundamentals CyFun CCB',
        'analyse d\'écart NIS2',
        'remédiation cybersécurité',
        'niveaux CyFun Basic Important Essential',
        'préparation vérification CyFun',

        // Accessoire : développement web sécurisé
        'développement web sécurisé',
        'application web sécurisée Next.js',

        // Localisation
        'expert cybersécurité Liège',
        'Namur',
        'Charleroi',
        'Mons',
        'Verviers',
        'Bruxelles',
    ],
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
        title: 'Smidjan | Cybersécurité & conformité NIS2 pour les PME (Liège)',
        description:
            'On sécurise vos réseaux, votre infrastructure et vos applications, et on vous met en conformité NIS2 / CyFun, et on corrige ce qu\'on trouve. Diagnostic gratuit pour les PME de Wallonie.',
        url: 'https://smidjan.be',
        siteName: 'Smidjan, Cybersécurité Liège',
        images: [
            {
                url: "https://smidjan.be/og-image.webp",
                width: 1200,
                height: 630,
                alt: 'Smidjan, Cybersécurité & conformité NIS2 pour les PME à Liège',
                type: 'image/webp',
            }
        ],
        locale: 'fr_BE',
        type: 'website',
    },

    twitter: {
        card: 'summary_large_image',
        title: 'Smidjan | Cybersécurité & conformité NIS2 pour les PME (Liège)',
        description: 'Sécurité des réseaux, pentest et conformité NIS2 / CyFun pour les PME wallonnes. Diagnostic gratuit à Liège.',
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
    themeColor: '#0b1f3a',
    width: 'device-width',
    initialScale: 1,
};

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default async function RootLayout({ children }: { children: ReactNode }) {
    const locale = await getLocale();
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
                    dangerouslySetInnerHTML={{
                        __html:
                            "(function(){try{var s=localStorage.getItem('smidjan-theme');document.documentElement.setAttribute('data-theme',(s==='dark'||s==='light')?s:'light');}catch(e){}})();",
                    }}
                />
            </head>
            <body className={`${inter.variable} ${instrument.variable}`}>
                <FXReady />
                <NextIntlClientProvider>
                    <RootEffects>
                        <RouteProgressProvider />
                        {children}
                    </RootEffects>
                </NextIntlClientProvider>
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
                    theme="light"
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
