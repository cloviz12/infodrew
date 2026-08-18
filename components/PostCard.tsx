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
    <article className="group flex flex-col">
      <Link
        href={`/noticia/${post.slug}`}
        className="block aspect-[4/3] w-full overflow-hidden rounded-sm bg-accent-light"
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={post.title}
            className="h-full w-full object-cover grayscale-[15%] transition duration-500 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-sm italic text-accent-dark/60">
            Sin imagen
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2.5 pt-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <SectionBadge section={post.section} />
          <span className="text-[11px] uppercase tracking-[0.1em] text-muted">{post.category}</span>
        </div>

        <Link href={`/noticia/${post.slug}`}>
          <h3 className="font-display text-xl font-medium leading-snug text-foreground transition group-hover:text-accent">
            {post.title}
          </h3>
        </Link>

        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>

        <div className="mt-1 flex items-center justify-between border-t border-border pt-2.5 text-xs text-muted">
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
