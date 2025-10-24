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
  // sosial (kita isi username saja)
  pemilik?: string | null;
  websiteUrl?: string | null; // boleh domain/URL penuh atau kosong
  instagramUrl?: string | null; // username saja, contoh: desaleilem
  facebookUrl?: string | null; // username/halaman: desa.leilem
  tiktokUrl?: string | null; // username: desaleilem
  xUrl?: string | null; // username: desaleilem
  youtubeUrl?: string | null; // channel handle tanpa '@' atau custom id
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
          <label className="block text-sm text-slate-600">Kontak umum</label>
          <input
            name="kontak"
            defaultValue={initial?.kontak ?? ""}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Nomor WA / telepon (opsional)"
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
          <label className="block text-sm text-slate-600">Google Maps</label>
          <input
            name="gmapsLink"
            defaultValue={initial?.gmapsLink ?? ""}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Tempel URL / koordinat lat,lng / alamat"
          />
          <p className="text-xs text-slate-500 mt-1">
            Paling akurat: pakai “Bagikan → Sematkan peta” (URL berisi
            <code> /maps/embed</code>) atau masukkan koordinat{" "}
            <code>lat,lng</code>.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-slate-600">Nama Pemilik</label>
          <input
            name="pemilik"
            defaultValue={initial?.pemilik ?? ""}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Nama lengkap (opsional)"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-600">Website</label>
          <input
            name="websiteUrl"
            defaultValue={initial?.websiteUrl ?? ""}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="contoh: desaleilem.id (opsional)"
          />
        </div>
      </div>

      {/* Username medsos */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label className="block text-sm text-slate-600">Instagram</label>
          <input
            name="instagramUrl"
            defaultValue={initial?.instagramUrl ?? ""}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="username saja, mis. desaleilem"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-600">Facebook</label>
          <input
            name="facebookUrl"
            defaultValue={initial?.facebookUrl ?? ""}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="halaman/username, mis. desa.leilem"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-600">TikTok</label>
          <input
            name="tiktokUrl"
            defaultValue={initial?.tiktokUrl ?? ""}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="username, mis. desaleilem"
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-slate-600">X (Twitter)</label>
          <input
            name="xUrl"
            defaultValue={initial?.xUrl ?? ""}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="username (tanpa @), mis. desaleilem"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-600">YouTube</label>
          <input
            name="youtubeUrl"
            defaultValue={initial?.youtubeUrl ?? ""}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="handle tanpa @ / custom id"
          />
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
