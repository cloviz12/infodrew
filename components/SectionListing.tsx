import type { Section } from "@prisma/client";
import PostFeature from "@/components/PostFeature";
import PostRow from "@/components/PostRow";
import ArtCover from "@/components/ArtCover";
import Weave from "@/components/Weave";
import { getPublishedPosts } from "@/lib/data";
import { ART } from "@/lib/art";

const COPY: Record<
  Section,
  { title: string; description: string; empty: string; tone: "colombia" | "cauca"; slot: typeof ART.colombia }
> = {
  COLOMBIA: {
    title: "Colombia",
    description:
      "Los temas y acontecimientos más relevantes del país, con la mirada puesta en sus líderes nacionales y regionales.",
    empty: "Aún no hay noticias publicadas sobre Colombia.",
    tone: "colombia",
    slot: ART.colombia,
  },
  CAUCA: {
    title: "Cauca",
    description:
      "Organizaciones sociales, comunidades campesinas, mujeres y comunidades afro del territorio caucano.",
    empty: "Aún no hay noticias publicadas sobre el Cauca.",
    tone: "cauca",
    slot: ART.cauca,
  },
};

export default async function SectionListing({ section }: { section: Section }) {
  const copy = COPY[section];
  const color = `var(--${copy.tone})`;
  const posts = await getPublishedPosts(section);

  return (
    <>
      <ArtCover slot={copy.slot} tone={copy.tone} className="h-[22vh] sm:h-[26vh]" />
      <Weave id={`${copy.tone}-weave`} fg={color} bg="#201d19" height={6} />

      <div className="bg-foreground px-4 py-10 text-background sm:px-6 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-display text-4xl font-black uppercase tracking-tight sm:text-5xl" style={{ color }}>
            {copy.title}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-background/65 sm:text-base">
            {copy.description}
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        {posts.length === 0 ? (
          <p className="text-sm font-semibold italic text-muted">{copy.empty}</p>
        ) : (
          <>
            <PostFeature post={posts[0]} />
            {posts.length > 1 && (
              <div className="mt-2">
                {posts.slice(1).map((post, i) => (
                  <PostRow key={post.id} post={post} index={i + 1} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
