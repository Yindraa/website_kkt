-- CreateEnum
CREATE TYPE "BeritaTipe" AS ENUM ('BERITA', 'PENGUMUMAN', 'KEGIATAN');

-- AlterTable
ALTER TABLE "Berita" ADD COLUMN     "isRecurring" BOOLEAN DEFAULT false,
ADD COLUMN     "lokasi" TEXT,
ADD COLUMN     "recurringNote" TEXT,
ADD COLUMN     "tanggalEventMulai" TIMESTAMP(3),
ADD COLUMN     "tanggalEventSelesai" TIMESTAMP(3),
ADD COLUMN     "tipe" "BeritaTipe" NOT NULL DEFAULT 'BERITA';
