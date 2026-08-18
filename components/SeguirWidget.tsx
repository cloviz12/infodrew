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
      className="scroll-mt-24 rounded-2xl border border-border bg-colombia-dark px-6 py-8 text-white sm:px-10 sm:py-10"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-colombia-gold">
            Síguenos
          </p>
          <p className="mt-2 text-3xl font-black">
            {formatNumber(followerCount)}{" "}
            <span className="text-lg font-medium text-white/80">
              {followerCount === 1 ? "persona sigue" : "personas siguen"} InfoDrew
            </span>
          </p>
          <p className="mt-2 max-w-md text-sm text-white/75">
            Únete a la comunidad y recibe las noticias más relevantes de
            Colombia y el Cauca.
          </p>
        </div>

        <form action={followSite} className="flex w-full max-w-sm flex-col gap-2 sm:w-auto">
          <input
            name="name"
            placeholder="Nombre (opcional)"
            className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 outline-none focus:border-colombia-gold"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="tu@correo.com"
            className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 outline-none focus:border-colombia-gold"
          />
          <input
            name="region"
            placeholder="Municipio o región (opcional)"
            className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 outline-none focus:border-colombia-gold"
          />
          <button
            type="submit"
            className="rounded-lg bg-colombia-gold px-4 py-2 text-sm font-bold text-colombia-dark transition hover:brightness-95"
          >
            Seguir
          </button>
          {feedback === "success" && (
            <p className="text-xs font-medium text-cauca-light">
              ¡Gracias por unirte a la comunidad!
            </p>
          )}
          {feedback === "error" && (
            <p className="text-xs font-medium text-colombia-gold">
              Ingresa un correo válido para seguirnos.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
