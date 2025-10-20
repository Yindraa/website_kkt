// src/sections/profil/components/MapCard.tsx
export default function MapCard({ src }: { src: string }) {
  return (
    <section className="panel p-0 overflow-hidden">
      <div className="p-6">
        <h2 className="font-semibold text-slate-900">Lokasi Desa</h2>
        <p className="mt-2 text-slate-600">
          Kantor Desa Leilem, Minahasa, Sulawesi Utara.
        </p>
      </div>
      <div className="aspect-[16/9] w-full">
        <iframe
          title="Peta Desa Leilem"
          src={src}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
