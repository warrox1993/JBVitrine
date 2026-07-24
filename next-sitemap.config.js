/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://smidjan.be",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    "/api/*",
    "/admin",
    "/admin/*",
    "/auditlogs",
    "/settings",
    "/sitemap.xml",
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/static/"],
        crawlDelay: 0,
      },
      // AI / LLM crawlers — full public site (all pages incl.
      // /conformite-nis2, /agence, /approche), API/admin blocked.
      { userAgent: "GPTBot", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "ChatGPT-User", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "anthropic-ai", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "ClaudeBot", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "Google-Extended", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "PerplexityBot", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "CCBot", allow: "/", disallow: ["/api/", "/admin/"] },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 0,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        crawlDelay: 0,
      },
    ],
    additionalSitemaps: [],
  },
  transform: async (config, path) => {
    // Priorités SEO optimisées par importance business
    let priority = 0.7; // default
    let changefreq = "weekly";

    if (path === "/") {
      priority = 1.0;
      changefreq = "daily";
    } else if (path === "/conformite-nis2" || path === "/services") {
      priority = 0.9; // Pages piliers / offre
      changefreq = "weekly";
    } else if (
      path === "/contact" ||
      path === "/approche" ||
      path === "/agence" ||
      path === "/certifications" ||
      path === "/projets"
    ) {
      priority = 0.8; // Pages de conversion / confiance
      changefreq = "monthly";
    } else if (path === "/blog") {
      priority = 0.8; // Page blog principale
      changefreq = "weekly";
    } else if (path.startsWith("/blog/")) {
      priority = 0.7; // Articles individuels
      changefreq = "monthly";
    } else if (
      path.includes("/mentions-legales") ||
      path.includes("/confidentialite") ||
      path.includes("/cgv")
    ) {
      priority = 0.3; // Pages légales
      changefreq = "yearly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
