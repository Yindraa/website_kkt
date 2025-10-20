// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Kalau menuju /admin (selain /admin/login), redirect ke /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    // Tambah query kecil untuk debug visual jika perlu
    url.searchParams.set("from", "middleware");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// ⚠️ Tambahkan DUA pola: '/admin' dan '/admin/:path*'
export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
