import { NextResponse } from "next/server";
import { ADMIN_COOKIE, checkAdminPassword, createSessionToken } from "@/lib/auth";

export async function POST(request: Request) {
  const form = await request.formData();
  const password = String(form.get("password") ?? "");

  if (!password || !checkAdminPassword(password)) {
    const url = new URL("/admin/login?error=1", request.url);
    return NextResponse.redirect(url, { status: 303 });
  }

  const response = NextResponse.redirect(new URL("/admin", request.url), {
    status: 303,
  });

  response.cookies.set(ADMIN_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
