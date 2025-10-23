import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import AdminHeader from "@/app/(admin)/_components/AdminHeader";

async function markUnreadAction(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;
  await prisma.pesanKontak.update({
    where: { id },
    data: { isSudahDibaca: false },
  });
  revalidatePath(`/admin/kontak/${id}`);
  redirect(`/admin/kontak/${id}`);
}

async function deleteAction(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;
  await prisma.pesanKontak.delete({ where: { id } });
  revalidatePath("/admin/kontak");
  redirect("/admin/kontak");
}

export default async function AdminKontakDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isFinite(numId) || numId <= 0) notFound();

  const row = await prisma.pesanKontak.findUnique({
    where: { id: numId },
    select: {
      id: true,
      nama: true,
      email: true,
      subjek: true,
      pesan: true,
      tanggalKirim: true,
      isSudahDibaca: true,
    },
  });
  if (!row) notFound();

  // Tandai dibaca saat membuka (opsional; hapus kalau tak ingin auto-read)
  if (!row.isSudahDibaca) {
    await prisma.pesanKontak.update({
      where: { id: numId },
      data: { isSudahDibaca: true },
    });
    row.isSudahDibaca = true;
    // tidak perlu revalidate; halaman detail ini sudah SSR dari DB
  }

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Detail Pesan"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Kontak", href: "/admin/kontak" },
          { label: `#${row.id}` },
        ]}
        backHref="/admin/kontak"
        actions={
          <div className="flex items-center gap-2">
            {row.isSudahDibaca && (
              <form action={markUnreadAction}>
                <input type="hidden" name="id" value={row.id} />
                <button className="btn btn-ghost">Tandai belum dibaca</button>
              </form>
            )}
            <form action={deleteAction}>
              <input type="hidden" name="id" value={row.id} />
              <button className="btn btn-ghost text-red-600">Hapus</button>
            </form>
          </div>
        }
      />

      <article className="panel p-5 space-y-3">
        <div className="text-sm text-slate-600">
          Dikirim: {new Date(row.tanggalKirim).toLocaleString("id-ID")}
        </div>
        <dl className="grid gap-2 sm:grid-cols-2">
          <div>
            <dt className="text-slate-500 text-sm">Nama</dt>
            <dd className="text-slate-900 font-medium">{row.nama}</dd>
          </div>
          <div>
            <dt className="text-slate-500 text-sm">Email</dt>
            <dd className="text-slate-900 font-medium">{row.email}</dd>
          </div>
        </dl>

        <div>
          <div className="text-slate-500 text-sm">Subjek</div>
          <div className="text-slate-900 font-semibold">{row.subjek}</div>
        </div>

        <div>
          <div className="text-slate-500 text-sm">Pesan</div>
          <p className="mt-1 whitespace-pre-wrap text-slate-800">{row.pesan}</p>
        </div>
      </article>
    </div>
  );
}
