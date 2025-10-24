import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import AdminHeader from "@/app/(admin)/_components/AdminHeader";
import { Prisma } from "@prisma/client";

type SP = { q?: string; k?: string; s?: "newest" | "az" | "za" };

async function deleteAction(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;
  await prisma.umkm.delete({ where: { id } });
  revalidatePath("/admin/umkm");
}

export default async function AdminUmkmListPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const kRaw = sp.k ?? "";
  const sort = sp.s ?? "newest";

  const kategori = await prisma.kategoriUmkm.findMany({
    orderBy: { nama: "asc" },
    select: { id: true, nama: true },
  });

  const kNum = Number(kRaw);
  const validKategoriIds = new Set(kategori.map((c) => c.id));
  const k: number | undefined =
    Number.isFinite(kNum) && validKategoriIds.has(kNum) ? kNum : undefined;

  // WHERE mutable + tipe Prisma
  const where: Prisma.UmkmWhereInput = {};
  const and: Prisma.UmkmWhereInput[] = [];

  if (q) {
    and.push({
      OR: [
        { nama: { contains: q, mode: "insensitive" } },
        { deskripsi: { contains: q, mode: "insensitive" } },
        { alamat: { contains: q, mode: "insensitive" } },
      ],
    });
  }
  if (k !== undefined) and.push({ kategoriId: k });
  if (and.length) where.AND = and;

  const orderBy:
    | Prisma.UmkmOrderByWithRelationInput
    | Prisma.UmkmOrderByWithRelationInput[] =
    sort === "az"
      ? { nama: "asc" }
      : sort === "za"
      ? { nama: "desc" }
      : { id: "desc" }; // newest

  const rows = await prisma.umkm.findMany({
    where,
    orderBy,
    select: {
      id: true,
      nama: true,
      alamat: true,
      kontak: true,
      // pastikan relasi kategori dipilih, karena dipakai saat render
      kategori: { select: { nama: true } },
    },
  });

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Kelola UMKM"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "UMKM" },
        ]}
        backHref="/admin"
        actions={
          <Link href="/admin/umkm/new" className="btn btn-primary">
            + Tambah UMKM
          </Link>
        }
      />

      {/* Filter bar */}
      <form className="panel p-4 grid gap-2 sm:grid-cols-[1fr_220px_180px_auto]">
        <input
          name="q"
          defaultValue={q}
          placeholder="Cari nama/alamat/deskripsi…"
          className="rounded-lg border border-slate-300 px-3 py-2"
        />
        <select
          name="k"
          defaultValue={k ?? ""}
          className="rounded-lg border border-slate-300 px-3 py-2"
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
          className="rounded-lg border border-slate-300 px-3 py-2"
        >
          <option value="newest">Terbaru</option>
          <option value="az">Nama A–Z</option>
          <option value="za">Nama Z–A</option>
        </select>
        <button className="btn btn-primary">Terapkan</button>
      </form>

      {/* Tabel */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left">Nama</th>
              <th className="px-4 py-3 text-left">Kategori</th>
              <th className="px-4 py-3 text-left">Alamat</th>
              <th className="px-4 py-3 text-left">Kontak</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-900">
                  {r.nama}
                </td>
                <td className="px-4 py-3">{r.kategori?.nama ?? "-"}</td>
                <td className="px-4 py-3">{r.alamat ?? "-"}</td>
                <td className="px-4 py-3">{r.kontak ?? "-"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/umkm/${r.id}/edit`}
                      className="btn btn-ghost"
                    >
                      Edit
                    </Link>
                    <form action={deleteAction}>
                      <input type="hidden" name="id" value={r.id} />
                      <button className="btn btn-ghost text-red-600">
                        Hapus
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-slate-500"
                >
                  Tidak ada data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
