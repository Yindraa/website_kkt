import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

// Coba konversi link apa pun menjadi URL embed yang aman untuk <iframe>
function toEmbedUrl(raw?: string | null): string | null {
  if (!raw) return null;

  try {
    const u = new URL(raw);

    // Sudah berupa embed
    if (
      u.hostname === "www.google.com" &&
      u.pathname.startsWith("/maps/embed")
    ) {
      return u.toString();
    }

    // Jika ada koordinat di link (lat,lng), buat embed dengan loc:
    // Contoh tangkap "…@-6.2,106.8," atau "loc:-6.2,106.8"
    const coordMatch =
      raw.match(/@(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)/) ||
      raw.match(/loc[:=]\s*(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)/i);
    if (coordMatch) {
      const lat = coordMatch[1];
      const lng = coordMatch[3];
      return `https://www.google.com/maps?q=loc:${lat},${lng}&z=15&output=embed`;
    }

    // Fallback umum: pakai query q=<alamat/link> + output=embed
    // (Google akan render hasil pencarian di embed)
    return `https://www.google.com/maps?q=${encodeURIComponent(
      raw
    )}&output=embed`;
  } catch {
    return null;
  }
}

export const dynamic = "force-dynamic";

export default async function UmkmDetailPage({
  params,
}: {
  // Next 15: params adalah Promise
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isFinite(numId) || numId <= 0) notFound();

  const data = await prisma.umkm.findUnique({
    where: { id: numId },
    select: {
      id: true,
      nama: true,
      deskripsi: true,
      alamat: true,
      kontak: true,
      gmapsLink: true,
      gambar: true,
      kategori: { select: { nama: true } },
    },
  });

  if (!data) notFound();

  const embedUrl = toEmbedUrl(data.gmapsLink);

  return (
    <article className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {data.nama}
        </h1>
        <p className="mt-1 text-slate-600 text-sm">
          {data.kategori?.nama ?? "-"}
        </p>
      </header>

      {/* Galeri sederhana */}
      {data.gambar && data.gambar.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          {data.gambar.map((src, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] overflow-hidden rounded-lg border"
            >
              <Image
                src={src}
                alt={`${data.nama} ${i + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      ) : null}

      {/* Info ringkas */}
      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <div className="panel p-4">
          <h2 className="font-semibold text-slate-900">Informasi</h2>
          <dl className="mt-2 text-sm">
            <dt className="text-slate-500">Alamat</dt>
            <dd className="mb-2">{data.alamat || "-"}</dd>
            <dt className="text-slate-500">Kontak</dt>
            <dd className="mb-2">{data.kontak || "-"}</dd>
          </dl>
        </div>

        <div className="panel p-4">
          <h2 className="font-semibold text-slate-900">Lokasi</h2>
          {embedUrl ? (
            <div className="mt-2 rounded-lg overflow-hidden border">
              <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                <iframe
                  src={embedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full"
                  allowFullScreen
                />
              </div>
            </div>
          ) : data.gmapsLink ? (
            <div className="mt-2">
              <p className="text-sm text-slate-600 mb-2">
                Peta tidak bisa disematkan. Buka langsung di Google Maps:
              </p>
              <a
                href={data.gmapsLink}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                Buka di Google Maps →
              </a>
            </div>
          ) : (
            <p className="mt-2 text-sm text-slate-500">Lokasi belum diisi.</p>
          )}
        </div>
      </div>

      {/* Deskripsi */}
      {data.deskripsi ? (
        <div className="panel p-4">
          <h2 className="font-semibold text-slate-900">Deskripsi</h2>
          <p className="mt-2 whitespace-pre-wrap text-slate-700">
            {data.deskripsi}
          </p>
        </div>
      ) : null}

      <div className="mt-6">
        <Link href="/umkm" className="btn btn-ghost">
          ← Kembali ke daftar UMKM
        </Link>
      </div>
    </article>
  );
}
