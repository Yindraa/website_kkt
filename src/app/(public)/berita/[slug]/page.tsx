// src/app/(public)/berita/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import SourceAttribution from "@/sections/berita/components/SourceAttribution";

// Untuk SEO dinamis
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const b = await prisma.berita.findUnique({
    where: { slug },
    select: {
      judul: true,
      gambarUtama: true,
      sumberEksternal: true,
      tanggalPublish: true,
      isDraft: true,
    },
  });
  if (!b || b.isDraft) return {};

  const title = b.judul;
  const description = "Ringkasan berita dari sumber tepercaya.";
  const ogImage = b.gambarUtama || "/og-default.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [ogImage],
    },
    alternates: {
      canonical: `/berita/${slug}`,
    },
  };
}

export const dynamic = "force-dynamic";

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const b = await prisma.berita.findUnique({
    where: { slug },
    select: {
      id: true,
      judul: true,
      slug: true,
      konten: true, // hanya ringkasan yang kamu tulis
      gambarUtama: true,
      sumberEksternal: true,
      tanggalPublish: true,
      isDraft: true,
    },
  });

  if (!b || b.isDraft) notFound();

  // JSON-LD Article (SEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: b.judul,
    datePublished: new Date(b.tanggalPublish).toISOString(),
    dateModified: new Date(b.tanggalPublish).toISOString(),
    image: b.gambarUtama ? [b.gambarUtama] : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://yourdomain.com/berita/${b.slug}`,
    },
    isBasedOn: b.sumberEksternal || undefined,
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mb-4">
        <div className="text-xs text-slate-500">
          {new Date(b.tanggalPublish).toLocaleString("id-ID")}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {b.judul}
        </h1>
      </header>

      {b.gambarUtama ? (
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden border">
          <Image
            src={b.gambarUtama}
            alt={b.judul}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      ) : null}

      {/* Konten ringkasan */}
      {b.konten ? (
        <div className="prose prose-slate max-w-none mt-4">
          <p className="whitespace-pre-wrap">{b.konten}</p>
        </div>
      ) : (
        <p className="mt-4 text-slate-600">
          Ringkasan belum tersedia. Silakan baca versi lengkap di sumber.
        </p>
      )}

      {/* Atribusi sumber */}
      <SourceAttribution sumber={b.sumberEksternal} className="mt-6" />

      {/* Tombol kembali */}
      <div className="mt-6">
        <Link href="/berita" className="btn btn-ghost">
          ← Kembali ke daftar berita
        </Link>
      </div>
    </article>
  );
}
