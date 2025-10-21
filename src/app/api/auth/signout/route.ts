// src/app/api/auth/signout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseRoute } from "@/lib/supabaseServer";

// Helper agar tidak duplikasi
async function doSignOutAndRedirect(req: NextRequest) {
  // WAJIB: getSupabaseRoute() sekarang async
  const supabase = await getSupabaseRoute();
  await supabase.auth.signOut();

  // Ambil tujuan redirect dari query (opsional)
  const raw = req.nextUrl.searchParams.get("redirect") ?? "/admin/login";

  // Sanitasi: hanya izinkan path yang diawali "/" agar tidak open-redirect
  const redirectPath = raw.startsWith("/") ? raw : "/admin/login";

  // Redirect absolut supaya aman di prod
  const url = new URL(redirectPath, req.nextUrl.origin);
  return NextResponse.redirect(url, { status: 303 }); // 303 cocok untuk hasil POST juga
}

// GET /api/auth/signout?redirect=/admin/login
export async function GET(req: NextRequest) {
  return doSignOutAndRedirect(req);
}

// POST /api/auth/signout (form submit)
export async function POST(req: NextRequest) {
  return doSignOutAndRedirect(req);
}
