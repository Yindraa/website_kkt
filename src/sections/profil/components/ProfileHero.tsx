// src/sections/profil/components/ProfileHero.tsx
import Image from "next/image";
import Link from "next/link";

type Props = {
  /** 'contain' = gambar utuh (tidak terpotong), 'cover' = penuh (mungkin terpotong) */
  fit?: "contain" | "cover";
  /** Tinggi kartu di berbagai breakpoint (opsional) */
  heights?: {
    base?: string; // default: h-[300px]
    sm?: string; // default: sm:h-[380px]
    md?: string; // default: md:h-[440px]
    lg?: string; // default: lg:h-[520px]
  };
};

export default function ProfileHero({
  fit = "contain",
  heights = {
    base: "h-[300px]",
    sm: "sm:h-[380px]",
    md: "md:h-[440px]",
    lg: "lg:h-[520px]",
  },
}: Props) {
  // kelas object-fit
  const fitClass = fit === "contain" ? "object-contain" : "object-cover";

  return (
    <section className="relative overflow-hidden rounded-2xl">
      {/* background netral agar letterbox dari contain terlihat rapi */}
      <div
        className={`relative ${heights.base} ${heights.sm} ${heights.md} ${heights.lg} bg-slate-100`}
      >
        <Image
          src="/images/profil/hero.jpg"
          alt="Panorama Desa Leilem"
          fill
          priority
          className={`${fitClass} select-none`}
          // ukuran realistis sesuai container (max-w-6xl ≈ 1152px)
          sizes="(min-width:1280px) 1152px, (min-width:1024px) 1024px, (min-width:768px) 768px, 100vw"
          quality={90}
        />

        {/* Overlay gradasi untuk keterbacaan teks (tidak mengganggu gambar walau contain) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
          <h1 className="text-white text-2xl sm:text-3xl font-bold drop-shadow">
            Profil Desa Leilem
          </h1>
          <p className="text-white/90 max-w-prose">
            Sejarah, visi-misi, pemerintahan, demografi, dan lokasi resmi desa.
          </p>
          <div className="mt-3">
            <Link href="/kontak-layanan" className="btn btn-primary">
              Ajukan Layanan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
