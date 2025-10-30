// src/app/(admin)/admin/berita/_components/AdminBeritaForm.tsx
"use client";

import { useActionState, useEffect, useState, startTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBerita, updateBerita, type FormState } from "../actions";
import { BeritaTipe } from "@prisma/client";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

// bikin slug otomatis dari judul
function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300";
const labelClass = "text-sm font-medium text-slate-700";

type Props =
  | { mode: "create"; initial?: undefined }
  | {
      mode: "edit";
      initial: {
        id: number;
        judul: string;
        slug: string;
        konten: string;
        gambarUtama: string | null;
        sumberEksternal: string | null;
        isDraft: boolean;
        tipe: BeritaTipe;
        tanggalEventMulai: string | null;
        tanggalEventSelesai: string | null;
        lokasi: string | null;
        isRecurring: boolean;
        recurringNote: string | null;
      };
    };

export default function AdminBeritaForm(props: Props) {
  const router = useRouter();

  // ✅ kasih initial state yang valid
  const [state, formAction] = useActionState<FormState, FormData>(
    props.mode === "create" ? createBerita : updateBerita,
    { ok: true }
  );

  // biar cuma redirect kalau memang barusan submit
  const [didSubmit, setDidSubmit] = useState(false);

  // judul + slug
  const [title, setTitle] = useState(
    props.mode === "edit" ? props.initial.judul : ""
  );
  const [slug, setSlug] = useState(
    props.mode === "edit" ? props.initial.slug : ""
  );
  const [autoSlug, setAutoSlug] = useState(
    props.mode === "edit" ? false : true
  );

  // tipe kita pakai 2 saja: ARTIKEL | EVENT
  const [tipe, setTipe] = useState<BeritaTipe>(
    props.mode === "edit" ? props.initial.tipe : BeritaTipe.ARTIKEL
  );

  // upload gambar
  const [uploading, setUploading] = useState(false);
  const [gambarUrl, setGambarUrl] = useState(
    props.mode === "edit" ? props.initial.gambarUtama ?? "" : ""
  );
  const [uploadErr, setUploadErr] = useState<string | null>(null);

  // loading submit
  const [isSaving, setIsSaving] = useState(false);

  // auto slug kalau judul berubah
  useEffect(() => {
    if (autoSlug) setSlug(slugify(title));
  }, [title, autoSlug]);

  // helper tanggal -> input date
  const isoToDateInput = (iso: string | null) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
  };

  // ✅ kalau submit sukses → redirect
  useEffect(() => {
    if (!didSubmit) return;
    if (!state) return;

    if (state.ok) {
      router.replace("/admin/berita");
      router.refresh();
    } else {
      // gagal
      setIsSaving(false);
    }
  }, [state, didSubmit, router]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadErr(null);
    try {
      if (!file.type.startsWith("image/")) {
        setUploadErr("File harus berupa gambar.");
        return;
      }

      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, "0");
      const rand =
        globalThis.crypto?.randomUUID?.() ??
        Math.random().toString(36).slice(2);
      const safeName = file.name.replace(/\s+/g, "-");
      const path = `public/${y}/${m}/${Date.now()}-${rand}-${safeName}`;

      const { error } = await supabaseBrowser.storage
        .from("berita")
        .upload(path, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (error) {
        setUploadErr(error.message);
        return;
      }

      const { data } = supabaseBrowser.storage
        .from("berita")
        .getPublicUrl(path);
      if (data?.publicUrl) {
        setGambarUrl(data.publicUrl);
      }
    } catch (err) {
      setUploadErr((err as Error).message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function onSubmit(fd: FormData) {
    // pastikan field penting ikut terkirim
    fd.set("slug", slug);
    fd.set("gambarUtama", gambarUrl);
    fd.set("tipe", tipe); // "ARTIKEL" | "EVENT"

    setIsSaving(true);
    setDidSubmit(true); // ✅ tandai bahwa ini submit dari user

    startTransition(() => {
      // ✅ sekarang type-nya cocok, karena initial state sudah ada
      formAction(fd);
    });
  }

  return (
    <form action={onSubmit} className="flex flex-col gap-6 max-w-5xl">
      {/* header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            {props.mode === "create"
              ? "Tambah Berita / Event"
              : "Edit Berita / Event"}
          </h1>
          <p className="text-sm text-slate-500">
            Isi data berikut, simpan sebagai draft jika belum ingin ditampilkan.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin" className="btn btn-ghost">
            ← Dashboard
          </Link>
          <Link href="/admin/berita" className="btn btn-ghost">
            Daftar berita
          </Link>
        </div>
      </div>

      {/* PANEL 1: info utama */}
      <div className="rounded-xl border bg-white p-5 shadow-sm space-y-4">
        {props.mode === "edit" && (
          <input type="hidden" name="id" defaultValue={props.initial.id} />
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className={labelClass}>Judul</label>
            <input
              name="judul"
              required
              className={inputClass}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Mis. Pelayanan Posyandu Bulanan"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-2">
              <label className={labelClass}>Slug (URL)</label>
              <label className="flex items-center gap-1 text-xs text-slate-500">
                <input
                  type="checkbox"
                  checked={autoSlug}
                  onChange={(e) => setAutoSlug(e.target.checked)}
                />
                otomatis
              </label>
            </div>
            <input
              name="slug"
              className={inputClass}
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setAutoSlug(false);
              }}
              placeholder="pelayanan-posyandu-bulanan"
            />
            <p className="text-xs text-slate-400">
              URL publik: <code>/berita/{slug || "judul-kamu"}</code>
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className={labelClass}>Sumber eksternal (opsional)</label>
            <input
              name="sumberEksternal"
              className={inputClass}
              defaultValue={
                props.mode === "edit" ? props.initial.sumberEksternal ?? "" : ""
              }
              placeholder="https://… jika diambil dari media lain"
            />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Status</label>
            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                name="isDraft"
                defaultChecked={
                  props.mode === "edit" ? props.initial.isDraft : true
                }
              />
              Simpan sebagai draft
            </label>
            <p className="text-xs text-slate-400">
              Draft tidak tampil di halaman publik.
            </p>
          </div>
        </div>
      </div>

      {/* PANEL 2: konten */}
      <div className="rounded-xl border bg-white p-5 shadow-sm space-y-2">
        <h2 className="text-sm font-semibold text-slate-800">
          Konten / Isi Berita
        </h2>
        <p className="text-xs text-slate-500">
          Tulis ringkasan atau isi informasi. Boleh pakai enter.
        </p>
        <textarea
          name="konten"
          required
          className="w-full min-h-[230px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 resize-y"
          defaultValue={props.mode === "edit" ? props.initial.konten : ""}
          placeholder="Contoh: Posyandu bulan ini dilaksanakan bersama petugas Puskesmas Sonder..."
        />
      </div>

      {/* PANEL 3: tipe & jadwal */}
      <div className="rounded-xl border bg-white p-5 shadow-sm space-y-4">
        <h2 className="text-sm font-semibold text-slate-800">
          Jenis Konten & Jadwal
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-1">
            <label className={labelClass}>Jenis</label>
            <select
              name="tipe"
              className={inputClass}
              value={tipe}
              onChange={(e) => setTipe(e.target.value as BeritaTipe)}
            >
              <option value={BeritaTipe.ARTIKEL}>Artikel</option>
              <option value={BeritaTipe.EVENT}>Event / Kegiatan</option>
            </select>
            <p className="text-xs text-slate-400">
              Di publik: Artikel = berita biasa, Event = info kegiatan.
            </p>
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Tanggal event mulai</label>
            <input
              type="date"
              name="tanggalEventMulai"
              className={inputClass}
              defaultValue={
                props.mode === "edit"
                  ? isoToDateInput(props.initial.tanggalEventMulai)
                  : ""
              }
            />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Tanggal event selesai</label>
            <input
              type="date"
              name="tanggalEventSelesai"
              className={inputClass}
              defaultValue={
                props.mode === "edit"
                  ? isoToDateInput(props.initial.tanggalEventSelesai)
                  : ""
              }
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className={labelClass}>Lokasi (opsional)</label>
            <input
              name="lokasi"
              className={inputClass}
              defaultValue={
                props.mode === "edit" ? props.initial.lokasi ?? "" : ""
              }
              placeholder="Balai desa / Kantor desa / Posyandu ..."
            />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Kegiatan rutin?</label>
            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                name="isRecurring"
                defaultChecked={
                  props.mode === "edit" ? props.initial.isRecurring : false
                }
              />
              Ya, kegiatan ini rutin
            </label>
          </div>
        </div>

        <div className="space-y-1">
          <label className={labelClass}>Catatan jadwal (opsional)</label>
          <input
            name="recurringNote"
            className={inputClass}
            defaultValue={
              props.mode === "edit" ? props.initial.recurringNote ?? "" : ""
            }
            placeholder="mis. Dilaksanakan setiap bulan, tanggal mengikuti info Puskesmas."
          />
        </div>
      </div>

      {/* PANEL 4: gambar utama */}
      <div className="rounded-xl border bg-white p-5 shadow-sm space-y-4">
        <h2 className="text-sm font-semibold text-slate-800">Gambar Utama</h2>
        <p className="text-xs text-slate-500">
          Bisa upload langsung atau isi URL manual. Jika dibiarkan kosong, di
          publik tidak akan muncul gambar.
        </p>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm cursor-pointer hover:bg-slate-50 w-fit">
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
            {uploading ? "Mengunggah…" : "Upload dari komputer"}
          </label>
          <div className="flex-1">
            <label className="text-xs text-slate-500">
              atau masukkan URL gambar
            </label>
            <input
              className={inputClass + " mt-1"}
              value={gambarUrl}
              onChange={(e) => setGambarUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
        </div>

        {uploadErr ? <p className="text-xs text-red-600">{uploadErr}</p> : null}

        {gambarUrl ? (
          <div className="relative h-40 w-full overflow-hidden rounded-lg border border-slate-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={gambarUrl}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}
      </div>

      {/* footer tombol */}
      <div className="flex items-center gap-3 pb-10">
        <button type="submit" className="btn btn-primary" disabled={isSaving}>
          {isSaving
            ? "Menyimpan..."
            : props.mode === "create"
            ? "Simpan"
            : "Simpan perubahan"}
        </button>
        <Link href="/admin/berita" className="btn btn-ghost">
          Batal
        </Link>
        {state && !state.ok && (
          <p className="text-sm text-red-600">
            Gagal: {"message" in state ? state.message : "Gagal menyimpan"}
          </p>
        )}
      </div>
    </form>
  );
}
