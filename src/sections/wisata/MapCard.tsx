// src/sections/wisata/MapCard.tsx

export default function MapCard({ src, id }: { src: string; id?: string }) {
  return (
    <section className="panel p-3" id={id}>
      <div className="relative w-full overflow-hidden rounded-lg border">
        <iframe
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[420px]"
          allowFullScreen
        />
      </div>
    </section>
  );
}
