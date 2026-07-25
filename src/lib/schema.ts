import { social, contact, credentials } from "@/config/site";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://smidjan.be/#organization",
  name: "Smidjan",
  alternateName: "Smidjan Cybersécurité",
  url: "https://smidjan.be",
  logo: "https://smidjan.be/images/logoheader/logo-200.png",
  description:
    "Smidjan est la pratique de Jean-Baptiste Dhondt en sécurité cloud, réseau, infrastructure et web, avec un axe conformité NIS2 / CyberFundamentals (CCB). Basé en Wallonie, en Belgique.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    telephone: contact.phone,
    email: contact.email,
    availableLanguage: ["fr-BE", "French"],
    areaServed: ["BE", "Wallonie"],
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "BE",
    addressRegion: "Wallonie",
  },
  sameAs: [social.linkedin, social.github],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Smidjan",
  url: "https://smidjan.be",
  description:
    "Portfolio de Jean-Baptiste Dhondt (Smidjan) : sécurité cloud, réseau, infrastructure et web, et conformité NIS2 / CyberFundamentals, en Wallonie.",
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
    "Jean-Baptiste Dhondt (Smidjan), praticien en cybersécurité en Wallonie : sécurité cloud, réseau et infrastructure, sécurité web, et accompagnement à la conformité NIS2 / CyberFundamentals (CCB).",
  url: "https://smidjan.be",
  telephone: contact.phone,
  email: contact.email,
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
  sameAs: [social.linkedin, social.github],
  // NOTE: pas de hasOfferCatalog (catalogue d'offres payantes) ni de foundingDate
  // tant que l'entité n'est pas immatriculée (BCE/TVA « en cours »). Annoncer en
  // JSON-LD une ProfessionalService avec offres payantes contredirait les mentions
  // légales et le footer, qui omettent volontairement BCE/TVA. À réintroduire une
  // fois l'immatriculation finalisée.
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
  name: "Jean-Baptiste Dhondt · Sécurité cloud, réseau, infra & web | Smidjan",
  description:
    "Portfolio de Jean-Baptiste Dhondt : sécurité cloud, réseau, infrastructure et web, et conformité NIS2 / CyberFundamentals, en Wallonie.",
  inLanguage: "fr-BE",
  isPartOf: { "@id": "https://smidjan.be/#organization" },
  about: { "@id": "https://smidjan.be/#organization" },
  primaryImageOfPage: "https://smidjan.be/og-image.webp",
  dateModified: CONTENT_LAST_VERIFIED,
  author: { "@id": "https://smidjan.be/#founder" },
  reviewedBy: { "@id": "https://smidjan.be/#founder" },
};

// Person Schema : le praticien, à partir des faits déjà publiés sur la home et /agence.
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://smidjan.be/#founder",
  name: "Jean-Baptiste Dhondt",
  jobTitle: "Praticien en cybersécurité, cloud, réseau, infra & web",
  worksFor: { "@id": "https://smidjan.be/#organization" },
  url: "https://smidjan.be/agence",
  knowsAbout: [
    "Sécurité cloud",
    "Sécurité réseau",
    "Sécurité de l'infrastructure",
    "Sécurité web",
    "NIS2",
    "CyberFundamentals (CCB)",
    "IA & automatisation",
    "Sécurité offensive (TryHackMe)",
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "certification",
    name: "Microsoft Certified: Azure Fundamentals (AZ-900)",
    recognizedBy: { "@type": "Organization", name: "Microsoft" },
    url: credentials.az900VerifyUrl,
    dateCreated: credentials.az900EarnedDate,
  },
  alumniOf: [
    { "@type": "EducationalOrganization", name: "ISL - Institut Saint-Laurent" },
    { "@type": "EducationalOrganization", name: "TechnoFutur TIC" },
  ],
  sameAs: [social.linkedin, social.github, social.tryhackme],
};

