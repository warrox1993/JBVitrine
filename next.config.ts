import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
import createNextIntlPlugin from "next-intl/plugin";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

// Wires next-intl to src/i18n/request.ts for locale-aware Server Components.
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Modern browsers only - No unnecessary polyfills (saves ~14KB)
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  // Target modern browsers (ES2020+) - No polyfills needed
  // This ensures Next.js respects .browserslistrc
  transpilePackages: [],

  // Performance optimizations
  reactStrictMode: true,
  poweredByHeader: false,

  // CSS Optimization (Next.js 16 built-in)
  // Simplified for Vercel stability
  experimental: {
    optimizeCss: true, // Enable CSS minification
    // Tree-shake large packages to reduce bundle size
    optimizePackageImports: [
      "lucide-react", // Icon library
      "react-bootstrap", // UI components
    ],
  },

  images: {
    // Formats modernes (priorité AVIF puis WebP, fallback JPEG/PNG)
    formats: ["image/avif", "image/webp"],

    // Qualités optimisées pour balance taille/qualité
    qualities: [75, 80, 90],

    // Device sizes: Breakpoints mobile-first pour images responsives
    // Basé sur les devices les plus communs en 2025
    deviceSizes: [
      640, // Mobile landscape, petites tablettes portrait
      750, // iPhone standard (375 × 2)
      828, // iPhone Plus (414 × 2)
      1080, // Tablettes, petits laptops
      1200, // Desktop standard
      1920, // Full HD desktop
      2048, // Retina desktop, iPad Pro
      3840, // 4K screens
    ],

    // Image sizes: Pour les images plus petites (icons, thumbnails, avatars)
    imageSizes: [
      16, // Favicons, très petites icons
      32, // Small icons
      48, // Medium icons
      64, // Large icons, small avatars
      96, // Medium avatars, small thumbnails
      128, // Large avatars
      256, // Medium thumbnails
      384, // Large thumbnails
    ],

    // Cache optimisé (24h pour images statiques)
    minimumCacheTTL: 86400,

    // Dangerously allow SVG (si besoin, sinon commenter)
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    remotePatterns: [],
  },

  turbopack: {
    root: __dirname,
  },

  // Webpack optimization for production builds
  // Simplified config for Vercel compatibility
  webpack: (config) => {
    // Let Next.js handle code splitting and optimization
    return config;
  },

  // Redirections SEO refonte. Next émet un 308 (permanent, préserve la méthode)
  // pour `permanent: true`, l'équivalent moderne du 301.
  async redirects() {
    return [
      // Ancienne structure "produits/*"
      {
        source: "/produits/cms-ecommerce",
        destination: "/services",
        permanent: true,
      },
      // Refonte : positionnement cyber-first, le CMS/e-commerce n'est plus un
      // service. On renvoie vers l'offre développement web sécurisé.
      {
        source: "/cms-ecommerce",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/produits/:slug*",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/smidjan-cms",
        destination: "/services",
        permanent: true,
      },
      // "À propos" → nouvelle page Agence
      {
        source: "/about",
        destination: "/agence",
        permanent: true,
      },
      // Pages légales renommées (FR)
      {
        source: "/legal-notice",
        destination: "/mentions-legales",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "/confidentialite",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "/cgv",
        permanent: true,
      },
      // Legacy legal/about paths under a locale prefix (nl/en), so external
      // inbound links like /nl/legal-notice don't 404.
      {
        source: "/:locale(nl|en)/legal-notice",
        destination: "/:locale/mentions-legales",
        permanent: true,
      },
      {
        source: "/:locale(nl|en)/privacy",
        destination: "/:locale/confidentialite",
        permanent: true,
      },
      {
        source: "/:locale(nl|en)/terms",
        destination: "/:locale/cgv",
        permanent: true,
      },
      {
        source: "/:locale(nl|en)/about",
        destination: "/:locale/agence",
        permanent: true,
      },
    ];
  },

  // Security Headers
  // NOTE: Content-Security-Policy is NOT set here anymore. It now needs a
  // per-request nonce in script-src (to drop 'unsafe-inline'), which a
  // static next.config.ts header can't provide, so it's built and applied by
  // src/middleware.ts for every request instead. Everything else below is
  // still static and stays here.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(withBundleAnalyzer(nextConfig));
