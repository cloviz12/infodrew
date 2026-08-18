export function getYoutubeEmbed(url: string, autoplay = false) {
  const watch = url.match(/[?&]v=([\w-]{6,})/);
  const short = url.match(/youtu\.be\/([\w-]{6,})/);
  const id = watch?.[1] ?? short?.[1];
  if (!id) return null;
  return `https://www.youtube.com/embed/${id}${autoplay ? "?autoplay=1" : ""}`;
}
