import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="text-base font-bold text-foreground">InfoDrew</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Una plataforma informativa e interactiva que conecta a líderes
            nacionales, regionales y a los diferentes sectores del territorio:
            organizaciones sociales, comunidades campesinas, mujeres y
            comunidades afro.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Explorar</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link className="hover:text-colombia" href="/colombia">Colombia</Link></li>
            <li><Link className="hover:text-cauca" href="/cauca">Cauca</Link></li>
            <li><Link className="hover:text-foreground" href="/enviar">Envía tu noticia</Link></li>
            <li><Link className="hover:text-foreground" href="/#seguir">Síguenos</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Participa</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            ¿Perteneces a una organización social, comunidad o colectivo?
            Envíanos tu noticia, fotos o video y ayúdanos a contar lo que
            pasa en tu territorio.
          </p>
        </div>
      </div>

      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} InfoDrew — Contenido enviado por la
        comunidad, revisado antes de publicarse.
      </div>
    </footer>
  );
}
