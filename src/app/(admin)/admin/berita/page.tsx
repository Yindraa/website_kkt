import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import AdminHeader from "@/app/(admin)/_components/AdminHeader";
import { Prisma } from "@prisma/client";

type SP = {
  q?: string;
  f?: "all" | "published" | "draft";
  s?: "newest" | "oldest" | "az" | "za";
};

async function deleteAction(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;
  await prisma.berita.delete({ where: { id } });
  revalidatePath("/admin/berita");
}

export default async function AdminBeritaList({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const filter = sp.f ?? "all";
  const sort = sp.s ?? "newest";

  // Bangun WHERE yang mutable + tipe Prisma
  const where: Prisma.BeritaWhereInput = {};
  const and: Prisma.BeritaWhereInput[] = [];

  if (q) {
    and.push({
      OR: [
        { judul: { contains: q, mode: "insensitive" } },
        { konten: { contains: q, mode: "insensitive" } },
        { sumberEksternal: { contains: q, mode: "insensitive" } },
      ],
    });
  }
  if (filter === "published") and.push({ isDraft: false });
  if (filter === "draft") and.push({ isDraft: true });
  if (and.length) where.AND = and;

  const orderBy:
    | Prisma.BeritaOrderByWithRelationInput
    | Prisma.BeritaOrderByWithRelationInput[] =
    sort === "oldest"
      ? { id: "asc" }
      : sort === "az"
      ? { judul: "asc" }
      : sort === "za"
      ? { judul: "desc" }
      : { id: "desc" }; // newest

  const rows = await prisma.berita.findMany({
    where,
    orderBy,
    select: {
      id: true,
      judul: true,
      isDraft: true,
      tanggalPublish: true,
      sumberEksternal: true,
    },
  });

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Kelola Berita"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Berita" },
        ]}
        backHref="/admin"
        actions={
          <Link href="/admin/berita/new" className="btn btn-primary">
            + Tambah Berita
          </Link>
        }
      />

      {/* Filter bar */}
      <form className="panel p-4 grid gap-2 sm:grid-cols-[1fr_180px_180px_auto]">
        <input
          name="q"
          defaultValue={q}
          placeholder="Cari judul/konten/sumber…"
          className="rounded-lg border border-slate-300 px-3 py-2"
        />
        <select
          name="f"
          defaultValue={filter}
          className="rounded-lg border border-slate-300 px-3 py-2"
        >
          <option value="all">Semua status</option>
          <option value="published">Publish</option>
          <option value="draft">Draft</option>
        </select>
        <select
          name="s"
          defaultValue={sort}
          className="rounded-lg border border-slate-300 px-3 py-2"
        >
          <option value="newest">Terbaru</option>
          <option value="oldest">Terlama</option>
          <option value="az">Judul A–Z</option>
          <option value="za">Judul Z–A</option>
        </select>
        <button className="btn btn-primary">Terapkan</button>
      </form>

      {/* Tabel */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left">Judul</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Sumber</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-slate-100">
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900 truncate max-w-[42ch]">
                    {r.judul}
                  </div>
                  <div className="text-xs text-slate-500">
                    {new Date(r.tanggalPublish).toLocaleDateString("id-ID")}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {r.isDraft ? (
                    <span className="rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 text-xs">
                      Draft
                    </span>
                  ) : (
                    <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-xs">
                      Publish
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 truncate max-w-[26ch]">
                  {r.sumberEksternal ? (
                    <a
                      className="uline"
                      href={r.sumberEksternal}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Sumber
                    </a>
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/berita/${r.id}/edit`}
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
                  colSpan={4}
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
