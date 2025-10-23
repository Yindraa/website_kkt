// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  // Siapkan response awal (pass-through) agar kita bisa menulis cookie ke response
  const res = NextResponse.next({
    request: { headers: req.headers },
  });

  // Buat client Supabase berbasis cookie dari request, dan tulis perubahan cookie ke response
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

  // Memanggil getSession akan memicu refresh/rotasi cookie kalau perlu
  // (jika token hampir kadaluarsa, dsb.)
  await supabase.auth.getSession();

  return res;
}

// Exclude asset statis biar murah & cepat
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
