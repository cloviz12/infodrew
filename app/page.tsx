import Link from "next/link";
import PostCard from "@/components/PostCard";
import SeguirWidget from "@/components/SeguirWidget";
import ArtCover from "@/components/ArtCover";
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
      <ArtCover slot={ART.home} tone="ink" className="flex min-h-[80vh] items-end sm:min-h-[88vh]">
        <div className="w-full px-4 pb-14 pt-28 sm:px-6 sm:pb-20">
          <div className="mx-auto max-w-6xl">
            <span className="eyebrow text-white/65">Plataforma comunitaria</span>
            <h1 className="mt-5 max-w-3xl font-display text-[2.6rem] font-medium leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              Conectamos líderes, organizaciones y territorios de{" "}
              <span className="italic" style={{ color: "var(--colombia-gold)" }}>
                Colombia
              </span>{" "}
              y el{" "}
              <span className="italic" style={{ color: "var(--cauca-light)" }}>
                Cauca
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              Noticias, fotos y videos sobre lo que ocurre en el país y en el
              territorio caucano: organizaciones sociales, comunidades
              campesinas, mujeres y comunidades afro. Comenta, comparte y
              participa.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/enviar"
                className="rounded-full bg-white px-6 py-3 text-sm font-bold text-foreground transition hover:bg-white/90"
              >
                Envía tu noticia
              </Link>
              <Link
                href="/cauca"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:border-white"
              >
                Ver Cauca
              </Link>
            </div>

            <div className="mt-14 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-6">
              <Stat label="Noticias Colombia" value={stats.colombia} />
              <Stat label="Noticias Cauca" value={stats.cauca} />
              <Stat label="Seguidores" value={stats.followers} />
            </div>
          </div>
        </div>
      </ArtCover>

      <main className="mx-auto flex max-w-6xl flex-col gap-20 px-4 py-16 sm:px-6 sm:py-20">
        <SeguirWidget followerCount={stats.followers} feedback={follow as "success" | "error" | undefined} />

        <SectionPreview
          title="Colombia"
          description="Los temas y acontecimientos más relevantes del país."
          href="/colombia"
          accent="text-colombia"
          posts={colombiaPosts}
        />

        <SectionPreview
          title="Cauca"
          description="Organizaciones sociales, comunidades campesinas, mujeres y comunidades afro del territorio."
          href="/cauca"
          accent="text-cauca"
          posts={caucaPosts}
        />
      </main>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col">
      <span className="font-display text-3xl font-medium text-white">{formatNumber(value)}</span>
      <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white/55">{label}</span>
    </div>
  );
}

function SectionPreview({
  title,
  description,
  href,
  accent,
  posts,
}: {
  title: string;
  description: string;
  href: string;
  accent: string;
  posts: Awaited<ReturnType<typeof getPublishedPosts>>;
}) {
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
        <div>
          <h2 className={`font-display text-3xl font-medium ${accent}`}>{title}</h2>
          <p className="mt-1.5 text-sm text-muted">{description}</p>
        </div>
        <Link href={href} className={`text-sm font-semibold ${accent} hover:underline`}>
          Ver todo →
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mt-8 text-sm italic text-muted">
          Aún no hay noticias publicadas en esta sección. ¡Sé la primera
          organización en enviar contenido!
        </p>
      ) : (
        <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
