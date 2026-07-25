import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Supported locales. French is the primary market (Liège/Wallonie);
  // Dutch and English are added for the rest of Belgium / international.
  locales: ["fr", "nl", "en"],

  // Default locale: served WITHOUT a prefix (preserves the live FR URLs / SEO).
  defaultLocale: "fr",

  // FR stays at "/", NL/EN get a prefix ("/nl", "/en").
  localePrefix: "as-needed",

  // Do NOT auto-redirect visitors to their browser language. This is a
  // French-first portfolio (Wallonie): everyone lands on FR by default; NL/EN
  // are opt-in via the language switcher. Without this, a Belgian (Dutch)
  // browser was being sent to /nl on the very first visit.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
