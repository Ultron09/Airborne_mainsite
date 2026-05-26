import { redirect } from "next/navigation";
import { isAuthenticated } from "../actions";
import PostForm from "../post-form";

export const revalidate = 0; // Fresh content on load

export default async function NewPostPage() {
  const authorized = await isAuthenticated();

  if (!authorized) {
    redirect("/admin");
  }

  return (
    <div className="relative min-h-screen bg-background py-12">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl opacity-50" />
      
      <PostForm />
    </div>
  );
}
