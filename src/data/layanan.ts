// src/data/layanan.ts

export const kontakDesa = {
  telp: "0851-7433-1388",
  // ⚠️ Kamu kirim "www.desaleilem@yahoo.co.id" — itu format URL, bukan email.
  // Kalau ini memang email, baiknya pakai: "desaleilem@yahoo.co.id"
  email: "desaleilem@yahoo.co.id",
};

export const ringkasanLayananUmum: string[] = [
  "Surat Kelahiran",
  "Formulir KTP & KK",
  "Surat Usaha",
  "Surat Belum Pernah Menikah",
  "Surat Keterangan Tidak Mampu (SKTM)",
  "Surat Domisili",
  "Surat Kematian",
  "Surat Belum Memiliki Rumah",
  "Surat Ukur Tanah (berbiaya/retribusi)",
  "Informasi Harga Tanah",
  "Izin Keramaian",
  "Surat Keterangan Beda Nama",
  "Surat Keterangan Penghasilan",
  "Surat Kehilangan",
  "Surat Pindah Domisili",
  "Surat Kelakuan Baik",
];

// Layanan yang dijelaskan detail
export type LayananDetail = {
  nama: string;
  syarat: string[];
  prosedur: string[];
  waktuProses?: string;
  biaya?: string;
  catatan?: string[];
  diperuntukkan?: string[]; // penggunaan/tujuan
};

export const layananDetail: LayananDetail[] = [
  {
    nama: "Surat Keterangan Domisili (SK Domisili)",
    syarat: [
      "KTP (dokumen utama).",
      "Tinggal/berdomisili di wilayah desa (meski belum resmi menjadi warga).",
    ],
    prosedur: [
      "Datang langsung ke kantor desa.",
      "Sampaikan permohonan kepada Sekretaris Desa.",
      "Pengisian data & verifikasi singkat.",
      "Dokumen diterbitkan oleh perangkat desa.",
    ],
    waktuProses: "± 5 menit.",
    biaya: "Gratis.",
    diperuntukkan: ["Pengajuan pinjaman bank", "Kebutuhan administrasi lain"],
    catatan: [
      "Pengurusan masih manual di kantor desa.",
      "Kendala umum: fasilitas/ketersediaan sarana & warga belum terbiasa sistem online.",
    ],
  },
  {
    nama: "Surat Keterangan Tidak Mampu (SKTM)",
    syarat: ["KTP", "Kartu Keluarga (KK)"],
    prosedur: [
      "Pendataan/penilaian lapangan oleh pihak desa (kunjungan rumah).",
      "Verifikasi kriteria (tidak memiliki kendaraan, belum punya rumah sendiri, dsb).",
      "Datang ke kantor desa untuk penerbitan SK.",
    ],
    waktuProses: "Cepat, setelah verifikasi lapangan terpenuhi.",
    biaya: "Gratis.",
    diperuntukkan: [
      "Pengajuan bantuan sosial",
      "Pendaftaran BPJS",
      "Keperluan sekolah/perguruan tinggi (dokumen pendidikan)",
      "Program perumahan subsidi",
    ],
    catatan: [
      "Tidak semua warga otomatis berhak; harus memenuhi kriteria.",
      "Tidak melibatkan RT/RW atau dinas sosial dalam proses di desa.",
    ],
  },
];

// Kebijakan umum layanan
export const kebijakanUmum = {
  syaratMinimal: [
    "KTP & KK menjadi syarat utama untuk sebagian besar layanan.",
  ],
  biaya: [
    "Semua layanan administrasi **gratis**.",
    "Kecuali **Surat Ukur Tanah** yang dikenakan retribusi/biaya.",
  ],
  kendalaUmum: [
    "Warga lupa membawa KTP saat datang ke kantor desa.",
    "Jika ada berkas kurang, pihak desa akan mengarahkan sampai berkas lengkap.",
  ],
};
