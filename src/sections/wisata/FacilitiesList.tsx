// src/sections/wisata/FacilitiesList.tsx

export default function FacilitiesList({ items }: { items: string[] }) {
  return (
    <section className="panel p-5">
      <h2 className="text-lg font-semibold text-slate-900">Fasilitas</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((f) => (
          <li
            key={f}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700"
          >
            {f}
          </li>
        ))}
      </ul>
    </section>
  );
}
