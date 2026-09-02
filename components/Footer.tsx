import Link from "next/link";
import { IconLeaf } from "@/components/icons";
import { SOCIAL_LINKS } from "@/lib/social";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <IconLeaf className="h-4 w-4" />
            </span>
            <span className="font-display text-lg font-black uppercase leading-none tracking-tight text-foreground">
              Colombia Incluyente
            </span>
          </Link>
          <p className="mt-3.5 max-w-xs text-sm leading-relaxed text-muted">
            Una plataforma informativa e interactiva que conecta a líderes
            nacionales, regionales y a los diferentes sectores del territorio:
            organizaciones sociales, comunidades campesinas, mujeres y
            comunidades afro.
          </p>
          <div className="mt-5 flex gap-2">
            {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-muted text-foreground/70 transition hover:bg-accent hover:text-accent-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-foreground">Explorar</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li><Link className="transition hover:text-accent" href="/colombia">Colombia</Link></li>
            <li><Link className="transition hover:text-accent" href="/cauca">Cauca</Link></li>
            <li><Link className="transition hover:text-accent" href="/enviar">Envía tu noticia</Link></li>
            <li><Link className="transition hover:text-accent" href="/#seguir">Síguenos</Link></li>
            <li><Link className="transition hover:text-accent" href="/quienes-somos">Quiénes somos</Link></li>
            <li><Link className="transition hover:text-accent" href="/contacto">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-foreground">Participa</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            ¿Perteneces a una organización social, comunidad o colectivo?
            Envíanos tu noticia, fotos o video y ayúdanos a contar lo que
            pasa en tu territorio.
          </p>
        </div>
      </div>

      <div className="border-t border-border px-4 py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} Colombia Incluyente. Contenido enviado por la
        comunidad, revisado antes de publicarse.
      </div>
    </footer>
  );
}
