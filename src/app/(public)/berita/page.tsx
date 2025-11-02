// src/app/(public)/berita/page.tsx
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { BeritaTipe } from "@prisma/client";

export const dynamic = "force-dynamic";

// ganti kalau nanti domainnya custom
const BASE_URL = "https://website-desa-leilem.vercel.app";

export const metadata: Metadata = {
  title: "Berita Desa Leilem",
  description:
    "Kumpulan berita, pengumuman kegiatan, dan event terbaru di Desa Leilem, Kecamatan Sonder, Kabupaten Minahasa.",
  alternates: {
    canonical: `${BASE_URL}/berita`,
  },
  openGraph: {
    title: "Berita & Informasi Desa Leilem",
    description:
      "Berita resmi, pengumuman kegiatan, dan event terdekat yang dikeluarkan Pemerintah Desa Leilem.",
    url: `${BASE_URL}/berita`,
    siteName: "Pemerintah Desa Leilem",
    locale: "id_ID",
    type: "website",
  },
};

type SP = { page?: string; type?: "ALL" | "ARTIKEL" | "EVENT" };

function getDomain(url?: string | null): string | null {
  try {
    if (!url) return null;
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

// Format tanggal untuk kartu
function fmtDateRange(mulai?: Date | null, selesai?: Date | null): string {
  if (!mulai && !selesai) return "—";
  if (mulai && selesai) {
    return `${mulai.toLocaleDateString("id-ID")} – ${selesai.toLocaleDateString(
      "id-ID"
    )}`;
  }
  return (mulai ?? selesai)!.toLocaleDateString("id-ID");
}

export default async function BeritaListPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const pageNum = Math.max(1, Number(sp.page || "1") || 1);
  const type = (sp.type || "ALL") as SP["type"];

  const take = 9;
  const skip = (pageNum - 1) * take;

  // Map tab → enum tipe BARU
  let tipeFilter: BeritaTipe | undefined;
  if (type === "ARTIKEL") tipeFilter = BeritaTipe.ARTIKEL;
  else if (type === "EVENT") tipeFilter = BeritaTipe.EVENT;

  const where = {
    isDraft: false,
    ...(tipeFilter ? { tipe: tipeFilter } : {}),
  } as const;

  const [rows, total] = await Promise.all([
    prisma.berita.findMany({
      where,
      orderBy: [{ tanggalPublish: "desc" }, { id: "desc" }],
      skip,
      take,
      select: {
        id: true,
        judul: true,
        slug: true,
        gambarUtama: true,
        tanggalPublish: true,
        sumberEksternal: true,
        konten: true,
        tipe: true, // ARTIKEL / EVENT
        tanggalEventMulai: true,
        tanggalEventSelesai: true,
        lokasi: true,
      },
    }),
    prisma.berita.count({ where }),
  ]);

  const hasPrev = pageNum > 1;
  const hasNext = skip + rows.length < total;

  const tabs: { key: SP["type"]; label: string }[] = [
    { key: "ALL", label: "Semua" },
    { key: "ARTIKEL", label: "Artikel" },
    { key: "EVENT", label: "Event" },
  ];

  // JSON-LD: daftar berita yang tampil di halaman ini
  const jsonLd =
    rows.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Berita Desa Leilem",
          itemListOrder: "https://schema.org/ItemListOrderDescending",
          numberOfItems: rows.length,
          itemListElement: rows.map((b, idx) => ({
            "@type": "NewsArticle",
            position: idx + 1,
            url: `${BASE_URL}/berita/${b.slug}`,
            headline: b.judul,
            datePublished: b.tanggalPublish
              ? b.tanggalPublish.toISOString()
              : undefined,
            image: b.gambarUtama ? [b.gambarUtama] : undefined,
            articleSection: b.tipe === "EVENT" ? "Event" : "Berita",
            author: {
              "@type": "Organization",
              name: "Pemerintah Desa Leilem",
            },
            publisher: {
              "@type": "Organization",
              name: "Pemerintah Desa Leilem",
            },
          })),
        }
      : null;

  return (
    <>
      {jsonLd ? (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}

      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Berita & Informasi Kegiatan
          </h1>
          <p className="text-slate-600">
            Kumpulan ringkasan berita desa serta informasi event terdekat.
          </p>
        </header>

        {/* Filter tabs */}
        <div className="mb-4 flex items-center gap-2 overflow-x-auto">
          {tabs.map((t) => (
            <Link
              key={t.key}
              href={`/berita?type=${t.key}`}
              className={[
                "rounded-lg border px-3 py-1.5 text-sm whitespace-nowrap",
                type === t.key
                  ? "border-brand-200 bg-brand-50 text-brand-700"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
              ].join(" ")}
            >
              {t.label}
            </Link>
          ))}
        </div>

        {rows.length === 0 ? (
          <p className="text-slate-500">Belum ada entri.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rows.map((b) => {
              const domain = getDomain(b.sumberEksternal);
              const raw = (b.konten || "").replace(/\s+/g, " ").trim();
              const preview = raw.length > 160 ? raw.slice(0, 160) + "…" : raw;

              const isEvent = b.tipe === BeritaTipe.EVENT;
              const whenText = isEvent
                ? fmtDateRange(b.tanggalEventMulai, b.tanggalEventSelesai)
                : new Date(b.tanggalPublish).toLocaleDateString("id-ID");

              return (
                <article
                  key={b.id}
                  className="panel overflow-hidden flex flex-col"
                >
                  {b.gambarUtama ? (
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={b.gambarUtama}
                        alt={b.judul}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      {/* Badge jenis konten */}
                      <span className="absolute left-2 top-2 rounded bg-black/70 px-2 py-0.5 text-xs font-medium text-white">
                        {isEvent ? "Event" : "Artikel"}
                      </span>
                    </div>
                  ) : (
                    <div className="px-4 pt-3">
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                        {isEvent ? "Event" : "Artikel"}
                      </span>
                    </div>
                  )}

                  <div className="p-4 flex-1 flex flex-col">
                    <div className="text-xs text-slate-500">
                      {whenText}
                      {isEvent && b.lokasi ? ` • ${b.lokasi}` : ""}
                      {domain ? ` • ${domain}` : ""}
                    </div>

                    <h2 className="mt-1 font-semibold text-slate-900 line-clamp-2">
                      <Link href={`/berita/${b.slug}`}>{b.judul}</Link>
                    </h2>

                    {isEvent && (
                      <div className="mt-1 text-xs font-medium text-brand-700">
                        Jadwal: {whenText}
                      </div>
                    )}

                    {preview ? (
                      <p className="mt-2 text-sm text-slate-700 line-clamp-3">
                        {preview}
                      </p>
                    ) : null}

                    <div className="mt-3 flex items-center gap-2">
                      <Link
                        href={`/berita/${b.slug}`}
                        className="btn btn-ghost"
                      >
                        Baca ringkas →
                      </Link>
                      {b.sumberEksternal ? (
                        <Link
                          href={b.sumberEksternal}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-ghost"
                        >
                          Sumber
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {hasPrev ? (
            <Link
              href={`/berita?page=${pageNum - 1}&type=${type}`}
              className="btn btn-ghost"
            >
              ← Sebelumnya
            </Link>
          ) : (
            <span className="btn btn-ghost pointer-events-none opacity-50">
              ← Sebelumnya
            </span>
          )}
          <span className="text-sm text-slate-600">Halaman {pageNum}</span>
          {hasNext ? (
            <Link
              href={`/berita?page=${pageNum + 1}&type=${type}`}
              className="btn btn-ghost"
            >
              Selanjutnya →
            </Link>
          ) : (
            <span className="btn btn-ghost pointer-events-none opacity-50">
              Selanjutnya →
            </span>
          )}
        </div>
      </div>
    </>
  );
}
