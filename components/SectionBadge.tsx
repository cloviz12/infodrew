export default function SectionBadge({ section }: { section: "COLOMBIA" | "CAUCA" }) {
  const isColombia = section === "COLOMBIA";
  return (
    <span
      className="inline-flex items-center px-2 py-1 text-[10px] font-black uppercase tracking-wider text-white"
      style={{ background: isColombia ? "var(--colombia)" : "var(--cauca)" }}
    >
      {isColombia ? "Colombia" : "Cauca"}
    </span>
  );
}
