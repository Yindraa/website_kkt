// src/sections/profil/SectionProfil.tsx
import { MapPin, Users, Landmark, Flag } from "lucide-react";
import ProfileHero from "./components/ProfileHero";
import VisionMission from "./components/VisionMissions";
import DemografiStats from "./components/DemografisStats";
import StrukturGrid from "./components/StrukturGrid";
import MapCard from "./components/MapCard";
import GalleryStrip from "./components/GalleryStrip";
import ContactCard from "./components/ContactCard";
import type { Pejabat, Stat } from "./types";

export default function SectionProfil() {
  const struktur: Pejabat[] = [
    { jabatan: "Kepala Desa", nama: "Nama Kepala Desa" },
    { jabatan: "Sekretaris Desa", nama: "Nama Sekdes" },
    { jabatan: "Kaur Umum", nama: "Nama Kaur Umum" },
    { jabatan: "Kaur Keuangan", nama: "Nama Kaur Keuangan" },
    { jabatan: "Kasi Pemerintahan", nama: "Nama Kasi Pemerintahan" },
    { jabatan: "Kasi Pelayanan", nama: "Nama Kasi Pelayanan" },
  ];

  const demografi: Stat[] = [
    { label: "Penduduk", value: "3.214 jiwa", icon: Users },
    { label: "KK", value: "957 KK", icon: Landmark },
    { label: "Luas Wilayah", value: "12,4 km²", icon: MapPin },
    { label: "Dusun/Ling.", value: "5 wilayah", icon: Flag },
  ];

  const embedMaps =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1303.8635621484536!2d124.81195002921079!3d1.2627393957107094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32876a60d04e35c7%3A0xcab047abdbd09817!2sBalai%20Desa%20Leilem!5e0!3m2!1sid!2sid!4v1760853482637!5m2!1sid!2sid";

  const galeri = [
    "/images/profil/galeri-1.jpg",
    "/images/profil/galeri-2.jpg",
    "/images/profil/galeri-3.jpg",
    "/images/profil/galeri-4.jpg",
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <ProfileHero />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {/* Sejarah & Letak (ringkas) */}
        <section className="panel p-6">
          <h2 className="font-semibold text-slate-900">Sejarah Singkat</h2>
          <p className="mt-2 text-slate-600">
            Desa Leilem berdiri sejak … (ringkasan sejarah, tokoh pendiri, nilai
            budaya, perkembangan utama).
          </p>
        </section>
        <section className="panel p-6">
          <h2 className="font-semibold text-slate-900">Letak & Geografi</h2>
          <p className="mt-2 text-slate-600">
            Terletak di Kabupaten Minahasa, Sulawesi Utara. Batas wilayah,
            ketinggian, iklim, potensi lahan/komoditas, dan akses transportasi.
          </p>
        </section>
      </div>

      <div className="mt-4">
        <VisionMission />
      </div>

      <div className="mt-4">
        <StrukturGrid struktur={struktur} />
      </div>

      <div className="mt-4">
        <DemografiStats items={demografi} />
      </div>

      <div className="mt-4">
        <MapCard src={embedMaps} />
      </div>

      <div className="mt-4">
        <GalleryStrip images={galeri} />
      </div>

      <div className="mt-4">
        <ContactCard />
      </div>
    </div>
  );
}
