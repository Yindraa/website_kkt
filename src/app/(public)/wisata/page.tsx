// src/app/(public)/wisata/page.tsx
import "@/app/globals.css";
import HeroPotensi from "@/sections/wisata/HeroPotensi";
import HighlightIcons from "@/sections/wisata/HighlightIcons";
import LongTextPanel from "@/sections/wisata/LongTextPanel";
import GalleryLightbox from "@/sections/wisata/GalleryLightbox";
import HoursTickets from "@/sections/wisata/HoursTickets";
import FacilitiesList from "@/sections/wisata/FacilitiesList";
import SafetyTips from "@/sections/wisata/SafetyTips";
import FAQAccordion from "@/sections/wisata/FAQAccordion";
import MapCard from "@/sections/wisata/MapCard";
import CTAContact from "@/sections/wisata/CTAContact";
import type { Metadata } from "next";

import {
  hero,
  highlights,
  longDescription,
  visitInfo,
  facilities,
  safety,
  tips,
  faq,
  galeri,
  contact,
} from "@/data/wisata-rano";

// 👇 metadata untuk SEO
export const metadata: Metadata = {
  title: "Wisata Rano Reindang – Desa Leilem",
  description:
    "Informasi kunjungan ke wisata Rano Reindang di Desa Leilem: daya tarik, jam kunjung, tiket, fasilitas, tips keamanan, peta lokasi, dan kontak pengelola.",
  openGraph: {
    title: "Wisata Rano Reindang – Desa Leilem",
    description:
      "Nikmati suasana alam Desa Leilem. Lihat foto, fasilitas, jam kunjung, dan lokasi wisata.",
    url: "https://website-desa-leilem.vercel.app/wisata",
    siteName: "Pemerintah Desa Leilem",
    locale: "id_ID",
    type: "article",
    images: hero?.image
      ? [
          {
            url: hero.image,
            width: 1200,
            height: 630,
            alt: "Wisata Rano Reindang Desa Leilem",
          },
        ]
      : undefined,
  },
  alternates: {
    canonical: "https://website-desa-leilem.vercel.app/wisata",
  },
  keywords: [
    "wisata leilem",
    "rano reindang",
    "wisata minahasa",
    "wisata sonder",
    "desa leilem",
  ],
};

export default function WisataPage() {
  // 👇 ini yang bikin error kemarin — sekarang kita tikekan
  const socialResmi = [
    {
      type: "instagram",
      label: "@wisataalamranoreindang",
      url: "https://www.instagram.com/wisataalamranoreindang",
    },
    {
      type: "facebook",
      label: "Rano Reindang",
      url: "https://www.facebook.com/profile.php?id=61569395981513",
    },
    {
      type: "tiktok",
      label: "Wisata Alam Rano Reindang",
      url: "https://www.tiktok.com/@wisataalamranoreindang",
    },
    {
      type: "website",
      label: "Email wisata",
      url: "mailto:wisataalamranoreindangleilem@gmail.com",
    },
  ] satisfies Array<{
    type: "instagram" | "facebook" | "tiktok" | "website";
    label: string;
    url: string;
  }>;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <HeroPotensi
        title={hero.title}
        tagline={hero.tagline}
        image={hero.image}
        ctaMaps="#lokasi"
        ctaWhatsApp={hero.ctaWhatsApp}
      />

      <HighlightIcons items={highlights} />

      <LongTextPanel title="Tentang Rano Reindang" text={longDescription} />

      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <GalleryLightbox images={galeri} />
        <div className="space-y-4">
          <HoursTickets
            openingHours={visitInfo.openingHours}
            ticketPolicy={visitInfo.ticketPolicy}
            tickets={visitInfo.tickets}
          />
          <FacilitiesList items={facilities} />
        </div>
      </div>

      <SafetyTips safety={safety} tips={tips} />

      <FAQAccordion items={faq} />

      <MapCard src={contact.mapsEmbed} id="lokasi" />

      <CTAContact
        address={contact.address}
        email={contact.email}
        wa={contact.wa}
        socials={socialResmi}
      />
    </div>
  );
}
