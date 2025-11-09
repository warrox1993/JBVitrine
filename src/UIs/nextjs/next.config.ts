import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  },

  turbopack: {
    root: __dirname,
  },

  // Security Headers
  async headers() {
    // CSP conditionnelle: Vercel Live autorisé en dev et preview
    const isDevelopment = process.env.NODE_ENV === "development";
    const isPreview = process.env.VERCEL_ENV === "preview";

    const baseCsp = [
      "default-src 'self'",
      // Styles: 'unsafe-inline' pour CSS-in-JS + Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts: Google Fonts + data URIs
      "font-src 'self' https://fonts.gstatic.com data:",
      // Images: self + HTTPS externe + data URIs + blob
      "img-src 'self' https: data: blob:",
      // Connexions: Vercel Analytics + Speed Insights + reCAPTCHA
      "connect-src 'self' https://vitals.vercel-insights.com https://vercel-insights.com https://www.google.com https://www.gstatic.com",
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

    // Dev/Preview: autorise Vercel Live + reCAPTCHA
    if (isDevelopment || isPreview) {
      baseCsp.push(
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.vercel.live https://va.vercel-scripts.com https://www.google.com https://www.gstatic.com",
      );
      const connectIndex = baseCsp.findIndex((x) =>
        x.startsWith("connect-src"),
      );
      baseCsp[connectIndex] =
        "connect-src 'self' https://vercel.live wss://ws-us3.pusher.com https://sockjs-us3.pusher.com https://vitals.vercel-insights.com https://vercel-insights.com https://www.google.com https://www.gstatic.com";
    } else {
      // Production: Vercel Analytics + Speed Insights + reCAPTCHA
      baseCsp.push(
        "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://www.google.com https://www.gstatic.com",
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

export default nextConfig;
