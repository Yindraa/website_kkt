import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client"; // <-- penting
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get("limit");
    const q = searchParams.get("q")?.trim();
    const unreadOnly = searchParams.get("unreadOnly") === "true";

    const limit = Math.min(Math.max(Number(limitParam || 50), 1), 200);

    // Susun where dengan tipe Prisma yang tepat
    const where: Prisma.PesanKontakWhereInput = (() => {
      // helper untuk bikin filter contains insensitive
      const ci = (
        field: "nama" | "email" | "subjek" | "pesan"
      ): Prisma.PesanKontakWhereInput => ({
        [field]: {
          contains: q!,
          mode: Prisma.QueryMode.insensitive, // <-- enum, bukan string
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
        return {
          OR: [ci("nama"), ci("email"), ci("subjek"), ci("pesan")],
        };
      }

      if (unreadOnly) {
        return { isSudahDibaca: false };
      }

      return {};
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
