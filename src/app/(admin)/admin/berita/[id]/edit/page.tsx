// src/app/(admin)/admin/berita/[id]/edit/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

type Params = { id: string };

export default async function AdminBeritaEditPage({
  params,
}: {
  // ⬅️ Next 15: params adalah Promise
  params: Promise<Params>;
}) {
  const { id: idStr } = await params; // ⬅️ WAJIB di-await
  const id = Number(idStr);
  if (!Number.isFinite(id)) notFound();

  const berita = await prisma.berita.findUnique({
    where: { id },
    select: {
      id: true,
      judul: true,
      slug: true,
      konten: true,
      gambarUtama: true,
      isDraft: true,
      tanggalPublish: true,
    },
  });

  if (!berita) notFound();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Berita</h1>
        <Link href="/admin/berita" className="uline">
          ← Kembali ke daftar
        </Link>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
        <div>
          <span className="text-slate-500">ID:</span> {berita.id}
        </div>
        <div>
          <span className="text-slate-500">Judul:</span> {berita.judul}
        </div>
        <div>
          <span className="text-slate-500">Slug:</span> {berita.slug}
        </div>
        <div>
          <span className="text-slate-500">Status:</span>{" "}
          {berita.isDraft ? "Draft" : "Terbit"}
        </div>
        <div>
          <span className="text-slate-500">Tanggal:</span>{" "}
          {berita.tanggalPublish
            ? new Date(berita.tanggalPublish).toLocaleString("id-ID")
            : "-"}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="text-slate-500 mb-1">Konten:</div>
        <pre className="whitespace-pre-wrap text-slate-800">
          {berita.konten}
        </pre>
      </div>

      {berita.gambarUtama ? (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-slate-500 mb-2">Gambar Utama:</div>
          <Image
            src={berita.gambarUtama}
            alt={berita.judul}
            width={1200}
            height={630}
            className="max-w-full rounded-lg h-auto"
            unoptimized
          />
        </div>
      ) : null}
    </div>
  );
}
