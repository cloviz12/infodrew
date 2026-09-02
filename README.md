# Colombia Incluyente

Plataforma web informativa e interactiva que conecta a líderes nacionales,
regionales y a los diferentes sectores del territorio. Tiene dos secciones
principales:

- **Colombia**: los temas y acontecimientos más relevantes del país.
- **Cauca**: organizaciones sociales, comunidades campesinas, mujeres y
  comunidades afro del territorio.

## Funcionalidades

- Noticias con fotos, video (archivo o YouTube) y contenido enriquecido.
- Comentarios y "me gusta" en cada noticia, botones para compartir
  (WhatsApp, Facebook, compartir nativo o copiar enlace).
- Formulario público **"Envía tu noticia"** para que personas y
  organizaciones envíen contenido, que queda en estado *pendiente* hasta
  ser revisado.
- Panel de moderación (`/admin`) protegido por contraseña para aprobar o
  rechazar los envíos.
- Sección **"Síguenos"** con el contador de seguidores en vivo y un
  formulario para unirse a la comunidad.

## Stack técnico

- [Next.js](https://nextjs.org) (App Router, Server Actions) + React + TypeScript
- Tailwind CSS
- Prisma ORM + Postgres

## Primeros pasos

```bash
npm install
cp .env.example .env   # define DATABASE_URL con tu Postgres
npx prisma migrate deploy
npm run db:seed        # opcional: carga las noticias reales y borra las de ejemplo/prueba
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

En Vercel: agrega una base de datos Postgres desde la pestaña **Storage**
del proyecto y conéctala (esto define `DATABASE_URL` automáticamente), y
agrega `ADMIN_PASSWORD` en **Settings → Environment Variables** con la
contraseña que quieras usar para entrar a `/admin`.

## Variables de entorno

| Variable         | Obligatoria | Descripción                                                              |
| ---------------- | :---------: | ------------------------------------------------------------------------- |
| `DATABASE_URL`   |     Sí      | Cadena de conexión a Postgres                                             |
| `ADMIN_PASSWORD` |     Sí      | Contraseña del panel de moderación (`/admin`). No tiene valor por defecto — es una credencial real y debe elegirla quien administra el sitio. |
| `SESSION_SECRET` |     No      | Secreto para firmar la sesión de admin. Si no se define, se deriva automáticamente de `DATABASE_URL` (ver `lib/auth.ts`), sin exponer ningún secreto en el código. |
| `SITE_URL`       |     No      | URL pública usada al compartir noticias                                   |

## Moderación de contenido

1. Cualquier persona u organización envía contenido desde `/enviar`.
2. El contenido queda con estado `PENDING` y no es visible públicamente.
3. El equipo editorial entra a `/admin` con la contraseña configurada y
   aprueba o rechaza cada envío.
4. Al aprobar, la noticia se publica de inmediato en la sección
   correspondiente (Colombia o Cauca).

## Scripts

- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción
- `npm run start` — servidor de producción
- `npm run lint` — linting
- `npm run db:seed` — carga las noticias reales y borra las de ejemplo/prueba
- `npm run db:migrate` — crea/aplica migraciones de Prisma en desarrollo
