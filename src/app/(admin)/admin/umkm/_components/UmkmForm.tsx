"use client";

import { useActionState, startTransition } from "react";
import { useRouter } from "next/navigation";
import UploadImages from "./UploadImages";

export type FormState =
  | { ok: true; redirectTo?: string }
  | { ok: false; error: string };

type Initial = {
  id?: number;
  nama?: string;
  deskripsi?: string | null;
  alamat?: string | null;
  kontak?: string | null;
  gmapsLink?: string | null;
  kategoriId?: number;
  gambar?: string[];
};

export default function UmkmForm({
  action,
  initial,
  kategoriOptions,
  submitLabel = "Simpan",
}: {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  initial?: Initial;
  kategoriOptions: { id: number; nama: string }[];
  submitLabel?: string;
}) {
  const router = useRouter();

  // Bungkus server action di reducer untuk handle redirect di client
  const [state, formAction] = useActionState<FormState, FormData>(
    async (prev, fd) => {
      const res = await action(prev, fd);
      if (res.ok && res.redirectTo) {
        startTransition(() => {
          router.push(res.redirectTo!);
        });
      }
      return res;
    },
    { ok: true }
  );
  function getErrorMessage(s: FormState): string | null {
    return s.ok ? null : s.error;
  }
  return (
    <form action={formAction} className="mt-6 space-y-4">
      {initial?.id ? (
        <input type="hidden" name="id" defaultValue={String(initial.id)} />
      ) : null}

      <div>
        <label className="block text-sm text-slate-600">Nama UMKM</label>
        <input
          name="nama"
          defaultValue={initial?.nama ?? ""}
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
          required
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-slate-600">Kategori</label>
          <select
            name="kategoriId"
            defaultValue={initial?.kategoriId ?? ""}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            required
          >
            <option value="" disabled>
              Pilih kategori…
            </option>
            {kategoriOptions.map((k) => (
              <option key={k.id} value={k.id}>
                {k.nama}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-slate-600">Kontak</label>
          <input
            name="kontak"
            defaultValue={initial?.kontak ?? ""}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Nomor WA / IG / Website"
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-slate-600">Alamat</label>
          <input
            name="alamat"
            defaultValue={initial?.alamat ?? ""}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-600">
            Google Maps Link
          </label>
          <input
            name="gmapsLink"
            defaultValue={initial?.gmapsLink ?? ""}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="URL embed atau link Maps (boleh biasa)"
          />
          <p className="text-xs text-slate-500 mt-1">
            Tips: dari Google Maps pilih “Bagikan” → “Sematkan peta”, copy URL
            yang mengandung <code>/maps/embed</code>. Jika kamu tempel link
            biasa, kami akan coba sematkan otomatis; jika gagal, tombol “Buka di
            Google Maps” akan muncul.
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm text-slate-600">Deskripsi</label>
        <textarea
          name="deskripsi"
          rows={6}
          defaultValue={initial?.deskripsi ?? ""}
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
          placeholder="Deskripsi singkat produk/jasa…"
        />
      </div>

      <UploadImages
        name="gambar"
        defaultUrls={initial?.gambar ?? []}
        label="Galeri Gambar"
        bucket="umkm"
      />

      {!state.ok && (
        <p className="text-sm text-red-600">{getErrorMessage(state)}</p>
      )}

      <div className="pt-2 flex items-center gap-2">
        <button className="btn btn-primary">{submitLabel}</button>
      </div>
    </form>
  );
}
