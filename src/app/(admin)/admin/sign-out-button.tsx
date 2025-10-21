"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignOutButton({
  redirectTo = "/admin/login",
  className = "btn btn-ghost",
  children = "Keluar",
}: {
  redirectTo?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onClick() {
    try {
      setLoading(true);
      await fetch("/api/auth/signout", { method: "POST" });
      // opsional: refresh untuk memastikan guard membaca cookie baru (kosong)
      router.replace(`${redirectTo}?signedout=1`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      disabled={loading}
    >
      {loading ? "Keluar…" : children}
    </button>
  );
}
