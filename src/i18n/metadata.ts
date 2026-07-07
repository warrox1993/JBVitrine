import { routing } from "./routing";

/**
 * Locale-aware canonical + hreflang alternates for a page's metadata.
 *
 * `path` is the locale-agnostic pathname (e.g. "/services" or "/"). FR is the
 * default locale and is served without a prefix; NL/EN are prefixed. The
 * canonical points to the CURRENT locale's URL (fixes NL/EN pages that
 * previously canonicalised to the FR URL), and `languages` links every locale
 * version for Google (hreflang) with an x-default pointing to FR.
 */
export function buildAlternates(locale: string, path: string) {
  const clean = path === "/" ? "" : path.replace(/\/+$/, "");
  const url = (loc: string) =>
    loc === routing.defaultLocale ? clean || "/" : `/${loc}${clean}`;

  return {
    canonical: url(locale),
    languages: {
      "fr-BE": url("fr"),
      "nl-BE": url("nl"),
      en: url("en"),
      "x-default": url("fr"),
    },
  };
}
