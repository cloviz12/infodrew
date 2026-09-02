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
  "Recorrido aéreo por el territorio del Cauca",
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
    coverImage: "/media/noticias/choco-el-cairo-parcela-20.jpg",
    isOfficial: true,
    publishedAt: new Date("2026-07-16T12:00:00-05:00"),
  },
  {
    title: "URT entrega 100 compensaciones por equivalencia a víctimas de despojo en el Meta",
    excerpt:
      "La Dirección Territorial Meta de la URT completó 100 compensaciones por equivalencia, una inversión cercana a $18.000 millones, en cumplimiento de sentencias de restitución de tierras.",
    content:
      "La Unidad de Restitución de Tierras (URT), a través de su Dirección Territorial Meta, ha entregado 100 compensaciones por equivalencia, que representan una inversión cercana a $18.000 millones, en cumplimiento de las sentencias proferidas por jueces y magistrados especializados, beneficiando a víctimas de despojo y abandono forzado en el departamento.\nDe ese total, 82 compensaciones, por un valor aproximado de $11.400 millones, fueron entregadas desde la entrada en vigencia de la Ley 1448 de 2011 hasta el inicio del actual Gobierno. En la administración del presidente Gustavo Petro, la Dirección Territorial Meta ha materializado 18 compensaciones, con una inversión cercana a $6.600 millones, equivalente a cerca del 37% de los recursos ejecutados para esta medida de reparación en la región.\nLa compensación por equivalencia es una medida contemplada en la Ley 1448 de 2011 o Ley de Víctimas y Restitución de Tierras, que busca garantizar la reparación integral.",
    section: "COLOMBIA",
    category: "Restitución de tierras",
    authorName: "Unidad de Restitución de Tierras (URT)",
    authorOrg: "URT — Dirección Territorial Meta",
    coverImage: "/media/noticias/meta-compensaciones.jpg",
    isOfficial: true,
  },
  {
    title: "URT restituye 22.620 hectáreas al Resguardo Indígena Río Guangüí en Timbiquí, Cauca",
    excerpt:
      "En cumplimiento de la Sentencia 080, la URT hizo entrega simbólica del fallo que devuelve 22.620 hectáreas y 6.901 m² al pueblo Eperara Siapidara en zona rural de Timbiquí.",
    content:
      "Timbiquí, 10 de julio de 2026 (@URestitucion). En cumplimiento de la Sentencia 080, proferida por el Juzgado Segundo Civil del Circuito Especializado en Restitución de Tierras de Popayán, la URT llegó hasta la zona rural de Timbiquí, en el departamento del Cauca, para realizar la entrega simbólica del fallo que devuelve 22.620 hectáreas y 6.901 metros cuadrados al Resguardo Indígena Río Guangüí.\nLa entrega simbólica de la sentencia se realizó en zona rural de Timbiquí, a tres horas de la cabecera municipal, donde la Dirección de Asuntos Étnicos de la Unidad de Restitución de Tierras (URT) materializó los derechos territoriales de familias pertenecientes al pueblo originario Eperara Siapidara, afectados por el conflicto armado.\nLa decisión judicial es el resultado del proceso de acompañamiento adelantado por la Unidad de Restitución de Tierras, durante el cual se identificaron y caracterizaron los hechos que evidencian un prolongado proceso de vulneración de los derechos colectivos de esta comunidad indígena.",
    section: "CAUCA",
    category: "Pueblos indígenas",
    authorName: "Unidad de Restitución de Tierras (URT)",
    authorOrg: "URT — Dirección de Asuntos Étnicos",
    coverImage: "/media/noticias/timbiqui-resguardo-rio-guangui.jpg",
    isOfficial: true,
    publishedAt: new Date("2026-07-10T12:00:00-05:00"),
  },
  {
    // Post "carrier" solo para que el video de portada quede disponible
    // como Media tipo VIDEO: getFeaturedVideoPost() toma el post
    // PUBLISHED más reciente que tenga un video, y ese post alimenta el
    // fondo animado del hero y "Videos destacados" en el home. La fecha
    // se fija en el pasado a propósito para que este post no le quite
    // su lugar a las noticias reales en "Noticias destacadas" (que se
    // ordenan por publishedAt sin importar si tienen video).
    title: "Video de portada",
    excerpt: "Video de portada del sitio.",
    content: "Video de portada del sitio.",
    section: "COLOMBIA",
    category: "Portada",
    authorName: "Equipo Editorial Colombia Incluyente",
    authorOrg: "Colombia Incluyente",
    coverImage: null,
    isOfficial: true,
    publishedAt: new Date("2026-01-01T00:00:00-05:00"),
    media: [{ type: "VIDEO", url: "/media/portada/portada-3.mp4", order: 0 }],
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
      // Actualiza el contenido (título, texto, coverImage, etc.) de los
      // posts que ya existen: antes esto era `update: {}`, así que un
      // redeploy nunca aplicaba cambios a un post ya sembrado (por eso las
      // fotos agregadas después no llegaban a producción). No se toca
      // publishedAt ni media aquí para no correr la fecha ni duplicar
      // archivos en cada redeploy.
      update: post,
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
