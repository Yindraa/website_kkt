// src/app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://website-kkt.vercel.app";
  const routes = [
    "",
    "/profil",
    "/berita",
    "/umkm",
    "/wisata",
    "/kesehatan",
    "/kontak-layanan",
  ];
  const now = new Date().toISOString();

  return routes.map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
