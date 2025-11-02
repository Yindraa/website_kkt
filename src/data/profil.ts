// src/data/profil.ts
import type { Pejabat } from "@/sections/profil/types";

/** =======================
 *  VISI & MISI
 *  ======================= */
export const visi =
  "Terwujudnya Desa Leilem menjadi Desa Mandiri lewat Bidang Industri & Pertanian.";

export const misi: string[] = [
  "Mewujudkan Desa Leilem yang tertib administrasi dan berwibawa.",
  "Mewujudkan prasarana & sarana desa yang memadai.",
  "Terwujudnya ekonomi masyarakat yang kuat di bidang industri & pertanian untuk kesejahteraan.",
  "Terwujudnya masyarakat yang beriman, berdaya saing, bermoral, berbudaya & berbudi pekerti luhur.",
  "Terwujudnya desa yang aman, tertib & sehat.",
];

/** =======================
 *  DEMOGRAFI & WILAYAH
 *  ======================= */
export const demografi = {
  penduduk: {
    // dari data kamu
    total: 1452,
    kk: 534,
    laki: 709,
    perempuan: 743,
  },
  dusunJaga: 6,
  luasWilayahHa: 172,
  komposisiLuas: [
    { label: "Luas Pemukiman", value: "17 Ha" },
    { label: "Pertanian/Perkebunan", value: "115 Ha" },
    { label: "Lahan Pekarangan", value: "15 Ha" },
    { label: "Prasarana Umum", value: "16 Ha" },
    { label: "Lahan Kritis", value: "9 Ha" },
  ],

  // ====== tambahan baru (hardcode) ======
  // 2. Profesi
  pekerjaan: [
    { label: "Pelajar / Mahasiswa", value: 272 },
    { label: "Pensiunan", value: 20 },
    { label: "Perdagangan", value: 1 },
    { label: "Pengurus RT", value: 306 },
    { label: "Wiraswasta", value: 252 },
    { label: "Guru", value: 3 },
    { label: "Perawat", value: 7 },
    { label: "Petani", value: 89 },
    { label: "Tukang", value: 10 },
    { label: "Belum / Tidak Bekerja", value: 100 },
  ],

  // 3. Agama
  agama: [
    { label: "Islam", value: 1 },
    { label: "Kristen (Protestan)", value: 1426 },
    { label: "Katolik", value: 9 },
  ],

  // 4. Status Perkawinan
  statusPerkawinan: [
    { label: "Belum Kawin", value: 601 },
    { label: "Kawin", value: 725 },
    { label: "Cerai Hidup", value: 9 },
    { label: "Cerai Mati", value: 101 },
  ],

  // 5. Pendidikan
  pendidikan: [
    { label: "Belum Sekolah", value: 226 },
    { label: "Belum Tamat SD", value: 161 },
    { label: "SLTP / SMP", value: 232 },
    { label: "SMA", value: 544 },
    { label: "D1 & D2", value: 6 },
    { label: "D3", value: 13 },
    { label: "S1", value: 105 },
    { label: "S2", value: 5 },
  ],
};

/** =======================
 *  LETAK GEOGRAFIS
 *  ======================= */
export const letakGeografis = {
  lokasi: "Berada di kaki Pegunungan Lengkoan.",
  ketinggian: "± 810 meter di atas permukaan laut",
  batas: {
    utara: "Desa Lahendong, Kecamatan Tomohon Selatan.",
    timur:
      "Desa Leilem II Kecamatan Sonder dan Desa Tondangow Kecamatan Tomohon Selatan.",
    selatan: "Desa Leilem III Kecamatan Sonder.",
    barat: "Desa Tounelet Kecamatan Sonder.",
  },
  jarak: {
    provinsi: "± 35 km",
    kabupaten: "± 20 km",
    kecamatan: "± 5 km",
  },
};

/** =======================
 *  SEJARAH (FULL)
 *  ======================= */
// preview singkat untuk ringkasan (boleh tampil di atas tombol “Baca selengkapnya”)
export const sejarahPreview =
  "Pada mula pertama si Rorimpandei dan rombongan membuka wilayah di timur atas perintah Kepala Walak Sonder. Dari jejak perjalanan itu, nama Leilem diambil dari pohon besar di muara sungai; beberapa penanda sejarah seperti Batu Kadera dan Batu Tomoutowa masih ada hingga kini.";

