// src/app/(public)/berita/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const revalidate = 60; // ISR 60 detik

export default async function BeritaDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await prisma.berita.findUnique({
    where: { slug: params.slug },
  });
  if (!data || data.isDraft) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 prose prose-slate">
      <h1>{data.judul}</h1>
      <p className="text-sm text-slate-500">
        {new Date(data.tanggalPublish).toLocaleString("id-ID")}
      </p>
      {data.gambarUtama ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={data.gambarUtama}
          alt={data.judul}
          className="w-full rounded-lg"
        />
      ) : null}
      <div className="mt-4 whitespace-pre-wrap">{data.konten}</div>
      {data.sumberEksternal ? (
        <p className="mt-4">
          <a className="uline" href={data.sumberEksternal} target="_blank">
            Sumber eksternal
          </a>
        </p>
      ) : null}
    </article>
  );
}
