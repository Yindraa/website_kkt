// src/sections/kesehatan/CTAKontak.tsx
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";

export default function CTAKontak({
  note,
  waHref,
  altLinkHref = "/kontak",
  className = "",
}: {
  note: string;
  waHref: string;
  altLinkHref?: string;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl border border-slate-200 p-5 ${className}`}>
      <p className="text-slate-700">{note}</p>
      <div className="mt-3 flex flex-wrap gap-3">
        <Link
          href={waHref}
          target="_blank"
          className="inline-flex items-center gap-2 btn btn-primary"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </Link>
        <Link
          href={altLinkHref}
          className="inline-flex items-center gap-2 btn btn-ghost"
        >
          <Phone className="h-4 w-4" />
          Halaman Kontak
        </Link>
      </div>
    </section>
  );
}
