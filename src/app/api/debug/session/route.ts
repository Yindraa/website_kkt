// src/app/api/debug/session/route.ts
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function GET(req: NextRequest) {
  // siapkan response yang bisa ditulis cookie (supabase kadang refresh token di sini)
  const res = NextResponse.json({ ok: true });

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return req.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            res.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            res.cookies.set({ name, value: "", ...options, maxAge: 0 });
          },
        },
      }
    );

    const { data, error } = await supabase.auth.getSession();

    return NextResponse.json(
      {
        ok: !error,
        server: {
          NEXT_PUBLIC_SUPABASE_URL:
            process.env.NEXT_PUBLIC_SUPABASE_URL ?? null,
          NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env
            .NEXT_PUBLIC_SUPABASE_ANON_KEY
            ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.slice(
                0,
                8
              )}…(public)`
            : null,
          nodeEnv: process.env.NODE_ENV,
        },
        session: data.session
          ? {
              id: data.session.user.id,
              email: data.session.user.email,
              expires_at: data.session.expires_at,
            }
          : null,
        error: error?.message ?? null,
      },
      { status: error ? 401 : 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: (e as Error).message },
      { status: 500 }
    );
  }
}
