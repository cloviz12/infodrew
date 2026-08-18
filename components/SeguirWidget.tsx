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
      className="scroll-mt-24 overflow-hidden rounded-3xl bg-ink px-6 py-10 text-white sm:px-12 sm:py-12"
    >
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">Síguenos</p>
          {followerCount > 0 ? (
            <>
              <p className="mt-3 font-display text-4xl font-black text-white">
                {formatNumber(followerCount)}
              </p>
              <p className="text-sm font-semibold text-white/70">
                {followerCount === 1 ? "persona sigue" : "personas siguen"} el proyecto
              </p>
            </>
          ) : (
            <p className="mt-3 max-w-sm font-display text-xl font-black leading-snug text-white">
              Sé de las primeras personas en seguir el proyecto
            </p>
          )}
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
            Únete a la comunidad y recibe las noticias más relevantes de
            Colombia y el Cauca.
          </p>
        </div>

        <form action={followSite} className="flex w-full max-w-sm flex-col gap-2.5 sm:w-auto">
          <input
            name="name"
            placeholder="Nombre (opcional)"
            className="rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-accent"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="tu@correo.com"
            className="rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-accent"
          />
          <input
            name="region"
            placeholder="Municipio o región (opcional)"
            className="rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-accent"
          />
          <button
            type="submit"
            className="rounded-full bg-accent px-4 py-2.5 text-sm font-bold text-white transition hover:bg-accent-dark"
          >
            Seguir
          </button>
          {feedback === "success" && (
            <p className="text-xs font-semibold text-white/70">
              ¡Gracias por unirte a la comunidad!
            </p>
          )}
          {feedback === "error" && (
            <p className="text-xs font-semibold text-red-400">
              Ingresa un correo válido para seguirnos.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
