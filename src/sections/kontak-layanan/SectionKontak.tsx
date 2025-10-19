"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldAlert,
  FileText,
  MessageSquare,
  Send,
  ExternalLink,
  Building2,
  HelpCircle,
} from "lucide-react";
import { Appear, Reveal, stagger, fadeUp } from "@/components/FX";

// === Schema form (validasi client). Nanti mudah dihubungkan ke Prisma PesanKontak.
const FormSchema = z.object({
  nama: z.string().min(2, "Nama terlalu pendek"),
  email: z.string().email("Email tidak valid"),
  subjek: z
    .string()
    .min(3, "Subjek minimal 3 karakter")
    .max(120, "Subjek terlalu panjang"),
  pesan: z.string().min(10, "Pesan minimal 10 karakter"),
});

type FormValues = z.infer<typeof FormSchema>;

export default function SectionKontak() {
  const [sent, setSent] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { nama: "", email: "", subjek: "", pesan: "" },
  });

  // sementara: hanya simulasi submit (console log).
  async function onSubmit(values: FormValues) {
    // TODO (nanti): POST ke /api/kontak → simpan ke Prisma PesanKontak
    console.log("KIRIM KONTAK:", values);
    setSent(true);
    reset();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Heading */}
      <Appear variants={stagger(0.05)} as="div">
        <Appear variants={fadeUp(10)}>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Kontak & Layanan
          </h1>
        </Appear>
        <Appear variants={fadeUp(12)}>
          <p className="text-slate-600 max-w-prose">
            Hubungi Pemerintah Desa Leilem untuk pertanyaan, saran, atau layanan
            administrasi. Kami berusaha merespons secepatnya pada jam kerja.
          </p>
        </Appear>
      </Appear>

      {/* Info kontak cepat */}
      <Appear
        variants={stagger(0.06)}
        className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        <InfoTile
          icon={<Phone size={16} className="text-brand-700" />}
          title="Telepon"
          body={
            <Link href="tel:08xxxxxxxxxx" className="uline">
              08xx-xxxx-xxxx
            </Link>
          }
        />
        <InfoTile
          icon={<Mail size={16} className="text-brand-700" />}
          title="Email"
          body={
            <Link href="mailto:desa.leilem@example.go.id" className="uline">
              desa.leilem@example.go.id
            </Link>
          }
        />
        <InfoTile
          icon={<Clock size={16} className="text-brand-700" />}
          title="Jam Layanan"
          body={
            <>
              Senin–Jumat, 08.00–16.00
              <br />
              Istirahat 12.00–13.00
            </>
          }
        />
        <InfoTile
          icon={<MapPin size={16} className="text-brand-700" />}
          title="Alamat"
          body={
            <>
              Jl. …, Desa Leilem
              <br />
              Minahasa, Sulawesi Utara
            </>
          }
        />
      </Appear>

      {/* Grid 2 kolom: layanan + form */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Kolom kiri: daftar layanan + FAQ + peta */}
        <div className="space-y-6">
          {/* Layanan utama */}
          <Appear variants={fadeUp(10)} as="section" className="panel p-6">
            <div className="flex items-center gap-2">
              <Building2 size={16} className="text-brand-700" />
              <h2 className="font-semibold text-slate-900">
                Layanan Administrasi
              </h2>
            </div>
            <p className="mt-1 text-slate-600">
              Dokumen yang sering diajukan warga. Klik untuk melihat detail
              persyaratan (nanti bisa diarahkan ke halaman khusus).
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <ServiceLink
                href="#"
                icon={<FileText size={16} />}
                title="Surat Keterangan Domisili"
                desc="Untuk kebutuhan administrasi"
              />
              <ServiceLink
                href="#"
                icon={<FileText size={16} />}
                title="Surat Pengantar KTP/KK"
                desc="Pengajuan dokumen kependudukan"
              />
              <ServiceLink
                href="#"
                icon={<FileText size={16} />}
                title="Surat Keterangan Usaha"
                desc="Mendukung pelaku UMKM"
              />
              <ServiceLink
                href="#"
                icon={<FileText size={16} />}
                title="Surat Keterangan Tidak Mampu"
                desc="Kebutuhan sosial/pendidikan"
              />
            </div>
          </Appear>

          {/* Kontak darurat / penting */}
          <Appear variants={fadeUp(12)} as="section" className="panel p-6">
            <div className="flex items-center gap-2">
              <ShieldAlert size={16} className="text-brand-700" />
              <h2 className="font-semibold text-slate-900">Kontak Penting</h2>
            </div>
            <ul className="mt-3 space-y-2 text-slate-700">
              <li>
                <span className="font-medium">Polsek:</span>{" "}
                <Link href="tel:0431xxxxxx" className="uline">
                  0431-xxxxxx
                </Link>
              </li>
              <li>
                <span className="font-medium">Puskesmas:</span>{" "}
                <Link href="tel:0431yyyyyy" className="uline">
                  0431-yyyyyy
                </Link>
              </li>
              <li>
                <span className="font-medium">Damkar/Siaga Bencana:</span>{" "}
                <Link href="tel:112" className="uline">
                  112
                </Link>
              </li>
            </ul>
          </Appear>

          {/* FAQ ringkas */}
          <Appear variants={fadeUp(12)} as="section" className="panel p-6">
            <div className="flex items-center gap-2">
              <HelpCircle size={16} className="text-brand-700" />
              <h2 className="font-semibold text-slate-900">FAQ Singkat</h2>
            </div>
            <div className="mt-3 space-y-3">
              <FaqItem
                q="Berapa lama proses pembuatan surat?"
                a="Umumnya selesai di hari yang sama jika berkas lengkap dan diajukan pada jam kerja."
              />
              <FaqItem
                q="Apakah bisa mengurus surat secara online?"
                a="Saat ini pengajuan awal dapat dilakukan melalui formulir di halaman ini. Pengambilan berkas tetap di kantor desa."
              />
            </div>
          </Appear>

          {/* Peta kantor desa */}
          <Reveal
            variants={fadeUp(12)}
            as="section"
            className="panel p-0 overflow-hidden"
          >
            <div className="p-6">
              <h2 className="font-semibold text-slate-900">Kantor Desa</h2>
              <p className="mt-2 text-slate-600">
                Kunjungi kantor desa untuk layanan tatap muka.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href="https://www.google.com/maps/search/?api=1&query=Balai+Desa+Leilem"
                  target="_blank"
                  className="btn btn-ghost inline-flex"
                >
                  <ExternalLink size={16} /> Buka di Google Maps
                </Link>
              </div>
            </div>
            <div className="aspect-[16/9] w-full">
              <iframe
                title="Balai Desa Leilem"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1303.8635621484536!2d124.81195002921079!3d1.2627393957107094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32876a60d04e35c7%3A0xcab047abdbd09817!2sBalai%20Desa%20Leilem!5e0!3m2!1sid!2sid!4v1760853482637!5m2!1sid!2sid"
                className="h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>

        {/* Kolom kanan: form kontak */}
        <Appear variants={fadeUp(10)} as="section" className="panel p-6">
          <div className="flex items-center gap-2">
            <MessageSquare size={16} className="text-brand-700" />
            <h2 className="font-semibold text-slate-900">Form Kontak</h2>
          </div>

          {sent ? (
            <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
              Pesan terkirim! Kami akan membalas melalui email/telepon yang Anda
              cantumkan.
            </div>
          ) : null}

          <form className="mt-4 space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm text-slate-600">Nama</label>
              <input
                type="text"
                {...register("nama")}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300"
                placeholder="Nama lengkap"
                aria-invalid={!!errors.nama}
              />
              {errors.nama && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.nama.message}
                </p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-slate-600">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300"
                  placeholder="nama@email.com"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-slate-600">Subjek</label>
                <input
                  type="text"
                  {...register("subjek")}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300"
                  placeholder="Subjek pesan"
                  aria-invalid={!!errors.subjek}
                />
                {errors.subjek && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.subjek.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-600">Pesan</label>
              <textarea
                rows={5}
                {...register("pesan")}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300"
                placeholder="Tuliskan pertanyaan/saran/permohonan Anda…"
                aria-invalid={!!errors.pesan}
              />
              {errors.pesan && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.pesan.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary inline-flex"
              disabled={isSubmitting}
            >
              <Send size={16} />
              {isSubmitting ? "Mengirim…" : "Kirim Pesan"}
            </button>
          </form>

          <p className="mt-3 text-xs text-slate-500">
            Dengan mengirim pesan, Anda setuju data akan diproses untuk
            keperluan tindak lanjut layanan. Jangan kirim data sensitif.
          </p>
        </Appear>
      </div>
    </div>
  );
}

/* ==== Subkomponen kecil ==== */

function InfoTile({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <Appear variants={fadeUp(10)} as="div" className="panel p-4">
      <div className="flex items-center gap-2">
        <span className="rounded-md border border-slate-200 bg-slate-50 p-2">
          {icon}
        </span>
        <div className="font-medium text-slate-900">{title}</div>
      </div>
      <div className="mt-1 text-slate-700">{body}</div>
    </Appear>
  );
}

function ServiceLink({
  href,
  icon,
  title,
  desc,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="panel p-4 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-300"
    >
      <div className="flex items-center gap-2">
        <span className="rounded-md border border-slate-200 bg-slate-50 p-2">
          {icon}
        </span>
        <div className="font-semibold text-slate-900">{title}</div>
      </div>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </Link>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-lg border border-slate-200 p-3">
      <div className="font-medium text-slate-900">{q}</div>
      <div className="mt-1 text-slate-600 text-sm">{a}</div>
    </div>
  );
}
