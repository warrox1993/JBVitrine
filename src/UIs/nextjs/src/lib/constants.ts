export const SITE_CONFIG = {
  name: "Smidjan",
  url: "https://smidjan.be",
  email: "jeanbaptiste.dhondt1@gmail.com",
  phone: "+32 475 20 55 62",
  description:
    "Studio web à Liège spécialisé en développement de sites, e-commerce, SEO et design digital",
  social: {
    linkedin: "https://www.linkedin.com/in/jean-baptistedhondt",
    facebook: "https://www.facebook.com/jeanbaptiste.dhondt",
    github: "https://github.com/warrox1993",
  },
} as const;

export const NAVIGATION_ITEMS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
] as const;
