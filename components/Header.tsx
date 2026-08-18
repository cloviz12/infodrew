import Link from "next/link";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/colombia", label: "Colombia" },
  { href: "/cauca", label: "Cauca" },
  { href: "/enviar", label: "Envía tu noticia" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/92 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-baseline gap-2.5">
          <span className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Colombia Incluyente
          </span>
          <span className="hidden text-[10px] font-medium uppercase tracking-[0.22em] text-muted lg:inline">
            + Cauca
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium uppercase tracking-[0.08em] text-foreground/75 transition hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#seguir"
          className="hidden shrink-0 rounded-full border border-foreground/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-foreground transition hover:border-accent hover:text-accent sm:inline-flex"
        >
          Síguenos
        </Link>
      </div>

      <nav className="flex items-center gap-5 overflow-x-auto border-t border-border/70 px-4 py-2.5 md:hidden">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 text-xs font-medium uppercase tracking-[0.06em] text-foreground/75"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
