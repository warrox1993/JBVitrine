import { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/blogActions";
import { siteUrl } from "@/config/site";
import { routing } from "@/i18n/routing";

/**
 * Sitemap served at the ROOT: https://smidjan.be/sitemap.xml
 *
 * WHY IT LIVES HERE, not under [locale]/(site)/ where it used to:
 * a sitemap.ts inside the [locale] segment is served at /fr/sitemap.xml,
 * /nl/sitemap.xml … and NEVER at the root — the only place crawlers and
 * robots.txt point to. The root URL was therefore answered by a stale
 * `public/sitemap.xml` committed months earlier, which declared 8 blog articles
 * that no longer exist (all HTTP 404), still listed /approche after it was
 * merged into /agence, and omitted /cv, /projets and /maintenant — the three
 * pages that matter most for a job application.
 *
 * `next-sitemap` (postbuild) has also been removed: it cannot enumerate App
 * Router routes under a dynamic [locale] segment, so every build regenerated
 * public/sitemap.xml down to a single URL (/icon.svg) and silently clobbered the
 * committed file. One generator, one source of truth, no build artifact.
 *
 * Locale strategy mirrors i18n/routing.ts (`localePrefix: "as-needed"`,
 * defaultLocale "fr"): French lives at the bare path, the others are prefixed.
 * Rather than emitting three near-duplicate entries per page, each URL carries
 * `alternates.languages` so crawlers pair the translations via hreflang.
 */

const DEFAULT_LOCALE = routing.defaultLocale;

/** Absolute URL for a path in a given locale ("" = home). */
function localized(path: string, locale: string): string {
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  return `${siteUrl}${prefix}${path}`;
}

/** hreflang map for one path, covering every configured locale. */
function alternates(path: string): { languages: Record<string, string> } {
  return {
    languages: Object.fromEntries(
      routing.locales.map((locale) => [locale, localized(path, locale)]),
    ),
  };
}

/**
 * Public pages, matching the paths actually present in
 * src/app/[locale]/(site)/. Keep in sync when a page is added or removed — a
 * sitemap that lists a 404 wastes crawl budget and costs trust.
 */
const PAGES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/conformite-nis2", changeFrequency: "monthly", priority: 0.95 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.9 },
  // /cv, /projets and /maintenant were MISSING from the served sitemap.
  { path: "/cv", changeFrequency: "monthly", priority: 0.9 },
  { path: "/projets", changeFrequency: "monthly", priority: 0.8 },
  { path: "/agence", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/maintenant", changeFrequency: "weekly", priority: 0.7 },
  { path: "/mentions-legales", changeFrequency: "yearly", priority: 0.3 },
  { path: "/confidentialite", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cgv", changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = PAGES.map(
    ({ path, changeFrequency, priority }) => ({
      url: localized(path, DEFAULT_LOCALE),
      lastModified: now,
      changeFrequency,
      priority,
      alternates: alternates(path),
    }),
  );

  // Articles come from the same source the pages render from, so the sitemap
  // can no longer drift into listing articles that do not exist.
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const articles = await getAllArticles();
    blogPages = articles.map((article) => {
      const path = `/blog/${article.slug}`;
      const published = new Date(article.publishedAt);
      return {
        url: localized(path, DEFAULT_LOCALE),
        // Fall back to now if publishedAt is unparseable, so one bad entry
        // cannot emit an invalid <lastmod> and void the whole document.
        lastModified: Number.isNaN(published.getTime()) ? now : published,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: alternates(path),
      };
    });
  } catch (error) {
    console.error("Error fetching blog articles for sitemap:", error);
  }

  return [...staticPages, ...blogPages];
}
