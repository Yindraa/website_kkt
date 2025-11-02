// src/app/(public)/kesehatan/page.tsx
import type { Metadata } from "next";
import KesehatanHero from "@/sections/kesehatan/KesehatanHero";
import LayananList from "@/sections/kesehatan/LayananList";
import ScheduleBanner from "@/sections/kesehatan/ScheduleBanner";
import FAQKesehatan from "@/sections/kesehatan/FAQKesehatan";
import CTAKontak from "@/sections/kesehatan/CTAKontak";

const BASE_URL = "https://website-desa-leilem.vercel.app";

export const metadata: Metadata = {
  title: "Layanan Kesehatan Desa Leilem",
  description:
    "Informasi Posyandu & Posyandu Lansia Desa Leilem: kegiatan bulanan, pelaksana dari Puskesmas Sonder, serta kontak konfirmasi jadwal.",
  alternates: {
    canonical: `${BASE_URL}/kesehatan`,
  },
  openGraph: {
    title: "Layanan Kesehatan Desa Leilem",
    description:
      "Kegiatan kesehatan terjadwal, dilayani kader desa dan dibina Puskesmas Sonder.",
    url: `${BASE_URL}/kesehatan`,
    siteName: "Pemerintah Desa Leilem",
    locale: "id_ID",
    type: "article",
  },
};

export default function KesehatanPage() {
  // --- Sumber data statis dari brief ---
  const FASILITAS = ["Posyandu", "Posyandu Lansia"];

  const POSYANDU = {
    title: "Posyandu",
    peserta: "Balita, ibu hamil, ibu menyusui",
    kegiatan: [
      "Penimbangan berat badan anak",
      "Pemberian vitamin",
      "Imunisasi (penyuntikan)",
      "Pemberian makanan tambahan",
    ],
    pelaksana: "Kader Posyandu & petugas Puskesmas Sonder",
  };

  const POSYANDU_LANSIA = {
    title: "Posyandu Lansia",
    peserta: "Warga lanjut usia",
    kegiatan: [
      "Pemeriksaan tekanan darah (tensi)",
      "Pemeriksaan kadar gula darah",
      "Pemeriksaan kolesterol dan asam urat",
      "Pemberian susu bagi lansia",
    ],
    pelaksana: "Kader & tenaga kesehatan Puskesmas Sonder",
  };

  const JADWAL = {
    frekuensi: "Setiap bulan",
    catatan:
      "Tidak terdapat fasilitas kesehatan tetap (Pustu/Polindes) di desa. Seluruh kegiatan terjadwal setiap bulan dan dibina oleh Puskesmas Sonder.",
  };

  const FAQS = [
    {
      q: "Apakah layanan memerlukan biaya?",
      a: "Sebagian besar layanan Posyandu bersifat program dan gratis. Jika ada kebutuhan khusus (mis. pemeriksaan lanjutan), akan diarahkan oleh petugas.",
    },
    {
      q: "Dokumen apa yang dibawa saat Posyandu?",
      a: "Bawa buku KIA/KMS (jika ada), kartu identitas, serta perlengkapan anak yang diperlukan.",
    },
    {
      q: "Apakah jadwal selalu di tanggal yang sama setiap bulan?",
      a: "Tanggal dapat menyesuaikan kebijakan Puskesmas & ketersediaan kader. Pantau pengumuman di kantor desa atau kanal informasi desa.",
    },
  ];

  // JSON-LD: ini bukan puskesmas, jadi kita deklarasi sebagai "MedicalOrganization"
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: "Layanan Kesehatan Desa Leilem",
    description:
      "Posyandu dan Posyandu Lansia yang dibina oleh Puskesmas Sonder dan diselenggarakan pemerintah Desa Leilem.",
    url: `${BASE_URL}/kesehatan`,
    parentOrganization: {
      "@type": "GovernmentOffice",
      name: "Pemerintah Desa Leilem",
      url: `${BASE_URL}`,
    },
    areaServed: "Desa Leilem, Kec. Sonder, Kab. Minahasa",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+62-851-7433-1388",
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
      <article className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        <KesehatanHero
          title="Sistem Layanan Kesehatan Desa Leilem"
          subtitle="Kegiatan kesehatan dilaksanakan secara terjadwal setiap bulan dan dibina oleh Puskesmas Sonder."
        />

        {/* Highlight jadwal + info tidak ada fasilitas tetap */}
        <ScheduleBanner
          title="Jadwal Kegiatan Kesehatan"
          note={`Kegiatan kesehatan dilaksanakan ${JADWAL.frekuensi.toLowerCase()} dan dibina oleh Puskesmas Sonder.`}
          noFacilityNote="Tidak terdapat fasilitas kesehatan tetap di desa (seperti Pustu/Polindes)."
          ctaText="Lihat pengumuman jadwal terbaru"
          ctaHref="/berita?q=jadwal%20kesehatan"
        />

        {/* Fasilitas yang tersedia */}
        <section className="panel p-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Fasilitas Kesehatan yang Tersedia
          </h2>
          <p className="mt-1 text-slate-600">
            Jenis layanan yang tersedia di Desa Leilem:
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {FASILITAS.map((f) => (
              <li
                key={f}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
              >
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* Daftar layanan (Posyandu & Posyandu Lansia) */}
        <LayananList items={[POSYANDU, POSYANDU_LANSIA]} className="mt-0" />

        {/* FAQ */}
        <FAQKesehatan items={FAQS} />

        {/* CTA kontak */}
        <CTAKontak
          className="mt-2"
          note="Butuh konfirmasi jadwal bulan berjalan atau ada pertanyaan?"
          waHref="https://wa.me/6285174331388"
          altLinkHref="/kontak-layanan"
        />
      </article>
    </>
  );
}
