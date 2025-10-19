// components/SectionHeader.tsx
export default function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="container-narrow py-8">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
        {title}
      </h1>
      {subtitle && <p className="text-slate-600 mt-2">{subtitle}</p>}
    </div>
  );
}
