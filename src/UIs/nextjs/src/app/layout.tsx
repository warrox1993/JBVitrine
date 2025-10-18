import './globals.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter, Instrument_Sans } from 'next/font/google';
import { SkipLink } from '@/components/effects/SkipLink';
import { ScrollProgress } from '@/components/effects/ScrollProgress';
import { CursorGlow } from '@/components/effects/CursorGlow';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { organizationSchema, websiteSchema } from '@/lib/schema';

const inter = Inter({ subsets: ['latin'], variable: '--font-base', display: 'swap', preload: true });
const instrument = Instrument_Sans({ subsets: ['latin'], variable: '--font-display', display: 'swap', preload: true });

export const metadata: Metadata = {
  title: 'YourBrand — Web Design Premium & Développement Next.js',
  description: 'Agence digitale spécialisée en design UI/UX premium et développement web haute performance. Transformez votre présence digitale avec excellence.',
  keywords: ['web design', 'next.js', 'react', 'ui/ux', 'développement web', 'agence digitale'],
  authors: [{ name: 'YourBrand' }],
  creator: 'YourBrand',
  publisher: 'YourBrand',
  metadataBase: new URL('https://yourbrand.com'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'YourBrand — Web Design Premium & Développement Next.js',
    description: 'Transformez votre présence digitale avec excellence. Design exceptionnel, code impeccable, résultats mesurables.',
    url: 'https://yourbrand.com',
    siteName: 'YourBrand',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'YourBrand - Web Design Premium' }],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YourBrand — Web Design Premium',
    description: 'Design exceptionnel, code impeccable, résultats mesurables',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export const viewport: Viewport = { themeColor: '#000000' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${instrument.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body>
        <SkipLink />
        <ScrollProgress />
        <CursorGlow />
        <Sidebar />
        <Header />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}

