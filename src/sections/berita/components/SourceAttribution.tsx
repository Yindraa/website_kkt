// src/sections/berita/components/SourceAttribution.tsx
"use client";

import Link from "next/link";

function getDomain(url?: string | null): string | null {
  try {
    if (!url) return null;
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export default function SourceAttribution({
  sumber,
  className = "",
}: {
  sumber?: string | null;
  className?: string;
}) {
  const domain = getDomain(sumber);
  if (!sumber || !domain) return null;

  return (
    <div
      className={[
        "rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm",
        className,
      ].join(" ")}
    >
      <div className="font-medium text-slate-900">Atribusi Sumber</div>
      <p className="text-slate-700">
        Artikel ini adalah ringkasan. Hak cipta konten asli dimiliki oleh{" "}
        <span className="font-semibold">{domain}</span>.
      </p>
      <div className="mt-2">
        <Link
          href={sumber}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          Baca versi lengkap di sumber →
        </Link>
      </div>
    </div>
  );
}
