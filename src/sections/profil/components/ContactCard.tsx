// src/sections/profil/components/ContactCard.tsx
import Link from "next/link";

export default function ContactCard() {
  return (
    <section className="panel p-6">
      <h2 className="font-semibold text-slate-900">Kontak Singkat</h2>
      <div className="mt-3 text-slate-600">
        <div>Telepon: 08xx-xxxx-xxxx</div>
        <div>Email: desa.leilem@example.go.id</div>
        <div>Alamat: Jl. …, Minahasa, Sulawesi Utara</div>
      </div>
      <Link href="/kontak-layanan" className="btn btn-primary mt-4 inline-flex">
        Hubungi & Layanan Warga
      </Link>
    </section>
  );
}
