// src/sections/wisata/HighlightIcons.tsx
import { Flame, Sparkles, Leaf, Users, Camera, MapPinned } from "lucide-react";

const ICONS = {
  hot: Flame,
  sparkles: Sparkles,
  leaf: Leaf,
  family: Users,
  camera: Camera,
  map: MapPinned,
} as const;

type Key = keyof typeof ICONS;

export default function HighlightIcons({
  items,
}: {
  items: { icon: Key; title: string; text: string }[];
}) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => {
        const Icon = ICONS[it.icon];
        return (
          <div key={it.title} className="panel p-4">
            <div className="flex items-center gap-2">
              <span className="rounded-md border border-slate-200 bg-slate-50 p-2">
                <Icon size={16} className="text-brand-700" />
              </span>
              <div className="font-medium text-slate-900">{it.title}</div>
            </div>
            <p className="mt-1 text-sm text-slate-600">{it.text}</p>
          </div>
        );
      })}
    </section>
  );
}
