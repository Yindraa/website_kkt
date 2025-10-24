import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminHeader from "@/app/(admin)/_components/AdminHeader";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // Ambil angka ringkas & daftar terbaru (fail-safe agar UI tetap tampil)
  const [countsRes, recentRes] = await Promise.allSettled([
    Promise.all([
      prisma.berita.count(),
      prisma.umkm.count(),
      prisma.pesanKontak.count({ where: { isSudahDibaca: false } }),
    ]),
    Promise.all([
      prisma.berita.findMany({
        orderBy: { id: "desc" },
        take: 5,
        select: { id: true, judul: true, isDraft: true, tanggalPublish: true },
      }),
      prisma.umkm.findMany({
        orderBy: { id: "desc" },
        take: 5,
        select: { id: true, nama: true, kategori: { select: { nama: true } } },
      }),
      prisma.pesanKontak.findMany({
        orderBy: { tanggalKirim: "desc" },
        take: 5,
        select: { id: true, nama: true, subjek: true, isSudahDibaca: true },
      }),
    ]),
  ]);

  const [beritaCount, umkmCount, unreadCount] =
    countsRes.status === "fulfilled" ? countsRes.value : [0, 0, 0];

  const [recentBerita, recentUmkm, recentPesan] =
    recentRes.status === "fulfilled"
      ? recentRes.value
      : ([[], [], []] as const);

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Dashboard"
        breadcrumbs={[{ label: "Dashboard" }]}
        actions={
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/berita/new" className="btn btn-primary">
              + Berita
            </Link>
            <Link href="/admin/umkm/new" className="btn btn-primary">
              + UMKM
            </Link>
            <Link href="/admin/kontak" className="btn btn-ghost">
              Kotak Masuk
            </Link>
          </div>
        }
      />

      {/* Stat cards */}
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <CardStat
          label="Total Berita"
          value={beritaCount}
          href="/admin/berita"
        />
        <CardStat label="Total UMKM" value={umkmCount} href="/admin/umkm" />
        <CardStat
          label="Pesan belum dibaca"
          value={unreadCount}
          href="/admin/kontak?unreadOnly=true"
        />
      </section>

      {/* 3 kolom daftar terbaru */}
      <section className="grid gap-4 lg:grid-cols-3">
        <PanelList
          title="Berita Terbaru"
          moreHref="/admin/berita"
          items={recentBerita.map((b) => ({
            id: b.id,
            primary: b.judul,
            secondary: b.isDraft ? "Draft" : "Publish",
            href: `/admin/berita/${b.id}/edit`,
            badge: b.isDraft ? "Draft" : undefined,
          }))}
          emptyText="Belum ada berita."
        />
        <PanelList
          title="UMKM Terbaru"
          moreHref="/admin/umkm"
          items={recentUmkm.map((u) => ({
            id: u.id,
            primary: u.nama,
            secondary: u.kategori?.nama ?? "-",
            href: `/admin/umkm/${u.id}/edit`,
          }))}
          emptyText="Belum ada UMKM."
        />
        <PanelList
          title="Pesan Terakhir"
          moreHref="/admin/kontak"
          items={recentPesan.map((p) => ({
            id: p.id,
            primary: p.subjek,
            secondary: p.nama,
            href: `/admin/kontak#pesan-${p.id}`,
            badge: p.isSudahDibaca ? undefined : "Baru",
          }))}
          emptyText="Belum ada pesan."
        />
      </section>
    </div>
  );
}

function CardStat({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="panel p-4 block hover:bg-slate-50 transition rounded-xl border border-slate-200"
    >
      <div className="text-sm text-slate-600">{label}</div>
      <div className="mt-1 text-2xl font-bold text-slate-900">{value}</div>
      <div className="mt-2 text-xs text-brand-700">Lihat detail →</div>
    </Link>
  );
}

function PanelList({
  title,
  items,
  emptyText,
  moreHref,
}: {
  title: string;
  items: {
    id: number;
    primary: string;
    secondary?: string;
    href: string;
    badge?: string;
  }[];
  emptyText: string;
  moreHref: string;
}) {
  return (
    <div className="panel p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <Link className="uline text-sm" href={moreHref}>
          Lihat semua
        </Link>
      </div>
      <ul className="mt-3 divide-y">
        {items.length === 0 && (
          <li className="py-6 text-sm text-slate-500">{emptyText}</li>
        )}
        {items.map((it) => (
          <li key={it.id} className="py-2">
            <Link href={it.href} className="flex items-center justify-between">
              <div className="min-w-0">
                <div className="truncate font-medium text-slate-900">
                  {it.primary}
                </div>
                {it.secondary && (
                  <div className="text-xs text-slate-500 truncate">
                    {it.secondary}
                  </div>
                )}
              </div>
              {it.badge && (
                <span className="ml-3 rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 text-xs">
                  {it.badge}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
