import { PrismaClient } from "@prisma/client";
import { resolveAppDatabaseUrl } from "@/lib/database-url";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prisma solo lee `DATABASE_URL`, pero al conectar Postgres desde Storage
// en Vercel la variable puede llamarse distinto (ver lib/database-url.ts).
const resolvedUrl = resolveAppDatabaseUrl();
if (resolvedUrl) {
  process.env.DATABASE_URL = resolvedUrl;
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
