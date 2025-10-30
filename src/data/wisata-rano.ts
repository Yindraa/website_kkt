// src/data/wisata-rano.ts

export const hero = {
  title: "Pemandian Air Panas Rano Reindang",
  tagline:
    "Air panas alami & lumpur belerang — eksotis, menyehatkan, instagramable.",
  image: "/images/wisata/rano-hero.jpg", // ganti ke gambar hero kamu (public/images/wisata/…)
  ctaMaps: "#lokasi",
  ctaWhatsApp: "https://wa.me/6285174331388", // WA BUMDes atau kontak resmi
};

export const highlights: {
  icon: "hot" | "sparkles" | "leaf" | "family" | "map" | "camera";
  title: string;
  text: string;
}[] = [
  {
    icon: "hot",
    title: "Air Panas Alami",
    text: "Kaya mineral & belerang untuk relaksasi.",
  },
  {
    icon: "sparkles",
    title: "Lumpur Belerang",
    text: "Perawatan kulit alami, populer di lokasi.",
  },
  {
    icon: "leaf",
    title: "Lanskap Eksotis",
    text: "Uap panas & kawah sekitar — sangat fotogenik.",
  },
  {
    icon: "family",
    title: "Ramah Keluarga",
    text: "Area berendam bersuhu beragam untuk semua.",
  },
  {
    icon: "camera",
    title: "Instagramable",
    text: "Spot foto unik di sungai & kolam uap.",
  },
  { icon: "map", title: "Akses Mudah", text: "Rute jelas, parkir tersedia." },
];

export const longDescription = `
Pemandian Air Panas Rano Reindang adalah aliran sungai air panas alami di Desa Leilem
yang diperkaya mineral dan belerang. Pengunjung dapat merendam diri pada area yang
lebih hangat atau memilih kolam yang suhu-nya stabil. Lumpur belerang sering dimanfaatkan
untuk perawatan kulit.

Tempat ini populer di kalangan wisatawan domestik hingga mancanegara — terutama dari
Tiongkok — karena suasana eksotis, uap panas yang menciptakan atmosfer unik, serta
pemandangan yang “instagramable”. Pemerintah desa melalui BUMDes mengelola pengembangan
fasilitas. Mulai tahun 2025, tiket masuk akan mulai diberlakukan untuk mendukung pengelolaan
yang lebih baik.
`;

export const visitInfo = {
  openingHours: [
    { day: "Senin–Jumat", time: "08.00–17.00" },
    { day: "Sabtu–Minggu/Libur", time: "07.00–18.00" },
  ],
  ticketPolicy: "Tiket masuk akan mulai diberlakukan pada tahun 2025.",
  tickets: [
    { label: "Dewasa", price: "TBA" },
    { label: "Anak", price: "TBA" },
    { label: "Parkir", price: "TBA" },
  ],
};

export const facilities = [
  "Parkir",
  "Toilet & bilas",
  "Gazebo",
  "Warung",
  "Mushola",
  "Rencana: Kafe, Gedung Pertemuan, Cottage",
];

export const safety = [
  "Perhatikan zona air paling panas (bertanda).",
  "Anak-anak harus selalu diawasi.",
  "Hindari berendam jika ada luka terbuka atau kondisi medis tertentu (konsultasikan terlebih dahulu).",
];

export const tips = [
  "Datang pagi/sore untuk suasana sejuk & hasil foto lebih baik.",
  "Bawa sandal anti-slip, handuk, dan pakaian ganti.",
  "Siapkan pembayaran tunai/QRIS (cek ketersediaan di lokasi).",
];

export const faq = [
  {
    q: "Aman untuk anak kecil?",
    a: "Gunakan kolam bersuhu lebih rendah & selalu diawasi orang dewasa.",
  },
  { q: "Ada kamar bilas/toilet?", a: "Ya, tersedia di area lokasi." },
  {
    q: "Boleh bawa makanan?",
    a: "Boleh, mohon jaga kebersihan. Ada warung juga di sekitar.",
  },
];

export const galeri: string[] = [
  "/images/wisata/rano-1.jpg",
  "/images/wisata/rano-2.jpg",
  "/images/wisata/rano-3.jpg",
  "/images/wisata/rano-4.jpg",
  "/images/wisata/rano-5.jpg",
  "/images/wisata/rano-6.jpg",
  "/images/wisata/rano-7.jpg",
  "/images/wisata/rano-8.jpg",
  "/images/wisata/rano-9.jpg",
  "/images/wisata/rano-10.jpg",
]; // siapkan file2 ini di public/images/wisata/

export const contact = {
  address: "Leilem, Minahasa, Sulawesi Utara",
  email: "desaleilem@yahoo.co.id",
  wa: "6285174331388",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2377.0267896500363!2d124.81767070354094!3d1.2660698156080976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32876bf86fec5a87%3A0x98d60bd704e18786!2sRano%20Reindang!5e0!3m2!1sid!2sid!4v1761449039811!5m2!1sid!2sid",
};
