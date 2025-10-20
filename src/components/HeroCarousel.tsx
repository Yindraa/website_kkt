"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, A11y } from "swiper/modules";

// CSS Swiper cukup diimport di komponen client ini (tidak mengganggu SSR)
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type Slide = {
  src: string;
  title: string;
  subtitle?: string;
  cta?: { href: string; label: string };
};

const slides: Slide[] = [
  {
    src: "/images/hero-1.jpg",
    title: "Selamat Datang di Desa Leilem",
    subtitle: "Informasi resmi pemerintahan, layanan warga, dan wisata.",
    cta: { href: "/profil", label: "Lihat Profil" },
  },
  {
    src: "/images/hero-2.jpg",
    title: "UMKM Desa",
    subtitle: "Produk lokal berkualitas dari pelaku usaha desa.",
    cta: { href: "/umkm", label: "Jelajahi UMKM" },
  },
  {
    src: "/images/hero-3.jpg",
    title: "Potensi Wisata",
    subtitle: "Temukan destinasi menarik di sekitar Desa Leilem.",
    cta: { href: "/wisata", label: "Lihat Wisata" },
  },
];

export default function HeroCarousel() {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-soft">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, A11y]}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        a11y={{
          prevSlideMessage: "Sebelumnya",
          nextSlideMessage: "Berikutnya",
        }}
        className="h-[52vw] sm:h-[42vw] md:h-[360px] lg:h-[420px] xl:h-[460px]"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-full w-full">
              <Image
                src={s.src}
                alt={s.title}
                fill
                priority={i === 0}
                sizes="(min-width:1280px) 1024px, (min-width:1024px) 900px, (min-width:768px) 720px, 100vw"
                quality={85}
                className="object-cover"
              />
              {/* Overlay gradient agar teks terbaca */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/5" />
              {/* Caption */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <div className="max-w-4xl">
                  <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold drop-shadow">
                    {s.title}
                  </h2>
                  {s.subtitle ? (
                    <p className="mt-1 text-white/90 drop-shadow-sm">
                      {s.subtitle}
                    </p>
                  ) : null}
                  {s.cta ? (
                    <div className="mt-3">
                      <Link href={s.cta.href} className="btn btn-primary">
                        {s.cta.label}
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
