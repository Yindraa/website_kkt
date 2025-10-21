// src/lib/slug.ts
import type { PrismaClient } from "@prisma/client";

export function slugifyBase(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/**
 * Pastikan slug unik, dengan suffix -2, -3, dst jika bentrok.
 * excludeId: id berita yang sedang diedit (agar slug lama dianggap milik sendiri).
 */
export async function ensureUniqueSlug(
  prisma: PrismaClient,
  base: string,
  excludeId?: number
): Promise<string> {
  const existing = await prisma.berita.findMany({
    where: excludeId
      ? { slug: { startsWith: base }, NOT: { id: excludeId } }
      : { slug: { startsWith: base } },
    select: { slug: true },
  });

  if (existing.length === 0) return base;

  const set = new Set(existing.map((r) => r.slug));
  if (!set.has(base)) return base;

  let i = 2;
  while (true) {
    const candidate = `${base}-${i}`;
    if (!set.has(candidate)) return candidate;
    i++;
  }
}
