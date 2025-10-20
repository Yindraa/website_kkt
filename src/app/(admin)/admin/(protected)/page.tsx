// src/app/(admin)/admin/(protected)/page.tsx
import Link from "next/link";
import SignOutButton from "../sign-out-button";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Dashboard Admin
          </h1>
          <p className="text-slate-600">
            Kelola konten situs: berita, UMKM, wisata, layanan kesehatan, dll.
          </p>
        </div>
        <SignOutButton />
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AdminCard
          title="Berita"
          desc="Kelola berita desa"
          href="/admin/berita"
        />
      </section>
    </div>
  );
}

function AdminCard({
  title,
  desc,
  href,
}: {
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-slate-200 bg-white p-4 hover:shadow-soft transition-shadow block"
    >
      <div className="font-semibold text-slate-900">{title}</div>
      <div className="text-sm text-slate-600 mt-1">{desc}</div>
      <div className="text-sm mt-3 underline underline-offset-4">Buka →</div>
    </Link>
  );
}
