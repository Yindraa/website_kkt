"use client";

import { useActionState, useState, FormEvent, useTransition } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export type FormState =
  | { ok: true; slug?: string }
  | { ok: false; error: string };

type Initial = {
  id?: number;
  judul?: string;
  konten?: string;
  gambarUtama?: string | null;
  sumberEksternal?: string | null;
  isDraft?: boolean;
};

export default function AdminBeritaForm({
  action,
  initial,
  submitLabel = "Simpan",
}: {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  initial?: Initial;
  submitLabel?: string;
}) {
  // Action state (Next 15)
  const [state, formAction] = useActionState<FormState, FormData>(action, {
    ok: true,
  });

  // Transition state agar aman memanggil formAction
  const [isPending, startTransition] = useTransition();

  // Local UI state
  const [isUploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    initial?.gambarUtama ?? null
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);

    // 1) Ambil file (jika ada)
    const file = fd.get("gambarFile") as File | null;

    if (file && file.size > 0) {
      // Validasi ringan
      if (!file.type.startsWith("image/")) {
        alert("File harus berupa gambar.");
        return;
      }

      setUploading(true);

      // 2) Upload ke bucket 'berita/public/...'
      const fileName = `${Date.now()}-${file.name}`.replace(/\s+/g, "-");
      const path = `public/${fileName}`;

      const { data: up, error: upErr } = await supabaseBrowser.storage
        .from("berita")
        .upload(path, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      setUploading(false);

      if (upErr) {
        console.error(upErr);
        alert("Upload gagal: " + upErr.message);
        return;
      }

      // 3) Ambil public URL
      const { data: pub } = supabaseBrowser.storage
        .from("berita")
        .getPublicUrl(up.path);

      // 4) Set ke form data sebagai 'gambarUtama'
      if (pub?.publicUrl) {
        fd.set("gambarUtama", pub.publicUrl);
      }
    }

    // Buang field file supaya tidak ikut dilempar ke server action
    fd.delete("gambarFile");

    // 5) Jalankan server action di dalam transition (tidak di-await)
    startTransition(() => {
      void formAction(fd);
    });
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      {initial?.id ? (
        <input type="hidden" name="id" defaultValue={String(initial.id)} />
      ) : null}

      <div>
        <label className="block text-sm text-slate-600">Judul</label>
        <input
          name="judul"
          defaultValue={initial?.judul ?? ""}
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
          required
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-slate-600">
            Gambar Utama (upload file)
          </label>
          <input
            name="gambarFile"
            type="file"
            accept="image/*"
            className="block w-full text-sm file:mr-3 file:rounded-md file:border file:border-slate-300 file:bg-white file:px-3 file:py-1.5 file:text-sm hover:file:bg-slate-50"
            onChange={(e) => {
              const f = e.currentTarget.files?.[0];
              if (f) {
                const url = URL.createObjectURL(f);
                setPreview(url);
              } else {
                setPreview(initial?.gambarUtama ?? null);
              }
            }}
          />
          {/* Hidden field untuk URL hasil upload */}
          <input
            type="hidden"
            name="gambarUtama"
            defaultValue={initial?.gambarUtama ?? ""}
          />
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Pratinjau"
              className="mt-2 h-40 w-full object-cover rounded-md border"
            />
          ) : null}
          {isUploading && (
            <p className="text-xs text-slate-500 mt-1">Mengunggah…</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-slate-600">
            Sumber eksternal (opsional)
          </label>
          <input
            name="sumberEksternal"
            defaultValue={initial?.sumberEksternal ?? ""}
            placeholder="https://sumber-berita.com/..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
          <p className="text-xs text-slate-500 mt-1">
            Jika diisi, konten panjang boleh dikosongkan.
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm text-slate-600">Konten</label>
        <textarea
          name="konten"
          rows={10}
          defaultValue={initial?.konten ?? ""}
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
          placeholder="Ringkasan / isi berita…"
        />
      </div>

      <label className="inline-flex items-center gap-2">
        <input
          type="checkbox"
          name="isDraft"
          defaultChecked={!!initial?.isDraft}
          className="size-4"
        />
        <span className="text-sm text-slate-700">Simpan sebagai draft</span>
      </label>

      {!state.ok && <p className="text-sm text-red-600">{state.error}</p>}

      <div className="pt-2 flex items-center gap-2">
        <button className="btn btn-primary" disabled={isUploading || isPending}>
          {isUploading ? "Mengunggah…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
