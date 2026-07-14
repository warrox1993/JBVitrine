export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://smidjan.be/#organization",
  name: "Smidjan",
  alternateName: "Smidjan Cybersécurité",
  url: "https://smidjan.be",
  logo: "https://smidjan.be/images/logoheader/logo-200.png",
  description:
    "Smidjan sécurise les réseaux, l'infrastructure et les applications des PME wallonnes, et les met en conformité NIS2 / CyberFundamentals (CCB). Audit, remédiation et accompagnement, en Belgique.",
  foundingDate: "2025",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    telephone: "+32475205562",
    email: "jeanbaptiste.dhondt1@gmail.com",
    availableLanguage: ["fr-BE", "French"],
    areaServed: ["BE", "Wallonie"],
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "BE",
    addressRegion: "Wallonie",
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
    "Cybersécurité des réseaux, de l'infrastructure et des applications, et mise en conformité NIS2 / CyberFundamentals pour les PME en Belgique.",
  inLanguage: "fr-BE",
  publisher: {
    "@id": "https://smidjan.be/#organization",
  },
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://smidjan.be/#localbusiness",
  name: "Smidjan, Cybersécurité & conformité NIS2, Wallonie",
  alternateName: "Smidjan Cybersécurité",
  image: "https://smidjan.be/og-image.webp",
  description:
    "Prestataire cybersécurité en Wallonie : sécurisation des réseaux, de l'infrastructure et des applications, audit et remédiation, mise en conformité NIS2 / CyberFundamentals (CCB) pour les PME en Belgique et en Wallonie.",
  url: "https://smidjan.be",
  telephone: "+32475205562",
  email: "jeanbaptiste.dhondt1@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "BE",
    addressRegion: "Wallonie",
  },
  areaServed: [
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
  // Services offerts : positionnement cyber-first
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services de cybersécurité Smidjan",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Conformité NIS2 & CyberFundamentals (CCB)",
          description:
            "Audit d'écart, remédiation et accompagnement jusqu'à la vérification, aux niveaux Basic, Important et Essential du référentiel CyberFundamentals.",
          serviceType: "Conformité & audit cybersécurité",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sécurité des réseaux & de l'infrastructure",
          description:
            "Segmentation, pare-feu, durcissement, sauvegardes et supervision pour protéger vos systèmes.",
          serviceType: "Sécurité infrastructure",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Tests d'intrusion & audit de sécurité",
          description:
            "Pentests web et applicatifs suivant une approche inspirée d'OWASP, avec plan de remédiation priorisé.",
          serviceType: "Test d'intrusion",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Développement web sécurisé",
          description:
            "Applications et sites conçus avec la sécurité intégrée dès la conception (secure by design).",
          serviceType: "Développement web sécurisé",
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

// Date de dernière révision du contenu de la home. Source UNIQUE, réutilisée par le
// schema WebPage et les mentions de fraîcheur visibles, pour éviter toute divergence.
export const CONTENT_LAST_VERIFIED = "2026-07-07";

// WebPage Schema : la home elle-même, avec date de dernière révision (signal de fraîcheur).
export const homeWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://smidjan.be/#webpage",
  url: "https://smidjan.be/",
  name: "Cybersécurité & conformité NIS2 pour les PME | Smidjan, Wallonie",
  description:
    "Sécurité des réseaux, de l'infrastructure et des applications, et mise en conformité NIS2 / CyberFundamentals pour les PME wallonnes.",
  inLanguage: "fr-BE",
  isPartOf: { "@id": "https://smidjan.be/#organization" },
  about: { "@id": "https://smidjan.be/#organization" },
  primaryImageOfPage: "https://smidjan.be/og-image.webp",
  dateModified: CONTENT_LAST_VERIFIED,
  author: { "@id": "https://smidjan.be/#founder" },
  reviewedBy: { "@id": "https://smidjan.be/#founder" },
};

// Person Schema : le fondateur, à partir des faits déjà publiés sur la home et /agence.
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://smidjan.be/#founder",
  name: "Jean-Baptiste Dhondt",
  jobTitle: "Fondateur & expert en cybersécurité",
  worksFor: { "@id": "https://smidjan.be/#organization" },
  url: "https://smidjan.be/agence",
  knowsAbout: [
    "Cybersécurité",
    "NIS2",
    "CyberFundamentals (CCB)",
    "Tests d'intrusion",
    "ISO/IEC 27001",
    "Sécurité des réseaux",
  ],
  sameAs: [
    "https://www.linkedin.com/in/jean-baptistedhondt",
    "https://github.com/warrox1993",
  ],
};

// FAQPage Schema : reflète la FAQ visible de /conformite-nis2 (NIS2 / CyFun)
export const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Suis-je concerné par NIS2 ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cela dépend de votre secteur et de la taille de votre entreprise. NIS2 vise les entités essentielles (énergie, santé, transport, finance, infrastructures numériques…) et les entités importantes (fabrication, agroalimentaire, services numériques, chimie…). De nombreuses PME sont concernées, y compris indirectement en tant que fournisseurs ou sous-traitants. En cas de doute, notre diagnostic gratuit clarifie votre situation.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle est la différence entre CyFun et ISO/IEC 27001 ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ISO/IEC 27001 est une norme internationale de management de la sécurité de l'information. CyberFundamentals (CyFun) est le cadre belge du CCB, conçu pour répondre à NIS2 et aligné sur ISO 27001 et le NIST CSF. CyFun est souvent un point d'entrée plus accessible et progressif pour une PME, avec ses trois niveaux (Basic, Important, Essential), tout en restant compatible avec une démarche ISO 27001 ultérieure.",
      },
    },
    {
      "@type": "Question",
      name: "Est-ce que Smidjan délivre la certification CyFun ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non. Smidjan n'est pas un organisme de certification et n'est pas accrédité BELAC. La certification / vérification officielle CyFun est délivrée par des organismes accrédités par BELAC, indépendants de nous. Notre rôle est complémentaire : audit, analyse d'écart, remédiation et préparation. Nous vous rendons prêts et conformes pour que l'organisme accrédité valide votre niveau.",
      },
    },
    {
      "@type": "Question",
      name: "Combien de temps faut-il pour se mettre en conformité ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cela dépend du niveau visé, de votre maturité de départ et de la taille du périmètre. À titre indicatif : de l'ordre de 1 à 3 mois pour Basic, 3 à 6 mois pour Important et 6 à 12 mois pour Essential. Comme NIS2 est déjà en vigueur, il est recommandé de lancer la démarche sans attendre.",
      },
    },
    {
      "@type": "Question",
      name: "Que se passe-t-il si je ne fais rien ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La non-conformité expose à des amendes administratives significatives et engage la responsabilité des organes de direction. Surtout, l'absence de mesures augmente votre exposition réelle : un incident (rançongiciel, fuite de données) coûte généralement bien plus cher qu'une mise en conformité anticipée.",
      },
    },
    {
      "@type": "Question",
      name: "Quel niveau CyFun choisir pour ma PME ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pour beaucoup de PME, le niveau Important offre le bon équilibre entre exigence et effort. Le niveau Basic est un excellent point de départ (il couvre l'essentiel des attaques courantes), tandis qu'Essential s'adresse aux entités essentielles NIS2 et aux organisations à forte exigence de sécurité. Lors du cadrage, nous recommandons le niveau le plus pertinent, ni surdimensionné, ni insuffisant.",
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
    url: "https://smidjan.be/agence",
  },
  publisher: {
    "@type": "Organization",
    name: "Smidjan",
    logo: {
      "@type": "ImageObject",
      url: "https://smidjan.be/images/logoheader/logo-200.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": url,
  },
});
