"use client";

import { useState } from "react";
import Link from "next/link";
import type { Media, Post } from "@prisma/client";
import { IconPlay } from "@/components/icons";
import { getYoutubeEmbed } from "@/lib/video";

type PostWithVideo = Post & { media: Media[] };

export default function FeaturedVideo({ post }: { post: PostWithVideo | null }) {
  const video = post?.media.find((m) => m.type === "VIDEO");
  const [playing, setPlaying] = useState(false);

  if (!post || !video) {
    return (
      <div className="flex aspect-video flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-surface-muted text-center">
        <IconPlay className="h-8 w-8 text-muted" />
        <p className="text-sm text-muted">Pronto: un video destacado del territorio.</p>
      </div>
    );
  }

  const embed = getYoutubeEmbed(video.url, true);
  const thumbnail = post.coverImage ?? undefined;

  return (
    <div>
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink">
        {playing ? (
          embed ? (
            <iframe
              src={embed}
              title={post.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video src={video.url} controls autoPlay className="h-full w-full object-cover" />
          )
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 flex h-full w-full items-center justify-center"
          >
            {thumbnail && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={thumbnail} alt="" className="absolute inset-0 h-full w-full object-cover" />
            )}
            <div className="absolute inset-0 bg-black/25 transition group-hover:bg-black/35" />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur transition group-hover:scale-105 group-hover:bg-white/35">
              <IconPlay className="ml-1 h-7 w-7" />
            </span>
          </button>
        )}
      </div>
      <Link href={`/noticia/${post.slug}`} className="mt-3 block">
        <h3 className="font-display text-lg font-bold text-foreground hover:text-accent">{post.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{post.excerpt}</p>
      </Link>
    </div>
  );
}
