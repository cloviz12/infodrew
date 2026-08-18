export default function SectionBadge({ section }: { section: "COLOMBIA" | "CAUCA" }) {
  const isColombia = section === "COLOMBIA";
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em]"
      style={{ color: isColombia ? "var(--colombia)" : "var(--cauca)" }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: isColombia ? "var(--colombia)" : "var(--cauca)" }}
      />
      {isColombia ? "Colombia" : "Cauca"}
    </span>
  );
}
