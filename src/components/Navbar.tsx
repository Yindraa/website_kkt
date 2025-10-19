"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { href: "/profil", label: "Profil" },
  { href: "/berita", label: "Berita" },
  { href: "/umkm", label: "UMKM" },
  { href: "/wisata", label: "Potensi Wisata" },
  { href: "/kesehatan", label: "Layanan Kesehatan" },
  { href: "/kontak-layanan", label: "Kontak & Layanan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-brand-700/90 border-b border-white/10 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight focus:outline-none focus:ring-2 focus:ring-white/40 rounded text-white"
        >
          Desa Leilem
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {LINKS.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <div key={l.href} className="relative">
                <Link
                  href={l.href}
                  className={`text-sm px-1.5 py-1.5 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 ${
                    active ? "text-white" : "text-white/85 hover:text-white"
                  }`}
                >
                  {l.label}
                </Link>
                {active && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 -bottom-1 h-[2px] rounded bg-white/80"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </div>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg border border-white/15 text-white/90 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-brand-700/95 border-t border-white/10 backdrop-blur"
          >
            <div className="mx-auto max-w-6xl px-4 py-2">
              {LINKS.map((l, i) => {
                const active = pathname.startsWith(l.href);
                return (
                  <motion.div
                    key={l.href}
                    initial={{ y: -6, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.02 * i }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-white/30 ${
                        active
                          ? "bg-white/15 text-white"
                          : "text-white/90 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
