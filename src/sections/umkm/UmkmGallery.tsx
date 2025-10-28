// src/sections/umkm/UmkmGallery.tsx
"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function UmkmGallery({
  title,
  images,
}: {
  title: string;
  images: string[];
}) {
  // --- Hooks harus selalu di top-level (tidak boleh dalam kondisi) ---
  const total = images.length;
  const [isOpen, setIsOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  // Amankan index
  const safeIdx = useMemo(
    () => (total === 0 ? 0 : Math.min(Math.max(activeIdx, 0), total - 1)),
    [activeIdx, total]
  );

  // Handler prev/next stabil
  const prev = useCallback(() => {
    if (total === 0) return;
    setActiveIdx((i) => (i - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    if (total === 0) return;
    setActiveIdx((i) => (i + 1) % total);
  }, [total]);

  // Keyboard nav hanya saat modal terbuka
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, prev, next]);

  if (total === 0) return null;

  const mainSrc = images[safeIdx];

  return (
    <section className="panel p-5">
      <h2 className="text-lg font-semibold text-slate-900">Galeri</h2>

      {/* Main Card (klik untuk buka lightbox) */}
      <div className="mt-3 overflow-hidden rounded-xl border">
        <button
          type="button"
          className="relative block w-full"
          style={{ aspectRatio: "16 / 9" }}
          onClick={() => setIsOpen(true)}
          aria-label="Buka pratinjau gambar"
        >
          <Image
            src={mainSrc}
            alt={`${title} - gambar ${safeIdx + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            // jika dari Supabase non-optimized
            unoptimized
          />
        </button>
      </div>

      {/* Thumbnails */}
      {total > 1 && (
        <div className="mt-3 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => {
                setActiveIdx(i);
                setIsOpen(true);
              }}
              className={[
                "relative rounded-lg overflow-hidden border",
                i === safeIdx ? "ring-2 ring-brand-400 border-brand-200" : "",
              ].join(" ")}
              style={{ aspectRatio: "4 / 3" }}
              aria-label={`Lihat gambar ${i + 1}`}
            >
              <Image
                src={src}
                alt={`Thumb ${i + 1}`}
                fill
                className="object-cover"
                sizes="160px"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-5xl"
            style={{ aspectRatio: "16 / 9" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gambar besar */}
            <Image
              src={mainSrc}
              alt={`${title} - gambar ${safeIdx + 1}`}
              fill
              className="object-contain bg-black"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
              unoptimized
            />

            {/* Tombol tutup */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 rounded-full bg-black/60 text-white text-xs px-2 py-1 hover:bg-black/80"
            >
              Tutup ✕
            </button>

            {/* Panah navigasi */}
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 text-white px-3 py-2 hover:bg-black/80 hidden xs:inline-flex"
                  aria-label="Sebelumnya"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 text-white px-3 py-2 hover:bg-black/80"
                  aria-label="Berikutnya"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
