import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Newspaper, FilePlus, Eye, Edit } from "lucide-react";

export default async function AdminDashboardPage() {
  // --- Ambil data untuk statistik ringkas
  const [publishedCount, draftCount, unreadCount, latestNews] =
    await Promise.all([
      prisma.berita.count({ where: { isDraft: false } }),
      prisma.berita.count({ where: { isDraft: true } }),
      prisma.pesanKontak.count({ where: { isSudahDibaca: false } }),
      prisma.berita.findMany({
        where: {},
        orderBy: { tanggalPublish: "desc" },
        take: 5,
        select: {
          id: true,
          judul: true,
          slug: true,
          isDraft: true,
          tanggalPublish: true,
        },
      }),
    ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Dashboard Admin
          </h1>
          <p className="text-slate-600">
            Kelola konten situs: berita, UMKM, wisata, layanan kesehatan, dll.
          </p>
        </div>
        <Link href="/admin/berita/new" className="btn btn-primary">
          <FilePlus size={16} className="mr-2" />
          Tulis Berita
        </Link>
      </header>

      {/* Stat Cards */}
      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Berita (Published)"
          value={publishedCount}
          hint="Sudah tayang di publik"
        />
        <StatCard
          title="Berita Draft"
          value={draftCount}
          hint="Perlu ditinjau / dilengkapi"
        />
        <StatCard
          title="Pesan Masuk"
          value={unreadCount}
          hint="Belum ditandai dibaca"
        />
      </section>

      {/* Aksi Cepat */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ActionCard
          title="Kelola Berita"
          desc="Tambah, ubah, dan hapus berita desa."
          href="/admin/berita"
          cta="Buka"
          icon={<Newspaper size={16} />}
        />
        {/* Siapkan modul lain: UMKM, Wisata, Kesehatan */}
        {/* <ActionCard title="Kelola UMKM" desc="Data pelaku usaha lokal." href="/admin/umkm" cta="Buka" icon={<Store size={16} />} /> */}
      </section>

      {/* Tabel Berita Terbaru */}
      <section className="rounded-2xl border border-slate-200 bg-white">
        <div className="px-4 py-3 border-b border-slate-200">
          <h2 className="font-semibold text-slate-900">Berita Terbaru</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-600">
                <th className="px-4 py-2">Judul</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Tanggal</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {latestNews.map((b) => (
                <tr key={b.id} className="border-t border-slate-100">
                  <td className="px-4 py-2">
                    <div className="font-medium text-slate-900">{b.judul}</div>
                    <div className="text-xs text-slate-500">
                      /berita/{b.slug}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    {b.isDraft ? (
                      <span className="inline-flex items-center rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5">
                        Draft
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5">
                        Published
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-slate-700">
                    {new Date(b.tanggalPublish).toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      {!b.isDraft && (
                        <Link
                          href={`/berita/${b.slug}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 hover:bg-slate-50"
                          target="_blank"
                        >
                          <Eye size={14} />
                          Lihat
                        </Link>
                      )}
                      <Link
                        href={`/admin/berita/${b.id}/edit`}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 hover:bg-slate-50"
                      >
                        <Edit size={14} />
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}

              {latestNews.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-slate-500" colSpan={4}>
                    Belum ada berita. Mulai dengan{" "}
                    <Link className="uline" href="/admin/berita/new">
                      menulis berita baru
                    </Link>
                    .
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

/* ========== KOMPONEN KECIL ========== */

function StatCard({
  title,
  value,
  hint,
}: {
  title: string;
  value: number;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="text-sm text-slate-600">{title}</div>
      <div className="mt-1 text-2xl font-bold text-slate-900">{value}</div>
      {hint ? <div className="text-xs text-slate-500 mt-1">{hint}</div> : null}
    </div>
  );
}

function ActionCard({
  title,
  desc,
  href,
  cta,
  icon,
}: {
  title: string;
  desc: string;
  href: string;
  cta: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col">
      <div className="flex items-center gap-2">
        <div className="inline-grid place-items-center h-9 w-9 rounded-lg bg-brand-600 text-white">
          {icon ?? <Newspaper size={16} />}
        </div>
        <div className="font-semibold text-slate-900">{title}</div>
      </div>
      <p className="text-sm text-slate-600 mt-2 flex-1">{desc}</p>
      <div className="mt-3">
        <Link
          href={href}
          className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm hover:bg-slate-50"
        >
          {cta}
        </Link>
      </div>
    </div>
  );
}
