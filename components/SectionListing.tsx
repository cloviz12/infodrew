import type { Section } from "@prisma/client";
import PostCard from "@/components/PostCard";
import ArtCover from "@/components/ArtCover";
import { getPublishedPosts } from "@/lib/data";
import { ART } from "@/lib/art";

const COPY: Record<
  Section,
  { title: string; description: string; accent: string; empty: string; tone: "colombia" | "cauca"; slot: typeof ART.colombia }
> = {
  COLOMBIA: {
    title: "Colombia",
    description:
      "Los temas y acontecimientos más relevantes del país, con la mirada puesta en sus líderes nacionales y regionales.",
    accent: "text-colombia",
    empty: "Aún no hay noticias publicadas sobre Colombia.",
    tone: "colombia",
    slot: ART.colombia,
  },
  CAUCA: {
    title: "Cauca",
    description:
      "Organizaciones sociales, comunidades campesinas, mujeres y comunidades afro del territorio caucano.",
    accent: "text-cauca",
    empty: "Aún no hay noticias publicadas sobre el Cauca.",
    tone: "cauca",
    slot: ART.cauca,
  },
};

export default async function SectionListing({ section }: { section: Section }) {
  const copy = COPY[section];
  const posts = await getPublishedPosts(section);

  return (
    <>
      <ArtCover slot={copy.slot} tone={copy.tone} className="flex min-h-[38vh] items-end">
        <div className="w-full px-4 pb-10 pt-24 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h1 className="font-display text-4xl font-medium text-white sm:text-5xl">{copy.title}</h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">{copy.description}</p>
          </div>
        </div>
      </ArtCover>

      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        {posts.length === 0 ? (
          <p className="text-sm italic text-muted">{copy.empty}</p>
        ) : (
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
