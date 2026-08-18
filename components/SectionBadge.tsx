import { getCategoryTag } from "@/lib/topics";

// Pill de color: si la categoría coincide con un tema conocido (p. ej.
// "Mujeres") se muestra esa etiqueta con su propio color; si no, cae a
// la sección (Colombia/Cauca).
export default function SectionBadge({
  section,
  category,
}: {
  section: "COLOMBIA" | "CAUCA";
  category?: string;
}) {
  const tag = category ? getCategoryTag(category) : null;
  const isColombia = section === "COLOMBIA";

  const label = tag?.label ?? (isColombia ? "Colombia" : "Cauca");
  const color = tag?.color ?? (isColombia ? "var(--colombia)" : "var(--cauca)");

  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white"
      style={{ background: color }}
    >
      {label}
    </span>
  );
}
