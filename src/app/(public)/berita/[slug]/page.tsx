// src/app/(public)/berita/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const revalidate = 60; // ISR

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await prisma.berita.findUnique({
    where: { slug },
  });

  if (!data || data.isDraft) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 prose prose-slate">
      <h1>{data.judul}</h1>
      <p className="text-sm text-slate-500">
        {new Date(data.tanggalPublish).toLocaleString("id-ID")}
      </p>

      {data.gambarUtama ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={data.gambarUtama}
          alt={data.judul}
          className="w-full rounded-lg"
        />
      ) : null}

      {data.sumberEksternal && !data.konten?.trim() ? (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p>Berita ini berasal dari sumber eksternal.</p>
          <p className="mt-2">
            <a
              className="btn btn-primary"
              href={data.sumberEksternal}
              target="_blank"
            >
              Baca lengkap di sumber
            </a>
          </p>
        </div>
      ) : (
        <div className="mt-4 whitespace-pre-wrap">{data.konten}</div>
      )}

      {data.sumberEksternal && data.konten?.trim() ? (
        <p className="mt-4">
          <a className="uline" href={data.sumberEksternal} target="_blank">
            Sumber eksternal
          </a>
        </p>
      ) : null}
    </article>
  );
}
