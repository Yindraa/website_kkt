// next.config.ts
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  typedRoutes: false,
  outputFileTracingRoot: path.join(__dirname),
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 96, 128, 160, 192, 256, 384, 512],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gohbqcgqgsoloocjymju.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
