// src/sections/profil/VisionMissions.tsx
"use client";

export default function VisionMissions({
  visi,
  misi,
}: {
  visi: string;
  misi: string[];
}) {
  return (
    <section className="panel p-5 space-y-4">
      <h2 className="text-xl font-bold text-slate-900">Visi & Misi</h2>

      <div>
        <h3 className="font-semibold text-slate-800">Visi</h3>
        <p className="mt-1 text-slate-700">{visi}</p>
      </div>

      <div>
        <h3 className="font-semibold text-slate-800">Misi</h3>
        <ol className="mt-1 list-decimal pl-5 space-y-1 text-slate-700">
          {misi.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
