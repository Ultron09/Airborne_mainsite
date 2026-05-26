"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createHash } from "crypto";
import prisma from "@/lib/prisma";

// Cryptographic token helper
function getExpectedToken(): string {
  const password = process.env.ADMIN_PASSWORD || "AirborneAdmin2026!";
  const secret = process.env.SESSION_SECRET || "airborne-hrs-session-secret-key-2026-xyz";
  return createHash("sha256")
    .update(password + secret)
    .digest("hex");
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("airborne_session")?.value;
  if (!session) return false;
  return session === getExpectedToken();
}

// Log in admin
export async function loginAdmin(password: string): Promise<{ success: boolean; error?: string }> {
  const expectedPassword = process.env.ADMIN_PASSWORD || "AirborneAdmin2026!";
  
  if (password !== expectedPassword) {
    return { success: false, error: "Invalid admin password" };
  }

  const cookieStore = await cookies();
  cookieStore.set("airborne_session", getExpectedToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day session
    path: "/",
    sameSite: "strict",
  });

  return { success: true };
}

// Log out admin
export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("airborne_session");
}

// Create new blog post
export async function createBlogPost(data: {
  title: string;
  slug: string;
  summary: string;
  content: string;
  published: boolean;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string;
  targetLocation?: string;
  targetRegion?: string;
  latitude?: number | null;
  longitude?: number | null;
  radiusKm?: number;
}) {
  const isAuth = await isAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  // Validate slug uniqueness
  const existing = await prisma.blogPost.findUnique({
    where: { slug: data.slug },
  });
  if (existing) {
    throw new Error("A blog post with this slug already exists.");
  }

  const newPost = await prisma.blogPost.create({
    data: {
      title: data.title,
      slug: data.slug,
      summary: data.summary,
      content: data.content,
      published: data.published,
      seoTitle: data.seoTitle || null,
      seoDescription: data.seoDescription || null,
      keywords: data.keywords || null,
      targetLocation: data.targetLocation || null,
      targetRegion: data.targetRegion || null,
      latitude: data.latitude,
      longitude: data.longitude,
      radiusKm: data.radiusKm ?? 50,
    },
  });

  // Revalidate public routes
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");

  return newPost;
}

// Update existing blog post
export async function updateBlogPost(
  id: string,
  data: {
    title: string;
    slug: string;
    summary: string;
    content: string;
    published: boolean;
    seoTitle?: string;
    seoDescription?: string;
    keywords?: string;
    targetLocation?: string;
    targetRegion?: string;
    latitude?: number | null;
    longitude?: number | null;
    radiusKm?: number;
  }
) {
  const isAuth = await isAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  // Validate slug uniqueness against other posts
  const existing = await prisma.blogPost.findFirst({
    where: {
      slug: data.slug,
      NOT: { id },
    },
  });
  if (existing) {
    throw new Error("A blog post with this slug already exists.");
  }

  const updated = await prisma.blogPost.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      summary: data.summary,
      content: data.content,
      published: data.published,
      seoTitle: data.seoTitle || null,
      seoDescription: data.seoDescription || null,
      keywords: data.keywords || null,
      targetLocation: data.targetLocation || null,
      targetRegion: data.targetRegion || null,
      latitude: data.latitude,
      longitude: data.longitude,
      radiusKm: data.radiusKm ?? 50,
    },
  });

  // Revalidate public routes
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  revalidatePath("/sitemap.xml");

  return updated;
}

// Delete a blog post
export async function deleteBlogPost(id: string) {
  const isAuth = await isAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  const post = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!post) throw new Error("Post not found");

  await prisma.blogPost.delete({
    where: { id },
  });

  // Revalidate public routes
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/sitemap.xml");
}

// Toggle published state of a post
export async function togglePublishPost(id: string) {
  const isAuth = await isAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  const post = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!post) throw new Error("Post not found");

  const updated = await prisma.blogPost.update({
    where: { id },
    data: {
      published: !post.published,
    },
  });

  // Revalidate public routes
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/sitemap.xml");

  return updated;
}
