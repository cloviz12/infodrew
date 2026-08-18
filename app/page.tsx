import Link from "next/link";
import PostFeature from "@/components/PostFeature";
import PostRow from "@/components/PostRow";
import SeguirWidget from "@/components/SeguirWidget";
import ArtCover from "@/components/ArtCover";
import Weave from "@/components/Weave";
import { getPublishedPosts, getFollowerCount } from "@/lib/data";
import { ART } from "@/lib/art";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ follow?: string }>;
}) {
  const { follow } = await searchParams;
  const [colombiaPosts, caucaPosts, followerCount] = await Promise.all([
    getPublishedPosts("COLOMBIA", 3),
    getPublishedPosts("CAUCA", 3),
    getFollowerCount(),
  ]);

  return (
    <>
      <section className="border-b-2 border-foreground bg-background">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.15fr_1fr] lg:items-stretch">
          <div className="flex flex-col justify-center">
            <p className="eyebrow text-accent">Plataforma comunitaria</p>
            <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] font-black leading-[1.08] text-foreground">
              Conectamos líderes, organizaciones y territorios de{" "}
              <span style={{ color: "var(--colombia)" }}>Colombia</span> y el{" "}
              <span style={{ color: "var(--cauca)" }}>Cauca</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              Noticias, fotos y videos sobre lo que ocurre en el país y en el
              territorio caucano: organizaciones sociales, comunidades
              campesinas, mujeres y comunidades afro. Comenta, comparte y
              participa.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/enviar"
                className="border-2 border-foreground bg-foreground px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-background transition hover:bg-background hover:text-foreground"
              >
                Envía tu noticia
              </Link>
              <Link
                href="/cauca"
                className="border-2 border-foreground px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-foreground transition hover:bg-foreground hover:text-background"
              >
                Ver Cauca
              </Link>
            </div>
          </div>

          <ArtCover slot={ART.home} tone="ink" className="hidden aspect-[4/3] lg:block" />
        </div>
      </section>

      <Weave id="hero-weave" fg="#4a1c24" height={6} />

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-14 sm:px-6 sm:py-16">
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

        <SeguirWidget followerCount={followerCount} feedback={follow as "success" | "error" | undefined} />
      </main>
    </>
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
      <div className="flex flex-wrap items-end justify-between gap-4 border-t-2 pt-4" style={{ borderColor: color }}>
        <div>
          <h2 className="font-display text-2xl font-black uppercase tracking-tight sm:text-3xl" style={{ color }}>
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
        <div className="mt-8">
          <PostFeature post={posts[0]} />
          {posts.length > 1 && (
            <div className="mt-2">
              {posts.slice(1).map((post, i) => (
                <PostRow key={post.id} post={post} index={i + 1} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
