import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import AdminHeader from "@/app/(admin)/_components/AdminHeader"; // path absolut aman

async function deleteAction(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;
  await prisma.umkm.delete({ where: { id } });
  revalidatePath("/admin/umkm");
}

export default async function AdminUmkmListPage() {
  const rows = await prisma.umkm.findMany({
    orderBy: { id: "desc" },
    select: { id: true, nama: true, alamat: true, kontak: true },
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

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left">Nama</th>
              <th className="px-4 py-3 text-left">Alamat</th>
              <th className="px-4 py-3 text-left">Kontak</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-slate-100">
                <td className="px-4 py-3">{r.nama}</td>
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
                  className="px-4 py-6 text-center text-slate-500"
                  colSpan={4}
                >
                  Belum ada UMKM.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
