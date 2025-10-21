"use client";

import { useState, useId } from "react";
import Image from "next/image";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

type Props = {
  name: string; // nama input hidden yang akan di-post ke server action
  defaultUrl?: string | null; // bila sudah ada gambar (mode edit)
  label?: string;
};

export default function UploadImage({
  name,
  defaultUrl,
  label = "Gambar Utama",
}: Props) {
  const inputId = useId();
  const [preview, setPreview] = useState<string | null>(defaultUrl ?? null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setErr(null);
    setUploading(true);

    try {
      const supabase = supabaseBrowser;

      // Buat path unik: berita/{YYYY}/{MM}/{timestamp}-{random}-{filename}
      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, "0");
      const rand =
        globalThis.crypto?.randomUUID?.() ??
        Math.random().toString(36).slice(2);
      const path = `berita/${y}/${m}/${Date.now()}-${rand}-${file.name}`;

      const { error: upErr } = await supabase.storage
        .from("berita")
        .upload(path, file, {
          upsert: true,
          cacheControl: "3600",
        });
      if (upErr) throw upErr;

      // Ambil public URL (karena bucket kita public)
      const { data } = supabase.storage.from("berita").getPublicUrl(path);
      const publicUrl = data.publicUrl;

      setPreview(publicUrl);

      // set value ke input hidden supaya ikut terkirim ke server action
      const hidden = document.getElementById(
        inputId
      ) as HTMLInputElement | null;
      if (hidden) hidden.value = publicUrl;
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Gagal upload gambar";
      setErr(message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm text-slate-600">{label}</label>

      {/* Hidden input yang dipakai server action */}
      <input
        id={inputId}
        type="hidden"
        name={name}
        defaultValue={defaultUrl ?? ""}
      />

      <div className="flex items-center gap-3">
        <label className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm hover:bg-slate-50 cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
          />
          {uploading ? "Mengunggah..." : "Pilih Gambar"}
        </label>

        {preview ? (
          <span className="text-xs text-slate-500 truncate">{preview}</span>
        ) : (
          <span className="text-xs text-slate-400">Belum ada gambar</span>
        )}
      </div>

      {preview ? (
        <div className="mt-2">
          <Image
            src={preview}
            alt="Pratinjau gambar"
            width={600}
            height={338}
            className="rounded-lg border border-slate-200 max-h-48 w-auto object-cover"
            unoptimized
          />
        </div>
      ) : null}

      {err && <p className="text-sm text-red-600">{err}</p>}
    </div>
  );
}
