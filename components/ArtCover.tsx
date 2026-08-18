import type { ArtSlot } from "@/lib/art";

// Placeholder cuando todavía no hay foto sincronizada: degradado suave
// en la paleta de marca, nada de franjas ni texturas — simplemente un
// fondo agradable mientras llega contenido real.
const PLACEHOLDER = {
  ink: "linear-gradient(135deg, #14181a 0%, #1f2623 55%, #1f6d45 130%)",
  colombia: "linear-gradient(135deg, #123f57 0%, #1c5a7c 60%, #14181a 130%)",
  cauca: "linear-gradient(135deg, #274a29 0%, #3c6b3f 60%, #14181a 130%)",
} as const;

export default function ArtCover({
  slot,
  tone = "ink",
  className = "",
  scrim = true,
  video,
  children,
}: {
  slot: ArtSlot;
  tone?: keyof typeof PLACEHOLDER;
  className?: string;
  scrim?: boolean;
  /** URL directa a un archivo de video (mp4/webm) para usar como fondo en vez de la foto. */
  video?: string | null;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`hero-media ${className}`}
      style={!slot.src && !video ? { backgroundImage: PLACEHOLDER[tone] } : undefined}
    >
      {video ? (
        <video src={video} autoPlay muted loop playsInline />
      ) : (
        slot.src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={slot.src} alt="" />
        )
      )}
      {scrim && <div className="hero-scrim" />}
      <div className="hero-content">{children}</div>
      {slot.credit && (
        <span className="hero-content absolute bottom-3 right-4 text-[10px] font-semibold uppercase tracking-wide text-white/50">
          {slot.credit}
        </span>
      )}
    </div>
  );
}
