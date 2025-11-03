/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://smidjan.be",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/api/*", "/admin/*", "/auditlogs", "/settings"],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/admin/"] }],
    additionalSitemaps: [],
  },
  transform: async (config, path) => {
    // Priorités SEO optimisées par importance business
    let priority = 0.7; // default
    let changefreq = "weekly";

    if (path === "/") {
      priority = 1.0;
      changefreq = "daily";
    } else if (path === "/services" || path === "/cms-ecommerce") {
      priority = 0.9; // Pages clés commerciales
      changefreq = "weekly";
    } else if (path === "/contact") {
      priority = 0.8; // Page de conversion
      changefreq = "monthly";
    } else if (path === "/blog") {
      priority = 0.8; // Page blog principale
      changefreq = "weekly";
    } else if (path.startsWith("/blog/")) {
      priority = 0.7; // Articles individuels
      changefreq = "monthly";
    } else if (path === "/about") {
      priority = 0.6;
      changefreq = "monthly";
    } else if (
      path.includes("/legal-notice") ||
      path.includes("/privacy") ||
      path.includes("/terms")
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
