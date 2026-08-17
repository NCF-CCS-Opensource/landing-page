import Link from "next/link";
import { EVENT, PLACEHOLDER_ATTENDANCE_URL } from "@/lib/event";

const CARDS = [
  {
    href: "/generator",
    title: "Make a Frame",
    body: "Pick your course frame, upload a photo, and download your branded GA 2026 picture.",
    external: false,
  },
  {
    href: "/program",
    title: "Program Flow",
    body: "See the full AM/PM schedule — segments, times, and speakers.",
    external: false,
  },
  {
    href: PLACEHOLDER_ATTENDANCE_URL,
    title: "Attendance",
    body: "Head to the attendance/QR app to check in for the event.",
    external: true,
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center gap-12 px-6 py-20 text-center">
      <div className="flex flex-col items-center gap-3">
        <p className="font-display text-sm uppercase tracking-[0.3em] text-accent-glow">
          {EVENT.subtitle}
        </p>
        <h1 className="font-display text-5xl font-black text-accent-mint drop-shadow-[0_0_20px_rgba(56,189,248,0.4)] sm:text-7xl">
          {EVENT.title}
        </h1>
        <p className="max-w-xl text-balance text-lg text-violet-200">
          &ldquo;{EVENT.theme}&rdquo;
        </p>
        <p className="text-sm text-violet-300">
          {EVENT.date} · {EVENT.time} · {EVENT.venue}
        </p>
      </div>

      <div className="grid w-full gap-4 sm:grid-cols-3">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            target={card.external ? "_blank" : undefined}
            rel={card.external ? "noreferrer" : undefined}
            className="group flex flex-col gap-2 rounded-2xl border border-violet-500/30 bg-navy-900/60 p-6 text-left shadow-[0_0_30px_rgba(139,92,246,0.08)] transition hover:border-accent-glow hover:shadow-[0_0_30px_rgba(56,189,248,0.25)]"
          >
            <h2 className="font-display text-xl font-bold text-accent-mint">{card.title}</h2>
            <p className="text-sm text-violet-200">{card.body}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
