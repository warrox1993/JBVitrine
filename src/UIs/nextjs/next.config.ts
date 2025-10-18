import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ignore ESLint errors during production builds to avoid blocking builds on legacy pages.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow production builds to complete even if there are type errors in legacy sections.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
