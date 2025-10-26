// src/sections/wisata/GalleryLightbox.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default function GalleryLightbox({ images }: { images: string[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const total = images.length;
  const hasImages = total > 0;

  const currentSrc = useMemo(
    () => (openIdx !== null && hasImages ? images[openIdx] : null),
    [openIdx, hasImages, images]
  );

  // Lock scroll saat modal terbuka
  useEffect(() => {
    if (openIdx === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openIdx]);

  // Keyboard nav
  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
      if (e.key === "ArrowRight")
        setOpenIdx((i) => (i === null ? 0 : (i + 1) % total));
      if (e.key === "ArrowLeft")
        setOpenIdx((i) => (i === null ? 0 : (i - 1 + total) % total));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIdx, total]);

  const next = () => setOpenIdx((i) => (i === null ? 0 : (i + 1) % total));
  const prev = () =>
    setOpenIdx((i) => (i === null ? 0 : (i - 1 + total) % total));

  return (
    <section className="panel p-5">
      <h2 className="text-lg font-semibold text-slate-900">Galeri</h2>

      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            className="relative aspect-[4/3] overflow-hidden rounded-lg border"
            onClick={() => setOpenIdx(i)}
            aria-label={`Lihat gambar ${i + 1}`}
          >
            <Image
              src={src}
              alt={`Galeri ${i + 1}`}
              fill
              className="object-cover"
              unoptimized
            />
          </button>
        ))}
      </div>

      {openIdx !== null && currentSrc && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-[2px] p-3 sm:p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpenIdx(null)}
        >
          {/* Tutup */}
          <button
            onClick={() => setOpenIdx(null)}
            className="fixed top-[max(env(safe-area-inset-top),0.75rem)] right-[max(env(safe-area-inset-right),0.75rem)] rounded-md bg-black/60 text-white text-xs px-2 py-1 hover:bg-black/70 z-[110] shadow"
            aria-label="Tutup"
          >
            Tutup
          </button>

          {/* Indikator index */}
          <div className="fixed top-[max(env(safe-area-inset-top),0.75rem)] left-[max(env(safe-area-inset-left),0.75rem)] text-xs px-2 py-1 rounded-md bg-black/60 text-white z-[110]">
            {openIdx + 1} / {total}
          </div>

          {/* Frame gambar */}
          <div
            className="mx-auto w-full max-w-6xl h-[70vh] md:h-[80vh] flex items-center justify-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev */}
            {total > 1 && (
              <button
                onClick={prev}
                className="absolute left-[max(env(safe-area-inset-left),0.5rem)] sm:left-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/60 hover:bg-black/70 text-white h-11 w-11 grid place-items-center shadow-lg"
                aria-label="Sebelumnya"
              >
                ‹
              </button>
            )}

            {/* Gambar */}
            <div className="relative h-full w-full">
              <Image
                src={currentSrc}
                alt={`Preview ${openIdx + 1}`}
                fill
                className="object-contain select-none"
                priority
                sizes="90vw"
                unoptimized
                onClick={next} // klik gambar = next
              />
            </div>

            {/* Next */}
            {total > 1 && (
              <button
                onClick={next}
                className="absolute right-[max(env(safe-area-inset-right),0.5rem)] sm:right-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/60 hover:bg-black/70 text-white h-11 w-11 grid place-items-center shadow-lg"
                aria-label="Berikutnya"
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
