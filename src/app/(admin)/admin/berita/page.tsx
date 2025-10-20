// src/app/(admin)/admin/berita/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic"; // biar selalu fresh di dashboard admin (opsional)

export default async function AdminBeritaListPage() {
  const rows = await prisma.berita.findMany({
    orderBy: { tanggalPublish: "desc" },
    select: {
      id: true,
      judul: true,
      slug: true,
      isDraft: true,
      tanggalPublish: true,
    },
    take: 50,
  });

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Kelola Berita
          </h1>
          <p className="text-slate-600">
            Tambah, ubah, atau hapus berita desa.
          </p>
        </div>
        <Link href="/admin/berita/new" className="btn btn-primary">
          + Tambah Berita
        </Link>
      </header>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="text-left px-4 py-2">Judul</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Tanggal</th>
              <th className="text-left px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((b) => (
              <tr key={b.id} className="border-t border-slate-200">
                <td className="px-4 py-2">{b.judul}</td>
                <td className="px-4 py-2">{b.isDraft ? "Draft" : "Terbit"}</td>
                <td className="px-4 py-2">
                  {b.tanggalPublish
                    ? new Date(b.tanggalPublish).toLocaleString("id-ID")
                    : "-"}
                </td>
                <td className="px-4 py-2 space-x-3">
                  <Link className="uline" href={`/admin/berita/${b.id}/edit`}>
                    Edit
                  </Link>
                  <Link
                    className="uline"
                    href={`/berita/${b.slug}`}
                    target="_blank"
                  >
                    Lihat
                  </Link>
                </td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan={4}>
                  Belum ada berita. Klik “Tambah Berita” untuk membuat baru.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
