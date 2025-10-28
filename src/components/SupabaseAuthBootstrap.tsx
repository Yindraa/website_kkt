// src/components/SupabaseAuthBootstrap.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function SupabaseAuthBootstrap() {
  const router = useRouter();

  useEffect(() => {
    let unsub = () => {};

    (async () => {
      // 1) Hangatkan session di client
      const { data: init } = await supabaseBrowser.auth.getSession();

      // 2) Sinkronkan cookie httpOnly di server (INITIAL_SESSION)
      try {
        const res = await fetch("/api/auth/state", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // <-- penting agar cookie ditulis
          body: JSON.stringify({
            event: "INITIAL_SESSION",
            session: init.session,
          }),
        });
        if (res.ok) {
          // force server components / loaders baca cookie terbaru
          router.refresh();
        }
      } catch {
        // diamkan saja
      }

      // 3) Subscribe perubahan auth dan sinkronkan lagi
      const { data: sub } = supabaseBrowser.auth.onAuthStateChange(
        async (event, session) => {
          try {
            const res = await fetch("/api/auth/state", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({ event, session }),
            });
            if (res.ok) router.refresh();
          } catch {
            // diamkan saja
          }
        }
      );

      unsub = () => sub.subscription.unsubscribe();
    })();

    return () => unsub();
  }, [router]);

  return null;
}
