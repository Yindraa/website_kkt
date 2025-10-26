// src/sections/wisata/HeroPotensi.tsx
import Image from "next/image";
import Link from "next/link";

export default function HeroPotensi({
  title,
  tagline,
  image,
  ctaMaps,
  ctaWhatsApp,
}: {
  title: string;
  tagline: string;
  image: string;
  ctaMaps?: string;
  ctaWhatsApp?: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200">
      <div className="grid lg:grid-cols-2">
        {/* Teks */}
        <div className="p-6 lg:p-8 flex flex-col justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {title}
          </h1>
          <p className="mt-2 text-slate-600">{tagline}</p>
          <div className="mt-4 flex gap-3 flex-wrap">
            {ctaMaps && (
              <Link href={ctaMaps} className="btn btn-primary">
                Lihat Lokasi
              </Link>
            )}
            {ctaWhatsApp && (
              <Link
                href={ctaWhatsApp}
                target="_blank"
                rel="noopener"
                className="btn btn-ghost"
              >
                Hubungi via WhatsApp
              </Link>
            )}
          </div>
        </div>

        {/* Gambar (tidak terpotong) */}
        <div
          className="
            relative bg-slate-100
            min-h-64        /* tinggi minimum di mobile */
            lg:min-h-[420px] /* lebih lega di desktop */
            flex items-center justify-center
          "
        >
          <Image
            src={image}
            alt={title}
            fill
            // pakai contain supaya seluruh gambar selalu terlihat
            className="object-contain"
            // optimasi ukuran responsif
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
