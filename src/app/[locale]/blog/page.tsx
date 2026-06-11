import Link from "next/link";
import prisma from "@/lib/prisma";
import { Search, MapPin, Calendar, ArrowRight, Layers } from "lucide-react";
import { BlogPost } from "@prisma/client";

export const revalidate = 0; // Fresh content on load

interface SearchParams {
  q?: string;
  location?: string;
}

export default async function BlogPage(props: { searchParams: Promise<SearchParams> }) {
  const searchParams = await props.searchParams;
  const q = searchParams.q || "";
  const location = searchParams.location || "";

  // Fetch unique locations of published blogs to display as quick-filter pills
  let locations: string[] = [];
  let posts: BlogPost[] = [];

  try {
    const publishedForGeo = await prisma.blogPost.findMany({
      where: { published: true },
      select: { targetLocation: true },
    });
    
    locations = Array.from(
      new Set(publishedForGeo.map((p) => p.targetLocation).filter((l): l is string => !!l))
    );

    // Dynamic filtering query
    posts = await prisma.blogPost.findMany({
      where: {
        published: true,
        AND: [
          q
            ? {
                OR: [
                  { title: { contains: q } },
                  { summary: { contains: q } },
                  { content: { contains: q } },
                ],
              }
            : {},
          location
            ? {
                targetLocation: { equals: location },
              }
            : {},
        ],
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Prisma error fetching blogs:", error);
  }

  return (
    <div className="relative min-h-screen bg-background py-16 px-6 lg:px-8">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-1/4 -z-10 h-96 w-96 bg-primary/5 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-10 right-10 -z-10 h-80 w-80 bg-accent/5 rounded-full blur-3xl opacity-35" />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Airborne HRS <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Stay up to date with deep dives into HR AI technology, virtual staffing agent updates, and localized workforce placement analysis.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          <form method="GET" className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search articles by title, content, keywords..."
              className="w-full bg-card border border-white/10 rounded-full py-3.5 pl-12 pr-28 text-sm text-white placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
            {location && <input type="hidden" name="location" value={location} />}
            <button
              type="submit"
              className="absolute right-2 rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/95 transition-all shadow-md shadow-primary/20"
            >
              Search
            </button>
          </form>

          {/* Location Filters */}
          {locations.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mr-2">
                Target Locations:
              </span>
              <Link
                href={`/blog${q ? `?q=${encodeURIComponent(q)}` : ""}`}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                  !location
                    ? "bg-primary/20 border-primary text-primary font-bold"
                    : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10"
                }`}
              >
                All Regions
              </Link>
              {locations.map((loc) => (
                <Link
                  key={loc}
                  href={`/blog?location=${encodeURIComponent(loc)}${
                    q ? `&q=${encodeURIComponent(q)}` : ""
                  }`}
                  className={`text-xs px-3 py-1.5 rounded-full border flex items-center gap-1 transition-all ${
                    location === loc
                      ? "bg-primary/20 border-primary text-primary font-bold"
                      : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10"
                  }`}
                >
                  <MapPin className="h-3 w-3" /> {loc}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Blog Post List */}
        {posts.length === 0 ? (
          <div className="max-w-md mx-auto py-16 text-center space-y-4 glass-panel rounded-2xl border border-white/10">
            <Layers className="h-12 w-12 text-muted-foreground mx-auto" />
            <h3 className="text-xl font-bold text-white">No articles found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search criteria or clearing filters to browse all publications.
            </p>
            <div className="pt-2">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/95 transition-all"
              >
                Reset Filters
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex flex-col justify-between p-6 rounded-2xl glass-panel glass-panel-interactive group"
              >
                <div className="space-y-4">
                  {/* Meta badging */}
                  <div className="flex flex-wrap items-center gap-2">
                    {post.targetLocation && (
                      <div className="inline-flex items-center gap-1 text-xs text-primary font-semibold bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                        <MapPin className="h-3 w-3" /> {post.targetLocation}
                      </div>
                    )}
                    {post.targetRegion && (
                      <span className="text-[10px] text-muted-foreground font-mono bg-white/5 px-2 py-1 rounded">
                        {post.targetRegion}
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-white group-hover:text-primary transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      {new Date(post.publishAt || post.createdAt).toLocaleDateString("en-US", {
                        dateStyle: "medium",
                      })}
                    </span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary font-semibold group-hover:text-accent transition-colors"
                  >
                    Read Article <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
