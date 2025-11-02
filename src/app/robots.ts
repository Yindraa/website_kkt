// src/app/robots.ts
import type { MetadataRoute } from "next";

const siteUrl = "https://website-desa-leilem.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
