// src/app/api/auth/signout/route.ts
import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabaseServer";

export async function POST() {
  const supabase = await getSupabaseServer();
  await supabase.auth.signOut(); // hapus cookie di server
  return NextResponse.json({ ok: true });
}
