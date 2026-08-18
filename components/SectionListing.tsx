import type { Section } from "@prisma/client";
import PostCard from "@/components/PostCard";
import { getPublishedPosts } from "@/lib/data";

const COPY: Record<Section, { title: string; description: string; accent: string; empty: string }> = {
  COLOMBIA: {
    title: "Colombia",
    description:
      "Los temas y acontecimientos más relevantes del país, con la mirada puesta en sus líderes nacionales y regionales.",
    accent: "text-colombia",
    empty: "Aún no hay noticias publicadas sobre Colombia.",
  },
  CAUCA: {
    title: "Cauca",
    description:
      "Organizaciones sociales, comunidades campesinas, mujeres y comunidades afro del territorio caucano.",
    accent: "text-cauca",
    empty: "Aún no hay noticias publicadas sobre el Cauca.",
  },
};

export default async function SectionListing({ section }: { section: Section }) {
  const copy = COPY[section];
  const posts = await getPublishedPosts(section);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="max-w-2xl">
        <h1 className={`text-3xl font-black ${copy.accent}`}>{copy.title}</h1>
        <p className="mt-2 text-base text-muted">{copy.description}</p>
      </header>

      {posts.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-border p-6 text-sm text-muted">
          {copy.empty}
        </p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
