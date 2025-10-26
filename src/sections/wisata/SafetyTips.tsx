// src/sections/wisata/SafetyTips.tsx

export default function SafetyTips({
  safety,
  tips,
}: {
  safety: string[];
  tips: string[];
}) {
  return (
    <section className="panel p-5">
      <h2 className="text-lg font-semibold text-slate-900">
        Keselamatan & Tips
      </h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border p-3">
          <div className="font-medium text-slate-900">Keselamatan</div>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
            {safety.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border p-3">
          <div className="font-medium text-slate-900">Tips Berkunjung</div>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
            {tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
