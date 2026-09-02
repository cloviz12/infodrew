import type { Metadata } from "next";
import Link from "next/link";
import { IconLeaf, IconPencil, IconUsers } from "@/components/icons";

export const metadata: Metadata = {
  title: "Quiénes somos - Colombia Incluyente",
  description:
    "Colombia Incluyente es una plataforma informativa e interactiva que conecta a líderes nacionales, regionales y a los sectores sociales de Colombia y el Cauca.",
};

export default function QuienesSomosPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Quiénes somos</p>
      <h1 className="mt-4 font-display text-3xl font-black leading-tight text-foreground sm:text-4xl">
        Un territorio, muchas voces
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
        Colombia Incluyente es una plataforma informativa e interactiva que
        conecta a líderes nacionales, regionales y a los diferentes sectores
        del territorio: organizaciones sociales, comunidades campesinas,
        mujeres y comunidades afro. Contamos lo que pasa en el país y en el
        Cauca con la información que llega directamente de quienes lo viven.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-colombia/30 bg-colombia-light p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-colombia text-white">
            <IconLeaf className="h-5 w-5" />
          </span>
          <h2 className="mt-4 font-display text-lg font-bold text-colombia-dark">Colombia</h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground/80">
            Los temas y acontecimientos más relevantes del país, con la
            mirada puesta en sus líderes nacionales y regionales.
          </p>
        </div>
        <div className="rounded-2xl border border-cauca/30 bg-cauca-light p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cauca text-white">
            <IconUsers className="h-5 w-5" />
          </span>
          <h2 className="mt-4 font-display text-lg font-bold text-cauca-dark">Cauca</h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground/80">
            Organizaciones sociales, comunidades campesinas, mujeres y
            comunidades afro del territorio caucano.
          </p>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-black text-foreground">Cómo funciona</h2>
        <ol className="mt-6 flex flex-col gap-5">
          <li className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-light font-display text-sm font-black text-accent-dark">
              1
            </span>
            <p className="text-sm leading-relaxed text-muted">
              Cualquier persona u organización envía su noticia, fotos o
              video desde{" "}
              <Link href="/enviar" className="font-semibold text-accent hover:underline">
                Envíanos tu noticia
              </Link>
              .
            </p>
          </li>
          <li className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-light font-display text-sm font-black text-accent-dark">
              2
            </span>
            <p className="text-sm leading-relaxed text-muted">
              El contenido queda pendiente y no se publica todavía.
            </p>
          </li>
          <li className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-light font-display text-sm font-black text-accent-dark">
              3
            </span>
            <p className="text-sm leading-relaxed text-muted">
              El equipo editorial revisa cada envío y, al aprobarlo, la
              noticia se publica de inmediato en Colombia o en Cauca.
            </p>
          </li>
        </ol>
      </section>

      <div className="mt-12 flex flex-wrap gap-3 rounded-2xl border border-border bg-surface p-6">
        <div className="flex-1">
          <h2 className="font-display text-lg font-bold text-foreground">
            ¿Tienes una historia que contar?
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            Súmate como comunidad, organización o líder del territorio.
          </p>
        </div>
        <Link
          href="/enviar"
          className="inline-flex h-fit items-center gap-2 self-center rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white transition hover:bg-accent-dark"
        >
          <IconPencil className="h-4 w-4" />
          Enviar mi contenido
        </Link>
      </div>
    </main>
  );
}
