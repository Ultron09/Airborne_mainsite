import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { Calendar, MapPin, Compass, ArrowLeft, ShieldCheck, Sparkles, BookOpen } from "lucide-react";
import BlogTracker from "@/components/BlogTracker";
import TableOfContents from "@/components/TableOfContents";

export const revalidate = 0; // Fresh content on load

interface Props {
  params: Promise<{ slug: string }>;
}

// Dynamic SEO & GEO Metadata generation
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
    });

    if (!post) {
      return {
        title: "Article Not Found | Airborne HRS",
        description: "The requested article could not be found.",
      };
    }

    // Dynamic OG Image URL
    const ogImageUrl = `/api/og?title=${encodeURIComponent(post.title)}&pillar=${encodeURIComponent(post.contentPillar || 'HR Automation')}`;

    const title = `${post.seoTitle || post.title} | Airborne HRS`;
    const description = post.seoDescription || post.summary;
    const keywords = post.keywords ? post.keywords.split(",").map((k) => k.trim()) : [];
    const locale = (params as any).locale || "en";

    // Construct the metadata object with GEO meta tags via the 'other' property
    const metadata: Metadata = {
      title,
      description,
      keywords,
      alternates: {
        canonical: `/${locale}/blog/${post.slug}`,
        languages: {
          en: `/en/blog/${post.slug}`,
          hi: `/hi/blog/${post.slug}`,
          ar: `/ar/blog/${post.slug}`,
          es: `/es/blog/${post.slug}`,
          fr: `/fr/blog/${post.slug}`,
          nl: `/nl/blog/${post.slug}`,
          ja: `/ja/blog/${post.slug}`,
          zh: `/zh/blog/${post.slug}`,
          "x-default": `/en/blog/${post.slug}`,
        },
      },
      openGraph: {
        title,
        description,
        type: "article",
        url: `https://airbornehrs.in/blog/${post.slug}`,
        publishedTime: (post.publishAt || post.createdAt).toISOString(),
        modifiedTime: post.updatedAt.toISOString(),
        authors: ["Airborne HRS Team"],
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          }
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        images: [ogImageUrl],
      },
      other: {},
    };

    // Inject GEO Tags if specified
    if (post.targetRegion && metadata.other) {
      metadata.other["geo.region"] = post.targetRegion; // e.g. US-IL
    }
    if (post.targetLocation && metadata.other) {
      metadata.other["geo.placename"] = post.targetLocation; // e.g. Chicago
    }
    if (post.latitude && post.longitude && metadata.other) {
      metadata.other["geo.position"] = `${post.latitude};${post.longitude}`;
      metadata.other["ICBM"] = `${post.latitude}, ${post.longitude}`;
    }

    return metadata;
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Insight | Airborne HRS",
    };
  }
}

// Simple regex-based Markdown renderer for server component
function renderMarkdown(md: string): string {
  let html = md;

  // Escape HTML tags to prevent XSS (allowing only our generated elements)
  html = html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Code blocks
  html = html.replace(/```([\s\S]*?)```/g, (_, code) => {
    return `<pre><code>${code.trim()}</code></pre>`;
  });

  // Inline Code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Headings with ID generation for Table of Contents
  const idCount: Record<string, number> = {};
  
  const generateId = (text: string) => {
    // Remove inline html tags from text before creating ID
    const plainText = text.replace(/<[^>]*>/g, '');
    let baseId = plainText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (!baseId) return 'heading';
    if (idCount[baseId]) {
      idCount[baseId]++;
      return `${baseId}-${idCount[baseId]}`;
    }
    idCount[baseId] = 1;
    return baseId;
  };

  html = html.replace(/^### (.*$)/gim, (_, content) => {
    return `<h3 id="${generateId(content)}">${content}</h3>`;
  });
  html = html.replace(/^## (.*$)/gim, (_, content) => {
    return `<h2 id="${generateId(content)}">${content}</h2>`;
  });
  html = html.replace(/^# (.*$)/gim, (_, content) => {
    return `<h1 id="${generateId(content)}">${content}</h1>`;
  });

  // Blockquotes
  html = html.replace(/^&gt; (.*$)/gim, "<blockquote>$1</blockquote>");

  // Bullet Lists
  let inList = false;
  const lines = html.split("\n");
  const parsedLines = lines.map((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const content = trimmed.substring(2);
      let prefix = "";
      if (!inList) {
        inList = true;
        prefix = "<ul>";
      }
      return `${prefix}<li>${content}</li>`;
    } else {
      let suffix = "";
      if (inList) {
        inList = false;
        suffix = "</ul>";
      }
      return `${suffix}${line}`;
    }
  });
  html = parsedLines.join("\n");
  if (inList) {
    html += "</ul>";
  }

  // Bold
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  // Italic
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Paragraphs
  const blockElements = [
    "<h1", "<h2", "<h3", "<blockquote>", "<pre>", "<code>", "<ul>", "<li>", "</ul>", "<blockquote>"
  ];
  
  const finalLines = html.split("\n");
  const processed = finalLines.map((line) => {
    const trimmed = line.trim();
    if (!trimmed) return "";
    
    const isBlock = blockElements.some((el) => trimmed.startsWith(el));
    if (isBlock || trimmed.startsWith("</") || trimmed.endsWith("</li>")) {
      return line;
    }
    return `<p>${line}</p>`;
  });

  return processed.filter(Boolean).join("\n");
}

