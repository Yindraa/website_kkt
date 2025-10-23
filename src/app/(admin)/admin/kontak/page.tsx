// src/app/(admin)/admin/kontak/page.tsx
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import AdminHeader from "@/app/(admin)/_components/AdminHeader";

type SP = { q?: string; unreadOnly?: string };

export const dynamic = "force-dynamic";

async function markAsReadAction(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!Number.isFinite(id)) return;

  await prisma.pesanKontak.update({
    where: { id },
    data: { isSudahDibaca: true },
  });

  revalidatePath("/admin/kontak");
}

async function deleteAction(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!Number.isFinite(id)) return;

  await prisma.pesanKontak.delete({ where: { id } });
  revalidatePath("/admin/kontak");
}

export default async function AdminKontakPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const q = sp.q?.trim() || "";
  const unreadOnly = sp.unreadOnly === "true";

  // helper: case-insensitive contains untuk field tertentu
  const ci = (
    field: "nama" | "email" | "subjek" | "pesan"
  ): Prisma.PesanKontakWhereInput => ({
    [field]: {
      contains: q,
      mode: Prisma.QueryMode.insensitive, // gunakan enum, bukan string "insensitive"
    },
  });

  // SUSUN where dengan tipe Prisma yang benar (tanpa array readonly)
  let where: Prisma.PesanKontakWhereInput = {};
  if (q && unreadOnly) {
    where = {
      AND: [
        { isSudahDibaca: false },
        { OR: [ci("nama"), ci("email"), ci("subjek"), ci("pesan")] },
      ],
    };
  } else if (q) {
    where = { OR: [ci("nama"), ci("email"), ci("subjek"), ci("pesan")] };
  } else if (unreadOnly) {
    where = { isSudahDibaca: false };
  }

  const rows = await prisma.pesanKontak.findMany({
    where,
    orderBy: { tanggalKirim: "desc" },
    take: 100,
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

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Kotak Masuk Kontak"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Kontak" },
        ]}
        backHref="/admin"
        actions={
          <form className="flex gap-2">
            <input
              name="q"
              defaultValue={q}
              placeholder="Cari nama/email/subjek/pesan…"
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="unreadOnly"
                value="true"
                defaultChecked={unreadOnly}
                className="size-4"
              />
              Belum dibaca
            </label>
            <button className="btn btn-primary">Filter</button>
          </form>
        }
      />

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left">Pengirim</th>
              <th className="px-4 py-3 text-left">Subjek</th>
              <th className="px-4 py-3 text-left">Tanggal</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-slate-100 align-top">
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900">{r.nama}</div>
                  <div className="text-slate-600">{r.email}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900">{r.subjek}</div>
                  <div className="text-slate-600 line-clamp-2">{r.pesan}</div>
                </td>
                <td className="px-4 py-3">
                  {new Date(r.tanggalKirim).toLocaleString("id-ID")}
                </td>
                <td className="px-4 py-3">
                  {r.isSudahDibaca ? (
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 border border-green-200">
                      Sudah dibaca
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 border border-amber-200">
                      Belum dibaca
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    {!r.isSudahDibaca && (
                      <form action={markAsReadAction}>
                        <input type="hidden" name="id" value={r.id} />
                        <button className="btn btn-ghost">Tandai dibaca</button>
                      </form>
                    )}
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
                  colSpan={5}
                >
                  Belum ada pesan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-sm text-slate-600">
        Endpoint JSON:{" "}
        <Link className="uline" href="/api/kontak" target="_blank">
          /api/kontak
        </Link>
      </div>
    </div>
  );
}
