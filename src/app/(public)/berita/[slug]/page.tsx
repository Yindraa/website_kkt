// src/app/(public)/berita/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BeritaTipe } from "@prisma/client";
import SourceAttribution from "@/sections/berita/components/SourceAttribution";

export const dynamic = "force-dynamic";

// ---- helper: format rentang event
function fmtEventRange(mulai?: Date | null, selesai?: Date | null): string {
  if (!mulai && !selesai) return "—";
  if (mulai && selesai) {
    return `${mulai.toLocaleString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    })} – ${selesai.toLocaleString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    })}`;
  }
  const d = (mulai ?? selesai)!;
  return d.toLocaleString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// =====================
// SEO dinamis
// =====================
export async function generateMetadata({
  params,
}: {
  // ⬅️ penting: pakai Promise biar sama dengan tipe yang Next.js kamu generate
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
      tipe: true,
      tanggalEventMulai: true,
      tanggalEventSelesai: true,
      lokasi: true,
    },
  });

  if (!b || b.isDraft) return {};

  const isEvent = b.tipe === BeritaTipe.EVENT;
  const title = isEvent ? `${b.judul} (Event)` : b.judul;
  const description = isEvent
    ? "Informasi event/kegiatan desa."
    : "Ringkasan berita dari Desa Leilem.";
  const ogImage = b.gambarUtama || "/og-default.png";

  return {
    title,
    description,
    // ❗️Next.js kamu tadi error karena openGraph.type = "event"
    // jadi kita pakai "article" saja untuk semuanya
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

// =====================
// Halaman utama
// =====================
export default async function BeritaDetailPage({
  params,
}: {
  // ⬅️ sama: params adalah Promise
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const b = await prisma.berita.findUnique({
    where: { slug },
    select: {
      id: true,
      judul: true,
      slug: true,
      konten: true,
      gambarUtama: true,
      sumberEksternal: true,
      tanggalPublish: true,
      isDraft: true,
      tipe: true,
      tanggalEventMulai: true,
      tanggalEventSelesai: true,
      lokasi: true,
      isRecurring: true,
      recurringNote: true,
    },
  });

  // kalau draft atau ga ada → 404
  if (!b || b.isDraft) notFound();

  const isEvent = b.tipe === BeritaTipe.EVENT;
  const eventRange = isEvent
    ? fmtEventRange(b.tanggalEventMulai, b.tanggalEventSelesai)
    : null;

  // JSON-LD masih boleh event di sini (ini bukan openGraph)
  const jsonLd = isEvent
    ? {
        "@context": "https://schema.org",
        "@type": "Event",
        name: b.judul,
        startDate: (b.tanggalEventMulai ?? b.tanggalPublish).toISOString(),
        endDate: b.tanggalEventSelesai
          ? b.tanggalEventSelesai.toISOString()
          : undefined,
        eventStatus: "https://schema.org/EventScheduled",
        image: b.gambarUtama ? [b.gambarUtama] : undefined,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: b.lokasi || "Desa Leilem",
          address: b.lokasi || "Sonder, Minahasa",
        },
        organizer: { "@type": "Organization", name: "Pemerintah Desa Leilem" },
        isBasedOn: b.sumberEksternal || undefined,
      }
    : {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: b.judul,
        datePublished: b.tanggalPublish.toISOString(),
        dateModified: b.tanggalPublish.toISOString(),
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

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span
            className={[
              "inline-flex rounded px-2 py-0.5 text-xs font-medium",
              isEvent
                ? "bg-amber-100 text-amber-700"
                : "bg-sky-100 text-sky-700",
            ].join(" ")}
          >
            {isEvent ? "Event" : "Artikel"}
          </span>
          {isEvent && (
            <>
              <span className="text-xs text-slate-600">
                Jadwal: {eventRange ?? "—"}
              </span>
              {b.lokasi ? (
                <span className="text-xs text-slate-600">• {b.lokasi}</span>
              ) : null}
              {b.isRecurring && b.recurringNote ? (
                <span className="text-xs text-amber-700">
                  • {b.recurringNote}
                </span>
              ) : null}
            </>
          )}
        </div>
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

      {b.konten ? (
        <div className="prose prose-slate max-w-none mt-4">
          <p className="whitespace-pre-wrap">{b.konten}</p>
        </div>
      ) : (
        <p className="mt-4 text-slate-600">
          Ringkasan belum tersedia. Silakan baca versi lengkap di sumber.
        </p>
      )}

      <SourceAttribution sumber={b.sumberEksternal} className="mt-6" />

      <div className="mt-6">
        <Link href="/berita" className="btn btn-ghost">
          ← Kembali ke daftar berita
        </Link>
      </div>
    </article>
  );
}
