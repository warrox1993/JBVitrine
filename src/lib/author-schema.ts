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
    caption: "Jean-Baptiste Dhondt, praticien en cybersécurité, cloud, réseau, infra & web",
  },
  jobTitle: "Praticien en cybersécurité, cloud, réseau, infra & web",
  description:
    "Praticien en cybersécurité (Smidjan) : sécurité cloud, réseau, infrastructure et web, et conformité NIS2 / CyberFundamentals (CCB), en Wallonie.",
  worksFor: {
    "@type": "Organization",
    "@id": "https://smidjan.be/#organization",
    name: "Smidjan",
  },
  alumniOf: [
    { "@type": "Organization", name: "ISL - Institut Saint-Laurent" },
    { "@type": "Organization", name: "TechnoFutur TIC" },
  ],
  knowsAbout: [
    "Cybersécurité",
    "NIS2",
    "CyberFundamentals (CCB)",
    "Sécurité cloud",
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
