"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  IconClose,
  IconFacebook,
  IconInstagram,
  IconLeaf,
  IconMenu,
  IconSearch,
  IconUser,
  IconX,
  IconYoutube,
} from "@/components/icons";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/colombia", label: "Colombia" },
  { href: "/cauca", label: "Cauca" },
  { href: "/enviar", label: "Envíanos tu noticia" },
  { href: "/quienes-somos", label: "Quiénes somos" },
  { href: "/contacto", label: "Contacto" },
];

const social = [
  { href: "https://facebook.com", label: "Facebook", icon: IconFacebook },
  { href: "https://instagram.com", label: "Instagram", icon: IconInstagram },
  { href: "https://youtube.com", label: "YouTube", icon: IconYoutube },
  { href: "https://x.com", label: "X", icon: IconX },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="hidden bg-ink sm:block">
        <div className="mx-auto flex max-w-6xl justify-end gap-4 px-4 py-1.5 sm:px-6">
          {social.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-white/60 transition hover:text-white"
            >
              <Icon className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white">
            <IconLeaf className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[15px] font-extrabold uppercase tracking-tight text-accent">
              Colombia
            </span>
            <span className="-mt-0.5 block font-display text-lg font-black uppercase leading-none tracking-tight text-foreground">
              Incluyente
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`border-b-2 px-3 py-2 text-[13px] font-semibold transition ${
                  active
                    ? "border-accent text-accent"
                    : "border-transparent text-foreground/75 hover:border-border hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Buscar"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-foreground/70 transition hover:bg-surface-muted hover:text-foreground sm:flex"
          >
            <IconSearch className="h-5 w-5" />
          </button>
          <Link
            href="/admin/login"
            className="hidden items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-[13px] font-bold text-white transition hover:bg-accent-dark sm:inline-flex"
          >
            <IconUser className="h-4 w-4" />
            Iniciar sesión
          </Link>
          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition hover:bg-surface-muted lg:hidden"
          >
            {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-0.5 border-t border-border px-4 py-2 lg:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2.5 py-2.5 text-sm font-semibold text-foreground/85 hover:bg-surface-muted"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/admin/login"
            onClick={() => setOpen(false)}
            className="mt-1 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-bold text-white"
          >
            <IconUser className="h-4 w-4" />
            Iniciar sesión
          </Link>
        </nav>
      )}
    </header>
  );
}
