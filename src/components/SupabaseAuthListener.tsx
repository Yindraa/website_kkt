// src/components/SupabaseAuthListener.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function SupabaseAuthListener() {
  const router = useRouter();
  useEffect(() => {
    const { data: sub } = supabaseBrowser.auth.onAuthStateChange((event) => {
      if (
        event === "SIGNED_IN" ||
        event === "SIGNED_OUT" ||
        event === "TOKEN_REFRESHED"
      ) {
        router.refresh();
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [router]);
  return null;
}
