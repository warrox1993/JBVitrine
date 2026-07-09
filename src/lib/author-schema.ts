/**
 * Schema.org Author (Person) pour les articles de blog
 *
 * Améliore le SEO des articles en identifiant l'auteur comme une personne
 * plutôt qu'une organisation, ce qui est mieux pour les blogs.
 */

export const authorSchema = {
  "@type": "Person",
  "@id": "https://smidjan.be/#person-jean-baptiste-dhondt",
  name: "Jean-Baptiste Dhondt",
  givenName: "Jean-Baptiste",
  familyName: "Dhondt",
  url: "https://smidjan.be/agence",
  image: {
    "@type": "ImageObject",
    url: "https://smidjan.be/images/team/jb-dhondt.webp",
    width: 400,
    height: 400,
    caption: "Jean-Baptiste Dhondt, fondateur et expert en cybersécurité",
  },
  jobTitle: "Fondateur & expert en cybersécurité",
  description:
    "Fondateur de Smidjan, expert en cybersécurité et conformité NIS2 / CyberFundamentals (CCB) pour les PME en Belgique. Sécurité des réseaux, de l'infrastructure et des applications, audit et remédiation.",
  worksFor: {
    "@type": "Organization",
    "@id": "https://smidjan.be/#organization",
    name: "Smidjan",
  },
  alumniOf: {
    "@type": "Organization",
    name: "HEPL - Haute École de la Province de Liège",
  },
  knowsAbout: [
    "Cybersécurité",
    "NIS2",
    "CyberFundamentals (CCB)",
    "Tests d'intrusion",
    "OWASP",
    "ISO/IEC 27001",
    "Sécurité des réseaux",
    "Sécurité des applications",
  ],
  sameAs: [
    "https://www.linkedin.com/in/jean-baptistedhondt",
    "https://github.com/warrox1993",
    "https://smidjan.be",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Liège",
    addressRegion: "Wallonie",
    addressCountry: "BE",
  },
  nationality: {
    "@type": "Country",
    name: "Belgique",
  },
} as const;

/**
 * Fonction helper pour obtenir le schema author avec possibilité de l'étendre
 */
export function getAuthorSchema(overrides?: Partial<typeof authorSchema>) {
  return {
    ...authorSchema,
    ...overrides,
  };
}
