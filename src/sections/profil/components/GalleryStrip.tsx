// src/sections/profil/components/GalleryStrip.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

export default function GalleryStrip({ images }: { images: string[] }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const openAt = (i: number) => {
    setIdx(i);
    setOpen(true);
  };

  const close = useCallback(() => setOpen(false), []);
  const prev = useCallback(
    () => setIdx((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setIdx((i) => (i + 1) % images.length),
    [images.length]
  );

  // Keyboard nav saat modal terbuka
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close, prev, next]);

  if (!images || images.length === 0) return null;

  return (
    <section className="panel p-5">
      <h2 className="text-lg font-semibold text-slate-900">
        Peta & Galeri Desa
      </h2>

      {/* Thumbnails */}
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            className="group relative aspect-[4/3] overflow-hidden rounded-lg border"
            onClick={() => openAt(i)}
            aria-label={`Lihat gambar ${i + 1}`}
          >
            <Image
              src={src}
              alt={`Galeri ${i + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              unoptimized
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
            />
            <span className="pointer-events-none absolute inset-0 ring-0 group-hover:ring-2 ring-brand-400/70 rounded-lg" />
          </button>
        ))}
      </div>

      {/* Lightbox / Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
          onClick={close}
          aria-modal="true"
          role="dialog"
        >
          {/* Kontainer gambar (klik di sini tidak menutup) */}
          <div
            className="absolute inset-0 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol close */}
            <button
              className="absolute top-4 right-4 rounded-full bg-white/90 hover:bg-white p-2 text-slate-900 shadow"
              onClick={close}
              aria-label="Tutup"
            >
              ✕
            </button>

            {/* Tombol prev/next */}
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white p-2 text-slate-900 shadow"
                  onClick={prev}
                  aria-label="Sebelumnya"
                >
                  ‹
                </button>
                <button
                  className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white p-2 text-slate-900 shadow"
                  onClick={next}
                  aria-label="Berikutnya"
                >
                  ›
                </button>
              </>
            )}

            {/* Gambar besar: object-contain supaya tidak terpotong */}
            <div className="relative w-full max-w-5xl h-[70vh] md:h-[80vh]">
              <Image
                key={images[idx]} // force re-render untuk reset loading
                src={images[idx]}
                alt={`Galeri besar ${idx + 1}`}
                fill
                className="object-contain"
                unoptimized
                sizes="100vw"
                priority
              />
            </div>

            {/* Indikator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/80">
              {idx + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
