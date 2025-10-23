// src/sections/profil/components/StrukturGrid.tsx
import Image from "next/image";

type Item = { jabatan: string; nama: string; foto?: string };

export default function StrukturGrid({ struktur }: { struktur: Item[] }) {
  return (
    <section className="panel p-5">
      <h2 className="text-lg font-semibold text-slate-900">
        Struktur Pemerintahan Desa
      </h2>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {struktur.map((s) => {
          const key = `${s.jabatan}-${s.nama}`;
          return (
            <div key={key} className="rounded-lg border border-slate-200 p-3">
              <div className="flex items-center gap-3">
                {s.foto ? (
                  <Image
                    src={s.foto}
                    alt={s.nama}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full object-cover border"
                    unoptimized
                  />
                ) : (
                  <div className="h-14 w-14 rounded-full bg-slate-100 border grid place-items-center text-slate-600 font-semibold">
                    {s.nama
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </div>
                )}

                <div className="min-w-0">
                  <div className="font-semibold text-slate-900 truncate">
                    {s.nama}
                  </div>
                  <div className="text-sm text-slate-600">{s.jabatan}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
