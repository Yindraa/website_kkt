// src/app/(public)/kontak-layanan/page.tsx
import SectionKontak from "@/sections/kontak-layanan/SectionKontak";
import type { Metadata } from "next";

const BASE_URL = "https://website-desa-leilem.vercel.app";

export const metadata: Metadata = {
  title: "Kontak & Layanan Desa Leilem",
  description:
    "Hubungi Pemerintah Desa Leilem untuk administrasi kependudukan, informasi UMKM, layanan kesehatan, dan pelaporan warga.",
  alternates: {
    canonical: `${BASE_URL}/kontak-layanan`,
  },
  openGraph: {
    title: "Kontak & Layanan Desa Leilem",
    description:
      "Informasi kontak resmi desa, nomor WhatsApp, jam layanan, dan formulir pengaduan.",
    url: `${BASE_URL}/kontak-layanan`,
    siteName: "Pemerintah Desa Leilem",
    locale: "id_ID",
    type: "website",
  },
};

export default function KontakDanLayananPage() {
  // JSON-LD supaya Google ngerti ini kantor pemerintah desa
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentOffice",
    name: "Pemerintah Desa Leilem",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Desa Leilem, Kecamatan Sonder",
      addressLocality: "Minahasa",
      addressRegion: "Sulawesi Utara",
      addressCountry: "ID",
    },
    url: `${BASE_URL}/kontak-layanan`,
    telephone: "+62-851-7433-1388",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+62-851-7433-1388",
        contactType: "customer service",
        areaServed: "ID",
        availableLanguage: ["id"],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SectionKontak />
    </>
  );
}
