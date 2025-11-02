// src/app/(public)/layout.tsx
import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Poppins } from "next/font/google";
import PageFade from "@/components/PageFade";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const siteUrl = "https://website-desa-leilem.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Pemerintah Desa Leilem – Kecamatan Sonder, Minahasa",
    template: "%s | Desa Leilem",
  },
  description:
    "Profil resmi Desa Leilem, Kecamatan Sonder, Kabupaten Minahasa: sejarah desa, letak geografis, berita, UMKM, potensi wisata, kesehatan, dan kontak layanan.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Pemerintah Desa Leilem",
    description:
      "Website resmi Desa Leilem berisi profil desa, berita kegiatan, UMKM lokal, potensi wisata, dan layanan masyarakat.",
    url: siteUrl,
    siteName: "Desa Leilem",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-desa-leilem.jpg",
        width: 1200,
        height: 630,
        alt: "Website Desa Leilem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pemerintah Desa Leilem",
    description:
      "Informasi desa, berita kegiatan, UMKM dan layanan Desa Leilem.",
    images: ["/og-desa-leilem.png"],
  },
  keywords: [
    "Desa Leilem",
    "Leilem Minahasa",
    "Kecamatan Sonder",
    "Kabupaten Minahasa",
    "Website Desa Leilem",
    "Profil Desa Leilem",
    "UMKM Desa Leilem",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <meta
          name="google-site-verification"
          content="google0321d35f27087cc6.html"
        />
      </head>
      <body
        className={`${poppins.variable} font-sans min-h-screen flex flex-col bg-slate-50`}
      >
        <Navbar />
        <main className="flex-1 bg-white">
          <PageFade>{children}</PageFade>
        </main>
        <Footer />
      </body>
    </html>
  );
}
