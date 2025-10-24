import Link from "next/link";
import Image from "next/image";

export default function UmkmCard({
  id,
  nama,
  kategoriNama,
  deskripsi,
  gambar,
}: {
  id: number;
  nama: string;
  kategoriNama?: string | null;
  deskripsi?: string | null;
  gambar?: string[] | null;
}) {
  const cover = gambar?.[0] ?? null;

  // ringkas deskripsi
  const short =
    (deskripsi?.trim() || "").length > 0
      ? deskripsi!.length > 120
        ? deskripsi!.slice(0, 120) + "…"
        : deskripsi!
      : null;

  return (
    <article className="group panel p-0 overflow-hidden hover:shadow-md transition">
      <div className="relative aspect-[4/3] bg-slate-100">
        {cover ? (
          <Image
            src={cover}
            alt={nama}
            fill
            className="object-cover"
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : null}
      </div>

      <div className="p-4">
        {kategoriNama ? (
          <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            {kategoriNama}
          </span>
        ) : null}

        <h3 className="mt-2 font-semibold text-slate-900 group-hover:underline">
          <Link href={`/umkm/${id}`}>{nama}</Link>
        </h3>

        {short ? (
          <p className="mt-1 text-sm text-slate-600 line-clamp-2">{short}</p>
        ) : null}

        <div className="mt-3">
          <Link href={`/umkm/${id}`} className="btn btn-ghost">
            Lihat profil →
          </Link>
        </div>
      </div>
    </article>
  );
}
