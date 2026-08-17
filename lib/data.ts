import "server-only";
import { prisma } from "@/lib/prisma";
import type { Section } from "@prisma/client";

export function getPublishedPosts(section?: Section, limit?: number) {
  return prisma.post.findMany({
    where: { status: "PUBLISHED", ...(section ? { section } : {}) },
    orderBy: { publishedAt: "desc" },
    take: limit,
    include: { media: { orderBy: { order: "asc" } }, _count: { select: { comments: true } } },
  });
}

export function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
    include: {
      media: { orderBy: { order: "asc" } },
      comments: { orderBy: { createdAt: "desc" } },
    },
  });
}

export function getPendingPosts() {
  return prisma.post.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "asc" },
    include: { media: { orderBy: { order: "asc" } } },
  });
}

export function getModeratedPosts() {
  return prisma.post.findMany({
    where: { status: { in: ["PUBLISHED", "REJECTED"] } },
    orderBy: { updatedAt: "desc" },
    take: 40,
    include: { media: true },
  });
}

export async function getFollowerCount() {
  return prisma.follower.count();
}

export async function getSiteStats() {
  const [colombia, cauca, followers] = await Promise.all([
    prisma.post.count({ where: { status: "PUBLISHED", section: "COLOMBIA" } }),
    prisma.post.count({ where: { status: "PUBLISHED", section: "CAUCA" } }),
    getFollowerCount(),
  ]);
  return { colombia, cauca, followers };
}
