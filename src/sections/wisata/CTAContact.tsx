// src/sections/wisata/CTAContact.tsx
import Link from "next/link";

export default function CTAContact({
  address,
  email,
  wa,
}: {
  address: string;
  email: string;
  wa: string; // tanpa plus (gunakan 62…)
}) {
  return (
    <section className="panel p-5">
      <h2 className="text-lg font-semibold text-slate-900">Kontak & Alamat</h2>
      <div className="mt-2 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border p-3">
          <div className="text-sm text-slate-500">Alamat</div>
          <div className="font-medium text-slate-900">{address}</div>
        </div>
        <div className="rounded-lg border p-3">
          <div className="text-sm text-slate-500">Email</div>
          <Link href={`mailto:${email}`} className="font-medium uline">
            {email}
          </Link>
        </div>
        <div className="rounded-lg border p-3">
          <div className="text-sm text-slate-500">WhatsApp</div>
          <Link
            href={`https://wa.me/${wa}`}
            target="_blank"
            rel="noopener"
            className="font-medium uline"
          >
            +{wa}
          </Link>
        </div>
      </div>
    </section>
  );
}
