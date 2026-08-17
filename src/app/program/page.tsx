import Link from "next/link";
import { PROGRAM_AM, PROGRAM_PM, type ProgramItem } from "@/lib/event";

function ScheduleTable({ title, items }: { title: string; items: ProgramItem[] }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-display text-2xl font-bold text-accent-mint">{title}</h2>
      <div className="overflow-hidden rounded-xl border border-violet-500/30">
        <table className="w-full text-left text-sm">
          <tbody>
            {items.map((item) => (
              <tr key={item.time} className="border-b border-violet-500/15 last:border-none odd:bg-navy-900/40">
                <td className="whitespace-nowrap px-4 py-3 align-top font-semibold text-accent-glow">
                  {item.time}
                </td>
                <td className="px-4 py-3 align-top">
                  <p className="font-medium text-violet-100">{item.segment}</p>
                  {item.presenter && (
                    <p className="text-xs text-violet-300">
                      {item.presenter}
                      {item.role ? ` — ${item.role}` : ""}
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function ProgramPage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-16">
      <div className="flex flex-col gap-2">
        <Link href="/" className="text-sm text-violet-300 hover:text-accent-glow">
          ← Back
        </Link>
        <h1 className="font-display text-4xl font-black text-accent-mint">Program Flow</h1>
      </div>

      <ScheduleTable title="Morning" items={PROGRAM_AM} />
      <ScheduleTable title="Afternoon" items={PROGRAM_PM} />
    </main>
  );
}
