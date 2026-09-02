import Link from "next/link";
import ArtCover from "@/components/ArtCover";
import HeroFollowCard from "@/components/HeroFollowCard";
import HeroVideoButton from "@/components/HeroVideoButton";
import SectionSelector from "@/components/SectionSelector";
import NewsCard from "@/components/NewsCard";
import SendNewsCard from "@/components/SendNewsCard";
import RevealOnScroll from "@/components/RevealOnScroll";
import TopicsGrid from "@/components/TopicsGrid";
import FeaturedVideo from "@/components/FeaturedVideo";
import MostCommented from "@/components/MostCommented";
import SeguirWidget from "@/components/SeguirWidget";
import {
  getLatestPosts,
  getMostCommentedPosts,
  getFeaturedVideoPost,
  getFollowerCount,
} from "@/lib/data";
import { ART } from "@/lib/art";
import { getYoutubeEmbed } from "@/lib/video";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ follow?: string }>;
}) {
  const { follow } = await searchParams;
  const [latestPosts, mostCommented, featuredVideo, followerCount] = await Promise.all([
    getLatestPosts(3),
    getMostCommentedPosts(3),
    getFeaturedVideoPost(),
    getFollowerCount(),
  ]);

  const video = featuredVideo?.media.find((m) => m.type === "VIDEO");
  const isMp4Video = video ? /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(video.url) : false;
  const youtubeEmbed = video && !isMp4Video ? getYoutubeEmbed(video.url, true) : null;

  return (
    <>
      <div className="relative">
        <ArtCover
          slot={ART.home}
          tone="ink"
          className="animated flex h-[64vh] items-end sm:h-[76vh]"
          video={isMp4Video ? video?.url : undefined}
        >
          <div className="w-full px-4 pb-16 pt-28 sm:px-6 sm:pb-20">
            <div className="mx-auto max-w-6xl">
              <p className="reveal-up text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                Un territorio, muchas voces
              </p>
              <h1 className="reveal-up delay-1 mt-4 max-w-2xl font-display text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.08] text-white">
                Información que conecta, historias que transforman
              </h1>
              <p className="reveal-up delay-2 mt-5 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
                Un espacio para líderes y comunidades que construyen país
                desde sus territorios: organizaciones sociales, comunidades
                campesinas, mujeres y comunidades afro.
              </p>
              <div className="reveal-up delay-3 mt-7 flex flex-wrap gap-3">
                <Link
                  href="/colombia"
                  className="bg-accent px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-accent-foreground transition hover:bg-accent-dark"
                >
                  Explorar Colombia
                </Link>
                <Link
                  href="/cauca"
                  className="border-2 border-white/70 px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white transition hover:border-white"
                >
                  Explorar Cauca
                </Link>
                {youtubeEmbed && featuredVideo && (
                  <HeroVideoButton embedUrl={youtubeEmbed} title={featuredVideo.title} />
                )}
              </div>
            </div>
          </div>
        </ArtCover>

        <div className="pointer-events-none absolute inset-x-0 top-24 hidden px-4 sm:top-28 sm:px-6 lg:block">
          <div className="pointer-events-auto mx-auto flex max-w-6xl justify-end">
            <HeroFollowCard followerCount={followerCount} />
          </div>
        </div>
      </div>

      <div className="px-4 pt-8 sm:px-6 lg:hidden">
        <div className="flex justify-center">
          <HeroFollowCard followerCount={followerCount} />
        </div>
      </div>

      <SectionSelector />

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16 sm:px-6">
        <section>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-black text-foreground sm:text-3xl">
              Noticias destacadas
            </h2>
            <Link href="/colombia" className="text-sm font-bold text-accent hover:underline">
              Ver todas →
            </Link>
          </div>

          {latestPosts.length === 0 ? (
            <p className="mt-8 text-sm font-semibold italic text-muted">
              Aún no hay noticias publicadas. ¡Sé la primera organización en
              enviar contenido!
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {latestPosts.map((post, i) => (
                <RevealOnScroll key={post.id} delay={i * 80}>
                  <NewsCard post={post} />
                </RevealOnScroll>
              ))}
              <RevealOnScroll delay={latestPosts.length * 80}>
                <SendNewsCard />
              </RevealOnScroll>
            </div>
          )}
        </section>

        <section>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-black text-foreground sm:text-3xl">
              Explora por temas
            </h2>
          </div>
          <div className="mt-6">
            <TopicsGrid />
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-black text-foreground sm:text-3xl">
                Videos destacados
              </h2>
            </div>
            <div className="mt-6">
              <FeaturedVideo post={featuredVideo} />
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-black text-foreground sm:text-3xl">
              Lo más comentado
            </h2>
            <div className="mt-6">
              <MostCommented posts={mostCommented} />
            </div>
          </div>
        </section>

        <SeguirWidget followerCount={followerCount} feedback={follow as "success" | "error" | undefined} />
      </main>
    </>
  );
}
