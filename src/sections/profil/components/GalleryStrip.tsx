// src/sections/profil/components/GalleryStrip.tsx
import Image from "next/image";

export default function GalleryStrip({ images }: { images: string[] }) {
  if (!images.length) return null;
  return (
    <section className="panel p-4">
      <h2 className="font-semibold text-slate-900 mb-3">Galeri Desa</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((src, i) => (
          <div
            key={i}
            className="relative aspect-[4/3] overflow-hidden rounded-lg border border-slate-200"
          >
            <Image
              src={src}
              alt={`Galeri ${i + 1}`}
              fill
              sizes="33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
