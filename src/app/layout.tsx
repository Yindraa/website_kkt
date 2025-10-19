import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Poppins } from "next/font/google";
import PageFade from "@/components/PageFade";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pemerintah Desa Leilem",
  description: "Profil Desa, Berita, UMKM, Wisata, Kesehatan, Kontak & Layanan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body
        className={`${poppins.variable} font-sans min-h-screen flex flex-col`}
      >
        <Navbar />
        {/* Konten putih + transisi antar-halaman */}
        <main className="flex-1 bg-white">
          <PageFade>{children}</PageFade>
        </main>
        <Footer />
      </body>
    </html>
  );
}
