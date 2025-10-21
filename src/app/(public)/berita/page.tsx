// src/app/(public)/berita/page.tsx
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

type SP = { q?: string; page?: string };

export default async function BeritaListPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;

  const q = (sp.q ?? "").trim();
  const pageRaw = parseInt(sp.page ?? "1", 10);
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;

  const take = 8;
  const skip = (page - 1) * take;

  const where: Prisma.BeritaWhereInput = q
    ? {
        AND: [
          { isDraft: false },
          {
            OR: [
              { judul: { contains: q, mode: "insensitive" } },
              { konten: { contains: q, mode: "insensitive" } },
            ],
          },
        ],
      }
    : { isDraft: false };

  const [rows, total] = await Promise.all([
    prisma.berita.findMany({
      where,
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
      },
    }),
    prisma.berita.count({ where }),
  ]);

  const totalPages = Math.max(Math.ceil(total / take), 1);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
        Berita Desa
      </h1>

      <form className="mt-4 flex gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="Cari berita…"
          className="w-full rounded-lg border border-slate-200 px-3 py-2"
        />
        <button className="btn btn-primary">Cari</button>
      </form>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((b) => (
          <article key={b.id} className="panel p-4 flex flex-col">
            {b.gambarUtama ? (
              <Image
                src={b.gambarUtama}
                alt={b.judul}
                width={800}
                height={450}
                className="w-full h-40 object-cover rounded-md"
                unoptimized
              />
            ) : null}

            <h2 className="mt-3 font-semibold text-slate-900">
              <Link href={`/berita/${b.slug}`}>{b.judul}</Link>
            </h2>

            <div className="text-sm text-slate-500">
              {new Date(b.tanggalPublish).toLocaleDateString("id-ID")}
            </div>

            {b.sumberEksternal ? (
              <a
                className="uline mt-2 inline-block"
                href={b.sumberEksternal}
                target="_blank"
              >
                Baca di sumber →
              </a>
            ) : (
              <Link
                className="uline mt-2 inline-block"
                href={`/berita/${b.slug}`}
              >
                Baca selengkapnya →
              </Link>
            )}
          </article>
        ))}
      </div>

      <Pagination q={q} page={page} totalPages={totalPages} />
    </div>
  );
}

function Pagination({
  q,
  page,
  totalPages,
}: {
  q: string;
  page: number;
  totalPages: number;
}) {
  const prev = Math.max(page - 1, 1);
  const next = Math.min(page + 1, totalPages);

  const qParam = (p: number) => {
    const usp = new URLSearchParams();
    if (q) usp.set("q", q);
    usp.set("page", String(p));
    return `/berita?${usp.toString()}`;
  };

  const baseBtn =
    "inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white " +
    "px-3 py-1.5 text-xs sm:text-sm sm:px-4 sm:py-2 hover:bg-slate-50 transition-colors";

  const disabledBtn =
    "inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white " +
    "px-3 py-1.5 text-xs sm:text-sm sm:px-4 sm:py-2 opacity-50 pointer-events-none";

  return (
    <nav className="mt-6 flex items-center justify-center gap-2">
      {/* Prev */}
      {page > 1 ? (
        <a
          href={qParam(prev)}
          className={baseBtn}
          aria-label="Halaman sebelumnya"
        >
          <span className="sm:hidden">‹</span>
          <span className="hidden sm:inline">« Sebelumnya</span>
        </a>
      ) : (
        <span className={disabledBtn} aria-hidden="true">
          <span className="sm:hidden">‹</span>
          <span className="hidden sm:inline">« Sebelumnya</span>
        </span>
      )}

      {/* Indicator */}
      <span className="mx-1 select-none text-[11px] sm:text-sm text-slate-600">
        {page} / {totalPages}
      </span>

      {/* Next */}
      {page < totalPages ? (
        <a
          href={qParam(next)}
          className={baseBtn}
          aria-label="Halaman berikutnya"
        >
          <span className="sm:hidden">›</span>
          <span className="hidden sm:inline">Berikutnya »</span>
        </a>
      ) : (
        <span className={disabledBtn} aria-hidden="true">
          <span className="sm:hidden">›</span>
          <span className="hidden sm:inline">Berikutnya »</span>
        </span>
      )}
    </nav>
  );
}
