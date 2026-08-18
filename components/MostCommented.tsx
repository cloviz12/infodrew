import Link from "next/link";
import type { Media, Post } from "@prisma/client";
import { IconComment } from "@/components/icons";

type PostWithExtras = Post & {
  media: Media[];
  _count?: { comments: number };
};

export default function MostCommented({ posts }: { posts: PostWithExtras[] }) {
  if (posts.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border bg-surface-muted p-6 text-sm text-muted">
        Aún no hay comentarios en las noticias publicadas.
      </p>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-3">
      {posts.map((post, i) => {
        const image = post.coverImage ?? post.media.find((m) => m.type === "IMAGE")?.url;
        return (
          <Link
            key={post.id}
            href={`/noticia/${post.slug}`}
            className={`group flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-surface-muted ${
              i > 0 ? "mt-1" : ""
            }`}
          >
            <span className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-surface-muted">
              {image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} alt="" className="h-full w-full object-cover" />
              )}
            </span>
            <div className="min-w-0">
              <h4 className="line-clamp-2 text-sm font-bold leading-snug text-foreground transition group-hover:text-accent">
                {post.title}
              </h4>
              <span className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-muted">
                <IconComment className="h-3.5 w-3.5" />
                {post._count?.comments ?? 0}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
