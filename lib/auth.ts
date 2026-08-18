import { createHmac, timingSafeEqual } from "node:crypto";
import { resolveAppDatabaseUrl } from "@/lib/database-url";

export const ADMIN_COOKIE = "infodrew_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 días

// Si no se define SESSION_SECRET explícitamente, se deriva de la URL de la
// base de datos (que ya es obligatoria) en vez de usar un valor fijo en el
// código fuente. Así no hace falta configurar una variable de entorno
// adicional solo para esto, sin exponer ningún secreto real en el repo.
function getSecret() {
  if (process.env.SESSION_SECRET) return process.env.SESSION_SECRET;

  const databaseUrl = resolveAppDatabaseUrl();
  if (!databaseUrl) {
    throw new Error("Falta la variable de entorno DATABASE_URL o SESSION_SECRET");
  }
  return createHmac("sha256", databaseUrl).update("infodrew-session-secret").digest("hex");
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionToken() {
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = `${expires}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string | undefined | null) {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const expires = Number(payload);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;

  return true;
}

export function checkAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    throw new Error("Falta la variable de entorno ADMIN_PASSWORD");
  }
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
