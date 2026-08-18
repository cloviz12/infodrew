import { followSite } from "@/app/actions";
import { formatNumber } from "@/lib/format";

export default function SeguirWidget({
  followerCount,
  feedback,
}: {
  followerCount: number;
  feedback?: "success" | "error";
}) {
  return (
    <section
      id="seguir"
      className="scroll-mt-24 rounded-sm bg-foreground px-6 py-10 text-background sm:px-12 sm:py-12"
    >
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow text-accent">Síguenos</p>
          <p className="mt-3 font-display text-4xl font-medium text-background">
            {formatNumber(followerCount)}
          </p>
          <p className="text-sm font-medium text-background/70">
            {followerCount === 1 ? "persona sigue" : "personas siguen"} InfoDrew
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-background/60">
            Únete a la comunidad y recibe las noticias más relevantes de
            Colombia y el Cauca.
          </p>
        </div>

        <form action={followSite} className="flex w-full max-w-sm flex-col gap-2.5 sm:w-auto">
          <input
            name="name"
            placeholder="Nombre (opcional)"
            className="rounded-sm border border-background/25 bg-background/5 px-3 py-2.5 text-sm text-background placeholder:text-background/40 outline-none focus:border-accent"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="tu@correo.com"
            className="rounded-sm border border-background/25 bg-background/5 px-3 py-2.5 text-sm text-background placeholder:text-background/40 outline-none focus:border-accent"
          />
          <input
            name="region"
            placeholder="Municipio o región (opcional)"
            className="rounded-sm border border-background/25 bg-background/5 px-3 py-2.5 text-sm text-background placeholder:text-background/40 outline-none focus:border-accent"
          />
          <button
            type="submit"
            className="rounded-full bg-accent px-4 py-2.5 text-sm font-bold text-white transition hover:bg-accent-dark"
          >
            Seguir
          </button>
          {feedback === "success" && (
            <p className="text-xs font-medium text-background/70">
              ¡Gracias por unirte a la comunidad!
            </p>
          )}
          {feedback === "error" && (
            <p className="text-xs font-medium text-accent">
              Ingresa un correo válido para seguirnos.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
