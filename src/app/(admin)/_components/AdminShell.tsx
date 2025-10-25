"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutGrid, Newspaper, LogOut, Menu, Store, Mail } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // 1) Sinkronkan event auth -> cookie server (berjalan saat SIGNED_IN / TOKEN_REFRESHED / SIGNED_OUT)
  useEffect(() => {
    const { data: sub } = supabaseBrowser.auth.onAuthStateChange(
      async (event, session) => {
        try {
          await fetch("/api/auth/state", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ event, session }),
            credentials: "include",
          });
        } catch {
          // noop
        }
      }
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  // 2) Penting: kirim INITIAL_SESSION sekali saat mount
  useEffect(() => {
    (async () => {
      const { data } = await supabaseBrowser.auth.getSession();
      if (data.session) {
        try {
          await fetch("/api/auth/state", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              event: "INITIAL_SESSION",
              session: data.session,
            }),
            credentials: "include",
          });
        } catch {
          // noop
        }
      }
    })();
  }, []);

  const nav = [
    { href: "/admin", label: "Dashboard", icon: LayoutGrid },
    { href: "/admin/berita", label: "Berita", icon: Newspaper },
    { href: "/admin/umkm", label: "UMKM", icon: Store },
    { href: "/admin/kontak", label: "Kontak", icon: Mail },
  ];

  const signOutHref = "/api/auth/signout?redirect=/admin/login";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-lg p-2 hover:bg-slate-100 lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu size={18} />
          </button>

          <Link href="/admin" className="font-semibold text-slate-900">
            Admin Desa Leilem
          </Link>

          {/* Sign out (desktop) */}
          <Link
            href={signOutHref}
            className="hidden lg:inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm hover:bg-slate-50"
            aria-label="Keluar"
          >
            <LogOut size={16} />
            Keluar
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 grid lg:grid-cols-[220px_1fr] gap-6">
        {/* Sidebar */}
        <aside
          className={[
            "rounded-2xl border border-slate-200 bg-white p-3 h-max",
            open ? "" : "hidden",
            "lg:block",
          ].join(" ")}
        >
          <nav className="space-y-1">
            {nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm",
                    active
                      ? "bg-brand-50 text-brand-700 border border-brand-100"
                      : "hover:bg-slate-50 border border-transparent text-slate-700",
                  ].join(" ")}
                  onClick={() => setOpen(false)}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Keluar (mobile) */}
          <Link
            href={signOutHref}
            className="lg:hidden mt-3 w-full inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
            aria-label="Keluar"
          >
            <LogOut size={16} />
            Keluar
          </Link>
        </aside>

        {/* Main */}
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
