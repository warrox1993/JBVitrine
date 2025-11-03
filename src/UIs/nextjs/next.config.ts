import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80, 90], // ajouté pour Next.js 16 (qualité autorisée)
  },
  turbopack: {
    root: __dirname, // ← indique explicitement que le root du workspace est ce dossier
  },

  // Security Headers
  async headers() {
    // CSP conditionnelle: Vercel Live autorisé uniquement en preview
    const isPreview =
      process.env.VERCEL_ENV === "preview" ||
      process.env.NODE_ENV !== "production";

    const baseCsp = [
      "default-src 'self'",
      // Styles: 'unsafe-inline' pour CSS-in-JS + Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts: Google Fonts + data URIs
      "font-src 'self' https://fonts.gstatic.com data:",
      // Images: self + HTTPS externe + data URIs + blob
      "img-src 'self' https: data: blob:",
      // Connexions: base
      "connect-src 'self'",
      // Fermeture sécurité object/frame
      "object-src 'none'",
      "frame-src 'none'",
      "frame-ancestors 'none'",
      // Base et form
      "base-uri 'self'",
      "form-action 'self'",
      // Upgrade HTTP → HTTPS
      "upgrade-insecure-requests",
    ];

    // Preview: autorise Vercel Live
    if (isPreview) {
      baseCsp.push("script-src 'self' 'unsafe-inline' https://vercel.live");
      const connectIndex = baseCsp.findIndex((x) =>
        x.startsWith("connect-src"),
      );
      baseCsp[connectIndex] = "connect-src 'self' https://vercel.live";
    } else {
      // Production: pas de Vercel Live
      baseCsp.push("script-src 'self' 'unsafe-inline'");
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
