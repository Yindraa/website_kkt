"use client";
import Image from "next/image";
import { useState } from "react";
import VisionMissions from "./components/VisionMissions";
import DemografiStats from "./components/DemografisStats";
import GalleryStrip from "./components/GalleryStrip";
import MapCard from "./components/MapCard";
import StrukturGrid from "./components/StrukturGrid";
import ContactCard from "./components/ContactCard";
import { Users, Home, Map, Grid3X3 } from "lucide-react";

import {
  visi,
  misi,
  demografi,
  letakGeografis,
  sejarahPreview,
  sejarahFull,
  mapEmbed,
  galeri,
  struktur,
  heroImage,
} from "@/data/profil";

const DATA_PENDUDUK = {
  total: 1452,
  kk: 534,
  laki: 709,
  perempuan: 743,
};

const DATA_PROFESI = [
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
];

const DATA_AGAMA = [
  { label: "Islam", value: 1 },
  { label: "Kristen (Protestan)", value: 1426 },
  { label: "Katolik", value: 9 },
];

const DATA_STATUS = [
  { label: "Belum Kawin", value: 601 },
  { label: "Kawin", value: 725 },
  { label: "Cerai Hidup", value: 9 },
  { label: "Cerai Mati", value: 101 },
];

const DATA_PENDIDIKAN = [
  { label: "Belum Sekolah", value: 226 },
  { label: "Belum Tamat SD", value: 161 },
  { label: "SLTP / SMP", value: 232 },
  { label: "SMA", value: 544 },
  { label: "D1 & D2", value: 6 },
  { label: "D3", value: 13 },
  { label: "S1", value: 105 },
  { label: "S2", value: 5 },
];

function LongTextPanel({
  title,
  preview,
  full,
}: {
  title: string;
  preview: string;
  full: string;
}) {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="panel p-5 space-y-3">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <div className="prose prose-slate max-w-none">
        {showAll ? (
          <pre className="whitespace-pre-wrap font-sans text-slate-800">
            {full}
          </pre>
        ) : (
          <p className="text-slate-800">{preview}</p>
        )}
      </div>

      {!showAll && (
        <button
          className="btn btn-ghost"
          onClick={() => setShowAll(true)}
          aria-expanded={showAll}
        >
          Baca selengkapnya
        </button>
      )}
    </section>
  );
}

const COLOR_BADGES = [
  "bg-sky-100 text-sky-800",
  "bg-emerald-100 text-emerald-800",
  "bg-amber-100 text-amber-800",
  "bg-violet-100 text-violet-800",
  "bg-rose-100 text-rose-800",
  "bg-slate-100 text-slate-800",
  "bg-orange-100 text-orange-800",
  "bg-lime-100 text-lime-800",
];

const COLOR_BARS = [
  "bg-sky-400/80",
  "bg-emerald-400/80",
  "bg-amber-400/80",
  "bg-violet-400/80",
  "bg-rose-400/80",
  "bg-slate-400/80",
  "bg-orange-400/80",
  "bg-lime-400/80",
];

