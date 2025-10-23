import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Prisma Client butuh Node.js runtime (bukan edge)
export const runtime = "nodejs";

// Validasi body untuk POST
const BodySchema = z.object({
  nama: z.string().min(2, "Nama terlalu pendek").max(120),
  email: z.string().email("Email tidak valid").max(160),
  subjek: z.string().min(3, "Minimal 3 karakter").max(120),
  pesan: z.string().min(10, "Minimal 10 karakter").max(4000),
  // Honeypot opsional (jika ingin tambahkan input hidden "hp" di form)
  hp: z.string().optional(), // jika terisi, treat as spam
});

// ==========================
// POST /api/kontak
// Terima pesan dari form dan simpan ke DB
// ==========================
export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => ({}));
    const parse = BodySchema.safeParse(json);
    if (!parse.success) {
      return NextResponse.json(
        { ok: false, message: "Validasi gagal", issues: parse.error.issues },
        { status: 422 }
      );
    }

    // Honeypot sederhana
    if (parse.data.hp && parse.data.hp.trim().length > 0) {
      // anggap bot, sukses palsu agar bot tidak tau
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const { nama, email, subjek, pesan } = parse.data;

    await prisma.pesanKontak.create({
      data: {
        nama,
        email,
        subjek,
        pesan,
        // tanggalKirim & isSudahDibaca sudah default di schema
      },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    console.error("[POST /api/kontak] error:", e);
    return NextResponse.json(
      { ok: false, message: "Terjadi kesalahan" },
      { status: 500 }
    );
  }
}

// ==========================
// GET /api/kontak?limit=50&q=...&unreadOnly=true
// Ambil daftar pesan untuk admin
// ==========================
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get("limit");
    const q = searchParams.get("q")?.trim();
    const unreadOnly = searchParams.get("unreadOnly") === "true";

    const limit = Math.min(Math.max(Number(limitParam || 50), 1), 200);

    const where: Prisma.PesanKontakWhereInput = (() => {
      if (!q && !unreadOnly) return {};

      const ci = (
        field: "nama" | "email" | "subjek" | "pesan"
      ): Prisma.PesanKontakWhereInput => ({
        [field]: {
          contains: q!,
          mode: Prisma.QueryMode.insensitive,
        },
      });

      if (q && unreadOnly) {
        return {
          AND: [
            { isSudahDibaca: false },
            { OR: [ci("nama"), ci("email"), ci("subjek"), ci("pesan")] },
          ],
        };
      }
      if (q) {
        return { OR: [ci("nama"), ci("email"), ci("subjek"), ci("pesan")] };
      }
      return { isSudahDibaca: false };
    })();

    const rows = await prisma.pesanKontak.findMany({
      where,
      orderBy: { tanggalKirim: "desc" },
      take: limit,
      select: {
        id: true,
        nama: true,
        email: true,
        subjek: true,
        pesan: true,
        tanggalKirim: true,
        isSudahDibaca: true,
      },
    });

    return NextResponse.json({ ok: true, data: rows }, { status: 200 });
  } catch (e) {
    console.error("[GET /api/kontak] error:", e);
    return NextResponse.json(
      { ok: false, message: "Terjadi kesalahan" },
      { status: 500 }
    );
  }
}
