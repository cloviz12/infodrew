import type { ArtSlot } from "@/lib/art";

// Placeholder: campo de un solo tono con una línea fina en el
// empalme diagonal, no una franja de color gritona — el mismo
// recurso gráfico (duotono, diagonal) pero en volumen bajo.
const PLACEHOLDER = {
  ink: "linear-gradient(115deg, #201d19 0%, #201d19 49.4%, #6d2a35 49.4%, #6d2a35 50.2%, #201d19 50.2%, #201d19 100%)",
  colombia: "linear-gradient(115deg, #16222f 0%, #16222f 49.4%, #6d2a35 49.4%, #6d2a35 50.2%, #263a4f 50.2%, #263a4f 100%)",
  cauca: "linear-gradient(115deg, #232c1e 0%, #232c1e 49.4%, #a9863f 49.4%, #a9863f 50.2%, #3c4a34 50.2%, #3c4a34 100%)",
} as const;

// Tinta del duotono: blanco y negro (filtro CSS en .art-cover img) +
// esta única tinta plana en multiply, tal como se imprimía un cartel
// a dos colores — pero en un tono contenido, no de alarma.
const TINT = {
  ink: "#201d19",
  colombia: "#263a4f",
  cauca: "#3c4a34",
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
