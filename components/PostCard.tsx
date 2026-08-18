import Link from "next/link";
import type { Media, Post } from "@prisma/client";
import SectionBadge from "@/components/SectionBadge";
import { formatDate, formatNumber } from "@/lib/format";

type PostWithExtras = Post & {
  media: Media[];
  _count?: { comments: number };
};

export default function PostCard({ post, index }: { post: PostWithExtras; index?: number }) {
  const image = post.coverImage ?? post.media.find((m) => m.type === "IMAGE")?.url;

  return (
    <article className="group flex flex-col">
      <Link
        href={`/noticia/${post.slug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-foreground"
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={post.title}
            className="h-full w-full object-cover grayscale transition duration-300 ease-out group-hover:grayscale-0"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-accent-light font-display text-sm font-black uppercase tracking-wide text-accent-dark/70">
            Sin imagen
          </div>
        )}
        {typeof index === "number" && (
          <span className="absolute left-0 top-0 bg-background px-2.5 py-1 font-display text-sm font-black text-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2.5 pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <SectionBadge section={post.section} />
          <span className="text-[11px] font-bold uppercase tracking-wide text-muted">{post.category}</span>
        </div>

        <Link href={`/noticia/${post.slug}`}>
          <h3 className="font-display text-xl font-extrabold leading-[1.1] text-foreground transition group-hover:text-accent">
            {post.title}
          </h3>
        </Link>

        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>

        <div className="mt-2 flex items-center justify-between border-t-2 border-foreground pt-2.5 text-xs font-semibold text-muted">
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
