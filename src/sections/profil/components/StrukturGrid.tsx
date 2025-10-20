// src/sections/profil/components/StrukturGrid.tsx
import { Pejabat } from "../types";

export default function StrukturGrid({ struktur }: { struktur: Pejabat[] }) {
  return (
    <section className="panel p-6">
      <h2 className="font-semibold text-slate-900">Struktur Pemerintahan</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {struktur.map((s) => (
          <div
            key={s.jabatan}
            className="rounded-lg border border-slate-200 p-3"
          >
            <div className="text-sm text-slate-500">{s.jabatan}</div>
            <div className="font-medium text-slate-900">{s.nama}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
