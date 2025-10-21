// src/app/(admin)/admin/(protected)/layout.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabaseServer";
import AdminShell from "@/app/(admin)/_components/AdminShell";
import type { ReactNode } from "react";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  // getSupabaseServer() adalah async (RSC: await cookies()), jadi WAJIB await
  const supabase = await getSupabaseServer(); // READ-ONLY client

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login?redirect=/admin");
  }

  return <AdminShell>{children}</AdminShell>;
}
