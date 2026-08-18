// Cuando se conecta una base de datos Postgres desde la pestaña Storage de
// Vercel, la integración expone la cadena de conexión bajo distintos
// nombres según el proveedor (Neon, Supabase, etc.) — no siempre como
// `DATABASE_URL`. Se revisan los nombres más comunes en orden, para que la
// app funcione sin tener que renombrar nada a mano en Vercel.
//
// Para consultas normales conviene una conexión con pooling (mejor para
// funciones serverless). Para migraciones (DDL) conviene una conexión
// directa, sin pooler, porque algunos poolers (pgbouncer en modo
// transaction) no soportan los prepared statements que usa Prisma Migrate.

const APP_ENV_VARS = ["DATABASE_URL", "POSTGRES_PRISMA_URL", "POSTGRES_URL"];
const MIGRATE_ENV_VARS = [
  "DATABASE_URL",
  "POSTGRES_URL_NON_POOLING",
  "POSTGRES_PRISMA_URL",
  "POSTGRES_URL",
];

function firstDefined(names: string[], env: NodeJS.ProcessEnv) {
  for (const name of names) {
    const value = env[name];
    if (value) return value;
  }
  return undefined;
}

export function resolveAppDatabaseUrl(env: NodeJS.ProcessEnv = process.env) {
  return firstDefined(APP_ENV_VARS, env);
}

export function resolveMigrateDatabaseUrl(env: NodeJS.ProcessEnv = process.env) {
  return firstDefined(MIGRATE_ENV_VARS, env);
}
