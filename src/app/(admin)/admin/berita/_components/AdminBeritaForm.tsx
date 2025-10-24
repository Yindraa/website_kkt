"use client";

import { useActionState, useState, FormEvent, startTransition } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export type FormState =
  | { ok: true; redirectTo?: string }
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
  const router = useRouter();

  // Bungkus server action di dalam reducer untuk useActionState
  const [state, formAction] = useActionState<FormState, FormData>(
    async (prev, fd) => {
      const res = await action(prev, fd);
      if (res.ok && res.redirectTo) {
        startTransition(() => router.push(res.redirectTo!));
      }
      return res; // penting: kembalikan FormState agar state terbarui
    },
    { ok: true }
  );

  // Local UI state
  const [isUploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    initial?.gambarUtama ?? null
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    // Upload file (opsional)
    const file = fd.get("gambarFile") as File | null;
    if (file && file.size > 0) {
      if (!file.type.startsWith("image/")) {
        alert("File harus berupa gambar.");
        return;
      }
      setUploading(true);

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

      const { data: pub } = supabaseBrowser.storage
        .from("berita")
        .getPublicUrl(up.path);

      if (pub?.publicUrl) {
        fd.set("gambarUtama", pub.publicUrl);
      }
    }

    // Jangan kirim field file ke server action
    fd.delete("gambarFile");

    // Penting: JANGAN await (formAction tidak mengembalikan nilai)
    startTransition(() => {
      formAction(fd);
    });
  }

  function getErrorMessage(s: FormState): string | null {
    return s.ok ? null : s.error;
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

      {!state.ok && (
        <p className="text-sm text-red-600">{getErrorMessage(state)}</p>
      )}

      <div className="pt-2 flex items-center gap-2">
        <button className="btn btn-primary" disabled={isUploading}>
          {isUploading ? "Mengunggah…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
