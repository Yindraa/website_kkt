// components/ItemCard.tsx
import Link from "next/link";

export default function ItemCard({
  href,
  title,
  subtitle,
  image,
  meta,
}: {
  href: string;
  title: string;
  subtitle?: string;
  image?: string | null;
  meta?: string;
}) {
  return (
    <Link
      href={href}
      className="border rounded-xl2 overflow-hidden bg-white hover:shadow-soft transition-shadow"
    >
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={title} className="h-44 w-full object-cover" />
      )}
      <div className="p-4">
        <div className="font-semibold text-slate-900 line-clamp-1">{title}</div>
        {subtitle && (
          <div className="text-sm text-slate-600 mt-1 line-clamp-2">
            {subtitle}
          </div>
        )}
        {meta && <div className="text-xs text-brand mt-3">{meta}</div>}
      </div>
    </Link>
  );
}
