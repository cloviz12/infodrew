import { likePost } from "@/app/actions";
import { IconHeart } from "@/components/icons";
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
        className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-bold text-foreground transition hover:border-accent hover:bg-accent-light hover:text-accent-dark"
      >
        <IconHeart className="h-4 w-4" />
        <span>Me gusta · {formatNumber(likeCount)}</span>
      </button>
    </form>
  );
}
