import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { setRequestLocale } from 'next-intl/server';
import { ArrowLeft, Calendar, FileText } from "lucide-react";

const prisma = new PrismaClient();

export async function generateMetadata({ params }: { params: Promise<{ pillar: string }> }) {
  const resolvedParams = await params;
  const pillarName = decodeURIComponent(resolvedParams.pillar);
  
  return {
    title: `${pillarName} Articles | Airborne HRS Blog`,
    description: `Read the latest articles, insights, and news about ${pillarName} from Airborne HRS.`,
    openGraph: {
      title: `${pillarName} Insights | Airborne HRS`,
      description: `Deep dives into ${pillarName} and workforce intelligence.`,
    }
  };
}

export default async function CategoryPage({
  params
}: {
  params: Promise<{ locale: string, pillar: string }>
}) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  const pillarName = decodeURIComponent(resolvedParams.pillar);

  const posts = await prisma.blogPost.findMany({
    where: {
      published: true,
      contentPillar: pillarName
    },
    orderBy: {
      publishAt: 'desc'
    }
  });

  return (
    <div className="min-h-screen bg-[#010f0c] pt-32 pb-24 relative selection:bg-primary selection:text-primary-foreground">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-12">
          <Link href="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to All Articles
          </Link>
          <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            Topic Cluster
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight mb-4">
            {pillarName}
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore our curated insights and technical deep dives into {pillarName}.
          </p>
        </div>

        {/* Post List */}
        {posts.length === 0 ? (
          <div className="glass-panel p-12 text-center rounded-2xl border border-white/5">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium text-white mb-2">No articles found</h3>
            <p className="text-muted-foreground">We haven't published any articles in this category yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
                <article className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-primary/50 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-3">
                    <h2 className="text-2xl font-bold text-white group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                  </div>
                  
                  <p className="text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                    {post.summary}
                  </p>
                  
                  <div className="flex items-center text-sm font-medium text-muted-foreground gap-4">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {post.publishAt ? new Date(post.publishAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="text-primary flex items-center group-hover:translate-x-1 transition-transform">
                      Read article →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
