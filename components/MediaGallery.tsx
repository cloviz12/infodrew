import type { Media } from "@prisma/client";
import { getYoutubeEmbed } from "@/lib/video";

function VideoBlock({ url, caption }: { url: string; caption?: string | null }) {
  const embed = getYoutubeEmbed(url);
  return (
    <figure>
      {embed ? (
        <iframe
          src={embed}
          title={caption ?? "Video"}
          className="aspect-video w-full rounded-2xl bg-ink"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video src={url} controls className="aspect-video w-full rounded-2xl bg-ink">
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
// en fila, como las láminas de una revista.
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
            <img src={item.url} alt={item.caption ?? "Imagen"} className="w-full rounded-2xl object-cover" />
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
