import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

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

    remotePatterns: [
      {
        protocol: "https",
        hostname: "innowise.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
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

  // Redirections SEO 2025
  async redirects() {
    return [
      // Redirection ancienne URL produits vers nouvelle structure
      {
        source: "/produits/cms-ecommerce",
        destination: "/cms-ecommerce",
        permanent: true, // 301 redirect
      },
      {
        source: "/produits/:slug*",
        destination: "/:slug*",
        permanent: true,
      },
    ];
  },

  // Security Headers
  async headers() {
    // CSP conditionnelle: Vercel Live autorisé en dev et preview
    // Note: Turbopack ne set pas toujours NODE_ENV, donc on détecte aussi via VERCEL_ENV
    const isPreview = process.env.VERCEL_ENV === "preview";
    const isProduction = process.env.NODE_ENV === "production" && !isPreview;

    const baseCsp = [
      "default-src 'self'",
      // Styles: 'unsafe-inline' pour CSS-in-JS + Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts: Google Fonts + Perplexity AI + data URIs
      "font-src 'self' https://fonts.gstatic.com https://r2cdn.perplexity.ai data:",
      // Images: self + HTTPS externe + data URIs + blob
      "img-src 'self' https: data: blob:",
      // Connexions: Vercel Analytics + Speed Insights + reCAPTCHA + Google Maps
      "connect-src 'self' https://vitals.vercel-insights.com https://vercel-insights.com https://www.google.com https://www.gstatic.com https://maps.googleapis.com https://maps.gstatic.com",
      // Fermeture sécurité object/frame
      "object-src 'none'",
      // Allow Google Maps + reCAPTCHA embeds on contact page
      "frame-src https://www.google.com https://recaptcha.google.com https://www.recaptcha.net",
      "frame-ancestors 'none'",
      // Base et form
      "base-uri 'self'",
      "form-action 'self'",
      // Upgrade HTTP → HTTPS
      "upgrade-insecure-requests",
    ];

    // Dev/Preview: autorise Vercel Live + reCAPTCHA + Google Maps
    if (!isProduction) {
      baseCsp.push(
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.vercel.live https://va.vercel-scripts.com https://www.google.com https://www.gstatic.com https://maps.googleapis.com https://maps.gstatic.com",
      );
      const connectIndex = baseCsp.findIndex((x) =>
        x.startsWith("connect-src"),
      );
      baseCsp[connectIndex] =
        "connect-src 'self' https://vercel.live wss://ws-us3.pusher.com https://sockjs-us3.pusher.com https://vitals.vercel-insights.com https://vercel-insights.com https://www.google.com https://www.gstatic.com https://maps.googleapis.com https://maps.gstatic.com";
    } else {
      // Production STRICT: Vercel Analytics + Speed Insights + reCAPTCHA + Google Maps
      baseCsp.push(
        "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://www.google.com https://www.gstatic.com https://maps.googleapis.com https://maps.gstatic.com",
      );
    }

    const csp = baseCsp.join("; ");

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
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Content-Security-Policy",
            value: csp,
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
