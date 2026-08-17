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

const posts = [
  {
    title: "Líderes nacionales y regionales se reúnen para dialogar sobre paz territorial",
    excerpt:
      "Representantes del gobierno nacional y de gobernaciones regionales se sentaron a dialogar sobre los avances en la implementación de los acuerdos de paz en distintos territorios del país.",
    content:
      "Durante el encuentro, líderes nacionales y regionales presentaron un balance de los compromisos adquiridos en materia de paz territorial.\nLas organizaciones sociales presentes destacaron la importancia de mantener espacios de diálogo permanentes entre el Estado y las comunidades.\nSe acordó una nueva mesa de seguimiento con participación de la sociedad civil.",
    section: "COLOMBIA",
    category: "Política",
    authorName: "Equipo Editorial InfoDrew",
    authorOrg: "InfoDrew",
    coverImage: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&q=80",
    isOfficial: true,
  },
  {
    title: "Congreso debate nueva ley de participación ciudadana",
    excerpt:
      "El proyecto busca fortalecer los mecanismos de participación de organizaciones sociales y comunidades en la toma de decisiones públicas.",
    content:
      "La iniciativa contempla la creación de consejos consultivos regionales con participación directa de comunidades campesinas, mujeres y comunidades afro.\nOrganizaciones de la sociedad civil celebraron el avance, aunque piden garantías de financiación para su implementación real en los territorios.",
    section: "COLOMBIA",
    category: "Institucional",
    authorName: "Equipo Editorial InfoDrew",
    authorOrg: "InfoDrew",
    coverImage: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&q=80",
    isOfficial: true,
  },
  {
    title: "Comunidades campesinas del norte del Cauca fortalecen sus procesos organizativos",
    excerpt:
      "Asociaciones campesinas se reunieron en un encuentro regional para compartir experiencias productivas y de defensa del territorio.",
    content:
      "El encuentro reunió a más de 20 organizaciones campesinas del norte del Cauca.\nSe compartieron experiencias sobre economía solidaria, seguridad alimentaria y defensa del territorio frente a proyectos extractivos.\nLas comunidades anunciaron una agenda conjunta de trabajo para el próximo año.",
    section: "CAUCA",
    category: "Comunidades campesinas",
    authorName: "Asociación Campesina del Norte del Cauca",
    authorOrg: "Asociación Campesina del Norte del Cauca",
    coverImage: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&q=80",
    isOfficial: true,
  },
  {
    title: "Mujeres del Cauca lideran proyecto de huertas comunitarias",
    excerpt:
      "Un colectivo de mujeres de distintos municipios del Cauca impulsa huertas agroecológicas como estrategia de soberanía alimentaria.",
    content:
      "El proyecto beneficia a más de 15 familias en sus primeras fases.\nLas lideresas destacan que la iniciativa también busca generar espacios de encuentro y formación en liderazgo para las mujeres del territorio.",
    section: "CAUCA",
    category: "Mujeres",
    authorName: "Colectivo de Mujeres Tejedoras del Cauca",
    authorOrg: "Colectivo de Mujeres Tejedoras del Cauca",
    coverImage: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1200&q=80",
    isOfficial: true,
  },
  {
    title: "Consejos comunitarios afro del Cauca avanzan en su plan de vida",
    excerpt:
      "Consejos comunitarios de comunidades afrodescendientes presentaron los avances de su plan de vida territorial en un encuentro regional.",
    content:
      "El plan de vida incluye estrategias de fortalecimiento cultural, productivo y ambiental para las comunidades afro del Cauca.\nLos consejos comunitarios invitaron a otras organizaciones del territorio a sumarse a las próximas jornadas de trabajo.",
    section: "CAUCA",
    category: "Comunidades afro",
    authorName: "Consejo Comunitario Afro del Cauca",
    authorOrg: "Consejo Comunitario Afro del Cauca",
    coverImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80",
    isOfficial: true,
  },
];

async function main() {
  for (const post of posts) {
    const slug = slugify(post.title);
    await prisma.post.upsert({
      where: { slug },
      update: {},
      create: {
        ...post,
        slug,
        status: "PUBLISHED",
        publishedAt: new Date(),
      },
    });
  }

  console.log(`Sembrados ${posts.length} artículos de ejemplo.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
