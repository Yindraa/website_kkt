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

export default function SectionProfil() {
  // Data untuk Demografi (ikon harus komponen, bukan string)
  const demografiItems = [
    {
      label: "Penduduk",
      value: `${demografi.penduduk.total} jiwa (${demografi.penduduk.laki} L / ${demografi.penduduk.perempuan} P)`,
      icon: Users,
    },
    { label: "KK", value: `${demografi.penduduk.kk} KK`, icon: Home },
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
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Profil Desa Leilem
        </h1>
        <p className="mt-1 text-slate-600">
          Gambaran umum desa: sejarah, letak geografis, demografi, dan struktur
          perangkat.
        </p>
      </header>

      {/* Foto hero di bawah judul & deskripsi, tidak terpotong */}
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

      {/* Visi & Misi */}
      <VisionMissions visi={visi} misi={misi} />

      {/* Demografi ringkas */}
      <DemografiStats items={demografiItems} />

      {/* Komposisi luas wilayah */}
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

      {/* Letak Geografis */}
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

      {/* Sejarah (full, expandable) */}
      <LongTextPanel
        title="Sejarah Desa Leilem"
        preview={sejarahPreview}
        full={sejarahFull}
      />

      {/* Peta & Galeri */}
      <div className="grid gap-4 lg:grid-cols-[1fr_420px]">
        <MapCard src={mapEmbed} />
        <GalleryStrip images={galeri} />
      </div>

      {/* Struktur Perangkat & Kontak */}
      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <StrukturGrid struktur={struktur} />
        <ContactCard />
      </div>
    </div>
  );
}
