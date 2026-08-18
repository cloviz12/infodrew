import Link from "next/link";
import PostCard from "@/components/PostCard";
import SeguirWidget from "@/components/SeguirWidget";
import ArtCover from "@/components/ArtCover";
import Weave from "@/components/Weave";
import { getPublishedPosts, getSiteStats } from "@/lib/data";
import { formatNumber } from "@/lib/format";
import { ART } from "@/lib/art";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ follow?: string }>;
}) {
  const { follow } = await searchParams;
  const [colombiaPosts, caucaPosts, stats] = await Promise.all([
    getPublishedPosts("COLOMBIA", 3),
    getPublishedPosts("CAUCA", 3),
    getSiteStats(),
  ]);

  return (
    <>
      <ArtCover slot={ART.home} tone="ink" className="h-[46vh] sm:h-[58vh]">
        <div className="flex h-full items-start p-4 sm:p-6">
          <span className="bg-accent px-3 py-1.5 font-display text-[11px] font-black uppercase tracking-wider text-white">
            Plataforma comunitaria
          </span>
        </div>
      </ArtCover>
      <Weave id="hero-weave" fg="#c81f2c" bg="#15130f" height={10} />

      <div className="bg-foreground text-background">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <h1 className="font-display text-[clamp(2.25rem,11vw,7rem)] font-black uppercase leading-[0.92] tracking-tight break-words">
            Conectamos{" "}
            <span className="text-accent">Colombia</span>
            <br />y el{" "}
            <span style={{ color: "var(--colombia-gold)" }}>Cauca</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-background/65 sm:text-lg">
            Noticias, fotos y videos sobre lo que ocurre en el país y en el
            territorio caucano: organizaciones sociales, comunidades
            campesinas, mujeres y comunidades afro. Comenta, comparte y
            participa.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/enviar"
              className="bg-accent px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-accent-dark"
            >
              Envía tu noticia
            </Link>
            <Link
              href="/cauca"
              className="border-2 border-background px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-background transition hover:bg-background hover:text-foreground"
            >
              Ver Cauca
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 border-t-4 border-accent pt-6">
            <Stat label="Noticias Colombia" value={stats.colombia} />
            <Stat label="Noticias Cauca" value={stats.cauca} />
            <Stat label="Seguidores" value={stats.followers} />
          </div>
        </div>
      </div>

      <main className="mx-auto flex max-w-6xl flex-col gap-20 px-4 py-16 sm:px-6 sm:py-20">
        <SeguirWidget followerCount={stats.followers} feedback={follow as "success" | "error" | undefined} />

        <SectionPreview
          title="Colombia"
          description="Los temas y acontecimientos más relevantes del país."
          href="/colombia"
          color="var(--colombia)"
          posts={colombiaPosts}
        />

        <SectionPreview
          title="Cauca"
          description="Organizaciones sociales, comunidades campesinas, mujeres y comunidades afro del territorio."
          href="/cauca"
          color="var(--cauca)"
          posts={caucaPosts}
        />
      </main>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col">
      <span className="font-display text-4xl font-black text-background sm:text-5xl">
        {formatNumber(value)}
      </span>
      <span className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-background/50">
        {label}
      </span>
    </div>
  );
}

function SectionPreview({
  title,
  description,
  href,
  color,
  posts,
}: {
  title: string;
  description: string;
  href: string;
  color: string;
  posts: Awaited<ReturnType<typeof getPublishedPosts>>;
}) {
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4 border-t-4 pt-4" style={{ borderColor: color }}>
        <div>
          <h2 className="font-display text-4xl font-black uppercase tracking-tight" style={{ color }}>
            {title}
          </h2>
          <p className="mt-1.5 text-sm text-muted">{description}</p>
        </div>
        <Link
          href={href}
          className="text-sm font-extrabold uppercase tracking-wide hover:underline"
          style={{ color }}
        >
          Ver todo →
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mt-8 text-sm font-semibold italic text-muted">
          Aún no hay noticias publicadas en esta sección. ¡Sé la primera
          organización en enviar contenido!
        </p>
      ) : (
        <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
