import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import UmkmForm, { type FormState } from "../../_components/UmkmForm";
import AdminHeader from "@/app/(admin)/_components/AdminHeader";

async function updateAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  "use server";
  try {
    const id = Number(formData.get("id"));
    const nama = String(formData.get("nama") ?? "").trim();
    const deskripsi = String(formData.get("deskripsi") ?? "").trim() || null;
    const alamat = String(formData.get("alamat") ?? "").trim() || null;
    const kontak = String(formData.get("kontak") ?? "").trim() || null;
    const gmapsLink = String(formData.get("gmapsLink") ?? "").trim() || null;
    const kategoriId = Number(formData.get("kategoriId"));
    const gambar = formData.getAll("gambar").map(String).filter(Boolean);

    if (!Number.isFinite(id) || id <= 0)
      return { ok: false, error: "ID tidak valid." };
    if (!nama || !Number.isFinite(kategoriId)) {
      return { ok: false, error: "Nama dan kategori wajib diisi." };
    }

    await prisma.umkm.update({
      where: { id },
      data: { nama, deskripsi, alamat, kontak, gmapsLink, kategoriId, gambar },
    });

    revalidatePath("/umkm");
    revalidatePath("/admin/umkm");

    // balik ke list Kelola UMKM
    return { ok: true, redirectTo: "/admin/umkm" };
  } catch (e: unknown) {
    return { ok: false, error: (e as Error)?.message ?? "Gagal menyimpan." };
  }
}

export default async function AdminUmkmEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isFinite(numId) || numId <= 0) notFound();

  const data = await prisma.umkm.findUnique({
    where: { id: numId },
    select: {
      id: true,
      nama: true,
      deskripsi: true,
      alamat: true,
      kontak: true,
      gmapsLink: true,
      kategoriId: true,
      gambar: true,
    },
  });
  if (!data) notFound();

  const kategori = await prisma.kategoriUmkm.findMany({
    orderBy: { nama: "asc" },
    select: { id: true, nama: true },
  });

  return (
    <div className="max-w-3xl">
      <AdminHeader title="Edit UMKM" backHref="/admin/umkm" />
      <UmkmForm
        action={updateAction}
        initial={data}
        kategoriOptions={kategori}
        submitLabel="Simpan Perubahan"
      />
    </div>
  );
}
