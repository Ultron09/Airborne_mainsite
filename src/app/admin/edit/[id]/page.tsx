import { redirect, notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { isAuthenticated } from "../../actions";
import PostForm from "../../post-form";

export const revalidate = 0; // Fresh content on load

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage(props: Props) {
  const params = await props.params;
  const authorized = await isAuthenticated();

  if (!authorized) {
    redirect("/admin");
  }

  // Fetch the target blog post by ID
  let post = null;
  try {
    post = await prisma.blogPost.findUnique({
      where: { id: params.id },
    });
  } catch (error) {
    console.error("Failed to load blog post for editing:", error);
  }

  if (!post) {
    notFound();
  }

  // Map database entity to form schema (converting nulls to undefined or empty values safely)
  const formData = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    summary: post.summary,
    content: post.content,
    published: post.published,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    keywords: post.keywords,
    targetLocation: post.targetLocation,
    targetRegion: post.targetRegion,
    latitude: post.latitude,
    longitude: post.longitude,
    radiusKm: post.radiusKm,
  };

  return (
    <div className="relative min-h-screen bg-background py-12">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl opacity-35" />
      
      <PostForm initialData={formData} />
    </div>
  );
}