// teks lengkap (ditempel utuh sesuai yang Anda kirim—tidak diringkas)
export const sejarahFull = `Asal-usul/Legenda Desa
Pada mula pertama si Rorimpandei yang terkenal membuka negeri di Minahasa pada jaman dahulu diperintah oleh kepala Walak (Ketua Adat) Sonder yang bernama Keintjem untuk membuka negeri disebelah timur.

Setelah mendapat perintah maka berangkatlah mereka (Rorimpandei, Ponto, Sembor dan Timbuleng) ke timur maka sampailah mereka pada suatu tempat yang boleh dijakdikan/dibuka untuk negeri/kampong, karena disitu diapit oleh dua buah sungai (disebelah Barat desa Leilem sekarang/Perkebunan Los).

Kemudian beberapa hari mereka melihat kedua sungai itu hanya menjadi kering, maka terpaksa mereka mencari tempat lain, lalu mereka berangkat menuju keselatan dengan mendaki gunung mendaki sungai yang ada dibelah selatan.

Ditengah jalan mereka sudah merasa haus akan tetapi mereka tidak dapat air untuk dimunum, maka mereka meminta air melalui opo-opo dengan berdoa, permintaan mereka dikabulkan lalu tempat itu dinamakan oleh mereka Rano Mokey (Air yang diminta), tempat air itu berbentuk suatu kolam kecil (Sumur Kecil) bahasa Tontemboan disebut wunong, itulah sebabnya disekitarnya dinamakan Wunong, sampai sekarang kolam/sumur itu masih ada.

Sesudah itu mereka melanjutkan perjalanan menuju keatas (kaki gunung Lengkoan)sampai diatas mereka beristirahat dan mereka membuat kursi yang terbuat dari batu yang disebut batu Kadera, sampai sekarang ini batu itu masih ada.

Sesudah itu mereka meneruskan perjalanan, dalam perjalanan mereka selalu diikuti oleh burung manguni (Warak)/burung hantu, maka sampailah mereka pada suatu sungai yang dimuaranya bertumbuh sebuah Pohon besar yang bernama Leilem, dari situ mereka mengikuti sungai mencari tempat yang boleh dijadikan Negeri/Kampung.

Maka sampailah mereka pada suatu tempat yang rata (disekitar batu Tumotowa sekarang), karena ditempat itu boleh dijadikan perkampungan maka mereka mencari batu sebagai tanda yang disebut Batu Tumotowa (Batu pemanggil) sampai sekarang batu itu masih ada dan terpelihara.

Mulai pada waktu itu Negeri yang mereka buka, mereka namakan Leilem yang terambil dari Pohon yang ada di muara sungai yaitu Pohon Leilem dan sungai yang berasal dari Pohon itu mereka namakan sungai Leilem, sampai sekarang sungai itu masih ada.

Yang pertama-tama pemimpin :
Tonaas        : Timbuleng
Pamatuan  : Ponto
Kamarua    : Sembor

Catatan: Tahun berdirinya tidak diketahui lagi.

Sejarah Batu Touar/Batu Karema yang disebut Batu Kadera
Batu ini menjadi pusat agama Touar atau Agama Karema pada jaman dahulu. Batu ini dibuat oleh Karema untuk meneruskan kepercayaanya pada Opom Wana Natas yang menjadi kepercayaan Bangsa Touar selama-lamanya.

Sejarah Batu Tomoutowa
Sejarah lahirnya Desa Leilem sekitar tahun 1700 an yang dibangun oleh Lima Dotu/Lima Opo yakni Opo Pua, Opo Laoh, Opo Roring, Opo Ponto, Opo Long (Dotulong). Kelima opo ini adalah Tonaas-tonaas wangko yang percaya kepada roh-roh leluhur  atau roh orang mati dari keturunan Toar Lumimuut yang menemukan desa Leilem dan dibuatkan atau diprasastikan dengan sebuah batu Tomoutowa atau Batu yang diletakan pertama di desa Leilem.

Sejarah agama Touar/Agama Adat di Leilem atau Agama Manguni Rondor.
Percaya pada Opo Wana Natas/Opo Empung
Percaya pada Karema/Kamang Repeesan Manguni Maka Siouw (Karunia Roh Leluhur)
Dapat Mengusir roh-roh Jahat
Ahli perang memiliki pusaka-pusaka yang dapat melumpuhkan musuh.
Memiliki Obat ramuan yang berkhasiat mujizat yang diwariskan oleh Tuhan pada Touar.
Memiliki roh pemersatu bangsa
Memiliki roh kepandaian /hikmat dari Tuhan
Memiliki/ahli dalam bercocok tanam.
Percanya pada Opo Wana Natas sebagai Roh pelindung luput dari segala bahaya.

Sejarah mulainya Pemerintahan Belanda di Leilem
Awal tahun 1800 dibawah Pemerintahan Tonaas Wangko Dotu Leng dari Kawangkoan keturunannya.

Dotu Lengkoan atau Lengkong
Dotu Lengkei
Dotu Timbuleng
Timbuleng adalah Tonaas I (pertama) Pemerintahan Belanda dileilem bertepatan mulainya masuk agama Nasrani kristen oleh Swars dan kawan-kawan.
`;

