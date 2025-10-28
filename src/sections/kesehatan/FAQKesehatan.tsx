// src/sections/kesehatan/FAQKesehatan.tsx
export type FAQItem = { q: string; a: string };

export default function FAQKesehatan({
  items,
  className = "",
  title = "Pertanyaan yang Sering Diajukan (FAQ)",
}: {
  items: FAQItem[];
  className?: string;
  title?: string;
}) {
  return (
    <section className={`panel p-5 ${className}`}>
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>

      <div className="mt-3 divide-y divide-slate-200">
        {items.map((it, i) => (
          <details key={i} className="group py-3">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
              <span className="font-medium text-slate-900">{it.q}</span>
              <span
                aria-hidden
                className="ml-auto shrink-0 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-600 transition group-open:rotate-180"
              >
                ▼
              </span>
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              {it.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
