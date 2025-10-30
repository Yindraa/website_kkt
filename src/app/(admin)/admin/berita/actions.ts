// src/app/(admin)/admin/berita/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { BeritaTipe } from "@prisma/client";

// Helpers
function parseBool(v: FormDataEntryValue | null): boolean {
  // checkbox kirim "on" ketika tercentang; selain itu dianggap false
  if (v === "on" || v === "true" || v === "1") return true;
  return false;
}

function parseNullableDate(v: FormDataEntryValue | null): Date | null {
  const s = (v ?? "").toString().trim();
  if (!s) return null;
  // Terima "YYYY-MM-DD" atau ISO string
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

// ⬅️ SEKARANG CUMA 2: ARTIKEL | EVENT
function parseEnumTipe(v: FormDataEntryValue | null): BeritaTipe {
  const raw = (v ?? "").toString().toUpperCase().trim();
  if (raw === "EVENT") return BeritaTipe.EVENT;
  return BeritaTipe.ARTIKEL; // default
}

export type FormState =
  | { ok: true; id?: number; message?: string }
  | { ok: false; message: string };

export async function toggleDraft(id: number, draft: boolean) {
  await prisma.berita.update({
    where: { id },
    data: { isDraft: draft },
  });
  revalidatePath("/admin/berita");
  revalidatePath("/berita");
}

export async function deleteBerita(id: number) {
  await prisma.berita.delete({ where: { id } });
  revalidatePath("/admin/berita");
  revalidatePath("/berita");
}

export async function updateBerita(
  _: FormState,
  fd: FormData
): Promise<FormState> {
  try {
    const id = Number(fd.get("id"));
    if (!id) return { ok: false, message: "ID tidak valid" };

    const judul = (fd.get("judul") ?? "").toString().trim();
    const slug = (fd.get("slug") ?? "").toString().trim();
    const konten = (fd.get("konten") ?? "").toString();
    const isDraft = parseBool(fd.get("isDraft"));
    const gambarUtama = (fd.get("gambarUtama") ?? "").toString().trim() || null;
    const sumberEksternal =
      (fd.get("sumberEksternal") ?? "").toString().trim() || null;

    // field baru
    const tipe = parseEnumTipe(fd.get("tipe"));
    const tanggalEventMulai = parseNullableDate(fd.get("tanggalEventMulai"));
    const tanggalEventSelesai = parseNullableDate(
      fd.get("tanggalEventSelesai")
    );
    const lokasi = (fd.get("lokasi") ?? "").toString().trim() || null;
    const isRecurring = parseBool(fd.get("isRecurring"));
    const recurringNote =
      (fd.get("recurringNote") ?? "").toString().trim() || null;

    await prisma.berita.update({
      where: { id },
      data: {
        judul,
        slug,
        konten,
        isDraft,
        gambarUtama,
        sumberEksternal,
        tipe, // ⬅️ sudah sinkron: ARTIKEL | EVENT
        tanggalEventMulai,
        tanggalEventSelesai,
        lokasi,
        isRecurring,
        recurringNote,
      },
    });

    revalidatePath("/admin/berita");
    revalidatePath("/berita");
    return { ok: true, id, message: "Berhasil diperbarui" };
  } catch (e) {
    return { ok: false, message: (e as Error).message };
  }
}

export async function createBerita(
  _: FormState,
  fd: FormData
): Promise<FormState> {
  try {
    const judul = (fd.get("judul") ?? "").toString().trim();
    const slug = (fd.get("slug") ?? "").toString().trim();
    const konten = (fd.get("konten") ?? "").toString();
    const isDraft = parseBool(fd.get("isDraft"));
    const gambarUtama = (fd.get("gambarUtama") ?? "").toString().trim() || null;
    const sumberEksternal =
      (fd.get("sumberEksternal") ?? "").toString().trim() || null;

    // field baru
    const tipe = parseEnumTipe(fd.get("tipe"));
    const tanggalEventMulai = parseNullableDate(fd.get("tanggalEventMulai"));
    const tanggalEventSelesai = parseNullableDate(
      fd.get("tanggalEventSelesai")
    );
    const lokasi = (fd.get("lokasi") ?? "").toString().trim() || null;
    const isRecurring = parseBool(fd.get("isRecurring"));
    const recurringNote =
      (fd.get("recurringNote") ?? "").toString().trim() || null;

    const row = await prisma.berita.create({
      data: {
        judul,
        slug,
        konten,
        isDraft,
        gambarUtama,
        sumberEksternal,
        tipe, // ⬅️ ARTIKEL / EVENT
        tanggalEventMulai,
        tanggalEventSelesai,
        lokasi,
        isRecurring,
        recurringNote,
      },
      select: { id: true },
    });

    revalidatePath("/admin/berita");
    revalidatePath("/berita");
    return { ok: true, id: row.id, message: "Berhasil dibuat" };
  } catch (e) {
    return { ok: false, message: (e as Error).message };
  }
}
