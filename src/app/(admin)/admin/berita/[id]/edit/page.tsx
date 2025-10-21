import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import AdminHeader from "@/app/(admin)/_components/AdminHeader";
import AdminBeritaForm, {
  type FormState,
} from "../../_components/AdminBeritaForm";
import { ensureUniqueSlug, slugifyBase } from "@/lib/slug";

async function updateAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  "use server";
  try {
    const id = Number(formData.get("id"));
    const judul = String(formData.get("judul") || "").trim();
    const konten = String(formData.get("konten") || "").trim();
    const gambarUtama =
      String(formData.get("gambarUtama") || "").trim() || null;
    const sumberEksternal =
      String(formData.get("sumberEksternal") || "").trim() || null;
    const isDraft = formData.get("isDraft") === "on";

    if (!Number.isFinite(id) || id <= 0) {
      return { ok: false, error: "ID tidak valid." };
    }
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

    const existing = await prisma.berita.findUnique({ where: { id } });
    if (!existing) return { ok: false, error: "Data tidak ditemukan." };

    // Regenerate slug hanya jika judul berubah
    let slug = existing.slug;
    if (existing.judul !== judul) {
      const base = slugifyBase(judul);
      slug = await ensureUniqueSlug(prisma, base, id);
    }

    await prisma.berita.update({
      where: { id },
      data: { judul, slug, konten, gambarUtama, isDraft, sumberEksternal },
    });

    // Revalidate publik & admin
    revalidatePath("/berita");
    revalidatePath(`/berita/${slug}`);
    revalidatePath("/admin/berita");

    // Tetap di halaman edit
    redirect(`/admin/berita/${id}/edit`);
  } catch (err: unknown) {
    return { ok: false, error: (err as Error)?.message ?? "Gagal menyimpan." };
  }
}

export default async function AdminBeritaEditPage({
  params,
}: {
  // Next 15: params adalah Promise dan harus di-await
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = Number(id);

  if (!Number.isFinite(numId) || numId <= 0) notFound();

  const data = await prisma.berita.findUnique({ where: { id: numId } });
  if (!data) notFound();

  return (
    <div className="max-w-3xl">
      <AdminHeader
        title="Edit Berita"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Berita", href: "/admin/berita" },
          { label: "Edit" },
        ]}
        backHref="/admin/berita"
        actions={
          <a
            href={`/berita/${data.slug}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            Lihat Halaman
          </a>
        }
      />

      <AdminBeritaForm
        action={updateAction}
        initial={{
          id: data.id,
          judul: data.judul,
          konten: data.konten,
          gambarUtama: data.gambarUtama,
          isDraft: data.isDraft,
          sumberEksternal: data.sumberEksternal,
        }}
        submitLabel="Simpan Perubahan"
      />
    </div>
  );
}
