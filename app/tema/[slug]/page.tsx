import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewsCard from "@/components/NewsCard";
import { getTopicBySlug, TOPICS } from "@/lib/topics";
import { getPostsByKeywords } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return { title: "Tema no encontrado — Colombia Incluyente" };
  return { title: `${topic.label} — Colombia Incluyente` };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  const posts = await getPostsByKeywords(topic.keywords);
  const Icon = topic.icon;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex items-center gap-4">
        <span
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white"
          style={{ background: topic.color }}
        >
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <h1 className="font-display text-2xl font-black text-foreground sm:text-3xl">{topic.label}</h1>
          <p className="mt-1 text-sm text-muted">
            Noticias de Colombia y el Cauca relacionadas con este tema.
          </p>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="mt-10 text-sm font-semibold italic text-muted">
          Aún no hay noticias publicadas sobre {topic.label.toLowerCase()}.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <NewsCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <div className="mt-14 border-t border-border pt-6">
        <p className="text-xs font-bold uppercase tracking-wide text-muted">Otros temas</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {TOPICS.filter((t) => t.slug !== topic.slug).map((t) => (
            <Link
              key={t.slug}
              href={`/tema/${t.slug}`}
              className="rounded-full border border-border px-3.5 py-1.5 text-xs font-bold text-foreground transition hover:border-accent hover:text-accent"
            >
              {t.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
