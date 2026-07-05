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
  url: "https://smidjan.be/about",
  image: {
    "@type": "ImageObject",
    url: "https://smidjan.be/images/team/jb-dhondt.webp",
    width: 400,
    height: 400,
    caption: "Jean-Baptiste Dhondt - CEO & Développeur Full-Stack",
  },
  jobTitle: "CEO & Développeur Full-Stack",
  description:
    "Expert en développement web Next.js, cybersécurité et automatisation IA. Fondateur de Smidjan, agence web à Liège.",
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
    "Next.js",
    "React",
    "TypeScript",
    "Cybersécurité",
    "OWASP",
    "Intelligence Artificielle",
    "n8n",
    "Automatisation",
    "SEO technique",
    "Performance Web",
    "Développement Full-Stack",
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
