"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const sp = useSearchParams();

  // Ambil redirect di dalam Suspense boundary
  const redirectTo = useMemo(() => sp.get("redirect") || "/admin", [sp]);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const { error } = await supabaseBrowser.auth.signInWithPassword({
      email,
      password: pass,
    });

    setLoading(false);

    if (error) {
      setErr(error.message || "Gagal masuk. Coba lagi.");
      return;
    }
    router.replace(redirectTo);
  }

  return (
    <div className="w-full max-w-sm">
      {/* Brand/Header */}
      <div className="mb-5 text-center">
        <div className="inline-flex items-center gap-2">
          <span className="inline-grid place-items-center h-10 w-10 rounded-xl bg-brand-600 text-white shadow-soft">
            <Lock size={18} />
          </span>
          <div className="text-left">
            <h1 className="text-xl font-bold text-slate-900">
              Masuk Admin Desa
            </h1>
            <p className="text-sm text-slate-600">
              Akses dashboard pengelolaan konten
            </p>
          </div>
        </div>
      </div>

      {/* Card form */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
        <form onSubmit={onSubmit} className="space-y-3">
          {/* Email */}
          <label className="block text-sm font-medium text-slate-700">
            Email
            <div className="mt-1 relative">
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-300"
                placeholder="nama@email.com"
                aria-label="Email"
              />
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </label>

          {/* Password */}
          <label className="block text-sm font-medium text-slate-700">
            Kata Sandi
            <div className="mt-1 relative">
              <input
                type={showPass ? "text" : "password"}
                required
                autoComplete="current-password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-300"
                placeholder="••••••••"
                aria-label="Kata sandi"
              />
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 hover:bg-slate-100"
                aria-label={showPass ? "Sembunyikan sandi" : "Tampilkan sandi"}
              >
                {showPass ? (
                  <EyeOff size={16} className="text-slate-500" />
                ) : (
                  <Eye size={16} className="text-slate-500" />
                )}
              </button>
            </div>
          </label>

          {/* Error */}
          {err && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {err}
            </div>
          )}

          {/* Submit */}
          <button
            className="btn btn-primary w-full"
            type="submit"
            disabled={loading}
          >
            {loading ? "Memproses…" : "Masuk"}
          </button>

          {/* Tip */}
          <p className="text-xs text-slate-500 text-center">
            Pastikan akun Anda telah terdaftar di Supabase Auth.
          </p>
        </form>
      </div>

      {/* Footer kecil */}
      <p className="mt-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Pemerintah Desa Leilem
      </p>
    </div>
  );
}
