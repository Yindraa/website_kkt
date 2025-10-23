import { NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as {
      event?: string;
      session?: {
        access_token?: string;
        refresh_token?: string;
        [k: string]: unknown;
      } | null;
    };

    // Response yang bisa ditulisi cookie + non-cache
    const res = NextResponse.json({ ok: true }, { status: 200 });
    res.headers.set("Cache-Control", "no-store");

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

    const evt = (body.event || "").toUpperCase();

    if (evt === "SIGNED_OUT") {
      // Hapus cookie sesi
      await supabase.auth.signOut();
      return res;
    }

    // INITIAL_SESSION diperlakukan sama seperti SIGNED_IN/TOKEN_REFRESHED
    if (
      evt === "INITIAL_SESSION" ||
      evt === "SIGNED_IN" ||
      evt === "TOKEN_REFRESHED"
    ) {
      const access_token = body.session?.access_token;
      const refresh_token = body.session?.refresh_token;
      if (!access_token || !refresh_token) {
        return NextResponse.json(
          { ok: false, error: "Missing access_token/refresh_token" },
          { status: 400 }
        );
      }

      const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });
      if (error) {
        return NextResponse.json(
          { ok: false, error: error.message },
          { status: 401 }
        );
      }
      return res; // cookie sudah ditulis ke response
    }

    // Event lain: cukup OK
    return res;
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: (e as Error).message },
      { status: 500 }
    );
  }
}

// (Opsional) Reject method lain dengan 405
export async function GET() {
  return NextResponse.json(
    { ok: false, error: "Method Not Allowed" },
    { status: 405 }
  );
}
