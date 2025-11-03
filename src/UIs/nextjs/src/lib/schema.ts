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
    email: "jeanbaptiste.dhondt1@gmail.com",
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
  name: "Smidjan",
  image: "https://smidjan.be/og-image.webp",
  description:
    "Studio web à Liège spécialisé en développement de sites, e-commerce, SEO et design digital.",
  url: "https://smidjan.be",
  telephone: "+32 475 20 55 62",
  email: "jeanbaptiste.dhondt1@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "BE",
    addressRegion: "Wallonie",
    addressLocality: "Liège",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.6326,
    longitude: 5.5797,
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
  priceRange: "Sur devis",
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
};
