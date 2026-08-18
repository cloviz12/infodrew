import "server-only";
import { prisma } from "@/lib/prisma";
import type { Section } from "@prisma/client";

// Si la base de datos no está disponible (todavía no se conectó, o el
// deploy no recogió la variable de conexión), estas funciones no deben
// tumbar toda la página con un 500: registran el error en los logs del
// servidor y devuelven un resultado vacío para que el sitio siga visible.
async function safe<T>(fallback: T, query: () => Promise<T>): Promise<T> {
  try {
    return await query();
  } catch (error) {
    console.error("[lib/data] Falló una consulta a la base de datos:", error);
    return fallback;
  }
}

export function getPublishedPosts(section?: Section, limit?: number) {
  return safe([], () =>
    prisma.post.findMany({
      where: { status: "PUBLISHED", ...(section ? { section } : {}) },
      orderBy: { publishedAt: "desc" },
      take: limit,
      include: { media: { orderBy: { order: "asc" } }, _count: { select: { comments: true } } },
    })
  );
}

export function getPostBySlug(slug: string) {
  return safe(null, () =>
    prisma.post.findUnique({
      where: { slug },
      include: {
        media: { orderBy: { order: "asc" } },
        comments: { orderBy: { createdAt: "desc" } },
      },
    })
  );
}

export function getPendingPosts() {
  return safe([], () =>
    prisma.post.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "asc" },
      include: { media: { orderBy: { order: "asc" } } },
    })
  );
}

export function getModeratedPosts() {
  return safe([], () =>
    prisma.post.findMany({
      where: { status: { in: ["PUBLISHED", "REJECTED"] } },
      orderBy: { updatedAt: "desc" },
      take: 40,
      include: { media: true },
    })
  );
}

export async function getFollowerCount() {
  return safe(0, () => prisma.follower.count());
}

export async function getSiteStats() {
  const [colombia, cauca, followers] = await Promise.all([
    safe(0, () => prisma.post.count({ where: { status: "PUBLISHED", section: "COLOMBIA" } })),
    safe(0, () => prisma.post.count({ where: { status: "PUBLISHED", section: "CAUCA" } })),
    getFollowerCount(),
  ]);
  return { colombia, cauca, followers };
}
