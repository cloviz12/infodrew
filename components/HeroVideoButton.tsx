"use client";

import { useState } from "react";
import { IconClose, IconPlay } from "@/components/icons";

export default function HeroVideoButton({ embedUrl, title }: { embedUrl: string; title: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="reveal-up delay-3 inline-flex items-center gap-2 border-2 border-white/70 px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white transition hover:border-white"
      >
        <IconPlay className="h-4 w-4" />
        Ver video
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar video"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <IconClose className="h-5 w-5" />
          </button>
          <div className="aspect-video w-full max-w-4xl overflow-hidden rounded-2xl bg-ink">
            <iframe
              src={embedUrl}
              title={title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
