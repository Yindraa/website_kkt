// src/app/page.tsx
import Link from "next/link";
import { Newspaper, Store, MapPin, Stethoscope } from "lucide-react";
import HeroCarousel from "@/components/HeroCarousel";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* HERO (carousel) */}
      <section className="pt-8 sm:pt-10">
        <HeroCarousel />
      </section>

      {/* FEATURE CARDS */}
      <section className="py-8 sm:py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          <FeatureCard
            href="/berita"
            title="Berita Desa"
            desc="Update kegiatan & pengumuman"
            Icon={Newspaper}
          />
          <FeatureCard
            href="/umkm"
            title="UMKM"
            desc="Produk & jasa pelaku usaha lokal"
            Icon={Store}
          />
          <FeatureCard
            href="/wisata"
            title="Potensi Wisata"
            desc="Destinasi menarik di sekitar desa"
            Icon={MapPin}
          />
          <FeatureCard
            href="/kesehatan"
            title="Layanan Kesehatan"
            desc="Puskesmas, klinik, jadwal, kontak"
            Icon={Stethoscope}
          />
        </div>
      </section>

      {/* INFO CEPAT (sederhana) */}
      <section className="pb-12">
        <article className="panel p-5">
          <h2 className="text-lg font-semibold text-slate-900">Info Cepat</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            <div>
              <div className="text-sm text-slate-500">Jam Layanan</div>
              <div className="mt-1 text-slate-900">
                Senin–Jumat, 08.00–15.00
              </div>
              <div className="text-sm text-slate-600">
                Istirahat 12.00–13.00
              </div>
            </div>
            <div>
              <div className="text-sm text-slate-500">Kontak</div>
              <div className="mt-1 text-slate-900">08xx-xxxx-xxxx</div>
              <div className="text-sm text-slate-600">
                desa.leilem@example.go.id
              </div>
            </div>
            <div>
              <div className="text-sm text-slate-500">Lokasi</div>
              <div className="mt-1 text-slate-900">Desa Leilem, Minahasa</div>
              <Link href="/profil" className="uline text-sm">
                Lihat peta & profil →
              </Link>
            </div>
          </div>

          {/* CTA tunggal agar tidak terasa “tombol navigasi” berlebihan */}
          <div className="mt-4">
            <Link href="/kontak-layanan" className="btn btn-primary">
              Ajukan Layanan / Kirim Pesan
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}

/** Kartu fitur kecil (putih, border tipis) */
function FeatureCard({
  href,
  title,
  desc,
  Icon,
}: {
  href: string;
  title: string;
  desc: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <Link
      href={href}
      className="panel h-full group p-4 rounded-xl transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-300"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
          <Icon size={18} className="text-brand-700" />
        </div>
        <div className="font-semibold text-slate-900">{title}</div>
      </div>
      <p className="mt-2 text-sm text-slate-600">{desc}</p>
      <div className="mt-3 text-sm underline underline-offset-4 decoration-slate-300 group-hover:decoration-slate-500">
        Selengkapnya
      </div>
    </Link>
  );
}
