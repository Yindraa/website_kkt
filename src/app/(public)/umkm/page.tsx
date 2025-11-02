// src/app/(public)/umkm/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import UmkmCard from "./_components/UmkmCard";
import type { Metadata } from "next";

type SP = { q?: string; k?: string; s?: string }; // s = sort: newest|az|za

export const dynamic = "force-dynamic";

// 👇 metadata SEO
export const metadata: Metadata = {
  title: "UMKM Desa Leilem – Produk & Jasa Warga",
  description:
    "Daftar pelaku UMKM Desa Leilem: kuliner, kerajinan, jasa, dan usaha rumahan. Bisa difilter berdasarkan kategori dan kata kunci.",
  openGraph: {
    title: "UMKM Desa Leilem",
    description:
      "Dukung usaha warga Desa Leilem. Lihat daftar UMKM dan kontak mereka.",
    url: "https://website-desa-leilem.vercel.app/umkm",
    siteName: "Pemerintah Desa Leilem",
    locale: "id_ID",
    type: "website",
  },
  alternates: {
    canonical: "https://website-desa-leilem.vercel.app/umkm",
  },
  keywords: [
    "UMKM desa leilem",
    "usaha desa leilem",
    "produk lokal leilem",
    "minahasa",
    "sonder",
  ],
};

export default async function UmkmListPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const kNum = Number(sp.k ?? "");
  const sort = (sp.s ?? "newest") as "newest" | "az" | "za";

  const kategori = await prisma.kategoriUmkm.findMany({
    orderBy: { nama: "asc" },
    select: { id: true, nama: true },
  });

  // validasi kategori
  const validKategoriIds = new Set(kategori.map((c) => c.id));
  const k: number | undefined =
    Number.isFinite(kNum) && validKategoriIds.has(kNum) ? kNum : undefined;

  // order
  const orderBy =
    sort === "az"
      ? { nama: "asc" as const }
      : sort === "za"
      ? { nama: "desc" as const }
      : { id: "desc" as const };

  const rows = await prisma.umkm.findMany({
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
    orderBy,
    select: {
      id: true,
      nama: true,
      deskripsi: true,
      gambar: true,
      kategori: { select: { nama: true } },
    },
  });

  const resultCount = rows.length;

  // helper utk bikin query string baru
  function qs(next: Partial<SP>) {
    const p = new URLSearchParams();
    if (next.q ?? q) p.set("q", (next.q ?? q) as string);
    if (typeof (next.k ?? k) !== "undefined" && (next.k ?? k) !== "")
      p.set("k", String(next.k ?? k));
    if (next.s ?? sort) p.set("s", (next.s ?? sort) as string);
    return `?${p.toString()}`;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
        UMKM Desa
      </h1>
      <p className="text-slate-600">
        Jelajahi pelaku usaha lokal — cari berdasarkan kata kunci atau kategori.
      </p>

      {/* Filter bar */}
      <form className="mt-4 grid gap-2 sm:grid-cols-[1fr_200px_160px_auto]">
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
        <select
          name="s"
          defaultValue={sort}
          className="w-full rounded-lg border border-slate-200 px-3 py-2"
        >
          <option value="newest">Terbaru</option>
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
        </select>
        <button className="btn btn-primary">Terapkan</button>
      </form>

      {/* Pills kategori (quick filter) */}
      <div className="mt-3 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          <Link
            href={qs({ k: "" })}
            className={[
              "px-3 py-1.5 rounded-full border text-sm",
              typeof k === "undefined"
                ? "bg-brand-600 text-white border-brand-600"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50",
            ].join(" ")}
          >
            Semua
          </Link>
          {kategori.map((c) => {
            const active = k === c.id;
            return (
              <Link
                key={c.id}
                href={qs({ k: String(c.id) })}
                className={[
                  "px-3 py-1.5 rounded-full border text-sm",
                  active
                    ? "bg-brand-600 text-white border-brand-600"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50",
                ].join(" ")}
              >
                {c.nama}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Result stats */}
      <div className="mt-4 text-sm text-slate-600">
        Ditemukan{" "}
        <span className="font-medium text-slate-900">{resultCount}</span> UMKM
        {q ? (
          <>
            {" "}
            untuk pencarian <span className="italic">“{q}”</span>
          </>
        ) : null}
        {typeof k !== "undefined"
          ? ` di kategori ${kategori.find((c) => c.id === k)?.nama ?? ""}`
          : ""}
        .
      </div>

      {/* Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((u) => (
          <UmkmCard
            key={u.id}
            id={u.id}
            nama={u.nama}
            deskripsi={u.deskripsi}
            gambar={u.gambar}
            kategoriNama={u.kategori?.nama}
          />
        ))}

        {rows.length === 0 && (
          <div className="text-slate-500">
            Data UMKM tidak ditemukan.{" "}
            <Link href="/umkm" className="uline">
              Bersihkan filter
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
