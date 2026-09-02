const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function slugify(input) {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Títulos de los artículos de ejemplo / de prueba que existieron antes de
// tener contenido real. Se eliminan explícitamente (no solo se dejan de
// sembrar) para que un `db:seed` sobre una base ya poblada también los borre.
const RETIRED_TITLES = [
  "Líderes nacionales y regionales se reúnen para dialogar sobre paz territorial",
  "Congreso debate nueva ley de participación ciudadana",
  "Comunidades campesinas del norte del Cauca fortalecen sus procesos organizativos",
  "Mujeres del Cauca lideran proyecto de huertas comunitarias",
  "Consejos comunitarios afro del Cauca avanzan en su plan de vida",
  "[PRUEBA] Recorrido por el territorio del Cauca",
];

const posts = [
  {
    title: "URT logra en Chocó su primer fallo judicial de reparación integral de tierras",
    excerpt:
      "El Juzgado Primero Civil del Circuito Especializado en Restitución de Tierras de Quibdó ordenó restituir el predio \"El Cairo – Parcela 20\", en El Carmen de Atrato, a una familia víctima de desplazamiento forzado.",
    content:
      "La Dirección Territorial Chocó de la Unidad de Restitución de Tierras (URT) logra su primer fallo judicial de reparación integral en el departamento.\nA través de la Sentencia No. 042 de 2026, el Juzgado Primero Civil del Circuito Especializado en Restitución de Tierras de Quibdó ordenó la restitución y formalización del predio \"El Cairo – Parcela 20\", ubicado en la vereda La Argelia del municipio de El Carmen de Atrato, a favor de una familia víctima de desplazamiento forzado.\nEsta decisión judicial reconoce los derechos de la familia afectada por el conflicto armado y ordena medidas de reparación integral y reconstrucción del tejido social en una zona impactada por el abandono forzado de tierras.\nLa URT, a través de la Dirección Territorial Chocó, obtuvo este hito institucional que fortalece el acceso a la justicia para las víctimas en el departamento. Durante el proceso se acreditó que el abandono del predio fue consecuencia directa de la violencia generada.",
    section: "COLOMBIA",
    category: "Restitución de tierras",
    authorName: "Unidad de Restitución de Tierras (URT)",
    authorOrg: "URT — Dirección Territorial Chocó",
    coverImage: null,
    isOfficial: true,
    publishedAt: new Date("2026-07-16T12:00:00-05:00"),
  },
];

async function main() {
  const retiredSlugs = RETIRED_TITLES.map(slugify);
  const { count: removed } = await prisma.post.deleteMany({
    where: { slug: { in: retiredSlugs } },
  });
  if (removed > 0) {
    console.log(`Eliminados ${removed} artículo(s) de ejemplo/prueba.`);
  }

  for (const { media, publishedAt, ...post } of posts) {
    const slug = slugify(post.title);
    await prisma.post.upsert({
      where: { slug },
      update: {},
      create: {
        ...post,
        slug,
        status: "PUBLISHED",
        publishedAt: publishedAt ?? new Date(),
        ...(media ? { media: { create: media } } : {}),
      },
    });
  }

  console.log(`Sembrados ${posts.length} artículo(s) real(es).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
