// src/sections/wisata/FAQAccordion.tsx
"use client";

import { useState } from "react";

export default function FAQAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="panel p-5">
      <h2 className="text-lg font-semibold text-slate-900">Pertanyaan Umum</h2>
      <div className="mt-3 divide-y divide-slate-200">
        {items.map((it, i) => (
          <div key={it.q} className="py-3">
            <button
              className="w-full flex items-center justify-between text-left"
              onClick={() => setOpen((v) => (v === i ? null : i))}
              aria-expanded={open === i}
            >
              <span className="font-medium text-slate-900">{it.q}</span>
              <span className="text-slate-500">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <p className="mt-2 text-sm text-slate-700">{it.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
