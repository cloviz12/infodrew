export default function SectionBadge({ section }: { section: "COLOMBIA" | "CAUCA" }) {
  const isColombia = section === "COLOMBIA";
  return (
    <span
      className="tag-pill"
      style={{
        background: isColombia ? "var(--colombia)" : "var(--cauca)",
        color: "white",
      }}
    >
      {isColombia ? "Colombia" : "Cauca"}
    </span>
  );
}
