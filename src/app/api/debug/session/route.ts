// src/app/api/debug/session/route.ts
import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabaseServer";

export async function GET() {
  try {
    const supabase = await getSupabaseServer();
    const { data } = await supabase.auth.getSession();

    return NextResponse.json({
      ok: true,
      server: {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? null,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.slice(0, 8)}…(public)`
          : null,
        nodeEnv: process.env.NODE_ENV,
      },
      session: {
        hasSession: !!data.session,
        user: data.session
          ? { id: data.session.user.id, email: data.session.user.email }
          : null,
      },
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: (e as Error).message },
      { status: 500 }
    );
  }
}
