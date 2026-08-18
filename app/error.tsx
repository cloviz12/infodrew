"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-24 text-center">
      <span className="tag-pill bg-colombia-red/10 text-colombia-red">Error</span>
      <h1 className="text-2xl font-black text-foreground">
        No pudimos cargar esta página
      </h1>
      <p className="text-sm leading-relaxed text-muted">
        Probablemente el sitio todavía no tiene una base de datos Postgres
        conectada. En el proyecto de Vercel, ve a la pestaña{" "}
        <strong>Storage</strong> y conecta una base de datos Postgres (esto
        define <code>DATABASE_URL</code> automáticamente), luego vuelve a
        desplegar.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-full bg-colombia px-5 py-3 text-sm font-bold text-white transition hover:bg-colombia-dark"
      >
        Reintentar
      </button>
    </main>
  );
}
