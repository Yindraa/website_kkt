// src/sections/kontak-layanan/SectionKontak.tsx
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";

const Schema = z.object({
  nama: z.string().min(2, "Nama terlalu pendek"),
  email: z.string().email("Email tidak valid"),
  subjek: z.string().min(3, "Minimal 3 karakter").max(120),
  pesan: z.string().min(10, "Minimal 10 karakter"),
});
type FormData = z.infer<typeof Schema>;

// Data kontak resmi
const TELP = "0851-7433-1388";
const EMAIL = "desaleilem@yahoo.co.id";
// WhatsApp deep link (format internasional, tanpa tanda +)
const WA_LINK = "https://wa.me/6285174331388";

export default function SectionKontak() {
  const [sent, setSent] = useState<"idle" | "ok" | "err">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(Schema) });

  async function onSubmit(values: FormData) {
    setSent("idle");
    try {
      const res = await fetch("/api/kontak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Bad response");
      setSent("ok");
      reset();
    } catch {
      setSent("err");
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
        Kontak & Layanan
      </h1>
      <p className="text-slate-600">
        Silakan ajukan pertanyaan, saran, atau layanan administrasi.
      </p>

      {/* 2 kolom: informasi layanan & form */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {/* Informasi Layanan & Panduan */}
        <section className="panel p-6 space-y-4">
          <header>
            <h2 className="font-semibold text-slate-900">
              Layanan Administrasi
            </h2>
            <p className="mt-1 text-slate-600">
              Prosedur umum: warga datang langsung dan mengajukan permohonan
              kepada <strong>Sekretaris Desa</strong>. Siapkan setidaknya KTP
              (dan KK bila diminta).
            </p>
          </header>

          {/* Ringkasan daftar cepat */}
          <div className="grid gap-3 sm:grid-cols-2">
            <ServiceCard
              title="Surat Keterangan Domisili"
              desc="Syarat utama: KTP"
              eta="Biasanya ± 5 menit"
            />
            <ServiceCard
              title="Surat Keterangan Tidak Mampu (SKTM)"
              desc="Syarat: KTP & KK, verifikasi lapangan"
              eta="Cepat setelah verifikasi"
            />
            <ServiceCard
              title="Formulir KTP & KK"
              desc="Permohonan administrasi kependudukan"
              eta="1–2 hari kerja"
            />
            <ServiceCard
              title="Layanan Lain"
              desc="Surat usaha, belum menikah, keterangan penghasilan, dll."
              eta="Menyesuaikan"
            />
            <ServiceCard
              title="Surat Ukur Tanah"
              desc="Layanan berbiaya/retribusi"
              eta="Menyesuaikan"
            />
            <ServiceCard
              title="Pindah Domisili, Kehilangan, Kelakuan Baik"
              desc="KTP/KK & keperluan pendukung"
              eta="1–2 hari kerja"
            />
          </div>

          {/* Kebijakan umum */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="text-sm font-medium text-slate-900">
              Kebijakan Umum
            </div>
            <ul className="mt-1 list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>
                KTP & KK umumnya menjadi syarat utama untuk sebagian besar
                layanan.
              </li>
              <li>
                Semua layanan administrasi <strong>gratis</strong>, kecuali{" "}
                <strong>Surat Ukur Tanah</strong> yang dikenakan
                retribusi/biaya.
              </li>
              <li>
                Kendala paling umum: warga lupa membawa KTP. Jika berkas kurang,
                petugas desa akan membantu mengarahkan.
              </li>
            </ul>
          </div>

          {/* Panduan detail (tanpa JS berat, pakai <details>) */}
          <section className="space-y-3">
            <h3 className="font-semibold text-slate-900">Panduan Detail</h3>

            {/* SK Domisili */}
            <details className="rounded-xl border border-slate-200 bg-white p-4">
              <summary className="cursor-pointer select-none text-slate-900 font-medium">
                Surat Keterangan Domisili (SK Domisili)
              </summary>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border p-3">
                  <h4 className="font-medium text-slate-800">Syarat</h4>
                  <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
                    <li>KTP (dokumen utama).</li>
                    <li>
                      Tinggal/berdomisili di wilayah desa (meski belum resmi
                      menjadi warga).
                    </li>
                  </ul>
                  <p className="mt-3 text-sm">
                    <span className="text-slate-500">Waktu proses:</span>{" "}
                    <span className="font-medium text-slate-900">
                      ± 5 menit
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="text-slate-500">Biaya:</span>{" "}
                    <span className="font-medium text-slate-900">Gratis</span>
                  </p>
                </div>
                <div className="rounded-lg border p-3">
                  <h4 className="font-medium text-slate-800">Prosedur</h4>
                  <ol className="mt-2 list-decimal pl-5 text-sm text-slate-700 space-y-1">
                    <li>Datang langsung ke kantor desa.</li>
                    <li>Sampaikan permohonan kepada Sekretaris Desa.</li>
                    <li>Pengisian data & verifikasi singkat.</li>
                    <li>Dokumen diterbitkan oleh perangkat desa.</li>
                  </ol>
                  <h5 className="mt-3 font-medium text-slate-800">
                    Untuk Keperluan
                  </h5>
                  <ul className="mt-1 list-disc pl-5 text-sm text-slate-700">
                    <li>Pengajuan pinjaman bank</li>
                    <li>Administrasi lain yang memerlukan bukti domisili</li>
                  </ul>
                  <h5 className="mt-3 font-medium text-slate-800">Catatan</h5>
                  <ul className="mt-1 list-disc pl-5 text-sm text-slate-700">
                    <li>Pengurusan masih manual di kantor desa.</li>
                    <li>
                      Kendala dapat terjadi jika fasilitas kurang lengkap, namun
                      petugas akan membantu.
                    </li>
                  </ul>
                </div>
              </div>
            </details>

            {/* SKTM */}
            <details className="rounded-xl border border-slate-200 bg-white p-4">
              <summary className="cursor-pointer select-none text-slate-900 font-medium">
                Surat Keterangan Tidak Mampu (SKTM)
              </summary>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border p-3">
                  <h4 className="font-medium text-slate-800">Syarat</h4>
                  <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
                    <li>KTP</li>
                    <li>Kartu Keluarga (KK)</li>
                  </ul>
                  <p className="mt-3 text-sm">
                    <span className="text-slate-500">Waktu proses:</span>{" "}
                    <span className="font-medium text-slate-900">
                      Cepat, setelah verifikasi
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="text-slate-500">Biaya:</span>{" "}
                    <span className="font-medium text-slate-900">Gratis</span>
                  </p>
                </div>
                <div className="rounded-lg border p-3">
                  <h4 className="font-medium text-slate-800">Prosedur</h4>
                  <ol className="mt-2 list-decimal pl-5 text-sm text-slate-700 space-y-1">
                    <li>
                      Pendataan/penilaian lapangan oleh pihak desa (kunjungan
                      rumah).
                    </li>
                    <li>
                      Verifikasi kriteria (mis. tidak memiliki kendaraan, belum
                      punya rumah sendiri).
                    </li>
                    <li>Datang ke kantor desa untuk penerbitan SK.</li>
                  </ol>
                  <h5 className="mt-3 font-medium text-slate-800">
                    Untuk Keperluan
                  </h5>
                  <ul className="mt-1 list-disc pl-5 text-sm text-slate-700">
                    <li>Pengajuan bantuan sosial</li>
                    <li>Pendaftaran BPJS</li>
                    <li>Kebutuhan pendidikan</li>
                    <li>Program perumahan subsidi</li>
                  </ul>
                  <h5 className="mt-3 font-medium text-slate-800">Catatan</h5>
                  <ul className="mt-1 list-disc pl-5 text-sm text-slate-700">
                    <li>
                      Tidak semua warga otomatis berhak; harus memenuhi
                      kriteria.
                    </li>
                    <li>
                      Proses dilakukan langsung oleh desa (tanpa RT/RW atau
                      dinas sosial).
                    </li>
                  </ul>
                </div>
              </div>
            </details>
          </section>

          {/* Kontak & Jam Layanan */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="text-sm font-medium text-slate-900">
              Kontak & Jam Layanan
            </div>
            <dl className="mt-1 grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-slate-500">Telepon</dt>
                <dd>
                  <a href={`tel:${TELP}`} className="uline">
                    {TELP}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Email</dt>
                <dd>
                  <a href={`mailto:${EMAIL}`} className="uline">
                    {EMAIL}
                  </a>
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-slate-500">Jam Layanan Loket</dt>
                <dd>
                  Senin–Jumat 08.00–15.00 (Istirahat 12.00–13.00) — Lokasi:
                  Kantor Desa Leilem
                </dd>
              </div>
            </dl>
            <div className="mt-2 text-sm">
              Tanya cepat via WhatsApp:{" "}
              <Link href={WA_LINK} target="_blank" className="uline">
                {TELP}
              </Link>
            </div>
          </div>
        </section>

        {/* Form Kontak */}
        <section className="panel p-6">
          <h2 className="font-semibold text-slate-900">Form Kontak</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
            <div>
              <label className="text-sm text-slate-600">Nama</label>
              <input
                {...register("nama")}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300"
                placeholder="Nama lengkap"
              />
              {errors.nama && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.nama.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm text-slate-600">Email</label>
              <input
                {...register("email")}
                type="email"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300"
                placeholder="nama@email.com"
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm text-slate-600">Subjek</label>
              <input
                {...register("subjek")}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300"
                placeholder="Judul pesan"
              />
              {errors.subjek && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.subjek.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm text-slate-600">Pesan</label>
              <textarea
                {...register("pesan")}
                rows={5}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300"
                placeholder="Tuliskan kebutuhan/pertanyaan Anda"
              />
              {errors.pesan && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.pesan.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? "Mengirim..." : "Kirim"}
            </button>

            {sent === "ok" && (
              <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-2">
                Terima kasih! Pesan Anda sudah terkirim.
              </div>
            )}
            {sent === "err" && (
              <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-2">
                Maaf, terjadi kesalahan. Coba lagi nanti.
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}

function ServiceCard({
  title,
  desc,
  eta,
}: {
  title: string;
  desc: string;
  eta: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 p-3">
      <div className="font-medium text-slate-900">{title}</div>
      <div className="text-sm text-slate-600">{desc}</div>
      <div className="text-xs text-slate-500 mt-1">{eta}</div>
    </div>
  );
}
