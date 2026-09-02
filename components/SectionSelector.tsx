import Link from "next/link";
import { IconMapPin } from "@/components/icons";

const items = [
  {
    href: "/colombia",
    label: "Colombia",
    color: "var(--colombia-dark)",
    bg: "var(--colombia-light)",
    desc: "Noticias y acontecimientos que impactan al país.",
  },
  {
    href: "/cauca",
    label: "Cauca",
    color: "var(--cauca-dark)",
    bg: "var(--cauca-light)",
    desc: "Historias y procesos que transforman nuestro territorio.",
  },
];

export default function SectionSelector() {
  return (
    <div className="relative z-10 mx-4 -mt-10 grid overflow-hidden rounded-2xl border border-border bg-surface shadow-lg shadow-black/5 sm:mx-auto sm:max-w-5xl sm:grid-cols-2">
      {items.map((item, i) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center gap-4 px-6 py-6 transition hover:bg-surface-muted ${
            i === 0 ? "border-b border-border sm:border-b-0 sm:border-r" : ""
          }`}
        >
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
            style={{ background: item.bg, color: item.color }}
          >
            <IconMapPin className="h-5 w-5" />
          </span>
          <span>
            <span className="block font-display text-base font-black uppercase tracking-tight" style={{ color: item.color }}>
              {item.label}
            </span>
            <span className="mt-0.5 block text-xs text-muted">{item.desc}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
