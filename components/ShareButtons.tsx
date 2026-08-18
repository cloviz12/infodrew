"use client";

import { useState } from "react";

export default function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // el usuario canceló o falló; caemos a copiar el enlace
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // portapapeles no disponible
    }
  }

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handleShare}
        className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-colombia hover:text-colombia"
      >
        {copied ? "¡Enlace copiado!" : "Compartir"}
      </button>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-cauca hover:text-cauca"
      >
        WhatsApp
      </a>
      <a
        href={facebookHref}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-colombia hover:text-colombia"
      >
        Facebook
      </a>
    </div>
  );
}
