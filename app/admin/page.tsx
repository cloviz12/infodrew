import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminLoggedIn } from "@/lib/session";
import { getPendingPosts, getModeratedPosts, getFollowerCount } from "@/lib/data";
import ModerationCard from "@/components/ModerationCard";
import { formatNumber } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Moderación — Colombia Incluyente",
};

export default async function AdminPage() {
  if (!(await isAdminLoggedIn())) {
    redirect("/admin/login");
  }

  const [pending, moderated, followerCount] = await Promise.all([
    getPendingPosts(),
    getModeratedPosts(),
    getFollowerCount(),
  ]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-black text-foreground">Panel de moderación</h1>
          <p className="mt-1 text-sm text-muted">
            {formatNumber(pending.length)} envío(s) pendiente(s) ·{" "}
            {formatNumber(followerCount)} seguidores
          </p>
        </div>
        <form action="/api/admin/logout" method="POST">
          <button
            type="submit"
            className="rounded-full border border-border px-4 py-2 text-sm font-bold text-foreground transition hover:border-colombia-red hover:bg-colombia-red/10 hover:text-colombia-red"
          >
            Cerrar sesión
          </button>
        </form>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-foreground">Pendientes de revisión</h2>
        {pending.length === 0 ? (
          <p className="mt-3 rounded-xl border border-dashed border-border p-6 text-sm text-muted">
            No hay envíos pendientes por el momento.
          </p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {pending.map((post) => (
              <ModerationCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-foreground">Historial reciente</h2>
        {moderated.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Aún no hay contenido moderado.</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {moderated.map((post) => (
              <ModerationCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
