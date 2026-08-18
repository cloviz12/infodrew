import Link from "next/link";
import type { Media, Post } from "@prisma/client";
import SectionBadge from "@/components/SectionBadge";
import { IconCalendar, IconComment } from "@/components/icons";
import { formatDate } from "@/lib/format";

type PostWithExtras = Post & {
  media: Media[];
  _count?: { comments: number };
};

// Tarjeta "revista": la foto ocupa toda la tarjeta, el texto flota
// encima sobre un degradado oscuro — así se ve la portada destacada en
// la referencia visual, distinto de la fila-índice usada en las
// secciones internas.
export default function NewsCard({ post }: { post: PostWithExtras }) {
  const image = post.coverImage ?? post.media.find((m) => m.type === "IMAGE")?.url;

  return (
    <Link
      href={`/noticia/${post.slug}`}
      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl bg-ink shadow-sm sm:aspect-[3/4]"
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition duration-300 ease-out group-hover:scale-105"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

      <div className="relative z-10 p-5">
        <SectionBadge section={post.section} category={post.category} />
        <h3 className="mt-3 line-clamp-2 font-display text-lg font-bold leading-snug text-white">
          {post.title}
        </h3>
        <p className="mt-1.5 line-clamp-1 text-xs text-white/70">{post.excerpt}</p>
        <div className="mt-3 flex items-center gap-3 text-[11px] font-semibold text-white/60">
          <span className="flex items-center gap-1">
            <IconCalendar className="h-3.5 w-3.5" />
            {formatDate(post.publishedAt ?? post.createdAt)}
          </span>
          {post._count && (
            <span className="flex items-center gap-1">
              <IconComment className="h-3.5 w-3.5" />
              {post._count.comments}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
