// src/sections/kesehatan/LayananList.tsx
import { Baby, HeartPulse } from "lucide-react";

type Item = {
  title: string;
  peserta: string;
  kegiatan: string[];
  pelaksana: string;
};

export default function LayananList({
  items,
  className = "",
}: {
  items: Item[];
  className?: string;
}) {
  return (
    <section className={className}>
      <h2 className="sr-only">Daftar Layanan</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((it) => (
          <article key={it.title} className="panel p-5">
            <header className="flex items-center gap-2">
              <span className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                {it.title.toLowerCase().includes("lansia") ? (
                  <HeartPulse className="h-5 w-5 text-rose-600" />
                ) : (
                  <Baby className="h-5 w-5 text-emerald-600" />
                )}
              </span>
              <h3 className="font-semibold text-slate-900">{it.title}</h3>
            </header>

            <dl className="mt-3 text-sm">
              <dt className="text-slate-500">Peserta</dt>
              <dd className="mb-2 text-slate-700">{it.peserta}</dd>

              <dt className="text-slate-500">Kegiatan Utama</dt>
              <dd>
                <ul className="mt-1 list-disc pl-5 text-slate-700">
                  {it.kegiatan.map((k) => (
                    <li key={k}>{k}</li>
                  ))}
                </ul>
              </dd>

              <dt className="mt-3 text-slate-500">Pelaksana</dt>
              <dd className="text-slate-700">{it.pelaksana}</dd>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