export default async function BlogPostPage(props: Props) {
  const params = await props.params;
  let post = null;

  try {
    post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
    });
  } catch (error) {
    console.error("Failed to load blog post detail:", error);
  }

  if (!post) {
    notFound();
  }

  // Construct JSON-LD Schema
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.summary,
    "datePublished": (post.publishAt || post.createdAt).toISOString(),
    "dateModified": post.updatedAt.toISOString(),
    "author": {
      "@type": "Organization",
      "name": "Airborne HRS",
      "url": "https://airbornehrs.in",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Airborne HRS",
      "logo": {
        "@type": "ImageObject",
        "url": "https://airbornehrs.in/logo.webp",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://airbornehrs.in/blog/${post.slug}`,
    },
    "contentLocation": post.targetLocation
      ? {
          "@type": "Place",
          "name": post.targetLocation,
          "geo":
            post.latitude && post.longitude
              ? {
                  "@type": "GeoCoordinates",
                  "latitude": post.latitude,
                  "longitude": post.longitude,
                }
              : undefined,
        }
      : undefined,
  };

  const htmlContent = renderMarkdown(post.content);

  // Fetch related articles
  let relatedPosts = await prisma.blogPost.findMany({
    where: { 
      published: true,
      id: { not: post.id },
      contentPillar: post.contentPillar || undefined
    },
    take: 3,
    orderBy: { publishAt: 'desc' }
  });

  if (relatedPosts.length < 3) {
    const morePosts = await prisma.blogPost.findMany({
      where: {
        published: true,
        id: { notIn: [post.id, ...relatedPosts.map(p => p.id)] }
      },
      take: 3 - relatedPosts.length,
      orderBy: { publishAt: 'desc' }
    });
    relatedPosts = [...relatedPosts, ...morePosts];
  }

  return (
    <div className="relative min-h-screen bg-background py-16 px-6 lg:px-8">
      {/* JSON-LD Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      <BlogTracker blogPostId={post.id} />

      <div className="mx-auto max-w-7xl">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to insights
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Article Body */}
          <article className="lg:col-span-8 space-y-8">
            <header className="space-y-6">
              {/* Badging & Location */}
              <div className="flex flex-wrap items-center gap-3">
                {post.targetLocation && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                    <MapPin className="h-3.5 w-3.5" /> {post.targetLocation}
                  </span>
                )}
                {post.targetRegion && (
                  <span className="text-xs font-mono text-muted-foreground bg-white/5 border border-white/10 px-2.5 py-1 rounded">
                    GEO: {post.targetRegion}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {post.title}
              </h1>

              {/* Date Metadata */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground pt-2 border-y border-white/5 py-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Published on{" "}
                    {new Date(post.publishAt || post.createdAt).toLocaleDateString("en-US", {
                      dateStyle: "long",
                    })}
                  </span>
                </div>
                <span>•</span>
                <span>5 min read</span>
              </div>
            </header>

            {/* Markdown rendered HTML inside a weightless glass panel */}
            <div className="glass-panel p-8 sm:p-12 rounded-[2rem] border border-white/10 relative overflow-hidden shadow-2xl">
              {/* Subtle ambient light behind text */}
              <div className="absolute top-0 right-0 h-96 w-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 h-96 w-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
              
              <div
                className="prose-custom relative z-10"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
          </article>

          {/* Sidebar for SEO & GEO Diagnostics / Visuals */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Table of Contents */}
            <TableOfContents content={post.content} />
            

            {/* Platform Call to Action */}
            <div className="glass-panel glass-panel-interactive p-6 rounded-2xl space-y-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Join the Airborne HRS Network</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Connect talent pools, manage recruitment parameters, and search for active roles directly inside our central workforce job portal.
              </p>
              <div className="pt-2">
                <a
                  href="https://jobs.airbornehrs.in/jobs"
                  className="w-full inline-flex items-center justify-center rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/95 transition-all shadow-md shadow-primary/20"
                >
                  Enter Job Portal
                </a>
              </div>
            </div>


          </aside>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-24 border-t border-white/10 pt-16">
            <h2 className="text-2xl font-bold text-white mb-8">Related Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group relative block glass-panel p-6 rounded-[2rem] border border-white/10 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      {relatedPost.contentPillar && (
                        <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-muted-foreground">
                          {relatedPost.contentPillar}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground font-mono">
                        {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(relatedPost.publishAt || relatedPost.createdAt)}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-3 leading-tight group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-grow">
                      {relatedPost.summary}
                    </p>

                    <div className="flex items-center text-xs font-semibold text-primary mt-auto">
                      Read Article <ArrowLeft className="ml-2 h-3 w-3 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
