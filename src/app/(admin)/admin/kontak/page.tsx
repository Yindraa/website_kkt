import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import AdminHeader from "@/app/(admin)/_components/AdminHeader";
import { Prisma } from "@prisma/client";

type SP = { q?: string; unreadOnly?: string };

async function markReadAction(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;
  await prisma.pesanKontak.update({
    where: { id },
    data: { isSudahDibaca: true },
  });
  revalidatePath("/admin/kontak");
}

export const dynamic = "force-dynamic";

export default async function AdminKontakPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const unreadOnly = sp.unreadOnly === "true";

  // WHERE mutable + tipe Prisma
  const where: Prisma.PesanKontakWhereInput = {};
  const and: Prisma.PesanKontakWhereInput[] = [];

  if (unreadOnly) and.push({ isSudahDibaca: false });
  if (q) {
    and.push({
      OR: [
        { nama: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
        { subjek: { contains: q, mode: "insensitive" } },
        { pesan: { contains: q, mode: "insensitive" } },
      ],
    });
  }
  if (and.length) where.AND = and;

  const rows = await prisma.pesanKontak.findMany({
    where,
    orderBy: { tanggalKirim: "desc" },
    select: {
      id: true,
      nama: true,
      email: true,
      subjek: true,
      pesan: true,
      tanggalKirim: true,
      isSudahDibaca: true,
    },
  });

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Kotak Masuk"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Kotak Masuk" },
        ]}
        backHref="/admin"
      />

      {/* Filter bar */}
      <form className="panel p-4 grid gap-2 sm:grid-cols-[1fr_auto_auto]">
        <input
          name="q"
          defaultValue={q}
          placeholder="Cari nama/email/subjek/pesan…"
          className="rounded-lg border border-slate-300 px-3 py-2"
        />
        <label className="inline-flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            name="unreadOnly"
            defaultChecked={unreadOnly}
            value="true"
            className="size-4"
          />
          Hanya belum dibaca
        </label>
        <button className="btn btn-primary">Terapkan</button>
      </form>

      {/* List pesan */}
      <div className="grid gap-3">
        {rows.length === 0 && (
          <div className="panel p-4 text-sm text-slate-500">
            Tidak ada pesan.
          </div>
        )}

        {rows.map((p) => (
          <article
            id={`pesan-${p.id}`}
            key={p.id}
            className="panel p-4 border border-slate-200 rounded-xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-semibold text-slate-900 truncate">
                  {p.subjek}
                </h3>
                <div className="text-sm text-slate-600">
                  Dari <span className="font-medium">{p.nama}</span> ·{" "}
                  <a className="uline" href={`mailto:${p.email}`}>
                    {p.email}
                  </a>{" "}
                  · {new Date(p.tanggalKirim).toLocaleString("id-ID")}
                </div>
              </div>
              {!p.isSudahDibaca ? (
                <form action={markReadAction}>
                  <input type="hidden" name="id" value={p.id} />
                  <button className="btn btn-ghost">Tandai Dibaca</button>
                </form>
              ) : (
                <span className="rounded-full bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 text-xs">
                  Sudah dibaca
                </span>
              )}
            </div>
            <p className="mt-2 text-slate-800 whitespace-pre-wrap">{p.pesan}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
