import Link from "next/link";
import type { Media, Post } from "@prisma/client";
import SectionBadge from "@/components/SectionBadge";
import { formatDate } from "@/lib/format";

type PostWithExtras = Post & {
  media: Media[];
  _count?: { comments: number };
};

// Fila de índice: número + miniatura chica + titular, como el sumario
// de un periódico, no una tarjeta de blog repetida. Separadas por una
// línea fina, sin bordes ni sombras alrededor de cada una.
export default function PostRow({ post, index }: { post: PostWithExtras; index: number }) {
  const image = post.coverImage ?? post.media.find((m) => m.type === "IMAGE")?.url;

  return (
    <Link
      href={`/noticia/${post.slug}`}
      className="group flex items-start gap-4 border-t border-border py-5 first:border-t-0"
    >
      <span className="w-7 shrink-0 font-display text-lg font-black leading-none text-muted/70">
        {String(index + 1).padStart(2, "0")}
      </span>

      {image && (
        <span className="hidden h-16 w-16 shrink-0 overflow-hidden bg-foreground sm:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" className="h-full w-full object-cover" />
        </span>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <SectionBadge section={post.section} />
          <span className="text-[10px] font-bold uppercase tracking-wide text-muted">{post.category}</span>
        </div>
        <h3 className="mt-1.5 line-clamp-2 font-display text-base font-extrabold leading-snug text-foreground transition group-hover:text-accent sm:text-lg">
          {post.title}
        </h3>
        <p className="mt-1 text-xs font-semibold text-muted">
          {post.authorOrg ?? post.authorName} · {formatDate(post.publishedAt ?? post.createdAt)}
        </p>
      </div>
    </Link>
  );
}
