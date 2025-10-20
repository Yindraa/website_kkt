// src/app/(admin)/admin/(protected)/layout.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabaseServer";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode; // gunakan React.ReactNode langsung tanpa import
}) {
  const supabase = await getSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login?redirect=/admin");
  }

  return <>{children}</>;
}
