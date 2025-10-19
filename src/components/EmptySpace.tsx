// components/EmptyState.tsx
export default function EmptyState({
  message = "Belum ada data.",
}: {
  message?: string;
}) {
  return (
    <div className="container-narrow py-14 text-center">
      <div className="inline-flex items-center rounded-xl border bg-white px-4 py-3 text-slate-600">
        {message}
      </div>
    </div>
  );
}
