// src/app/(admin)/admin/berita/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function deleteAction(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;
  await prisma.berita.delete({ where: { id } });
  revalidatePath("/berita"); // publik
  revalidatePath("/admin/berita"); // admin list
}

export default async function AdminBeritaListPage() {
  const rows = await prisma.berita.findMany({
    orderBy: { tanggalPublish: "desc" },
    select: {
      id: true,
      judul: true,
      slug: true,
      isDraft: true,
      tanggalPublish: true,
      sumberEksternal: true, // ⬅️ tampilkan indikator sumber
    },
  });

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Kelola Berita
          </h1>
          <p className="text-slate-600">
            Tambahkan, ubah, atau hapus berita desa.
          </p>
        </div>
        <Link href="/admin/berita/new" className="btn btn-primary">
          + Tambah
        </Link>
      </header>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left">Judul</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Tanggal</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((b) => (
              <tr key={b.id} className="border-t border-slate-100">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span>{b.judul}</span>
                    {b.sumberEksternal ? (
                      <span className="rounded-full bg-blue-50 text-blue-700 px-2 py-0.5 text-[11px]">
                        Sumber
                      </span>
                    ) : null}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {b.isDraft ? (
                    <span className="rounded-full bg-amber-50 text-amber-700 px-2 py-1">
                      Draft
                    </span>
                  ) : (
                    <span className="rounded-full bg-emerald-50 text-emerald-700 px-2 py-1">
                      Publish
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {new Date(b.tanggalPublish).toLocaleString("id-ID")}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/berita/${b.id}/edit`}
                      className="btn btn-ghost"
                    >
                      Edit
                    </Link>

                    <form action={deleteAction}>
                      <input type="hidden" name="id" value={b.id} />
                      <button className="btn btn-ghost text-red-600">
                        Hapus
                      </button>
                    </form>

                    {b.sumberEksternal ? (
                      <a
                        href={b.sumberEksternal}
                        target="_blank"
                        className="btn btn-ghost"
                      >
                        Sumber
                      </a>
                    ) : (
                      <Link
                        href={`/berita/${b.slug}`}
                        className="btn btn-ghost"
                        target="_blank"
                      >
                        Buka
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td
                  className="px-4 py-6 text-center text-slate-500"
                  colSpan={4}
                >
                  Belum ada berita.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
