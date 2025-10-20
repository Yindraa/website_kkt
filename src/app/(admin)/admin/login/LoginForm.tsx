"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function LoginForm() {
  const router = useRouter();
  const sp = useSearchParams();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
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
      setErr(error.message);
      return;
    }

    const redirectTo = sp.get("redirect") || "/admin";
    router.replace(redirectTo);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        type="email"
        placeholder="Email"
        className="w-full rounded-lg border border-slate-300 px-3 py-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full rounded-lg border border-slate-300 px-3 py-2"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        required
      />

      <button className="btn btn-primary w-full" disabled={loading}>
        {loading ? "Masuk..." : "Masuk"}
      </button>

      {err && <p className="text-sm text-red-600">{err}</p>}
    </form>
  );
}
