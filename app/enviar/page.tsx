import type { Metadata } from "next";
import { submitPost } from "@/app/actions";

export const metadata: Metadata = {
  title: "Envía tu noticia - Colombia Incluyente",
  description:
    "Envía noticias, fotos y videos de tu organización o comunidad para que sean revisados y publicados en Colombia Incluyente.",
};

export default async function EnviarPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const { success, error } = await searchParams;

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-black text-foreground sm:text-4xl">Envía tu noticia</h1>
      <p className="mt-2 text-base leading-relaxed text-muted">
        ¿Perteneces a una organización social, comunidad campesina, colectivo
        de mujeres, comunidad afro o eres un líder del territorio? Cuéntanos
        lo que está pasando. Nuestro equipo revisará tu contenido antes de
        publicarlo.
      </p>

      {success && (
        <p className="mt-6 rounded-xl border border-cauca bg-cauca-light px-4 py-3 text-sm font-semibold text-cauca-dark">
          ¡Gracias! Tu contenido fue enviado y quedará publicado en cuanto sea
          revisado por el equipo editorial.
        </p>
      )}
      {error && (
        <p className="mt-6 rounded-xl border border-colombia-red bg-colombia-red/10 px-4 py-3 text-sm font-semibold text-colombia-red">
          Falta información obligatoria. Revisa el formulario e inténtalo de
          nuevo.
        </p>
      )}

      <form action={submitPost} className="mt-8 flex flex-col gap-5 rounded-2xl border border-border bg-surface p-6">
        <Field label="Sección" htmlFor="section">
          <select
            id="section"
            name="section"
            required
            defaultValue="CAUCA"
            className="rounded-xl border border-border px-3.5 py-2.5 text-sm outline-none focus:border-accent"
          >
            <option value="COLOMBIA">Colombia</option>
            <option value="CAUCA">Cauca</option>
          </select>
        </Field>

        <Field label="Categoría" htmlFor="category" hint="Ej: comunidades campesinas, mujeres, comunidad afro, organizaciones sociales…">
          <input
            id="category"
            name="category"
            className="rounded-xl border border-border px-3.5 py-2.5 text-sm outline-none focus:border-accent"
          />
        </Field>

        <Field label="Título" htmlFor="title" required>
          <input
            id="title"
            name="title"
            required
            maxLength={160}
            className="rounded-xl border border-border px-3.5 py-2.5 text-sm outline-none focus:border-accent"
          />
        </Field>

        <Field label="Resumen breve" htmlFor="excerpt" required hint="Máximo 280 caracteres, aparece en las tarjetas de noticias.">
          <textarea
            id="excerpt"
            name="excerpt"
            required
            maxLength={280}
            rows={2}
            className="rounded-xl border border-border px-3.5 py-2.5 text-sm outline-none focus:border-accent"
          />
        </Field>

        <Field label="Contenido completo" htmlFor="content" required>
          <textarea
            id="content"
            name="content"
            required
            rows={8}
            className="rounded-xl border border-border px-3.5 py-2.5 text-sm outline-none focus:border-accent"
          />
        </Field>

        <Field label="Imagen de portada (URL)" htmlFor="coverImage" hint="Enlace directo a una imagen (https://…)">
          <input
            id="coverImage"
            name="coverImage"
            type="url"
            placeholder="https://…"
            className="rounded-xl border border-border px-3.5 py-2.5 text-sm outline-none focus:border-accent"
          />
        </Field>

        <Field
          label="Fotos y videos adicionales"
          htmlFor="mediaUrls"
          hint="Un enlace por línea (imágenes, video de YouTube o archivo .mp4)."
        >
          <textarea
            id="mediaUrls"
            name="mediaUrls"
            rows={3}
            placeholder={"https://ejemplo.com/foto1.jpg\nhttps://youtube.com/watch?v=…"}
            className="rounded-xl border border-border px-3.5 py-2.5 text-sm outline-none focus:border-accent"
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Tu nombre" htmlFor="authorName" required>
            <input
              id="authorName"
              name="authorName"
              required
              maxLength={120}
              className="rounded-xl border border-border px-3.5 py-2.5 text-sm outline-none focus:border-accent"
            />
          </Field>
          <Field label="Organización (opcional)" htmlFor="authorOrg">
            <input
              id="authorOrg"
              name="authorOrg"
              maxLength={160}
              className="rounded-xl border border-border px-3.5 py-2.5 text-sm outline-none focus:border-accent"
            />
          </Field>
        </div>

        <Field label="Correo de contacto (opcional)" htmlFor="authorEmail">
          <input
            id="authorEmail"
            name="authorEmail"
            type="email"
            className="rounded-xl border border-border px-3.5 py-2.5 text-sm outline-none focus:border-accent"
          />
        </Field>

        <button
          type="submit"
          className="mt-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground transition hover:bg-accent-dark"
        >
          Enviar para revisión
        </button>
      </form>
    </main>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-foreground">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}
