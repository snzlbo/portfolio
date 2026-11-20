import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Tree-shakes icon and animation imports so only what is used ships.
    optimizePackageImports: ["lucide-react", "motion"],
  },
}

export default nextConfig
