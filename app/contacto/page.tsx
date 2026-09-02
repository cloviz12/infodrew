import type { Metadata } from "next";
import Link from "next/link";
import { IconMapPin, IconMegaphone, IconPencil } from "@/components/icons";
import { SOCIAL_LINKS } from "@/lib/social";

export const metadata: Metadata = {
  title: "Contacto - Colombia Incluyente",
  description:
    "Canales para contactar a Colombia Incluyente: envío de noticias, comunidad de seguidores y redes sociales.",
};

export default function ContactoPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Contacto</p>
      <h1 className="mt-4 font-display text-3xl font-black leading-tight text-foreground sm:text-4xl">
        Hablemos
      </h1>
      <p className="mt-5 text-base leading-relaxed text-muted">
        Colombia Incluyente se construye con lo que nos comparten líderes,
        organizaciones y comunidades del territorio. Estas son las vías para
        llegar a nosotros hoy.
      </p>

      <div className="mt-10 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-surface p-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-light text-accent-dark">
            <IconPencil className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-lg font-bold text-foreground">Envía tu noticia</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Para compartir una noticia, fotos o video de tu organización o
              comunidad, usa el formulario público. Tu contenido queda
              pendiente hasta que el equipo editorial lo revise.
            </p>
          </div>
          <Link
            href="/enviar"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground transition hover:bg-accent-dark"
          >
            Ir al formulario
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-surface p-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-light text-accent-dark">
            <IconMegaphone className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-lg font-bold text-foreground">Únete a la comunidad</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Súmate a Síguenos para enterarte de las noticias de Colombia y
              el Cauca en cuanto se publican.
            </p>
          </div>
          <Link
            href="/#seguir"
            className="inline-flex items-center gap-2 rounded-full border-2 border-accent px-5 py-2.5 text-sm font-bold text-accent transition hover:bg-accent-light"
          >
            Ir a Síguenos
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-surface p-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-light text-accent-dark">
            <IconMapPin className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-lg font-bold text-foreground">Redes sociales</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Síguenos y escríbenos directamente en nuestras redes.
            </p>
          </div>
          <div className="flex gap-2">
            {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-muted text-foreground/70 transition hover:bg-accent hover:text-accent-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
