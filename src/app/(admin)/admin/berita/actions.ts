"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteBerita(id: number) {
  await prisma.berita.delete({ where: { id } });
  revalidatePath("/admin/berita");
}
