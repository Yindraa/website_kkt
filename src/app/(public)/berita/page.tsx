// src/app/(public)/berita/page.tsx
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic"; // atau ubah ke ISR sesuai kebutuhan

type SP = { q?: string; page?: string };

export default async function BeritaListPage({
  // Next 15: searchParams adalah Promise
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

      {/* Pencarian */}
      <form className="mt-4 flex gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="Cari berita…"
          className="w-full rounded-lg border border-slate-200 px-3 py-2"
        />
        <button className="btn btn-primary">Cari</button>
      </form>

      {/* Grid Berita */}
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

            <Link
              className="uline mt-2 inline-block"
              href={`/berita/${b.slug}`}
            >
              Baca selengkapnya →
            </Link>
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

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      {page > 1 ? (
        <Link href={qParam(prev)} className="btn btn-ghost">
          « Sebelumnya
        </Link>
      ) : (
        <span className="btn btn-ghost pointer-events-none opacity-50">
          « Sebelumnya
        </span>
      )}

      <span className="text-sm text-slate-600">
        Halaman {page} / {totalPages}
      </span>

      {page < totalPages ? (
        <Link href={qParam(next)} className="btn btn-ghost">
          Berikutnya »
        </Link>
      ) : (
        <span className="btn btn-ghost pointer-events-none opacity-50">
          Berikutnya »
        </span>
      )}
    </div>
  );
}
