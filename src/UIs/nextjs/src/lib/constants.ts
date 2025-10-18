export const SITE_CONFIG = {
  name: 'YourBrand',
  url: 'https://yourbrand.com',
  email: 'contact@yourbrand.com',
  phone: '+33 1 23 45 67 89',
  description: 'Agence digitale spécialisée en web design premium',
  social: {
    linkedin: 'https://linkedin.com/company/yourbrand',
    twitter: 'https://twitter.com/yourbrand',
    facebook: 'https://www.facebook.com/yourbrand',
    github: 'https://github.com/yourbrand',
  },
} as const;

export const NAVIGATION_ITEMS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
] as const;
