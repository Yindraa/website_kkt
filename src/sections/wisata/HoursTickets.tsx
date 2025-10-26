// src/sections/wisata/HoursTickets.tsx

export default function HoursTickets({
  openingHours,
  ticketPolicy,
  tickets,
}: {
  openingHours: { day: string; time: string }[];
  ticketPolicy: string;
  tickets: { label: string; price: string }[];
}) {
  return (
    <section className="panel p-5">
      <h2 className="text-lg font-semibold text-slate-900">Jam & Tiket</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border p-3">
          <div className="font-medium text-slate-900">Jam Operasional</div>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {openingHours.map((h) => (
              <li key={h.day} className="flex justify-between">
                <span>{h.day}</span>
                <span className="font-medium">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border p-3">
          <div className="font-medium text-slate-900">Tiket</div>
          <div className="text-xs text-slate-500 mt-1">{ticketPolicy}</div>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {tickets.map((t) => (
              <li key={t.label} className="flex justify-between">
                <span>{t.label}</span>
                <span className="font-medium">{t.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
