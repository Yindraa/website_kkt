// src/app/(admin)/admin/berita/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { toggleDraft, deleteBerita } from "./actions";
import { BeritaTipe } from "@prisma/client";

export const dynamic = "force-dynamic";

// helper: DB enum -> label publik
function labelFromTipe(tipe: BeritaTipe): "Artikel" | "Event" {
  if (tipe === BeritaTipe.EVENT) return "Event";
  return "Artikel";
}

export default async function AdminBeritaListPage() {
  const rows = await prisma.berita.findMany({
    orderBy: [{ tanggalPublish: "desc" }, { id: "desc" }],
    select: {
      id: true,
      judul: true,
      slug: true,
      isDraft: true,
      gambarUtama: true,
      tanggalPublish: true,
      sumberEksternal: true,
      tipe: true,
      tanggalEventMulai: true,
      tanggalEventSelesai: true,
      lokasi: true,
      isRecurring: true,
      recurringNote: true,
      // ❌ jangan select updatedAt karena belum ada di DB
    },
  });

  return (
    <section className="space-y-5">
      {/* header */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Kelola Berita & Event
          </h1>
          <p className="text-sm text-slate-500">
            Artikel tampil di publik sebagai berita, dan Event tampil sebagai
            informasi kegiatan.
          </p>
        </div>
        <div className="flex gap-2">
          {/* ✅ tombol kembali ke dashboard admin */}
          <Link href="/admin" className="btn btn-ghost">
            ← Dashboard
          </Link>
          <Link href="/admin/berita/new" className="btn btn-primary self-start">
            + Berita / Event Baru
          </Link>
        </div>
      </header>

      {/* versi mobile: cards */}
      <div className="grid gap-3 sm:hidden">
        {rows.length === 0 ? (
          <div className="panel">
            <p className="text-sm text-slate-500">Belum ada berita.</p>
          </div>
        ) : (
          rows.map((r) => {
            const isEvent = r.tipe === BeritaTipe.EVENT;
            const label = labelFromTipe(r.tipe);

            const dateStr = isEvent
              ? r.tanggalEventMulai
                ? r.tanggalEventSelesai
                  ? `${r.tanggalEventMulai.toLocaleDateString(
                      "id-ID"
                    )} – ${r.tanggalEventSelesai.toLocaleDateString("id-ID")}`
                  : r.tanggalEventMulai.toLocaleDateString("id-ID")
                : "—"
              : r.tanggalPublish.toLocaleDateString("id-ID");

            // ✅ form action harus pre-bound, ini sudah benar
            const toggleAction = toggleDraft.bind(null, r.id, !r.isDraft);
            const deleteAction = deleteBerita.bind(null, r.id);

            return (
              <article key={r.id} className="panel p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="font-medium text-slate-900">{r.judul}</h2>
                    <p className="text-xs text-slate-400">{r.slug}</p>
                  </div>
                  <span
                    className={[
                      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                      label === "Event"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-sky-50 text-sky-700",
                    ].join(" ")}
                  >
                    {label}
                  </span>
                </div>

                <div className="text-xs text-slate-500">
                  {label === "Event" ? "Jadwal" : "Tanggal terbit"}: {dateStr}
                  {r.lokasi ? ` • ${r.lokasi}` : ""}
                  {r.isRecurring && r.recurringNote
                    ? ` • ${r.recurringNote}`
                    : ""}
                </div>

                <div className="flex gap-2">
                  <form action={toggleAction}>
                    <button type="submit" className="btn btn-ghost btn-xs">
                      {r.isDraft ? "Terbitkan" : "Jadikan Draft"}
                    </button>
                  </form>
                  {/* ✅ pakai ID, bukan slug */}
                  <Link
                    href={`/admin/berita/${r.id}/edit`}
                    className="btn btn-ghost btn-xs"
                  >
                    Edit
                  </Link>
                  <form action={deleteAction}>
                    <button
                      type="submit"
                      className="btn btn-ghost btn-xs text-red-600"
                    >
                      Hapus
                    </button>
                  </form>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* versi desktop: tabel */}
      <div className="panel p-0 overflow-x-auto hidden sm:block">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-3 py-2 text-left w-[35%]">Judul</th>
              <th className="px-3 py-2 text-left">Jenis</th>
              <th className="px-3 py-2 text-left">Jadwal / Tanggal</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-right w-[1%]">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-6 text-center text-slate-500"
                >
                  Belum ada berita.
                </td>
              </tr>
            ) : (
              rows.map((r) => {
                const isEvent = r.tipe === BeritaTipe.EVENT;
                const label = labelFromTipe(r.tipe);

                const dateStr = isEvent
                  ? r.tanggalEventMulai
                    ? r.tanggalEventSelesai
                      ? `${r.tanggalEventMulai.toLocaleDateString(
                          "id-ID"
                        )} – ${r.tanggalEventSelesai.toLocaleDateString(
                          "id-ID"
                        )}`
                      : r.tanggalEventMulai.toLocaleDateString("id-ID")
                    : "—"
                  : r.tanggalPublish.toLocaleDateString("id-ID");

                const toggleAction = toggleDraft.bind(null, r.id, !r.isDraft);
                const deleteAction = deleteBerita.bind(null, r.id);

                return (
                  <tr key={r.id} className="border-b last:border-b-0">
                    <td className="px-3 py-3 align-top">
                      <div className="font-medium text-slate-900">
                        {r.judul}
                      </div>
                      <div className="text-xs text-slate-500">{r.slug}</div>
                    </td>
                    <td className="px-3 py-3 align-top">
                      <span
                        className={[
                          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                          label === "Event"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-sky-50 text-sky-700",
                        ].join(" ")}
                      >
                        {label}
                      </span>
                    </td>
                    <td className="px-3 py-3 align-top text-xs text-slate-700 space-y-1">
                      <div>{dateStr}</div>
                      {r.lokasi ? <div>{r.lokasi}</div> : null}
                      {r.isRecurring && r.recurringNote ? (
                        <div className="text-amber-700">{r.recurringNote}</div>
                      ) : null}
                    </td>
                    <td className="px-3 py-3 align-top">
                      {r.isDraft ? (
                        <span className="text-xs rounded bg-slate-200 px-2 py-0.5">
                          Draft
                        </span>
                      ) : (
                        <span className="text-xs rounded bg-emerald-100 px-2 py-0.5 text-emerald-700">
                          Terbit
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3 align-top text-right">
                      <div className="inline-flex gap-2">
                        <form action={toggleAction}>
                          <button
                            className="btn btn-ghost btn-xs"
                            type="submit"
                          >
                            {r.isDraft ? "Terbitkan" : "Jadikan Draft"}
                          </button>
                        </form>
                        {/* ✅ pakai ID, bukan slug */}
                        <Link
                          href={`/admin/berita/${r.id}/edit`}
                          className="btn btn-ghost btn-xs"
                        >
                          Edit
                        </Link>
                        <form action={deleteAction}>
                          <button
                            className="btn btn-ghost btn-xs text-red-600"
                            type="submit"
                          >
                            Hapus
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
