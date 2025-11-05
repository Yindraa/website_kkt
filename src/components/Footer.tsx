// src/components/Footer.tsx
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const LINKS = [
  { href: "/profil", label: "Profil" },
  { href: "/berita", label: "Berita" },
  { href: "/umkm", label: "UMKM" },
  { href: "/wisata", label: "Potensi Wisata" },
  { href: "/kesehatan", label: "Layanan Kesehatan" },
  { href: "/kontak-layanan", label: "Kontak & Layanan" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-700/95 text-white border-t border-white/10 backdrop-blur">
      {/* CONTENT AREA */}
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-3">
        {/* Brand / Address */}
        <div className="space-y-2">
          <div className="text-lg font-semibold tracking-tight">
            Pemerintah Desa Leilem
          </div>
          <div className="text-white/80 flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 opacity-80" />
            <span>Minahasa, Sulawesi Utara</span>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            Portal informasi resmi desa: Berita, UMKM, Wisata, Layanan
            Kesehatan, dan Kontak Layanan.
          </p>
        </div>

        {/* Quick Links */}
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-6 gap-y-2 md:justify-center"
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-white/85 hover:text-white transition-colors text-sm"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Contact */}
        <div className="space-y-2 md:text-right">
          <div className="text-sm text-white/80">Kontak</div>
          <div className="text-white/90 flex md:justify-end items-center gap-2">
            <Phone size={16} className="opacity-80" />
            <span>0851-7433-1388</span>
          </div>
          <div className="text-white/90 flex md:justify-end items-center gap-2">
            <Mail size={16} className="opacity-80" />
            <a
              href="mailto:www.desaleilem@yahoo.co.id"
              className="underline underline-offset-4 decoration-white/40 hover:decoration-white"
            >
              www.desaleilem@yahoo.co.id
            </a>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-white/10" />

      {/* BOTTOM BAR */}
      <div className="mx-auto max-w-6xl px-4 h-12 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-white/80">
        <div>© {new Date().getFullYear()} Website Desa Leilem</div>
        <div className="text-white/70">PEMERINTAHAN DESA LEILEM</div>
      </div>
    </footer>
  );
}
