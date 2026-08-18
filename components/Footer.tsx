import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:grid-cols-3">
        <div>
          <p className="font-display text-xl font-semibold text-foreground">Colombia Incluyente</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            Una plataforma informativa e interactiva que conecta a líderes
            nacionales, regionales y a los diferentes sectores del territorio:
            organizaciones sociales, comunidades campesinas, mujeres y
            comunidades afro.
          </p>
        </div>

        <div>
          <p className="eyebrow text-muted">Explorar</p>
          <ul className="mt-4 space-y-2.5 text-sm text-foreground/80">
            <li><Link className="transition hover:text-accent" href="/colombia">Colombia</Link></li>
            <li><Link className="transition hover:text-accent" href="/cauca">Cauca</Link></li>
            <li><Link className="transition hover:text-accent" href="/enviar">Envía tu noticia</Link></li>
            <li><Link className="transition hover:text-accent" href="/#seguir">Síguenos</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-muted">Participa</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            ¿Perteneces a una organización social, comunidad o colectivo?
            Envíanos tu noticia, fotos o video y ayúdanos a contar lo que
            pasa en tu territorio.
          </p>
        </div>
      </div>

      <div className="border-t border-border px-4 py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} Colombia Incluyente — Contenido enviado por la
        comunidad, revisado antes de publicarse.
      </div>
    </footer>
  );
}
