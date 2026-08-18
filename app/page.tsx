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
      <ArtCover slot={ART.home} tone="ink" className="animated flex h-[64vh] items-end sm:h-[76vh]">
        <div className="mist-layer" />
        <div className="w-full px-4 pb-12 pt-28 sm:px-6 sm:pb-16">
          <div className="mx-auto max-w-6xl">
            <p className="reveal-up eyebrow text-white/70">Un territorio, muchas voces</p>
            <h1 className="reveal-up delay-1 mt-4 max-w-3xl font-display text-[clamp(2.1rem,5.2vw,3.75rem)] font-black leading-[1.06] text-white">
              Colombia y el Cauca, contados por quienes los habitan
            </h1>
            <p className="reveal-up delay-2 mt-5 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              Noticias, historias y memoria del territorio: organizaciones
              sociales, comunidades campesinas, mujeres y comunidades afro.
              Un espacio para que cada voz llegue más lejos.
            </p>
            <div className="reveal-up delay-3 mt-7 flex flex-wrap gap-3">
              <Link
                href="/enviar"
                className="border-2 border-white bg-white px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-foreground transition hover:bg-transparent hover:text-white"
              >
                Envía tu noticia
              </Link>
              <Link
                href="/cauca"
                className="border-2 border-white/70 px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white transition hover:border-white"
              >
                Ver Cauca
              </Link>
            </div>
          </div>
        </div>
      </ArtCover>

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
