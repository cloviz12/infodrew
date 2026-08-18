import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionBadge from "@/components/SectionBadge";
import MediaGallery from "@/components/MediaGallery";
import LikeButton from "@/components/LikeButton";
import ShareButtons from "@/components/ShareButtons";
import CommentSection from "@/components/CommentSection";
import { getPostBySlug } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

async function loadPost(slug: string) {
  const post = await getPostBySlug(slug);
  if (!post || post.status !== "PUBLISHED") return null;
  return post;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) return { title: "Noticia no encontrada — Colombia Incluyente" };
  return {
    title: `${post.title} — Colombia Incluyente`,
    description: post.excerpt,
  };
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) notFound();

  const siteUrl = process.env.SITE_URL ?? "https://colombia-incluyente.example.org";
  const url = `${siteUrl}/noticia/${post.slug}`;
  const gallery = post.coverImage
    ? [
        { id: "cover", type: "IMAGE" as const, url: post.coverImage, caption: null, order: -1, postId: post.id },
        ...post.media,
      ]
    : post.media;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex flex-wrap items-center gap-2.5">
        <SectionBadge section={post.section} />
        <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted">
          {post.category}
        </span>
      </div>

      <h1 className="mt-4 font-display text-3xl font-black leading-[1.05] text-foreground sm:text-4xl">
        {post.title}
      </h1>

      <p className="mt-3 text-sm font-semibold text-muted">
        Por {post.authorOrg ?? post.authorName} · {formatDate(post.publishedAt ?? post.createdAt)}
      </p>

      {gallery.length > 0 && (
        <div className="mt-6">
          <MediaGallery media={gallery} />
        </div>
      )}

      <div className="prose-content mt-8 text-[15px] text-foreground">
        {post.content.split("\n").filter(Boolean).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-y-2 border-foreground py-4">
        <LikeButton postId={post.id} postSlug={post.slug} likeCount={post.likeCount} />
        <ShareButtons title={post.title} url={url} />
      </div>

      <CommentSection postId={post.id} postSlug={post.slug} comments={post.comments} />
    </main>
  );
}
