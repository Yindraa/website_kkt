// src/sections/wisata/LongTextPanel.tsx
"use client";

import { useState } from "react";

export default function LongTextPanel({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  const [open, setOpen] = useState(false);
  const preview = text.slice(0, 420); // potong preview pendek (tidak memutus paragraf panjang)

  return (
    <section className="panel p-5 space-y-3">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <div className="prose prose-slate max-w-none">
        {open ? (
          <pre className="whitespace-pre-wrap font-sans text-slate-800">
            {text}
          </pre>
        ) : (
          <p className="text-slate-800">
            {preview}
            {text.length > preview.length ? "…" : ""}
          </p>
        )}
      </div>
      {!open && text.length > preview.length && (
        <button className="btn btn-ghost" onClick={() => setOpen(true)}>
          Baca selengkapnya
        </button>
      )}
    </section>
  );
}
