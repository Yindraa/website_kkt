// src/app/(public)/berita/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";

export async function generateStaticParams() {
  const latest = await prisma.berita.findMany({
    where: { isDraft: false },
    orderBy: { tanggalPublish: "desc" },
    take: 20,
    select: { slug: true },
  });
  return latest.map((b) => ({ slug: b.slug }));
}

// (opsional) revalidate tiap 60 detik
export const revalidate = 60;

type Params = { slug: string };

export default async function BeritaDetailPage({
  // ⬅️ Next 15: params adalah Promise, WAJIB di-await
  params,
}: {
  params: Promise<Params>;
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
        <Image
          src={data.gambarUtama}
          alt={data.judul}
          width={1200}
          height={630}
          className="w-full rounded-lg"
          unoptimized
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
