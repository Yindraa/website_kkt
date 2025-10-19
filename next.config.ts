// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: { typedRoutes: false },
  env: {
    NEXT_INTL_CONFIG_PATH: "./src/i18n/request.ts", // <- beri tahu lokasi config
  },
  reactStrictMode: true,
};

export default nextConfig;
