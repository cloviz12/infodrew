import Link from "next/link";
import { formatNumber } from "@/lib/format";

const AVATAR_COLORS = ["#1f6d45", "#1c5a7c", "#a3521c", "#8a3fa8"];

export default function HeroFollowCard({ followerCount }: { followerCount: number }) {
  return (
    <div className="w-full max-w-xs rounded-2xl bg-ink p-6 text-white shadow-xl shadow-black/20 sm:max-w-sm">
      <p className="text-sm font-semibold text-white/80">Síguenos y sé parte de la comunidad</p>
      <p className="mt-3 font-display text-4xl font-black leading-none">{formatNumber(followerCount)}</p>
      <p className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-white/50">
        {followerCount === 1 ? "Persona nos sigue" : "Personas nos siguen"}
      </p>
      <div className="mt-4 flex items-center">
        {AVATAR_COLORS.map((color, i) => (
          <span
            key={color}
            className="-ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink text-[11px] font-bold text-white first:ml-0"
            style={{ background: color }}
          >
            {String.fromCharCode(65 + i)}
          </span>
        ))}
        <span className="-ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink bg-white/15 text-xs font-bold text-white">
          +
        </span>
      </div>
      <Link
        href="/#seguir"
        className="mt-5 flex w-full items-center justify-center rounded-full bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground transition hover:bg-accent-dark"
      >
        Seguir
      </Link>
    </div>
  );
}
