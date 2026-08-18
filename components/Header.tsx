import Link from "next/link";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/colombia", label: "Colombia" },
  { href: "/cauca", label: "Cauca" },
  { href: "/enviar", label: "Envía tu noticia" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-colombia-dark text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cauca text-sm font-black">
            ID
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold">InfoDrew</span>
            <span className="text-[11px] font-medium text-white/70">
              Colombia · Cauca en conexión
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#seguir"
          className="rounded-full bg-colombia-gold px-4 py-2 text-sm font-bold text-colombia-dark transition hover:brightness-95"
        >
          Síguenos
        </Link>
      </div>

      <nav className="flex items-center gap-1 overflow-x-auto border-t border-white/10 px-4 py-2 md:hidden">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 rounded-md px-3 py-1.5 text-sm font-medium text-white/85 hover:bg-white/10"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
