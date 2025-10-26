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

// jika perlu: export metadata untuk SEO

export default function WisataPage() {
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
      />
    </div>
  );
}