function BarMetricList({
  items,
}: {
  items: { label: string; value: number }[];
}) {
  const max = items.reduce((m, it) => (it.value > m ? it.value : m), 0) || 1;

  return (
    <div className="space-y-2">
      {items.map((it, idx) => {
        const ratio = (it.value / max) * 100;
        const badgeColor = COLOR_BADGES[idx % COLOR_BADGES.length];
        const barColor = COLOR_BARS[idx % COLOR_BARS.length];
        return (
          <div key={it.label} className="space-y-1.5">
            <div className="flex items-center justify-between gap-3">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${badgeColor}`}
              >
                {it.label}
              </span>
              <span className="text-sm font-semibold text-slate-900">
                {it.value.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full rounded-full ${barColor}`}
                style={{ width: `${ratio}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MetricCard({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle?: string;
  items: { label: string; value: number }[];
}) {
  return (
    <div className="rounded-xl border bg-white/80 backdrop-blur-sm p-4 space-y-3">
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        {subtitle ? <p className="text-xs text-slate-500">{subtitle}</p> : null}
      </div>
      <BarMetricList items={items} />
    </div>
  );
}

/* =========================================================
   HALAMAN UTAMA
   ========================================================= */
export default function SectionProfil() {
  // demografi ringkas (punya kamu)
  const demografiItems = [
    {
      label: "Penduduk",
      value: `${DATA_PENDUDUK.total} jiwa (${DATA_PENDUDUK.laki} L / ${DATA_PENDUDUK.perempuan} P)`,
      icon: Users,
    },
    { label: "KK", value: `${DATA_PENDUDUK.kk} KK`, icon: Home },
    {
      label: "Luas Wilayah",
      value: `${demografi.luasWilayahHa} Ha`,
      icon: Map,
    },
    {
      label: "Dusun/Jaga",
      value: `${demografi.dusunJaga} jaga`,
      icon: Grid3X3,
    },
  ];

  const hero = heroImage || galeri?.[0] || null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      {/* HEADER */}
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Profil Desa Leilem
        </h1>
        <p className="mt-1 text-slate-600">
          Gambaran umum desa: sejarah, letak geografis, demografi, dan struktur
          perangkat.
        </p>
      </header>

      {/* HERO FOTO */}
      {hero && (
        <div className="panel p-3">
          <Image
            src={hero}
            alt="Foto Desa Leilem"
            width={1600}
            height={900}
            className="w-full h-auto rounded-lg border"
            unoptimized
            priority
          />
        </div>
      )}

      {/* VISI & MISI */}
      <VisionMissions visi={visi} misi={misi} />

      {/* DEMOGRAFI RINGKAS */}
      <DemografiStats items={demografiItems} />

      {/* STATISTIK KEPENDUDUKAN – versi grafis baru */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Statistik Kependudukan
            </h2>
            <p className="text-sm text-slate-500">
              Angka di bawah adalah hasil pendataan 2025.
            </p>
          </div>
        </div>

        {/* angka ringkas */}
        <div className="grid gap-3 md:grid-cols-4">
          <div className="rounded-xl border bg-white p-4">
            <p className="text-xs text-slate-500">Jumlah Penduduk</p>
            <p className="text-2xl font-semibold text-slate-900 mt-1">
              {DATA_PENDUDUK.total.toLocaleString("id-ID")}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              L = {DATA_PENDUDUK.laki} · P = {DATA_PENDUDUK.perempuan}
            </p>
          </div>
          <div className="rounded-xl border bg-white p-4">
            <p className="text-xs text-slate-500">Kepala Keluarga</p>
            <p className="text-2xl font-semibold text-slate-900 mt-1">
              {DATA_PENDUDUK.kk.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="rounded-xl border bg-white p-4">
            <p className="text-xs text-slate-500">Laki-laki</p>
            <p className="text-2xl font-semibold text-slate-900 mt-1">
              {DATA_PENDUDUK.laki.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="rounded-xl border bg-white p-4">
            <p className="text-xs text-slate-500">Perempuan</p>
            <p className="text-2xl font-semibold text-slate-900 mt-1">
              {DATA_PENDUDUK.perempuan.toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        {/* grafik */}
        <div className="grid gap-4 lg:grid-cols-2">
          <MetricCard
            title="Komposisi Profesi"
            subtitle="Penduduk berdasarkan pekerjaan"
            items={DATA_PROFESI}
          />
          <MetricCard
            title="Komposisi Agama"
            subtitle="Mayoritas Kristen Protestan"
            items={DATA_AGAMA}
          />
          <MetricCard
            title="Status Perkawinan"
            subtitle="Per rumah tangga / dewasa"
            items={DATA_STATUS}
          />
          <MetricCard
            title="Pendidikan Terakhir"
            subtitle="SMA mendominasi"
            items={DATA_PENDIDIKAN}
          />
        </div>
      </section>

      {/* KOMPOSISI LUAS WILAYAH */}
      <section className="panel p-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Komposisi Luas Wilayah
        </h2>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-[480px] text-sm">
            <tbody>
              {demografi.komposisiLuas.map((row, i) => (
                <tr key={i} className="border-t border-slate-200">
                  <td className="px-3 py-2 text-slate-700">{row.label}</td>
                  <td className="px-3 py-2 text-slate-900 font-medium">
                    {row.value}
                  </td>
                </tr>
              ))}
              <tr className="border-t border-slate-200 bg-slate-50">
                <td className="px-3 py-2 font-semibold text-slate-800">
                  Total Luas Wilayah
                </td>
                <td className="px-3 py-2 font-semibold text-slate-900">
                  {demografi.luasWilayahHa} Ha
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* LETAK GEOGRAFIS */}
      <section className="panel p-5 space-y-2">
        <h2 className="text-lg font-semibold text-slate-900">
          Letak Geografis
        </h2>
        <p className="text-slate-700">{letakGeografis.lokasi}</p>
        <p className="text-slate-700">
          Ketinggian: {letakGeografis.ketinggian}
        </p>

        <div className="grid sm:grid-cols-2 gap-3 mt-2">
          <div className="rounded-lg border p-3">
            <h3 className="font-medium text-slate-800">Batas Wilayah</h3>
            <dl className="mt-1 text-sm text-slate-700">
              <dt className="text-slate-500">Utara</dt>
              <dd className="mb-1">{letakGeografis.batas.utara}</dd>
              <dt className="text-slate-500">Timur</dt>
              <dd className="mb-1">{letakGeografis.batas.timur}</dd>
              <dt className="text-slate-500">Selatan</dt>
              <dd className="mb-1">{letakGeografis.batas.selatan}</dd>
              <dt className="text-slate-500">Barat</dt>
              <dd className="mb-1">{letakGeografis.batas.barat}</dd>
            </dl>
          </div>

          <div className="rounded-lg border p-3">
            <h3 className="font-medium text-slate-800">Jarak</h3>
            <dl className="mt-1 text-sm text-slate-700">
              <dt className="text-slate-500">Ibu kota provinsi</dt>
              <dd className="mb-1">{letakGeografis.jarak.provinsi}</dd>
              <dt className="text-slate-500">Ibu kota kabupaten</dt>
              <dd className="mb-1">{letakGeografis.jarak.kabupaten}</dd>
              <dt className="text-slate-500">Ibu kota kecamatan</dt>
              <dd className="mb-1">{letakGeografis.jarak.kecamatan}</dd>
            </dl>
          </div>
        </div>
      </section>

      {/* SEJARAH */}
      <LongTextPanel
        title="Sejarah Desa Leilem"
        preview={sejarahPreview}
        full={sejarahFull}
      />

      {/* PETA & GALERI */}
      <div className="grid gap-4 lg:grid-cols-[1fr_420px]">
        <MapCard src={mapEmbed} />
        <GalleryStrip images={galeri} />
      </div>

      {/* STRUKTUR & KONTAK */}
      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <StrukturGrid struktur={struktur} />
        <ContactCard />
      </div>
    </div>
  );
}
