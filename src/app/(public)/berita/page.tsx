// src/app/(public)/berita/page.tsx
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type SP = { page?: string };

function getDomain(url?: string | null): string | null {
  try {
    if (!url) return null;
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export default async function BeritaListPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const { page = "1" } = await searchParams;
  const pageNum = Math.max(1, Number(page) || 1);
  const take = 9;
  const skip = (pageNum - 1) * take;

  const [rows, total] = await Promise.all([
    prisma.berita.findMany({
      where: { isDraft: false },
      orderBy: { tanggalPublish: "desc" },
      skip,
      take,
      select: {
        id: true,
        judul: true,
        slug: true,
        gambarUtama: true,
        tanggalPublish: true,
        sumberEksternal: true,
        // gunakan kolom konten sbg ringkasan singkat (max 300-400 karakter)
        konten: true,
      },
    }),
    prisma.berita.count({ where: { isDraft: false } }),
  ]);

  const hasPrev = pageNum > 1;
  const hasNext = skip + rows.length < total;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Berita Desa
        </h1>
        <p className="text-slate-600">
          Kumpulan ringkasan berita dari sumber tepercaya.
        </p>
      </header>

      {rows.length === 0 ? (
        <p className="text-slate-500">Belum ada berita.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((b) => {
            const domain = getDomain(b.sumberEksternal);
            const preview =
              (b.konten || "").replace(/\s+/g, " ").trim().slice(0, 220) +
              (b.konten && b.konten.length > 220 ? "…" : "");

            return (
              <article key={b.id} className="panel overflow-hidden">
                {b.gambarUtama ? (
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={b.gambarUtama}
                      alt={b.judul}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ) : null}

                <div className="p-4">
                  <div className="text-xs text-slate-500">
                    {new Date(b.tanggalPublish).toLocaleDateString("id-ID")}
                    {domain ? ` • ${domain}` : ""}
                  </div>

                  <h2 className="mt-1 font-semibold text-slate-900 line-clamp-2">
                    <Link href={`/berita/${b.slug}`}>{b.judul}</Link>
                  </h2>

                  {preview ? (
                    <p className="mt-2 text-sm text-slate-700 line-clamp-3">
                      {preview}
                    </p>
                  ) : null}

                  <div className="mt-3 flex items-center gap-2">
                    <Link href={`/berita/${b.slug}`} className="btn btn-ghost">
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
          <Link href={`/berita?page=${pageNum - 1}`} className="btn btn-ghost">
            ← Sebelumnya
          </Link>
        ) : (
          <span className="btn btn-ghost pointer-events-none opacity-50">
            ← Sebelumnya
          </span>
        )}
        <span className="text-sm text-slate-600">Halaman {pageNum}</span>
        {hasNext ? (
          <Link href={`/berita?page=${pageNum + 1}`} className="btn btn-ghost">
            Selanjutnya →
          </Link>
        ) : (
          <span className="btn btn-ghost pointer-events-none opacity-50">
            Selanjutnya →
          </span>
        )}
      </div>
    </div>
  );
}
