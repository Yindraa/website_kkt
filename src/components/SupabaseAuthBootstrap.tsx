// src/components/SupabaseAuthBootstrap.tsx
"use client";

import { useEffect } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function SupabaseAuthBootstrap() {
  useEffect(() => {
    let unsub = () => {};
    (async () => {
      // Hangatkan session di client
      const { data: init } = await supabaseBrowser.auth.getSession();

      // Sinkronkan ke server (cookie httpOnly) — event: INITIAL_SESSION
      try {
        await fetch("/api/auth/state", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            event: "INITIAL_SESSION",
            session: init.session,
          }),
        });
      } catch {
        // abaikan
      }

      // Teruskan sinkron untuk perubahan berikutnya (login/logout/refresh)
      const { data: sub } = supabaseBrowser.auth.onAuthStateChange(
        async (event, session) => {
          try {
            await fetch("/api/auth/state", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({ event, session }),
            });
          } catch {}
        }
      );
      unsub = () => sub.subscription.unsubscribe();
    })();
    return () => unsub();
  }, []);

  return null;
}
