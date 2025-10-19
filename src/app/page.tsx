import Link from "next/link";
import { Newspaper, Store, MapPin, Stethoscope, Phone } from "lucide-react";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* HERO */}
      <section className="py-10 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
          {/* Kolom teks */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-slate-900">
              Selamat datang di Website Desa Leilem
            </h1>
            <p className="mt-3 text-slate-600 max-w-prose">
              Dapatkan informasi profil desa, berita terbaru, pelaku UMKM,
              potensi wisata, layanan kesehatan, serta kontak dan layanan warga
              — dalam satu tempat.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/berita" className="btn btn-primary">
                Lihat Berita
              </Link>
              <Link href="/umkm" className="btn btn-ghost">
                Jelajahi UMKM
              </Link>
            </div>

            {/* teaser cards */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="panel p-4 transition-colors hover:bg-slate-50">
                <div className="text-sm text-slate-500">Fokus Layanan</div>
                <div className="font-semibold text-slate-900">
                  Warga & Wisata
                </div>
              </div>
              <div className="panel p-4 transition-colors hover:bg-slate-50">
                <div className="text-sm text-slate-500">Tema</div>
                <div className="font-semibold text-slate-900">Biru kalem</div>
              </div>
              <div className="panel p-4 sm:col-span-1 col-span-2 transition-colors hover:bg-slate-50">
                <div className="text-sm text-slate-500">Tip</div>
                <div className="font-semibold text-slate-900">
                  Gunakan menu atas untuk navigasi
                </div>
              </div>
            </div>
          </div>

          {/* Kartu fitur */}
          <div className="grid gap-4 sm:grid-cols-2 items-stretch">
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
        </div>
      </section>

      {/* TAUTAN CEPAT */}
      <section className="pb-14">
        <h2 className="text-xl font-semibold mb-3 text-slate-900">
          Tautan Cepat
        </h2>
        <div className="grid sm:grid-cols-3 gap-3 items-stretch">
          <QuickLink href="/profil" label="Profil Desa" />
          <QuickLink
            href="/kontak-layanan"
            label="Kontak & Layanan"
            Icon={Phone}
          />
          <QuickLink href="/wisata" label="Peta & Rekomendasi" Icon={MapPin} />
        </div>
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

/** Tautan cepat (lebih sederhana) */
function QuickLink({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon?: React.ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <Link
      href={href}
      className="panel h-full p-4 rounded-xl transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-300 flex items-center gap-3"
    >
      {Icon ? (
        <span className="rounded-md border border-slate-200 bg-slate-50 p-2">
          <Icon size={16} className="text-brand-700" />
        </span>
      ) : null}
      <span className="font-medium text-slate-900">{label}</span>
    </Link>
  );
}
