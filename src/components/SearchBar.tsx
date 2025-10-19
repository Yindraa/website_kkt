// src/components/SearchBar.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBar({
  placeholder = "Cari...",
}: {
  placeholder?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");

  useEffect(() => {
    setQ(params.get("q") ?? "");
  }, [params]);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const usp = new URLSearchParams(Array.from(params.entries()));
    const value = q.trim();

    if (value) {
      usp.set("q", value);
    } else {
      usp.delete("q");
    }

    router.push(`${pathname}?${usp.toString()}`);
  }

  return (
    <form onSubmit={submit} className="container-narrow">
      <div className="flex gap-2">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          aria-label="Cari"
          className="w-full rounded-xl border border-white/15 bg-white/10 text-white placeholder:text-white/60 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/40"
        />
        <button className="btn btn-primary" type="submit">
          Cari
        </button>
      </div>
    </form>
  );
}
