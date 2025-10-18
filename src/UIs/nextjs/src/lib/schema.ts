export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'YourBrand',
  url: 'https://yourbrand.com',
  logo: 'https://yourbrand.com/logo.png',
  description: 'Agence digitale spécialisée en web design premium et développement Next.js',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+33-1-23-45-67-89',
    contactType: 'Customer Service',
    email: 'contact@yourbrand.com',
    availableLanguage: ['French', 'English'],
  },
  sameAs: [
    'https://linkedin.com/company/yourbrand',
    'https://twitter.com/yourbrand',
    'https://dribbble.com/yourbrand',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'FR',
    addressLocality: 'Paris',
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'YourBrand',
  url: 'https://yourbrand.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://yourbrand.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

