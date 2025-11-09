import type { Metadata } from 'next';
import AppVitrine from "../components/SiteVitrine/AppVitrine";

export const metadata: Metadata = {
  // SEO optimisé 2025 - Mots-clés prioritaires: agence web Liège, développement Next.js, audit SEO gratuit
  title: 'Agence Web Liège | Développement Next.js, Design & Cybersécurité - Smidjan',
  description: 'Agence digitale à Liège spécialisée en développement Next.js, design web et cybersécurité RGPD. Audit SEO gratuit. Services pour PME Belgique et Wallonie.',
  keywords: [
    // Mots-clés primaires critiques
    'agence web Liège',
    'développement web Next.js',
    'audit SEO gratuit',
    'design web Belgique',
    'cybersécurité audit RGPD',
    // Longue traîne haute conversion
    'créer site vitrine professionnel Liège',
    'audit sécurité RGPD site web',
    'optimisation SEO site web Liège',
    'refonte site web responsive Belgique',
    'agence e-commerce Belgique',
    'devis site web gratuit Liège',
    // Technologie & autorité
    'développement Next.js Belgique',
    'React développement web performant',
    'WordPress site web Liège',
    'automatisation IA agence web',
    // Locaux
    'agence digitale Wallonie',
    'développeur web Liège',
    'designer UI/UX Liège',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Agence Web Liège | Développement Next.js, Design & Cybersécurité',
    description: 'Agence digitale à Liège spécialisée en développement Next.js, design web et cybersécurité RGPD. Audit SEO gratuit pour PME Belgique.',
    url: 'https://smidjan.be',
    siteName: 'Smidjan - Agence Web Liège',
    images: [
      {
        url: 'https://smidjan.be/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Smidjan - Agence web Liège développement Next.js design cybersécurité',
        type: 'image/webp',
      }
    ],
    locale: 'fr_BE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agence Web Liège | Développement Next.js & Design',
    description: 'Agence digitale Liège: développement Next.js, design web, cybersécurité RGPD. Audit SEO gratuit pour PME Belgique.',
    images: ['/og-image.webp'],
  },
};

export default function Page() {
  return <AppVitrine />;
}
