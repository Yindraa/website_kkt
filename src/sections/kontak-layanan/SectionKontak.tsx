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

      {/* 2 kolom: layanan & form */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {/* Layanan Admin (tanpa file) */}
        <section className="panel p-6">
          <h2 className="font-semibold text-slate-900">Layanan Administrasi</h2>
          <p className="mt-2 text-slate-600">
            Pilih layanan dan ajukan via formulir di samping.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <ServiceCard
              title="Surat Keterangan Domisili"
              desc="KTP/KK & formulir permohonan."
              eta="Selesai 1–2 hari kerja"
            />
            <ServiceCard
              title="Surat Keterangan Usaha (SKU)"
              desc="KTP/KK, bukti usaha sederhana."
              eta="Selesai 1–2 hari kerja"
            />
            <ServiceCard
              title="Surat Tidak Mampu (SKTM)"
              desc="KTP/KK & surat pengantar RT/RW."
              eta="Selesai 1–2 hari kerja"
            />
            <ServiceCard
              title="Legalitas Lainnya"
              desc="Silakan jelaskan di formulir."
              eta="Waktu menyesuaikan"
            />
          </div>

          <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="text-sm font-medium text-slate-900">
              Jam Layanan Loket
            </div>
            <div className="text-sm text-slate-700">
              Senin–Jumat 08.00–15.00 (Istirahat 12.00–13.00)
            </div>
            <div className="text-sm text-slate-700">
              Lokasi: Kantor Desa Leilem
            </div>
          </div>

          <div className="mt-3 text-sm text-slate-600">
            Tanya cepat:{" "}
            <Link
              href="https://wa.me/62xxxxxxxxxx"
              className="uline"
              target="_blank"
            >
              WhatsApp Sekretariat
            </Link>
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
