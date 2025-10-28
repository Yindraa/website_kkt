// src/app/(public)/kesehatan/page.tsx
import KesehatanHero from "@/sections/kesehatan/KesehatanHero";
import LayananList from "@/sections/kesehatan/LayananList";
import ScheduleBanner from "@/sections/kesehatan/ScheduleBanner";
import FAQKesehatan from "@/sections/kesehatan/FAQKesehatan";
import CTAKontak from "@/sections/kesehatan/CTAKontak";

export const metadata = {
  title: "Layanan Kesehatan Desa Leilem",
  description:
    "Informasi Posyandu & Posyandu Lansia: kegiatan, jadwal, dan pelaksana layanan kesehatan yang dibina Puskesmas Sonder.",
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

  return (
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
        // kamu bisa arahkan ke berita pengumuman jadwal atau halaman lain
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
      <FAQKesehatan className="" items={FAQS} />

      {/* CTA kontak – nomor WA & link bisa kamu bedakan per halaman */}
      <CTAKontak
        className="mt-2"
        note="Butuh konfirmasi jadwal bulan berjalan atau ada pertanyaan?"
        waHref="https://wa.me/6285174331388" // ganti nomor WA khusus halaman Kesehatan di sini
        altLinkHref="/kontak-layanan" // arahkan ke halaman Kontak & Layanan
      />
    </article>
  );
}
