import type { ArtSlot } from "@/lib/art";

// Placeholder: composición diagonal de bloques planos (sin foto) en la
// misma paleta que usaría el duotono real — cartel constructivista, no
// degradado difuso de stock.
const PLACEHOLDER = {
  ink: "linear-gradient(115deg, #15130f 0%, #15130f 56%, #c81f2c 56%, #c81f2c 61%, #15130f 61%, #15130f 100%)",
  colombia: "linear-gradient(115deg, #8c1420 0%, #8c1420 54%, #15130f 54%, #15130f 60%, #c81f2c 60%, #c81f2c 100%)",
  cauca: "linear-gradient(115deg, #141b2c 0%, #141b2c 54%, #d6a324 54%, #d6a324 60%, #24304c 60%, #24304c 100%)",
} as const;

// Tinta del duotono: blanco y negro (filtro CSS en .art-cover img) +
// esta única tinta plana en multiply, tal como se imprimía un cartel
// de propaganda a dos colores.
const TINT = {
  ink: "#15130f",
  colombia: "#c81f2c",
  cauca: "#24304c",
} as const;

export default function ArtCover({
  slot,
  tone = "ink",
  className = "",
  children,
}: {
  slot: ArtSlot;
  tone?: keyof typeof TINT;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`art-cover ${className}`}
      style={!slot.src ? { backgroundImage: PLACEHOLDER[tone] } : undefined}
    >
      {slot.src && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={slot.src} alt="" />
          <div className="art-tint" style={{ backgroundColor: TINT[tone] }} />
        </>
      )}
      <div className="grain-layer" />
      <div className="art-content">{children}</div>
      {slot.credit && (
        <span className="art-content absolute bottom-3 right-4 text-[10px] font-bold uppercase tracking-wide text-white/50">
          {slot.credit}
        </span>
      )}
    </div>
  );
}
