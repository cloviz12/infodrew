# InfoDrew

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
- Prisma ORM + SQLite (base de datos local en `prisma/dev.db`)

## Primeros pasos

```bash
npm install
cp .env.example .env   # y ajusta ADMIN_PASSWORD y SESSION_SECRET
npx prisma migrate deploy
npm run db:seed        # opcional: carga noticias de ejemplo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

| Variable         | Descripción                                                |
| ---------------- | ----------------------------------------------------------- |
| `DATABASE_URL`   | Ruta de la base de datos SQLite (`file:./dev.db`)            |
| `ADMIN_PASSWORD` | Contraseña del panel de moderación (`/admin`)                |
| `SESSION_SECRET` | Secreto largo y aleatorio para firmar la sesión de admin     |
| `SITE_URL`       | (opcional) URL pública usada al compartir noticias           |

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
- `npm run db:seed` — carga noticias de ejemplo
- `npm run db:migrate` — crea/aplica migraciones de Prisma en desarrollo
