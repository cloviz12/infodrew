import type { Media } from "@prisma/client";

function getYoutubeEmbed(url: string) {
  const watch = url.match(/[?&]v=([\w-]{6,})/);
  if (watch) return `https://www.youtube.com/embed/${watch[1]}`;
  const short = url.match(/youtu\.be\/([\w-]{6,})/);
  if (short) return `https://www.youtube.com/embed/${short[1]}`;
  return null;
}

function VideoBlock({ url, caption }: { url: string; caption?: string | null }) {
  const embed = getYoutubeEmbed(url);
  return (
    <figure>
      {embed ? (
        <iframe
          src={embed}
          title={caption ?? "Video"}
          className="aspect-video w-full bg-foreground"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video src={url} controls className="aspect-video w-full bg-foreground">
          <track kind="captions" />
        </video>
      )}
      {caption && (
        <figcaption className="mt-2 border-l-2 border-accent pl-3 text-xs italic text-muted">{caption}</figcaption>
      )}
    </figure>
  );
}

// Cada foto o video ocupa el ancho completo de la columna de lectura,
// en fila, como las láminas de una revista — no una grilla de miniaturas
// en cajas con borde.
export default function MediaGallery({ media }: { media: Media[] }) {
  if (media.length === 0) return null;

  return (
    <div className="flex flex-col gap-8">
      {media.map((item) =>
        item.type === "VIDEO" ? (
          <VideoBlock key={item.id} url={item.url} caption={item.caption} />
        ) : (
          <figure key={item.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.url} alt={item.caption ?? "Imagen"} className="w-full object-cover" />
            {item.caption && (
              <figcaption className="mt-2 border-l-2 border-accent pl-3 text-xs italic text-muted">
                {item.caption}
              </figcaption>
            )}
          </figure>
        )
      )}
    </div>
  );
}
