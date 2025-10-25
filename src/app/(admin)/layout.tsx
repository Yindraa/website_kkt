// src/app/(admin)/layout.tsx
import "@/app/globals.css";
import { Poppins } from "next/font/google";
import SupabaseAuthBootstrap from "@/components/SupabaseAuthBootstrap";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={poppins.variable}>
      <body className="font-sans min-h-screen bg-slate-50">
        {/* Bootstrap auth di semua halaman admin */}
        <SupabaseAuthBootstrap />
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
