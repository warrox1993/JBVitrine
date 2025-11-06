import type { Metadata } from 'next';
import AppVitrine from "../components/SiteVitrine/AppVitrine";

export const metadata: Metadata = {
  title: 'Smidjan | Studio Web Liège - Développement & SEO',
  description: 'Transformez votre projet digital avec Smidjan. Sites Next.js ultra-performants, audits cybersécurité et automatisations IA pour entreprises belges.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Smidjan | Studio Web Liège - Développement & SEO',
    description: 'Transformez votre projet digital avec Smidjan. Sites Next.js ultra-performants, audits cybersécurité et automatisations IA pour entreprises belges.',
    url: 'https://smidjan.be',
    siteName: 'Smidjan',
    images: [
      {
        url: 'https://smidjan.be/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Smidjan - Studio Web à Liège',
        type: 'image/webp',
      }
    ],
    locale: 'fr_BE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smidjan | Studio Web à Liège',
    description: 'Smidjan, studio web à Liège spécialisé en développement de sites, e-commerce, SEO et design digital.',
    images: ['/og-image.webp'],
  },
};

export default function Page() {
  return <AppVitrine />;
}
