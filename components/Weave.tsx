// Franja de zigzag continuo — el patrón geométrico más común en tejidos
// andinos (chumbes, guangos) reducido a su estructura mínima: líneas
// diagonales repetidas. En la paleta roja/negra del sitio funciona
// también como un dispositivo constructivista (banda diagonal
// repetida), así que sirve de puente entre las dos referencias sin
// copiar un símbolo específico de ningún pueblo en particular.
export default function Weave({
  id,
  fg = "#15130f",
  bg = "none",
  height = 16,
  className = "",
}: {
  id: string;
  fg?: string;
  bg?: string;
  height?: number;
  className?: string;
}) {
  const unit = height * 2;
  return (
    <svg
      className={className}
      width="100%"
      height={height}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <pattern id={id} width={unit} height={height} patternUnits="userSpaceOnUse">
        {bg !== "none" && <rect width={unit} height={height} fill={bg} />}
        <path
          d={`M0 ${height} L${height / 2} 0 L${height} ${height} L${height * 1.5} 0 L${unit} ${height}`}
          fill="none"
          stroke={fg}
          strokeWidth={Math.max(2, height * 0.22)}
          strokeLinecap="square"
        />
      </pattern>
      <rect width="100%" height={height} fill={`url(#${id})`} />
    </svg>
  );
}
