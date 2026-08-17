import type { Media, Post } from "@prisma/client";
import SectionBadge from "@/components/SectionBadge";
import { formatDate } from "@/lib/format";
import { moderatePost } from "@/app/actions";

const STATUS_LABEL: Record<Post["status"], string> = {
  PENDING: "Pendiente",
  PUBLISHED: "Publicada",
  REJECTED: "Rechazada",
};

export default function ModerationCard({ post }: { post: Post & { media: Media[] } }) {
  const approve = moderatePost.bind(null, post.id, "approve");
  const reject = moderatePost.bind(null, post.id, "reject");

  return (
    <article className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex flex-wrap items-center gap-2">
        <SectionBadge section={post.section} />
        <span className="tag-pill bg-background text-muted">{STATUS_LABEL[post.status]}</span>
        <span className="text-xs text-muted">{formatDate(post.createdAt)}</span>
      </div>

      <h3 className="mt-2 text-lg font-bold text-foreground">{post.title}</h3>
      <p className="mt-1 text-sm text-muted">{post.excerpt}</p>
      <p className="mt-2 text-xs text-muted">
        Enviado por {post.authorName}
        {post.authorOrg ? ` · ${post.authorOrg}` : ""}
        {post.authorEmail ? ` · ${post.authorEmail}` : ""}
      </p>

      {post.media.length > 0 && (
        <p className="mt-2 text-xs text-muted">{post.media.length} archivo(s) adjunto(s)</p>
      )}

      {post.status === "PENDING" && (
        <div className="mt-4 flex gap-2">
          <form action={approve}>
            <button
              type="submit"
              className="rounded-full bg-cauca px-4 py-2 text-sm font-semibold text-white transition hover:bg-cauca-dark"
            >
              Aprobar y publicar
            </button>
          </form>
          <form action={reject}>
            <button
              type="submit"
              className="rounded-full border border-colombia-red px-4 py-2 text-sm font-semibold text-colombia-red transition hover:bg-colombia-red/10"
            >
              Rechazar
            </button>
          </form>
        </div>
      )}

      {post.status === "PUBLISHED" && (
        <a
          href={`/noticia/${post.slug}`}
          className="mt-4 inline-block text-sm font-semibold text-colombia hover:underline"
        >
          Ver noticia publicada →
        </a>
      )}
    </article>
  );
}
