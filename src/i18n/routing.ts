import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Supported locales. French is the primary market (Liège/Wallonie);
  // Dutch and English are added for the rest of Belgium / international.
  locales: ["fr", "nl", "en"],

  // Default locale: served WITHOUT a prefix (preserves the live FR URLs / SEO).
  defaultLocale: "fr",

  // FR stays at "/", NL/EN get a prefix ("/nl", "/en").
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
