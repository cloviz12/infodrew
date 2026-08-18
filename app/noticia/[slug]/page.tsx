import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArtCover from "@/components/ArtCover";
import Weave from "@/components/Weave";
import MediaGallery from "@/components/MediaGallery";
import LikeButton from "@/components/LikeButton";
import ShareButtons from "@/components/ShareButtons";
import CommentSection from "@/components/CommentSection";
import { getPostBySlug } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

const SECTION_COPY = {
  COLOMBIA: { label: "Colombia", tone: "colombia" as const, weave: "#263a4f" },
  CAUCA: { label: "Cauca", tone: "cauca" as const, weave: "#3c4a34" },
};

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
  const section = SECTION_COPY[post.section];
  const paragraphs = post.content.split("\n").filter(Boolean);
  // El lomo cambia de lado según el propio id de la noticia — cada
  // despacho queda un poco distinto de los demás sin ser aleatorio.
  const spineOnRight = post.id.charCodeAt(0) % 2 === 0;

  return (
    <>
      <ArtCover slot={{ src: post.coverImage ?? undefined }} tone={section.tone} className="animated flex h-[48vh] items-end sm:h-[62vh]">
        <div className="mist-layer" />
        <div className="w-full px-4 pb-9 pt-24 sm:px-6 sm:pb-12">
          <div className="mx-auto max-w-3xl">
            <p className="reveal-up eyebrow text-white/70">{post.category}</p>
            <h1 className="reveal-up delay-1 mt-4 font-display text-3xl font-black leading-[1.06] text-white sm:text-5xl">
              {post.title}
            </h1>
            <p className="reveal-up delay-2 mt-4 text-xs font-bold uppercase tracking-wide text-white/60">
              Despachado desde {section.label} · {formatDate(post.publishedAt ?? post.createdAt)} · Por{" "}
              {post.authorOrg ?? post.authorName}
            </p>
          </div>
        </div>
      </ArtCover>
      <Weave id={`post-weave-${post.id}`} fg={section.weave} height={6} />

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className={`relative sm:pr-0 ${spineOnRight ? "sm:pr-10" : "sm:pl-10"}`}>
          <span
            className={`spine absolute top-0 hidden text-[11px] font-black uppercase tracking-[0.2em] sm:block ${
              spineOnRight ? "right-0" : "left-0"
            }`}
            style={{ color: `var(--${section.tone})` }}
          >
            {section.label}
          </span>

          <div className="drop-cap prose-content text-[15px] text-foreground">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {post.media.length > 0 && (
            <div className="mt-10">
              <MediaGallery media={post.media} />
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-y-2 border-foreground py-4">
          <LikeButton postId={post.id} postSlug={post.slug} likeCount={post.likeCount} />
          <ShareButtons title={post.title} url={url} />
        </div>

        <CommentSection postId={post.id} postSlug={post.slug} comments={post.comments} />
      </main>
    </>
  );
}
