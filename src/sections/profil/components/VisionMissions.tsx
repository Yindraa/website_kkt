// src/sections/profil/components/VisionMission.tsx
export default function VisionMission() {
  return (
    <section className="panel p-6">
      <h2 className="font-semibold text-slate-900">Visi & Misi</h2>
      <div className="mt-3 grid gap-6 sm:grid-cols-2">
        <div>
          <div className="text-sm text-slate-500">Visi</div>
          <p className="mt-1 font-medium text-slate-900">
            “Menjadi desa yang maju, mandiri, dan sejahtera berlandaskan gotong
            royong.”
          </p>
        </div>
        <div>
          <div className="text-sm text-slate-500">Misi</div>
          <ul className="mt-1 list-disc pl-5 text-slate-600 space-y-1">
            <li>Peningkatan layanan publik yang cepat dan transparan.</li>
            <li>Pemberdayaan UMKM & ekonomi kreatif berbasis potensi lokal.</li>
            <li>Penguatan ketahanan sosial, kesehatan, dan pendidikan.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
