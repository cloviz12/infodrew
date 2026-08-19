"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";
import { isSafeMediaUrl } from "@/lib/url";
import { isAdminLoggedIn } from "@/lib/session";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function generateUniqueSlug(title: string) {
  const base = slugify(title) || `noticia-${Date.now()}`;
  let slug = base;
  let attempt = 1;
  while (await prisma.post.findUnique({ where: { slug }, select: { id: true } })) {
    attempt += 1;
    slug = `${base}-${attempt}`;
  }
  return slug;
}

export async function submitPost(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim().slice(0, 160);
  const excerpt = String(formData.get("excerpt") ?? "").trim().slice(0, 280);
  const content = String(formData.get("content") ?? "").trim().slice(0, 20000);
  const sectionRaw = String(formData.get("section") ?? "");
  const category = String(formData.get("category") ?? "").trim().slice(0, 60) || "General";
  const authorName = String(formData.get("authorName") ?? "").trim().slice(0, 120);
  const authorEmail = String(formData.get("authorEmail") ?? "").trim().slice(0, 200);
  const authorOrg = String(formData.get("authorOrg") ?? "").trim().slice(0, 160);
  const coverImageRaw = String(formData.get("coverImage") ?? "").trim();
  const mediaUrlsRaw = String(formData.get("mediaUrls") ?? "").trim();

  const section = sectionRaw === "COLOMBIA" || sectionRaw === "CAUCA" ? sectionRaw : null;

  if (!title || !excerpt || !content || !authorName || !section) {
    redirect("/enviar?error=missing");
  }

  const coverImage = coverImageRaw && isSafeMediaUrl(coverImageRaw) ? coverImageRaw : null;

  const mediaUrls = mediaUrlsRaw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .filter(isSafeMediaUrl)
    .slice(0, 8);

  const slug = await generateUniqueSlug(title);

  await prisma.post.create({
    data: {
      slug,
      title,
      excerpt,
      content,
      section,
      category,
      authorName,
      authorEmail: authorEmail || null,
      authorOrg: authorOrg || null,
      coverImage,
      status: "PENDING",
      media: {
        create: mediaUrls.map((url, index) => ({
          url,
          order: index,
          type: /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(url) || /youtube\.com|youtu\.be|vimeo\.com/i.test(url)
            ? ("VIDEO" as const)
            : ("IMAGE" as const),
        })),
      },
    },
  });

  revalidatePath("/admin");
  redirect("/enviar?success=1");
}

export async function addComment(postId: string, postSlug: string, formData: FormData) {
  const authorName = String(formData.get("authorName") ?? "").trim().slice(0, 80) || "Anónimo";
  const content = String(formData.get("content") ?? "").trim().slice(0, 2000);

  if (!content) return;

  const post = await prisma.post.findUnique({ where: { id: postId }, select: { status: true } });
  if (!post || post.status !== "PUBLISHED") return;

  await prisma.comment.create({ data: { postId, authorName, content } });
  revalidatePath(`/noticia/${postSlug}`);
}

export async function likePost(postId: string, postSlug: string) {
  const store = await cookies();
  const raw = store.get("liked_posts")?.value ?? "";
  const liked = new Set(raw.split(",").filter(Boolean));

  if (liked.has(postId)) return;

  await prisma.post.update({ where: { id: postId }, data: { likeCount: { increment: 1 } } });
  liked.add(postId);
  store.set("liked_posts", Array.from(liked).join(","), {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });

  revalidatePath(`/noticia/${postSlug}`);
}

export async function followSite(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim().slice(0, 120);
  const email = String(formData.get("email") ?? "").trim().toLowerCase().slice(0, 200);
  const region = String(formData.get("region") ?? "").trim().slice(0, 80);

  if (!email || !EMAIL_RE.test(email)) {
    redirect("/?follow=error#seguir");
  }

  await prisma.follower.upsert({
    where: { email },
    update: { name: name || undefined, region: region || undefined },
    create: { name: name || null, email, region: region || null },
  });

  revalidatePath("/");
  redirect("/?follow=success#seguir");
}

export async function moderatePost(postId: string, action: "approve" | "reject") {
  if (!(await isAdminLoggedIn())) {
    redirect("/admin/login");
  }

  const post = await prisma.post.update({
    where: { id: postId },
    data:
      action === "approve"
        ? { status: "PUBLISHED", publishedAt: new Date() }
        : { status: "REJECTED" },
  });

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/colombia");
  revalidatePath("/cauca");
  revalidatePath(`/noticia/${post.slug}`);
}

const CAUCA_MEDIA_TITLE = "Recorrido aéreo por el territorio del Cauca";
const CAUCA_MEDIA_PHOTOS = [
  "/media/cauca-2026-08/54135067373_e1a33daa01_k.jpg",
  "/media/cauca-2026-08/54135119049_b33738fa7d_k.jpg",
  "/media/cauca-2026-08/54135272664_cd35293fd4_k.jpg",
  "/media/cauca-2026-08/54470254527_1f65311414_h.jpg",
  "/media/cauca-2026-08/54471093276_58226e487e_h.jpg",
  "/media/cauca-2026-08/54471093406_3fc6472920_b.jpg",
  "/media/cauca-2026-08/54471453975_01f8f1ce74_h.jpg",
];
const CAUCA_MEDIA_VIDEOS = [
  "https://github.com/cloviz12/infodrew/releases/download/media-cauca-2026-08/DJI_0008.MP4",
  "https://github.com/cloviz12/infodrew/releases/download/media-cauca-2026-08/DJI_0009.MP4",
  "https://github.com/cloviz12/infodrew/releases/download/media-cauca-2026-08/DJI_0012.MP4",
  "https://github.com/cloviz12/infodrew/releases/download/media-cauca-2026-08/DJI_0021.MP4",
  "https://github.com/cloviz12/infodrew/releases/download/media-cauca-2026-08/DJI_0025.MP4",
];

// Botón de un clic en /admin (ver ModerationCard/app/admin/page.tsx) para
// insertar el post de fotos/video de Cauca sin necesitar acceso directo a
// DATABASE_URL: usa la misma conexión que ya tiene configurada el servidor.
// Idempotente (upsert por slug), así que tocar el botón varias veces no
// duplica el post.
export async function seedCaucaMediaPost() {
  if (!(await isAdminLoggedIn())) {
    redirect("/admin/login");
  }

  const slug = slugify(CAUCA_MEDIA_TITLE);

  await prisma.post.upsert({
    where: { slug },
    update: {},
    create: {
      slug,
      title: CAUCA_MEDIA_TITLE,
      excerpt: "Imágenes y video aéreo del territorio del Cauca, tomados en agosto de 2026.",
      content: "Esta galería reúne fotografías y video aéreo del territorio del Cauca, registrados en agosto de 2026.",
      section: "CAUCA",
      category: "Territorio",
      authorName: "Equipo Editorial Colombia Incluyente",
      coverImage: "/media/cauca-2026-08/53706333279_e37fea4fc2_k.jpg",
      isOfficial: false,
      status: "PUBLISHED",
      publishedAt: new Date(),
      media: {
        create: [
          ...CAUCA_MEDIA_PHOTOS.map((url, index) => ({ type: "IMAGE" as const, url, order: index })),
          ...CAUCA_MEDIA_VIDEOS.map((url, index) => ({
            type: "VIDEO" as const,
            url,
            order: CAUCA_MEDIA_PHOTOS.length + index,
          })),
        ],
      },
    },
  });

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/colombia");
  revalidatePath("/cauca");
  redirect("/admin?seeded=1");
}
