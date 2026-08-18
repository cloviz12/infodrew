import {
  IconBook,
  IconHandshake,
  IconLeaf,
  IconMegaphone,
  IconUsers,
  IconWomen,
} from "@/components/icons";

export type Topic = {
  slug: string;
  label: string;
  icon: typeof IconUsers;
  color: string;
  keywords: string[];
};

// Taxonomía editorial fija que agrupa las categorías libres que llegan
// por el formulario de envío (Post.category es texto libre) en temas
// navegables. El match es por coincidencia de palabra clave, sin
// tocar el modelo de datos.
export const TOPICS: Topic[] = [
  {
    slug: "organizaciones-sociales",
    label: "Organizaciones Sociales",
    icon: IconUsers,
    color: "var(--colombia)",
    keywords: ["organizacion", "social", "institucional", "politica"],
  },
  {
    slug: "campesinos-y-rurales",
    label: "Campesinos y rurales",
    icon: IconLeaf,
    color: "var(--cauca)",
    keywords: ["campesin", "rural", "agr"],
  },
  {
    slug: "mujeres",
    label: "Mujeres",
    icon: IconWomen,
    color: "var(--topic-mujeres)",
    keywords: ["mujer"],
  },
  {
    slug: "comunidades-afro",
    label: "Comunidades Afro",
    icon: IconHandshake,
    color: "var(--topic-afro)",
    keywords: ["afro"],
  },
  {
    slug: "educacion",
    label: "Educación",
    icon: IconBook,
    color: "var(--topic-educacion)",
    keywords: ["educ"],
  },
  {
    slug: "derechos-humanos",
    label: "Derechos Humanos",
    icon: IconMegaphone,
    color: "var(--topic-derechos)",
    keywords: ["derechos humanos", "ddhh", "dd.hh", "victimas"],
  },
];

export function getTopicBySlug(slug: string) {
  return TOPICS.find((topic) => topic.slug === slug) ?? null;
}

// Colorea el pill de una noticia según su categoría cuando coincide con
// un tema conocido (p. ej. "Mujeres" en violeta), y cae al color de la
// sección (Colombia/Cauca) cuando no coincide con ninguno.
export function getCategoryTag(category: string) {
  const normalized = category.toLowerCase();
  const topic = TOPICS.find((t) => t.keywords.some((kw) => normalized.includes(kw)));
  if (!topic) return null;
  return { label: topic.label, color: topic.color };
}
