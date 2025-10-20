// src/sections/profil/components/DemografiStats.tsx
import { Stat } from "../types";

export default function DemografiStats({ items }: { items: Stat[] }) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ label, value, icon: Icon }) => (
        <div key={label} className="panel p-4">
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-slate-200 bg-slate-50 p-2">
              <Icon size={16} className="text-brand-700" />
            </span>
            <div className="text-sm text-slate-500">{label}</div>
          </div>
          <div className="mt-1 font-semibold text-slate-900">{value}</div>
        </div>
      ))}
    </section>
  );
}