export const heroImage = "/images/profil/hero.jpg";

/** =======================
 *  PETA & GALERI
 *  ======================= */
export const mapEmbed =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.848885668962!2d124.81071207501313!3d1.2630749987249097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32876a60d04e35c7%3A0xcab047abdbd09817!2sBalai%20Desa%20Leilem!5e0!3m2!1sid!2sid!4v1761199186392!5m2!1sid!2sid";

export const galeri: string[] = [
  "/images/profil/jaga-1.png",
  "/images/profil/jaga-2.png",
  "/images/profil/jaga-3.png",
  "/images/profil/jaga-4.png",
  "/images/profil/jaga-5.png",
  "/images/profil/jaga-6.png",
  "/images/profil/kerawananan.png",
  "/images/profil/longsor.png",
  "/images/profil/meubel.png",
  "/images/profil/bangunan.webp",
];

/** =======================
 *  STRUKTUR PERANGKAT (opsional – isi sesuai data real)
 *  ======================= */
export const struktur: { jabatan: string; nama: string; foto?: string }[] = [
  { nama: "VICTOR M.L. RORING", jabatan: "Hukum Tua" },
  { nama: "YUFISKE N. SUWU, ST", jabatan: "Sekretaris Desa" },
  { nama: "DEESY PANGKONG", jabatan: "Kaur Tata Usaha & Keuangan" },
  { nama: "EFRAIM SEPANG", jabatan: "Kaur Perencanaan dan Keuangan" },
  { nama: "ADRIAN YANCE SELA", jabatan: "Kasi Pemerintahan" },
  { nama: "FRANGKY W. TUMBOL", jabatan: "Kasi Kesejahteraan" },
  { nama: "TOMMY PUA", jabatan: "Kasi Pelayanan" },
  { nama: "JOHNNIE H. SEMBOR", jabatan: "Kepala Jaga I" },
  { nama: "FRANSISKUS X PANGALILA", jabatan: "Kepala Jaga II" },
  { nama: "HARRY WAANI", jabatan: "Kepala Jaga III" },
  { nama: "MICHAEL TAMON", jabatan: "Kepala Jaga IV" },
  { nama: "BERTY H. LAADA", jabatan: "Kepala Jaga V" },
  { nama: "JOHNY V. RORING", jabatan: "Kepala Jaga VI" },
  { nama: "ALEXANDER TULUNG", jabatan: "Meweteng I" },
  { nama: "ADAM E. PUA", jabatan: "Meweteng II" },
  { nama: "STEVY P. PANGKONG", jabatan: "Meweteng III" },
  { nama: "RIVEL L. RAINTUNG", jabatan: "Meweteng IV" },
  { nama: "STEVEN PUSUNG", jabatan: "Meweteng V" },
  { nama: "ROBBY LONTAAN", jabatan: "Meweteng VI" },
];
