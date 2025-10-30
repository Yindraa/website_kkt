// src/app/(admin)/admin/berita/[id]/edit/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminBeritaForm from "../../_components/AdminBeritaForm";
import { BeritaTipe } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function AdminBeritaEditPage({
  params,
}: {
  // ⬅️ penting: pakai Promise karena Next.js kamu meng-generate tipe begitu
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ⬅️ kita tunggu dulu
  const numId = Number(id);
  if (!Number.isFinite(numId) || numId <= 0) notFound();

  const data = await prisma.berita.findUnique({
    where: { id: numId },
    select: {
      id: true,
      judul: true,
      slug: true,
      konten: true,
      gambarUtama: true,
      sumberEksternal: true,
      isDraft: true,
      tipe: true,
      tanggalEventMulai: true,
      tanggalEventSelesai: true,
      lokasi: true,
      isRecurring: true,
      recurringNote: true,
    },
  });

  if (!data) notFound();

  return (
    <div className="max-w-5xl">
      <AdminBeritaForm
        mode="edit"
        initial={{
          id: data.id,
          judul: data.judul,
          slug: data.slug,
          konten: data.konten,
          gambarUtama: data.gambarUtama,
          sumberEksternal: data.sumberEksternal,
          isDraft: data.isDraft,
          tipe: data.tipe as BeritaTipe,
          // kirim sebagai string karena form kamu expect string | null
          tanggalEventMulai: data.tanggalEventMulai
            ? data.tanggalEventMulai.toISOString()
            : null,
          tanggalEventSelesai: data.tanggalEventSelesai
            ? data.tanggalEventSelesai.toISOString()
            : null,
          lokasi: data.lokasi,
          isRecurring: data.isRecurring,
          recurringNote: data.recurringNote,
        }}
      />
    </div>
  );
}
