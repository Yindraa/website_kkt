// src/app/(admin)/admin/berita/new/page.tsx
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import AdminBeritaForm, {
  type FormState,
} from "../_components/AdminBeritaForm";
import { ensureUniqueSlug, slugifyBase } from "@/lib/slug";

async function createAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  "use server";
  try {
    const judul = String(formData.get("judul") || "").trim();
    const konten = String(formData.get("konten") || "").trim();
    const gambarUtama =
      String(formData.get("gambarUtama") || "").trim() || null;
    const sumberEksternal =
      String(formData.get("sumberEksternal") || "").trim() || null;
    const isDraft = formData.get("isDraft") === "on";

    if (!judul) return { ok: false, error: "Judul wajib diisi." };
    if (!konten && !sumberEksternal) {
      return { ok: false, error: "Isi konten atau cantumkan link sumber." };
    }
    if (sumberEksternal) {
      try {
        const u = new URL(sumberEksternal);
        if (!/^https?:$/.test(u.protocol)) throw new Error();
      } catch {
        return { ok: false, error: "URL sumber tidak valid." };
      }
    }

    const base = slugifyBase(judul);
    const slug = await ensureUniqueSlug(prisma, base);

    const row = await prisma.berita.create({
      data: { judul, slug, konten, gambarUtama, isDraft, sumberEksternal },
      select: { id: true, slug: true, isDraft: true },
    });

    // Revalidate halaman publik & admin
    revalidatePath("/berita");
    if (!row.isDraft) revalidatePath(`/berita/${row.slug}`);
    revalidatePath("/admin/berita");

    redirect(`/admin/berita/${row.id}/edit`);
  } catch (err: unknown) {
    return { ok: false, error: (err as Error).message ?? "Gagal menyimpan." };
  }
}

export default function AdminBeritaNewPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
        Tambah Berita
      </h1>
      <AdminBeritaForm action={createAction} submitLabel="Simpan" />
    </div>
  );
}
