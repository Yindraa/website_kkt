// src/app/(admin)/admin/umkm/_components/UploadImages.tsx
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { getSignedUploadUrl } from "../_actions/storage";

type Props = {
  name: string; // nama input hidden (array), mis. "gambar"
  defaultUrls?: string[]; // url2 awal (mode edit)
  label?: string;
  bucket: "umkm" | "berita"; // bucket supabase storage
};

// Helper baca kemungkinan status HTTP dari error tanpa "any"
function httpStatusFromError(err: unknown): number | undefined {
  if (typeof err === "object" && err !== null) {
    const rec = err as Record<string, unknown>;
    if (typeof rec["statusCode"] === "number")
      return rec["statusCode"] as number;
    if (typeof rec["status"] === "number") return rec["status"] as number;
  }
  return undefined;
}

export default function UploadImages({
  name,
  defaultUrls = [],
  label = "Galeri Gambar",
  bucket,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [urls, setUrls] = useState<string[]>(defaultUrls);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onPickFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setErr(null);
    setUploading(true);

    try {
      const uploaded: string[] = [];

      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) {
          setErr("Semua file harus berupa gambar.");
          continue;
        }

        // path: public/<YYYY>/<MM>/<timestamp>-<uuid>-<filename>
        const now = new Date();
        const y = now.getFullYear();
        const m = String(now.getMonth() + 1).padStart(2, "0");
        const uuid =
          globalThis.crypto?.randomUUID?.() ??
          Math.random().toString(36).slice(2);
        const safeName = file.name.replace(/\s+/g, "-");
        const path = `public/${y}/${m}/${Date.now()}-${uuid}-${safeName}`;

        // 1) MINTA signed upload URL dari server (pakai service role)
        const { path: signedPath, token } = await getSignedUploadUrl(
          bucket,
          path
        );

        // 2) Upload file ke signed URL (bypass RLS)
        const { error: upErr } = await supabaseBrowser.storage
          .from(bucket)
          .uploadToSignedUrl(signedPath, token, file, {
            cacheControl: "3600",
            contentType: file.type,
          });

        if (upErr) {
          const code = httpStatusFromError(upErr);
          if (code === 401 || code === 403) {
            setErr(
              "Akses ditolak (401/403). Pastikan Anda login atau hubungi admin untuk akses unggah."
            );
          } else {
            setErr(upErr.message);
          }
          continue;
        }

        // 3) Ambil public URL
        const { data } = supabaseBrowser.storage
          .from(bucket)
          .getPublicUrl(signedPath);
        if (data?.publicUrl) uploaded.push(data.publicUrl);
      }

      if (uploaded.length) {
        setUrls((prev) => [...prev, ...uploaded]);
      }
    } catch (e) {
      setErr((e as Error)?.message ?? "Gagal upload gambar");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function removeAt(idx: number) {
    setUrls((prev) => prev.filter((_, i) => i !== idx));
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm text-slate-600">{label}</label>

      {/* hidden inputs untuk mengirim array ke server action */}
      {urls.map((u, i) => (
        <input key={i} type="hidden" name={name} value={u} />
      ))}

      <div className="flex items-center gap-3">
        <label className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm hover:bg-slate-50 cursor-pointer">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={onPickFiles}
            className="hidden"
          />
          {uploading ? "Mengunggah..." : "Pilih Gambar"}
        </label>
        <span className="text-xs text-slate-500">
          {urls.length} gambar terpilih
        </span>
      </div>

      {err && <p className="text-sm text-red-600">{err}</p>}

      {urls.length > 0 && (
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {urls.map((u, i) => (
            <div key={i} className="relative group">
              <Image
                src={u}
                alt={`Gambar ${i + 1}`}
                width={600}
                height={338}
                className="rounded-lg border border-slate-200 h-32 w-full object-cover"
                unoptimized
              />
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="absolute top-2 right-2 rounded bg-black/60 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition"
                aria-label="Hapus gambar"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
