import prisma from "@/lib/prisma";
import { isAuthenticated } from "./actions";
import LoginForm from "./login-form";
import DashboardClient from "./dashboard-client";
import { BlogPost, DemoRequest, BlogAnalytics } from "@prisma/client";

export const revalidate = 0; // Fresh content on load

export default async function AdminPage() {
  const authorized = await isAuthenticated();

  if (!authorized) {
    return <LoginForm />;
  }

  // Load all blog posts (drafts and published) for the admin dashboard list
  let posts: BlogPost[] = [];
  try {
    posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to load admin blog posts:", error);
  }

  // Load demo requests
  let demoRequests: DemoRequest[] = [];
  try {
    demoRequests = await prisma.demoRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to load demo requests:", error);
  }

  let analytics: BlogAnalytics[] = [];
  try {
    analytics = await prisma.blogAnalytics.findMany({
      orderBy: { viewedAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to load analytics:", error);
  }

  return (
    <div className="relative min-h-screen bg-background py-12">
      {/* Decorative glows */}
      <div className="absolute top-0 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl opacity-35" />
      
      <DashboardClient posts={posts} demoRequests={demoRequests} analytics={analytics} />
    </div>
  );
}
