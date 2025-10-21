import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminHeader from "../../_components/AdminHeader";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  // Statistik
  const [total, published, draft, latest] = await Promise.all([
    prisma.berita.count(),
    prisma.berita.count({ where: { isDraft: false } }),
    prisma.berita.count({ where: { isDraft: true } }),
    prisma.berita.findMany({
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
      <AdminHeader
        title="Dashboard Admin"
        breadcrumbs={[{ label: "Dashboard" }]}
        // Tidak ada tombol “Tambah Berita” di dashboard
        actions={
          <Link href="/admin/berita" className="btn btn-primary">
            Lihat & Kelola Berita
          </Link>
        }
      />

      {/* Kartu Statistik */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Total Berita" value={total} />
        <StatCard label="Publish" value={published} tone="success" />
        <StatCard label="Draft" value={draft} tone="warn" />
      </section>

      {/* Terbaru */}
      <section className="panel p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-slate-900">Berita Terbaru</h2>
          <Link href="/admin/berita" className="uline text-sm">
            Kelola semua →
          </Link>
        </div>

        {latest.length === 0 ? (
          <p className="text-sm text-slate-500">Belum ada berita.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {latest.map((b) => (
              <li
                key={b.id}
                className="py-2 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="truncate">
                    <Link
                      href={`/admin/berita/${b.id}/edit`}
                      className="font-medium hover:underline"
                    >
                      {b.judul}
                    </Link>
                    {b.isDraft && (
                      <span className="ml-2 rounded-full bg-amber-50 text-amber-700 px-2 py-0.5 text-[11px]">
                        Draft
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500">
                    {new Date(b.tanggalPublish).toLocaleString("id-ID")}
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <Link
                    href={`/admin/berita/${b.id}/edit`}
                    className="btn btn-ghost text-sm"
                  >
                    Edit
                  </Link>
                  {!b.isDraft ? (
                    <Link
                      href={`/berita/${b.slug}`}
                      target="_blank"
                      className="btn btn-ghost text-sm"
                    >
                      Buka
                    </Link>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: number;
  tone?: "default" | "success" | "warn";
}) {
  const toneCls =
    tone === "success"
      ? "bg-emerald-50 text-emerald-700"
      : tone === "warn"
      ? "bg-amber-50 text-amber-700"
      : "bg-slate-50 text-slate-700";
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="text-sm text-slate-600">{label}</div>
      <div className="mt-1 text-3xl font-bold text-slate-900">{value}</div>
      <div
        className={`mt-3 inline-block rounded-full px-2 py-0.5 text-xs ${toneCls}`}
      >
        {tone === "success" ? "Publish" : tone === "warn" ? "Draft" : "Total"}
      </div>
    </div>
  );
}
