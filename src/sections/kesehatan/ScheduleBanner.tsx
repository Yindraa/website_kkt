// src/sections/kesehatan/ScheduleBanner.tsx
import { CalendarClock, Hospital, ShieldPlus } from "lucide-react";

export default function ScheduleBanner({
  title = "Jadwal Kegiatan Kesehatan",
  note = "Kegiatan kesehatan dilaksanakan setiap bulan dan dibina oleh Puskesmas Sonder.",
  noFacilityNote = "Tidak terdapat fasilitas kesehatan tetap di desa (seperti Pustu/Polindes).",
  ctaText = "Lihat pengumuman jadwal terbaru",
  ctaHref = "/berita?q=jadwal%20kesehatan", // ganti bila perlu
}: {
  title?: string;
  note?: string;
  noFacilityNote?: string;
  ctaText?: string;
  ctaHref?: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50" />
      <div className="relative p-5 sm:p-6 flex flex-col gap-4">
        {/* header */}
        <div className="flex items-start gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-amber-200">
            <CalendarClock className="h-5 w-5 text-amber-700" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            <p className="text-sm text-slate-700">{note}</p>
          </div>
        </div>

        {/* garis info */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-white/80 backdrop-blur border border-amber-200 px-3 py-2">
            <ShieldPlus className="h-4 w-4 text-amber-700" />
            <span className="text-sm text-slate-800">
              Posyandu & Posyandu Lansia
            </span>
            <span className="mx-2 hidden sm:inline text-slate-300">•</span>
            <span className="text-xs rounded bg-amber-100 text-amber-800 px-2 py-0.5">
              Setiap Bulan
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-white/80 backdrop-blur border border-rose-200 px-3 py-2">
            <Hospital className="h-4 w-4 text-rose-700" />
            <span className="text-sm text-slate-800">{noFacilityNote}</span>
          </div>
        </div>

        {/* CTA */}
        {ctaHref && (
          <div>
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm px-3 py-2"
            >
              {ctaText} →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
