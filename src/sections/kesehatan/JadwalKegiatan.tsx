// src/sections/kesehatan/JadwalKegiatan.tsx
import { CalendarClock, Info } from "lucide-react";

export default function JadwalKegiatan({
  frekuensi,
  catatan,
  className = "",
}: {
  frekuensi: string;
  catatan: string;
  className?: string;
}) {
  return (
    <section className={`panel p-5 ${className}`}>
      <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
        <CalendarClock className="h-5 w-5 text-indigo-600" />
        Jadwal Kegiatan
      </h2>
      <p className="mt-2 text-slate-700">
        Pelaksanaan: <span className="font-medium">{frekuensi}</span>
      </p>

      <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3 flex gap-2">
        <Info className="h-5 w-5 text-slate-500 shrink-0 mt-0.5" />
        <p className="text-sm text-slate-700">{catatan}</p>
      </div>
    </section>
  );
}
