import type { ArtSlot } from "@/lib/art";

const TONES = {
  ink: {
    gradient:
      "radial-gradient(120% 140% at 15% 20%, #3a3226 0%, transparent 55%), radial-gradient(100% 120% at 85% 80%, #33436e 0%, transparent 60%), linear-gradient(160deg, #1c1710 0%, #2a2216 100%)",
    veil: "linear-gradient(180deg, rgba(28,23,16,0.1) 0%, rgba(20,16,10,0.78) 100%)",
  },
  colombia: {
    gradient:
      "radial-gradient(120% 140% at 20% 15%, #4a5c8c 0%, transparent 55%), radial-gradient(110% 130% at 85% 85%, #c9a24b 0%, transparent 45%), linear-gradient(160deg, #1c2740 0%, #33436e 100%)",
    veil: "linear-gradient(180deg, rgba(28,39,64,0.08) 0%, rgba(18,25,41,0.8) 100%)",
  },
  cauca: {
    gradient:
      "radial-gradient(120% 140% at 20% 15%, #5c8a5f 0%, transparent 55%), radial-gradient(110% 130% at 85% 85%, #8a5a34 0%, transparent 45%), linear-gradient(160deg, #223022 0%, #3f5b42 100%)",
    veil: "linear-gradient(180deg, rgba(34,48,34,0.08) 0%, rgba(18,26,18,0.8) 100%)",
  },
  accent: {
    gradient:
      "radial-gradient(120% 140% at 20% 15%, #e08a63 0%, transparent 55%), radial-gradient(110% 130% at 85% 85%, #33436e 0%, transparent 45%), linear-gradient(160deg, #8a381d 0%, #c1502e 100%)",
    veil: "linear-gradient(180deg, rgba(138,56,29,0.08) 0%, rgba(80,32,18,0.78) 100%)",
  },
} as const;

export default function ArtCover({
  slot,
  tone = "ink",
  className = "",
  children,
}: {
  slot: ArtSlot;
  tone?: keyof typeof TONES;
  className?: string;
  children?: React.ReactNode;
}) {
  const palette = TONES[tone];

  return (
    <div
      className={`art-cover ${className}`}
      style={!slot.src ? { backgroundImage: palette.gradient } : undefined}
    >
      {slot.src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={slot.src} alt="" />
      )}
      <div className="grain-layer" />
      <div className="art-veil" style={{ backgroundImage: palette.veil }} />
      <div className="art-content">{children}</div>
      {slot.credit && (
        <span className="art-content absolute bottom-3 right-4 text-[10px] font-medium tracking-wide text-white/45">
          {slot.credit}
        </span>
      )}
    </div>
  );
}
