export const SITE_CONFIG = {
  name: "Smidjan",
  url: "https://smidjan.be",
  email: "jeanbaptiste.dhondt1@gmail.com",
  phone: "0475 20 55 62",
  description: "Cybersécurité et gouvernance (GRC) en Wallonie.",
  social: {
    linkedin: "https://www.linkedin.com/in/jean-baptistedhondt",
    facebook: "https://www.facebook.com/profile.php?id=61583157825804",
    instagram: "https://www.instagram.com/smidjan.dev/",
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
