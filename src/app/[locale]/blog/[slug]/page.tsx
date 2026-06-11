import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { Calendar, MapPin, Compass, ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";

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

    // Construct the metadata object with GEO meta tags via the 'other' property
    const metadata: Metadata = {
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        type: "article",
        url: `https://airbornehrs.in/blog/${post.slug}`,
        publishedTime: post.createdAt.toISOString(),
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

  // Headings
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

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

export default async function BlogPostDetail(props: Props) {
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
    "datePublished": post.createdAt.toISOString(),
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

  return (
    <div className="relative min-h-screen bg-background py-16 px-6 lg:px-8">
      {/* JSON-LD Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

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

            {/* Markdown rendered HTML */}
            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </article>

          {/* Sidebar for SEO & GEO Diagnostics / Visuals */}
          <aside className="lg:col-span-4 space-y-8">
            {/* GEO Node Coordinates Box */}
            {post.targetLocation && (
              <div className="glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden space-y-4">
                <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 rounded-full blur-2xl" />
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Compass className="h-5 w-5 text-primary animate-spin" style={{ animationDuration: '6s' }} /> 
                  GEO Target Node
                </h3>
                
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This page has been GEO-optimized to boost search indexes for local talent acquisition queries in the specified target area.
                </p>

                <div className="space-y-2 font-mono text-xs pt-2">
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="text-white font-semibold">{post.targetLocation}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-muted-foreground">Region Code:</span>
                    <span className="text-white font-semibold">{post.targetRegion || "N/A"}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-muted-foreground">Latitude:</span>
                    <span className="text-primary font-semibold">{post.latitude?.toFixed(4) || "N/A"}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-muted-foreground">Longitude:</span>
                    <span className="text-primary font-semibold">{post.longitude?.toFixed(4) || "N/A"}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-muted-foreground">Target Radius:</span>
                    <span className="text-white font-semibold">{post.radiusKm || 50} km</span>
                  </div>
                </div>

                {/* Simulated Radar Visualizer */}
                <div className="h-32 bg-black/40 border border-white/5 rounded-xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute h-24 w-24 rounded-full border border-primary/20 animate-ping opacity-60" />
                  <div className="absolute h-16 w-16 rounded-full border border-primary/40 animate-pulse" />
                  <div className="absolute h-8 w-8 rounded-full border border-primary/60" />
                  <div className="absolute h-1.5 w-1.5 rounded-full bg-primary" />
                  <div className="absolute top-2 left-2 text-[10px] text-primary/70 font-mono">SCANNING FOR LOCAL TALENT...</div>
                  <div className="absolute bottom-2 right-2 text-[10px] text-muted-foreground font-mono">NODE_OK</div>
                </div>
              </div>
            )}

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

            {/* Meta Verification */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex gap-3 text-xs text-muted-foreground">
              <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0" />
              <p>
                GEO tags and BlogPosting schema markup validation tags are generated and attached to this article for next-gen indexing algorithms.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
