import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

type SP = { q?: string; k?: string };

type UmkmRow = {
  id: number;
  nama: string;
  gambar: string[];
  kategoriId: number;
  kategori: { nama: string } | null;
};

export const dynamic = "force-dynamic";

export default async function UmkmListPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const kRaw = sp.k ?? "";
  const kNum = Number(kRaw);

  // ambil kategori (selalu typed)
  const kategori = await prisma.kategoriUmkm.findMany({
    orderBy: { nama: "asc" },
    select: { id: true, nama: true },
  });

  // validasi id kategori
  const validKategoriIds = new Set(kategori.map((c) => c.id));
  const k: number | undefined =
    Number.isFinite(kNum) && validKategoriIds.has(kNum) ? kNum : undefined;

  // ambil rows, fallback aman bila DB sleep
  const rowsRes = await Promise.allSettled([
    prisma.umkm.findMany({
      where: {
        AND: [
          q
            ? {
                OR: [
                  { nama: { contains: q, mode: "insensitive" } },
                  { deskripsi: { contains: q, mode: "insensitive" } },
                ],
              }
            : {},
          k ? { kategoriId: k } : {},
        ],
      },
      orderBy: { id: "desc" },
      select: {
        id: true,
        nama: true,
        gambar: true,
        kategoriId: true, // <- penting supaya bisa filter tanpa `any`
        kategori: { select: { nama: true } },
      },
    }),
  ]);

  let rows: UmkmRow[] = [];
  if (rowsRes[0].status === "fulfilled") {
    rows = rowsRes[0].value as UmkmRow[];
  } else {
    rows = []; // fallback aman
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
        UMKM Desa
      </h1>

      <form className="mt-4 grid gap-2 sm:grid-cols-[1fr_240px_auto]">
        <input
          name="q"
          defaultValue={q}
          placeholder="Cari UMKM…"
          className="w-full rounded-lg border border-slate-200 px-3 py-2"
        />
        <select
          name="k"
          defaultValue={k ?? ""}
          className="w-full rounded-lg border border-slate-200 px-3 py-2"
        >
          <option value="">Semua kategori</option>
          {kategori.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nama}
            </option>
          ))}
        </select>
        <button className="btn btn-primary">Filter</button>
      </form>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((u) => (
          <article key={u.id} className="panel p-4 flex flex-col">
            {u.gambar?.[0] ? (
              <Image
                src={u.gambar[0]}
                alt={u.nama}
                width={800}
                height={450}
                className="w-full h-40 object-cover rounded-md"
                unoptimized
                loading="lazy"
                decoding="async"
              />
            ) : null}

            <h2 className="mt-3 font-semibold text-slate-900">
              <Link href={`/umkm/${u.id}`}>{u.nama}</Link>
            </h2>
            <div className="text-sm text-slate-500">
              {u.kategori?.nama ?? "-"}
            </div>

            <Link className="uline mt-2 inline-block" href={`/umkm/${u.id}`}>
              Lihat profil →
            </Link>
          </article>
        ))}

        {rows.length === 0 && (
          <div className="text-slate-500">Data UMKM tidak ditemukan.</div>
        )}
      </div>
    </div>
  );
}
