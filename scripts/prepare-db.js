// Se ejecuta en cada build de Vercel: aplica las migraciones de Prisma y
// carga las noticias de ejemplo contra la base de datos ya conectada,
// sin necesidad de correrlo manualmente ni de que nadie tenga que pegar
// la cadena de conexión en ningún lado.
//
// Al conectar Postgres desde la pestaña Storage de Vercel, la variable de
// conexión puede llamarse distinto según el proveedor (Neon, Supabase...),
// así que se revisan los nombres más comunes en vez de exigir
// exactamente `DATABASE_URL`.

const { execSync } = require("node:child_process");

const MIGRATE_ENV_VARS = [
  "DATABASE_URL",
  "POSTGRES_URL_NON_POOLING",
  "POSTGRES_PRISMA_URL",
  "POSTGRES_URL",
];

function resolveDatabaseUrl() {
  for (const name of MIGRATE_ENV_VARS) {
    if (process.env[name]) return process.env[name];
  }
  return undefined;
}

function run(command) {
  execSync(command, { stdio: "inherit", env: process.env });
}

const databaseUrl = resolveDatabaseUrl();

if (!databaseUrl) {
  console.warn(
    "\n[prepare-db] No se encontró ninguna variable de conexión a Postgres " +
      `(se buscó: ${MIGRATE_ENV_VARS.join(", ")}).\n` +
      "[prepare-db] El sitio va a compilar, pero mostrará errores hasta " +
      "que conectes una base de datos Postgres desde Storage en Vercel.\n"
  );
  process.exit(0);
}

process.env.DATABASE_URL = databaseUrl;

console.log("[prepare-db] Aplicando migraciones de Prisma...");
run("npx prisma migrate deploy");

console.log("[prepare-db] Cargando noticias de ejemplo (si no existen)...");
try {
  run("node prisma/seed.js");
} catch (error) {
  console.warn("[prepare-db] No se pudieron cargar las noticias de ejemplo:", error.message);
}
