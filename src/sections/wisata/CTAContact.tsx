// src/sections/wisata/CTAContact.tsx
import Link from "next/link";
import {
  MapPin,
  Mail,
  MessageCircle,
  Instagram,
  Facebook,
  Globe,
  Music2,
} from "lucide-react";

type Social = {
  type: "instagram" | "facebook" | "tiktok" | "website";
  label: string;
  url: string;
};

export default function CTAContact({
  address,
  email,
  wa,
  socials,
}: {
  address: string;
  email: string;
  wa: string; // tanpa plus (gunakan 62…)
  socials?: Social[];
}) {
  return (
    <section className="panel p-5">
      <h2 className="text-lg font-semibold text-slate-900">Kontak & Alamat</h2>

      {/* 3 kartu utama */}
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {/* alamat */}
        <div className="rounded-lg border border-slate-200 bg-white/70 px-3 py-3 min-w-0 flex gap-3">
          <div className="mt-1 shrink-0 rounded-full bg-slate-100 p-2 text-slate-600">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs text-slate-500">Alamat</div>
            <div className="text-sm font-medium text-slate-900 break-words">
              {address}
            </div>
          </div>
        </div>

        {/* email – truncate biar gak keluar card */}
        <div className="rounded-lg border border-slate-200 bg-white/70 px-3 py-3 min-w-0 flex gap-3">
          <div className="mt-1 shrink-0 rounded-full bg-slate-100 p-2 text-slate-600">
            <Mail className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs text-slate-500">Email</div>
            <Link
              href={`mailto:${email}`}
              className="text-sm font-medium text-brand-700 block truncate"
              title={email}
            >
              {email}
            </Link>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="rounded-lg border border-slate-200 bg-white/70 px-3 py-3 min-w-0 flex gap-3">
          <div className="mt-1 shrink-0 rounded-full bg-emerald-100 p-2 text-emerald-600">
            <MessageCircle className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs text-slate-500">WhatsApp</div>
            <Link
              href={`https://wa.me/${wa}`}
              target="_blank"
              rel="noopener"
              className="text-sm font-medium text-emerald-700"
            >
              +{wa}
            </Link>
          </div>
        </div>
      </div>

      {/* socials opsional */}
      {socials && socials.length > 0 ? (
        <div className="mt-4">
          <p className="text-xs text-slate-500 mb-2">
            Kanal resmi wisata Rano Reindang:
          </p>
          <div className="flex flex-wrap gap-2">
            {socials.map((s) => {
              const Icon =
                s.type === "instagram"
                  ? Instagram
                  : s.type === "facebook"
                  ? Facebook
                  : s.type === "tiktok"
                  ? Music2
                  : Globe;

              return (
                <Link
                  key={s.type}
                  href={s.url}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
                  title={s.label}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[120px]">{s.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}
