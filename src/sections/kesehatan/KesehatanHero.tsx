// src/sections/kesehatan/KesehatanHero.tsx
import { Stethoscope } from "lucide-react";

export default function KesehatanHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50 to-sky-50">
      <div className="p-6 lg:p-8">
        <div className="flex items-start gap-3">
          <span className="rounded-xl bg-white border border-slate-200 p-3">
            <Stethoscope className="h-5 w-5 text-emerald-600" />
          </span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {title}
            </h1>
            <p className="mt-2 text-slate-700">{subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
