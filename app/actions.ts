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

