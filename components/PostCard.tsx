import Link from "next/link";
import type { Media, Post } from "@prisma/client";
import SectionBadge from "@/components/SectionBadge";
import { formatDate, formatNumber } from "@/lib/format";

type PostWithExtras = Post & {
  media: Media[];
  _count?: { comments: number };
};

export default function PostCard({ post }: { post: PostWithExtras }) {
  const image = post.coverImage ?? post.media.find((m) => m.type === "IMAGE")?.url;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition hover:shadow-md">
      <Link href={`/noticia/${post.slug}`} className="block aspect-[16/10] w-full overflow-hidden bg-cauca-light">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={post.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted">
            Sin imagen
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <SectionBadge section={post.section} />
          <span className="text-xs font-medium uppercase tracking-wide text-muted">
            {post.category}
          </span>
        </div>

        <Link href={`/noticia/${post.slug}`}>
          <h3 className="text-lg font-bold leading-snug text-foreground group-hover:text-colombia">
            {post.title}
          </h3>
        </Link>

        <p className="line-clamp-2 flex-1 text-sm text-muted">{post.excerpt}</p>

        <div className="mt-2 flex items-center justify-between text-xs text-muted">
          <span>
            {post.authorOrg ?? post.authorName} · {formatDate(post.publishedAt ?? post.createdAt)}
          </span>
          <span className="flex items-center gap-3">
            <span>♥ {formatNumber(post.likeCount)}</span>
            {post._count && <span>💬 {formatNumber(post._count.comments)}</span>}
          </span>
        </div>
      </div>
    </article>
  );
}
