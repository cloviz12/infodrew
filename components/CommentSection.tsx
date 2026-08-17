import type { Comment } from "@prisma/client";
import { addComment } from "@/app/actions";
import { formatDate } from "@/lib/format";

export default function CommentSection({
  postId,
  postSlug,
  comments,
}: {
  postId: string;
  postSlug: string;
  comments: Comment[];
}) {
  const addCommentWithArgs = addComment.bind(null, postId, postSlug);

  return (
    <section className="mt-10 border-t border-border pt-8">
      <h2 className="text-lg font-bold text-foreground">
        Comentarios ({comments.length})
      </h2>

      <form action={addCommentWithArgs} className="mt-4 flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            name="authorName"
            placeholder="Tu nombre (opcional)"
            className="rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-colombia"
            maxLength={80}
          />
        </div>
        <textarea
          name="content"
          required
          placeholder="Escribe tu comentario…"
          rows={3}
          maxLength={2000}
          className="rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-colombia"
        />
        <button
          type="submit"
          className="self-end rounded-full bg-colombia px-5 py-2 text-sm font-semibold text-white transition hover:bg-colombia-dark"
        >
          Comentar
        </button>
      </form>

      <ul className="mt-6 flex flex-col gap-4">
        {comments.length === 0 && (
          <li className="text-sm text-muted">Sé la primera persona en comentar.</li>
        )}
        {comments.map((comment) => (
          <li key={comment.id} className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-foreground">{comment.authorName}</span>
              <span className="text-xs text-muted">{formatDate(comment.createdAt)}</span>
            </div>
            <p className="mt-1 text-sm text-muted">{comment.content}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
