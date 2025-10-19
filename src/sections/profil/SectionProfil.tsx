// src/sections/profil/SectionProfil.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Users,
  Landmark,
  Flag,
  Phone,
  ExternalLink,
  Mail,
} from "lucide-react";
import { Appear, Reveal, stagger, fadeUp } from "@/components/FX";

export default function SectionProfil() {
  const struktur = [
    { jabatan: "Kepala Desa", nama: "Nama Kepala Desa" },
    { jabatan: "Sekretaris Desa", nama: "Nama Sekdes" },
    { jabatan: "Kaur Umum", nama: "Nama Kaur Umum" },
    { jabatan: "Kaur Keuangan", nama: "Nama Kaur Keuangan" },
    { jabatan: "Kasi Pemerintahan", nama: "Nama Kasi Pemerintahan" },
    { jabatan: "Kasi Pelayanan", nama: "Nama Kasi Pelayanan" },
  ];

  const demografi = [
    { label: "Penduduk", value: "3.214 jiwa", icon: Users },
    { label: "KK", value: "957 KK", icon: Landmark },
    { label: "Luas Wilayah", value: "12,4 km²", icon: MapPin },
    { label: "Dusun/Ling.", value: "5 wilayah", icon: Flag },
  ];

  // Ganti link di bawah sesuai data yang benar
  const MAPS_KANTOR_DESA =
    "https://www.google.com/maps/search/?api=1&query=Balai+Desa+Leilem";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* HEADER + HERO IMAGE */}
      <div className="grid gap-4 lg:grid-cols-2 lg:items-center">
        <Appear variants={stagger(0.05)} as="div">
          <Appear variants={fadeUp(10)}>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Profil Desa Leilem
            </h1>
          </Appear>
          <Appear variants={fadeUp(12)}>
            <p className="text-slate-600 max-w-prose">
              Gambaran umum desa: sejarah, visi-misi, pemerintahan, demografi,
              dan lokasi.
            </p>
          </Appear>
        </Appear>

        {/* Hero image */}
        <Appear
          variants={fadeUp(12)}
          as="div"
          className="panel p-0 overflow-hidden"
        >
          <Image
            src="/images/leilem-hero.jpg" // ganti dengan fotomu
            alt="Panorama Desa Leilem"
            width={1280}
            height={720}
            className="h-full w-full object-cover"
            priority
          />
        </Appear>
      </div>

      {/* SEJARAH & LETAK */}
      <Appear
        variants={stagger(0.06)}
        className="grid gap-4 sm:grid-cols-2 mb-4 mt-4"
      >
        <Appear variants={fadeUp(12)} as="article" className="panel p-6">
          <h2 className="font-semibold text-slate-900">Sejarah Singkat</h2>
          <p className="mt-2 text-slate-600">
            Desa Leilem berdiri sejak … (tulis ringkasan sejarah, tokoh pendiri,
            nilai budaya, perkembangan utama).
          </p>
        </Appear>
        <Appear variants={fadeUp(12)} as="article" className="panel p-6">
          <h2 className="font-semibold text-slate-900">Letak & Geografi</h2>
          <p className="mt-2 text-slate-600">
            Terletak di Kabupaten Minahasa, Sulawesi Utara. Uraikan batas
            wilayah, ketinggian, iklim, potensi lahan/komoditas, serta akses
            jalan/transportasi.
          </p>
        </Appear>
      </Appear>

      {/* VISI & MISI */}
      <Appear variants={fadeUp(12)} as="section" className="panel p-6 mb-4">
        <h2 className="font-semibold text-slate-900">Visi & Misi</h2>
        <div className="mt-2 grid gap-4 sm:grid-cols-2">
          <div>
            <div className="text-sm text-slate-500">Visi</div>
            <p className="mt-1 font-medium text-slate-900">
              “Menjadi desa yang maju, mandiri, dan sejahtera berlandaskan
              gotong royong.”
            </p>
          </div>
          <div>
            <div className="text-sm text-slate-500">Misi</div>
            <ul className="mt-1 list-disc pl-5 text-slate-600 space-y-1">
              <li>Peningkatan layanan publik yang cepat dan transparan.</li>
              <li>
                Pemberdayaan UMKM & ekonomi kreatif berbasis potensi lokal.
              </li>
              <li>Penguatan ketahanan sosial, kesehatan, dan pendidikan.</li>
            </ul>
          </div>
        </div>
      </Appear>

      {/* STRUKTUR */}
      <div className="panel p-6 mb-4">
        <h2 className="font-semibold text-slate-900">Struktur Pemerintahan</h2>
        <Appear
          variants={stagger(0.05)}
          className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {struktur.map((s) => (
            <Appear
              key={s.jabatan}
              variants={fadeUp(10)}
              as="div"
              className="rounded-lg border border-slate-200 p-3 bg-white"
            >
              <div className="text-sm text-slate-500">{s.jabatan}</div>
              <div className="font-medium text-slate-900">{s.nama}</div>
            </Appear>
          ))}
        </Appear>
      </div>

      {/* DEMOGRAFI */}
      <Appear
        variants={stagger(0.06)}
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-4"
      >
        {demografi.map(({ label, value, icon: Icon }) => (
          <Appear
            key={label}
            variants={fadeUp(10)}
            as="div"
            className="panel p-4"
          >
            <div className="flex items-center gap-2">
              <span className="rounded-md border border-slate-200 bg-slate-50 p-2">
                <Icon size={16} className="text-brand-700" />
              </span>
              <div className="text-sm text-slate-500">{label}</div>
            </div>
            <div className="mt-1 font-semibold text-slate-900">{value}</div>
          </Appear>
        ))}
      </Appear>

      {/* LOKASI / PETA */}
      <Reveal
        variants={fadeUp(12)}
        as="section"
        className="panel p-0 overflow-hidden mb-4"
      >
        <div className="p-6">
          <h2 className="font-semibold text-slate-900">Lokasi Desa</h2>
          <p className="mt-2 text-slate-600">
            Untuk navigasi, gunakan lokasi <strong>Kantor Desa Leilem</strong>.
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href={MAPS_KANTOR_DESA}
              target="_blank"
              className="btn btn-primary inline-flex"
            >
              <MapPin size={16} /> Buka Maps Kantor Desa
            </Link>
          </div>
        </div>

        {/* Embed resmi (ganti src bila perlu) */}
        <div className="aspect-[16/9] w-full">
          <iframe
            title="Peta Desa Leilem"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1303.8635621484536!2d124.81195002921079!3d1.2627393957107094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32876a60d04e35c7%3A0xcab047abdbd09817!2sBalai%20Desa%20Leilem!5e0!3m2!1sid!2sid!4v1760853482637!5m2!1sid!2sid"
            className="h-full w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Reveal>

      {/* KONTAK SINGKAT — FULL WIDTH */}
      <Reveal variants={fadeUp(12)} as="section" className="panel p-6">
        <div className="grid gap-4 sm:grid-cols-2 sm:items-center">
          <div>
            <h2 className="font-semibold text-slate-900">Kontak Singkat</h2>
            <div className="mt-3 text-slate-700 space-y-1">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-brand-700" />
                <Link href="tel:08xxxxxxxxxx" className="uline">
                  08xx-xxxx-xxxx
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-brand-700" />
                <Link href="mailto:desa.leilem@example.go.id" className="uline">
                  desa.leilem@example.go.id
                </Link>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-brand-700 mt-0.5" />
                <span>Jl. …, Desa Leilem, Minahasa, Sulawesi Utara</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:justify-end">
            <Link
              href="/kontak-layanan"
              className="btn btn-primary inline-flex"
            >
              Form Kontak & Layanan
            </Link>
            <Link
              href={MAPS_KANTOR_DESA}
              target="_blank"
              className="btn btn-ghost inline-flex"
            >
              <MapPin size={16} /> Petunjuk Arah
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
