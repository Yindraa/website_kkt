// src/app/(admin)/admin/berita/new/page.tsx
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AdminBeritaNewPage() {
  // Halaman placeholder pembuatan berita baru.
  // Nanti bisa kamu ganti ke form client component + server action.
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tambah Berita</h1>
        <Link href="/admin/berita" className="uline">
          ← Kembali ke daftar
        </Link>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-slate-700">
          Form tambah berita akan diletakkan di sini (judul, slug, konten,
          gambar, status draft/terbit).
        </p>
        <p className="mt-2 text-sm text-slate-500">
          (Sementara placeholder agar build sukses.)
        </p>
      </div>
    </div>
  );
}
