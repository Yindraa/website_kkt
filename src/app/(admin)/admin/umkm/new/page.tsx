import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import UmkmForm, { type FormState } from "../_components/UmkmForm";
import AdminHeader from "@/app/(admin)/_components/AdminHeader";

async function createAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  "use server";
  try {
    const nama = String(formData.get("nama") ?? "").trim();
    const deskripsi = String(formData.get("deskripsi") ?? "").trim() || null;
    const alamat = String(formData.get("alamat") ?? "").trim() || null;
    const kontak = String(formData.get("kontak") ?? "").trim() || null;
    const gmapsLink = String(formData.get("gmapsLink") ?? "").trim() || null;
    const kategoriId = Number(formData.get("kategoriId"));
    const gambar = formData.getAll("gambar").map(String).filter(Boolean);
    const pemilik = String(formData.get("pemilik") ?? "").trim() || null;
    const websiteUrl = String(formData.get("websiteUrl") ?? "").trim() || null;
    const instagramUrl =
      String(formData.get("instagramUrl") ?? "").trim() || null;
    const facebookUrl =
      String(formData.get("facebookUrl") ?? "").trim() || null;
    const tiktokUrl = String(formData.get("tiktokUrl") ?? "").trim() || null;
    const xUrl = String(formData.get("xUrl") ?? "").trim() || null;
    const youtubeUrl = String(formData.get("youtubeUrl") ?? "").trim() || null;

    if (!nama || !Number.isFinite(kategoriId)) {
      return { ok: false, error: "Nama dan kategori wajib diisi." };
    }

    await prisma.umkm.create({
      data: {
        nama,
        deskripsi,
        alamat,
        kontak,
        gmapsLink,
        kategoriId,
        gambar,
        pemilik,
        websiteUrl,
        instagramUrl,
        facebookUrl,
        tiktokUrl,
        xUrl,
        youtubeUrl,
      },
      select: { id: true },
    });

    revalidatePath("/umkm");
    revalidatePath("/admin/umkm");

    // balik ke list Kelola UMKM
    return { ok: true, redirectTo: "/admin/umkm" };
  } catch (e: unknown) {
    return { ok: false, error: (e as Error)?.message ?? "Gagal menyimpan." };
  }
}

export default async function AdminUmkmNewPage() {
  const kategori = await prisma.kategoriUmkm.findMany({
    orderBy: { nama: "asc" },
    select: { id: true, nama: true },
  });

  return (
    <div className="max-w-3xl">
      <AdminHeader title="Tambah UMKM" backHref="/admin/umkm" />
      <UmkmForm
        action={createAction}
        kategoriOptions={kategori}
        submitLabel="Simpan"
      />
    </div>
  );
}
