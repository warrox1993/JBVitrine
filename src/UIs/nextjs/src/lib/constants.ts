export const SITE_CONFIG = {
  name: "YourBrand",
  url: "https://yourbrand.com",
  email: "contact@yourbrand.com",
  phone: "+33 1 23 45 67 89",
  description: "Agence digitale spécialisée en web design premium",
  social: {
    linkedin: "https://www.linkedin.com/in/jean-baptistedhondt",
    twitter: "https://twitter.com/yourbrand",
    facebook: "https://www.facebook.com/jeanbaptiste.dhondt",
    github: "https://github.com/warrox1993",
  },
} as const;

export const NAVIGATION_ITEMS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
] as const;
