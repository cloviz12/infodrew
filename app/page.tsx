import Link from "next/link";
import PostCard from "@/components/PostCard";
import SeguirWidget from "@/components/SeguirWidget";
import { getPublishedPosts, getSiteStats } from "@/lib/data";
import { formatNumber } from "@/lib/format";

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
    <main className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-10">
      <section className="grid gap-8 rounded-3xl border border-border bg-surface p-8 sm:p-12 lg:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col justify-center gap-5">
          <span className="tag-pill w-fit bg-cauca-light text-cauca-dark">
            Plataforma comunitaria
          </span>
          <h1 className="text-3xl font-black leading-tight text-foreground sm:text-4xl">
            Conectamos líderes, organizaciones y territorios de{" "}
            <span className="text-colombia">Colombia</span> y el{" "}
            <span className="text-cauca">Cauca</span>
          </h1>
          <p className="text-base leading-relaxed text-muted">
            Noticias, fotos y videos sobre lo que ocurre en el país y en el
            territorio caucano: organizaciones sociales, comunidades
            campesinas, mujeres y comunidades afro. Comenta, comparte y
            participa.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/enviar"
              className="rounded-full bg-colombia px-5 py-3 text-sm font-bold text-white transition hover:bg-colombia-dark"
            >
              Envía tu noticia
            </Link>
            <Link
              href="/cauca"
              className="rounded-full border border-border px-5 py-3 text-sm font-bold text-foreground transition hover:border-cauca hover:text-cauca"
            >
              Ver Cauca
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 self-center">
          <StatCard label="Noticias Colombia" value={stats.colombia} accent="colombia" />
          <StatCard label="Noticias Cauca" value={stats.cauca} accent="cauca" />
          <StatCard label="Seguidores" value={stats.followers} accent="colombia-gold" />
        </div>
      </section>

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
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: "colombia" | "cauca" | "colombia-gold";
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-background p-4 text-center">
      <span className="text-2xl font-black" style={{ color: `var(--${accent})` }}>
        {formatNumber(value)}
      </span>
      <span className="mt-1 text-xs font-medium text-muted">{label}</span>
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
      <div className="flex items-end justify-between">
        <div>
          <h2 className={`text-2xl font-black ${accent}`}>{title}</h2>
          <p className="mt-1 text-sm text-muted">{description}</p>
        </div>
        <Link href={href} className={`text-sm font-semibold ${accent} hover:underline`}>
          Ver todo →
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-border p-6 text-sm text-muted">
          Aún no hay noticias publicadas en esta sección. ¡Sé la primera
          organización en enviar contenido!
        </p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
