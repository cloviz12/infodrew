import { likePost } from "@/app/actions";
import { formatNumber } from "@/lib/format";

export default function LikeButton({
  postId,
  postSlug,
  likeCount,
}: {
  postId: string;
  postSlug: string;
  likeCount: number;
}) {
  const likeWithArgs = likePost.bind(null, postId, postSlug);

  return (
    <form action={likeWithArgs}>
      <button
        type="submit"
        className="flex items-center gap-2 border-2 border-foreground px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-foreground transition hover:bg-accent hover:border-accent hover:text-white"
      >
        <span>♥</span>
        <span>Me gusta · {formatNumber(likeCount)}</span>
      </button>
    </form>
  );
}
