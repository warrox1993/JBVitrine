export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Smidjan",
  alternateName: "Smidjan Studio Web",
  url: "https://smidjan.be",
  logo: "https://smidjan.be/logo.png",
  description:
    "Studio web à Liège spécialisé en développement de sites, e-commerce, SEO et design digital. Services pour toute la Belgique et la Wallonie.",
  foundingDate: "2025",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    telephone: "+32 475 20 55 62",
    email: "smidjan.agency@outlook.com",
    availableLanguage: ["fr-BE", "French"],
    areaServed: ["BE", "Wallonie", "Liège"],
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "BE",
    addressRegion: "Wallonie",
    addressLocality: "Liège",
  },
  sameAs: [
    "https://www.linkedin.com/in/jean-baptistedhondt",
    "https://www.facebook.com/jeanbaptiste.dhondt",
    "https://github.com/warrox1993",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Smidjan",
  url: "https://smidjan.be",
  description:
    "Studio web à Liège spécialisé en développement de sites, e-commerce, SEO et design digital.",
  inLanguage: "fr-BE",
  publisher: {
    "@type": "Organization",
    name: "Smidjan",
    logo: {
      "@type": "ImageObject",
      url: "https://smidjan.be/logo.png",
    },
  },
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://smidjan.be/#organization",
  name: "Smidjan - Agence Web Liège",
  alternateName: "Smidjan Studio Web",
  image: "https://smidjan.be/og-image.webp",
  description:
    "Agence digitale à Liège spécialisée en développement web, design web et cybersécurité RGPD. Audit SEO gratuit. Services pour PME Belgique et Wallonie.",
  url: "https://smidjan.be",
  telephone: "+32 475 20 55 62",
  email: "contact.smidjan@outlook.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "BE",
    addressRegion: "Wallonie",
    addressLocality: "Liège",
    postalCode: "4000",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.6446374,
    longitude: 5.5664509,
  },
  areaServed: [
    {
      "@type": "City",
      name: "Liège",
    },
    {
      "@type": "State",
      name: "Wallonie",
    },
    {
      "@type": "Country",
      name: "Belgique",
    },
  ],
  priceRange: "€€-€€€",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/in/jean-baptistedhondt",
    "https://www.facebook.com/jeanbaptiste.dhondt",
    "https://github.com/warrox1993",
  ],
  // Services offerts - SEO 2025
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services Agence Web Liège",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Développement Web Next.js",
          description:
            "Création de sites web performants avec Next.js et React",
          serviceType: "Développement web",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Audit SEO Gratuit",
          description: "Analyse SEO complète de votre site web",
          serviceType: "SEO",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cybersécurité & Audit RGPD",
          description:
            "Sécurisation et mise en conformité RGPD de vos sites web",
          serviceType: "Cybersécurité",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Design Web & UI/UX",
          description: "Conception d'interfaces modernes et accessibles",
          serviceType: "Design",
        },
      },
    ],
  },
  // Agrégat de notes (à ajouter quand tu auras des avis clients)
  // aggregateRating: {
  //   "@type": "AggregateRating",
  //   ratingValue: "5",
  //   reviewCount: "12"
  // }
};

// FAQPage Schema - SEO 2025
export const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quels services propose Smidjan à Liège ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Smidjan est une agence web à Liège spécialisée en développement web, design web, cybersécurité RGPD et automatisation IA. Nous proposons également des audits SEO gratuits pour les PME en Belgique et Wallonie.",
      },
    },
    {
      "@type": "Question",
      name: "Pourquoi choisir Next.js pour mon site web ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Next.js offre des performances exceptionnelles avec un SEO optimisé dès le départ, un chargement ultra-rapide grâce au SSR/SSG, et une expérience utilisateur fluide. C'est la technologie idéale pour les sites vitrines et e-commerce modernes.",
      },
    },
    {
      "@type": "Question",
      name: "Qu'est-ce qu'un audit SEO gratuit ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Notre audit SEO gratuit analyse les performances de votre site web : vitesse de chargement, optimisation mobile, structure des données, mots-clés, et accessibilité. Vous recevez un rapport détaillé avec des recommandations concrètes pour améliorer votre référencement.",
      },
    },
    {
      "@type": "Question",
      name: "Comment Smidjan assure la cybersécurité de mon site ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nous effectuons des audits de sécurité complets (SAST/DAST), mettons en place des protections RGPD, sécurisons vos données, et appliquons les meilleures pratiques de sécurité web (HTTPS, CSP, sanitisation des données, authentification sécurisée).",
      },
    },
    {
      "@type": "Question",
      name: "Quel est le délai de création d'un site web ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le délai varie selon la complexité : 2-3 semaines pour un site vitrine simple, 4-6 semaines pour un site avec fonctionnalités avancées, et 8-12 semaines pour un e-commerce complet. Nous établissons un calendrier précis lors du devis.",
      },
    },
    {
      "@type": "Question",
      name: "Smidjan travaille-t-il avec des PME en Belgique ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui ! Nous sommes spécialisés dans l'accompagnement des PME belges, particulièrement en Wallonie (Liège, Namur, Charleroi, Mons). Nous proposons des solutions sur mesure adaptées aux budgets et besoins des petites et moyennes entreprises.",
      },
    },
  ],
};

// Article Schema Template - Pour les articles de blog
export interface ArticleSchemaProps {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}

export const createArticleSchema = ({
  title,
  description,
  author,
  datePublished,
  dateModified,
  image = "https://smidjan.be/og-image.webp",
  url,
}: ArticleSchemaProps) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: title,
  description: description,
  image: image,
  datePublished: datePublished,
  dateModified: dateModified || datePublished,
  author: {
    "@type": "Person",
    name: author,
    url: "https://smidjan.be/about",
  },
  publisher: {
    "@type": "Organization",
    name: "Smidjan",
    logo: {
      "@type": "ImageObject",
      url: "https://smidjan.be/logo.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": url,
  },
});
