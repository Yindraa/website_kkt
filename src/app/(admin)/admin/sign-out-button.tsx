// src/app/(admin)/admin/sign-out-button.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSignOut() {
    setLoading(true);
    await fetch("/api/auth/signout", { method: "POST" });
    setLoading(false);
    router.replace("/admin/login");
  }

  return (
    <button className="btn btn-ghost" onClick={onSignOut} disabled={loading}>
      {loading ? "Keluar..." : "Keluar"}
    </button>
  );
}
