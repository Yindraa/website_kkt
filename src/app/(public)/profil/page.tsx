// src/app/(public)/profil/page.tsx
import SectionProfil from "@/sections/profil/SectionProfil";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil Desa Leilem – Sejarah, Demografi, Letak Geografis",
  description:
    "Profil resmi Desa Leilem, Kecamatan Sonder, Kabupaten Minahasa: sejarah desa, visi misi, data penduduk, profesi, pendidikan, batas wilayah, peta lokasi, dan struktur pemerintahan.",
  openGraph: {
    title: "Profil Desa Leilem",
    description:
      "Informasi lengkap Desa Leilem: sejarah, demografi, peta, dan struktur perangkat.",
    url: "https://website-desa-leilem.vercel.app/profil",
    siteName: "Pemerintah Desa Leilem",
    locale: "id_ID",
    type: "article",
  },
  alternates: {
    canonical: "https://website-desa-leilem.vercel.app/profil",
  },
  keywords: [
    "Desa Leilem",
    "Profil Desa Leilem",
    "Kecamatan Sonder",
    "Minahasa",
    "Sulawesi Utara",
    "pemerintah desa",
  ],
};

export default function Page() {
  return <SectionProfil />;
}
