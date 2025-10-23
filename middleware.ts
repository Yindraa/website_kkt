import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  // Response pass-through yang bisa ditulisi cookie (hasil refresh/rotasi)
  const res = NextResponse.next({
    request: { headers: req.headers },
  });

  try {
    // Lewati semua rute API (termasuk /api/auth/state) — kita sudah sinkronisasi via endpoint itu
    const pathname = req.nextUrl.pathname;
    if (pathname.startsWith("/api/")) {
      return res;
    }

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

    // Memicu refresh/rotasi token jika perlu sehingga cookie httpOnly tetap sinkron
    await supabase.auth.getSession();
  } catch {
    // Jangan blokir request jika ada error kecil; biarkan lanjut
  }

  return res;
}

// Skip asset statis biar ringan
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
