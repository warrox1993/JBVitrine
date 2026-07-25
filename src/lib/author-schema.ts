/**
 * Schema.org Author (Person) pour les articles de blog
 *
 * Améliore le SEO des articles en identifiant l'auteur comme une personne
 * plutôt qu'une organisation, ce qui est mieux pour les blogs.
 */

import { social, siteUrl } from "@/config/site";

export const authorSchema = {
  "@type": "Person",
  // Même @id que personSchema (schema.ts) pour que Google consolide les deux
  // nœuds en une seule entité (E-E-A-T) au lieu de deux personnes distinctes.
  "@id": "https://smidjan.be/#founder",
  name: "Jean-Baptiste Dhondt",
  givenName: "Jean-Baptiste",
  familyName: "Dhondt",
  url: `${siteUrl}/agence`,
  // Pas de champ `image` : le portrait est un placeholder « photo à venir » et
  // le fichier /images/team/jb-dhondt.webp n'existe pas. On ne référence pas une
  // image inexistante en JSON-LD (honnêteté + évite un lien cassé).
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
    "Sécurité offensive (TryHackMe)",
  ],
  sameAs: [social.linkedin, social.github, siteUrl],
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
