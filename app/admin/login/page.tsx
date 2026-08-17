import { redirect } from "next/navigation";
import { isAdminLoggedIn } from "@/lib/session";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdminLoggedIn()) {
    redirect("/admin");
  }
  const { error } = await searchParams;

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-sm flex-col justify-center px-4 py-16">
      <h1 className="text-xl font-bold text-foreground">Panel de moderación</h1>
      <p className="mt-1 text-sm text-muted">
        Acceso restringido al equipo editorial de InfoDrew.
      </p>

      {error && (
        <p className="mt-4 rounded-lg bg-colombia-red/10 px-3 py-2 text-sm text-colombia-red">
          Contraseña incorrecta. Inténtalo de nuevo.
        </p>
      )}

      <form action="/api/admin/login" method="POST" className="mt-6 flex flex-col gap-3">
        <label className="text-sm font-medium text-foreground" htmlFor="password">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          className="rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-colombia"
        />
        <button
          type="submit"
          className="mt-2 rounded-lg bg-colombia-dark px-4 py-2 text-sm font-semibold text-white transition hover:bg-colombia"
        >
          Ingresar
        </button>
      </form>
    </main>
  );
}
