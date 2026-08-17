export function formatDate(date: Date | string | null | undefined) {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("es-CO").format(value);
}
