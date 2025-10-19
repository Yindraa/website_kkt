-- CreateTable
CREATE TABLE "AdminUser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "nama" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN_DESA',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PesanKontak" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subjek" TEXT NOT NULL,
    "pesan" TEXT NOT NULL,
    "tanggalKirim" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isSudahDibaca" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PesanKontak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KategoriUmkm" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "KategoriUmkm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Berita" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "gambarUtama" TEXT,
    "tanggalPublish" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDraft" BOOLEAN NOT NULL DEFAULT true,
    "sumberEksternal" TEXT,

    CONSTRAINT "Berita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Umkm" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT,
    "alamat" TEXT,
    "kontak" TEXT,
    "gambar" TEXT[],
    "gmapsLink" TEXT,
    "kategoriId" INTEGER NOT NULL,

    CONSTRAINT "Umkm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Potensi" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsiSingkat" TEXT,
    "deskripsiLengkap" TEXT NOT NULL,
    "lokasi" TEXT,
    "gmapsLink" TEXT,
    "gambarGaleri" TEXT[],

    CONSTRAINT "Potensi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LayananKesehatan" (
    "id" SERIAL NOT NULL,
    "namaFasilitas" TEXT NOT NULL,
    "alamat" TEXT,
    "jenisLayanan" TEXT,
    "kontak" TEXT,
    "jadwalBuka" TEXT,
    "gmapsLink" TEXT,

    CONSTRAINT "LayananKesehatan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "KategoriUmkm_nama_key" ON "KategoriUmkm"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "Berita_slug_key" ON "Berita"("slug");

-- AddForeignKey
ALTER TABLE "Umkm" ADD CONSTRAINT "Umkm_kategoriId_fkey" FOREIGN KEY ("kategoriId") REFERENCES "KategoriUmkm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
