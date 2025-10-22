/* prisma/seed.ts */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Upsert 2 kategori
  await prisma.kategoriUmkm.upsert({
    where: { nama: "UMKM Mebel" },
    create: { nama: "UMKM Mebel" },
    update: {},
  });
  await prisma.kategoriUmkm.upsert({
    where: { nama: "UMKM Cemilan" },
    create: { nama: "UMKM Cemilan" },
    update: {},
  });

  console.log("Seed selesai.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
