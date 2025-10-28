// src/sections/kesehatan/MonthlyBadge.tsx
export default function MonthlyBadge({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span
      className={
        "inline-flex items-center rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-800 " +
        className
      }
    >
      Jadwal: Setiap Bulan
    </span>
  );
}
