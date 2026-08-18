import Link from "next/link";
import type { Media, Post } from "@prisma/client";
import SectionBadge from "@/components/SectionBadge";
import { IconCalendar, IconComment, IconHeart } from "@/components/icons";
import { formatDate, formatNumber } from "@/lib/format";

type PostWithExtras = Post & {
  media: Media[];
  _count?: { comments: number };
};

// Nota destacada: la nota principal de la sección, tratada distinto
// de las demás (foto grande, titular grande) en vez de ser una
// tarjeta más repetida en una grilla.
export default function PostFeature({ post }: { post: PostWithExtras }) {
  const image = post.coverImage ?? post.media.find((m) => m.type === "IMAGE")?.url;

  return (
    <article className="group grid gap-6 border-b border-border pb-10 sm:grid-cols-2 sm:items-stretch sm:gap-8">
      <Link
        href={`/noticia/${post.slug}`}
        className="block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface-muted sm:aspect-auto"
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={post.title}
            className="h-full w-full object-cover transition duration-300 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-bold text-muted">
            Sin imagen
          </div>
        )}
      </Link>

      <div className="flex flex-col justify-center gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <SectionBadge section={post.section} category={post.category} />
        </div>

        <Link href={`/noticia/${post.slug}`}>
          <h3 className="font-display text-2xl font-black leading-[1.1] text-foreground transition group-hover:text-accent sm:text-[1.75rem]">
            {post.title}
          </h3>
        </Link>

        <p className="text-sm leading-relaxed text-muted">{post.excerpt}</p>

        <div className="mt-1 flex flex-wrap items-center gap-4 text-xs font-semibold text-muted">
          <span>{post.authorOrg ?? post.authorName}</span>
          <span className="flex items-center gap-1">
            <IconCalendar className="h-3.5 w-3.5" />
            {formatDate(post.publishedAt ?? post.createdAt)}
          </span>
          <span className="flex items-center gap-1">
            <IconHeart className="h-3.5 w-3.5" />
            {formatNumber(post.likeCount)}
          </span>
          {post._count && (
            <span className="flex items-center gap-1">
              <IconComment className="h-3.5 w-3.5" />
              {formatNumber(post._count.comments)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
