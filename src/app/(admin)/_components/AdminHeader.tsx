"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, ArrowLeft } from "lucide-react";

export function BackLink({
  href,
  children = "Kembali",
}: {
  href?: string;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  return href ? (
    <Link href={href} className="btn btn-ghost inline-flex items-center gap-2">
      <ArrowLeft size={16} />
      {children}
    </Link>
  ) : (
    <button
      type="button"
      onClick={() => router.back()}
      className="btn btn-ghost inline-flex items-center gap-2"
    >
      <ArrowLeft size={16} />
      {children}
    </button>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="text-sm text-slate-600 flex items-center flex-wrap gap-1">
      {items.map((it, i) => (
        <span key={i} className="inline-flex items-center gap-1">
          {it.href ? (
            <Link className="underline-offset-4 hover:underline" href={it.href}>
              {it.label}
            </Link>
          ) : (
            <span className="text-slate-800 font-medium">{it.label}</span>
          )}
          {i < items.length - 1 && <ChevronRight size={14} />}
        </span>
      ))}
    </nav>
  );
}

export default function AdminHeader({
  title,
  breadcrumbs,
  actions,
  backHref,
}: {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
  backHref?: string; // opsional
}) {
  return (
    <header className="mb-4">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900 truncate">
            {title}
          </h1>
        </div>
        <div className="flex items-center gap-2">{actions}</div>
      </div>
      {backHref !== undefined && (
        <div className="mt-3">
          <BackLink href={backHref} />
        </div>
      )}
    </header>
  );
}
