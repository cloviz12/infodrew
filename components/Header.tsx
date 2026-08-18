import Link from "next/link";
import Weave from "@/components/Weave";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/colombia", label: "Colombia" },
  { href: "/cauca", label: "Cauca" },
  { href: "/enviar", label: "Envía tu noticia" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-foreground text-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-accent font-display text-lg font-black text-white">
            C
          </span>
          <span className="font-display text-base font-black uppercase leading-none tracking-tight sm:text-xl">
            Colombia Incluyente
          </span>
        </Link>

        <nav className="hidden items-center md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 text-[12px] font-extrabold uppercase tracking-wide text-background/85 transition hover:bg-accent hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#seguir"
          className="hidden shrink-0 bg-accent px-4 py-2 text-[11px] font-extrabold uppercase tracking-wide text-white transition hover:bg-accent-dark sm:inline-flex"
        >
          Síguenos
        </Link>
      </div>

      <nav className="flex items-center gap-1 overflow-x-auto border-t border-background/15 px-2 py-1.5 md:hidden">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 px-2.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-background/85"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Weave id="header-weave" fg="#c81f2c" height={8} />
    </header>
  );
}
