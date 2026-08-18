import Link from "next/link";
import { IconPencil, IconSend } from "@/components/icons";

export default function SendNewsCard() {
  return (
    <div className="flex aspect-[4/5] flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-surface-muted p-6 text-center sm:aspect-[3/4]">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface text-accent">
        <IconPencil className="h-6 w-6" />
      </span>
      <h3 className="font-display text-lg font-bold text-foreground">Envíanos tu noticia</h3>
      <p className="text-sm leading-relaxed text-muted">
        ¿Tienes una historia que contar? Personas y organizaciones pueden
        enviarnos sus noticias, fotos o videos. Nuestro equipo las revisará
        y podrá publicarlas en la plataforma.
      </p>
      <Link
        href="/enviar"
        className="mt-1 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-bold text-white transition hover:bg-accent-dark"
      >
        <IconSend className="h-4 w-4" />
        Enviar mi contenido
      </Link>
    </div>
  );
}
