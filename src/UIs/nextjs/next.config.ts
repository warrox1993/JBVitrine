import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80, 90], // ajouté pour Next.js 16 (qualité autorisée)
  },
  turbopack: {
    root: __dirname, // ← indique explicitement que le root du workspace est ce dossier
  },
};

export default nextConfig;
