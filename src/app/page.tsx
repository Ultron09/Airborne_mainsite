import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { BlogPost } from "@prisma/client";
import {
  ArrowRight,
  Bot,
  Search,
  MapPin,
  Sparkles,
  Building2,
  GraduationCap,
  Briefcase,
  Layers,
  Database
} from "lucide-react";

export const revalidate = 0; // Ensure data is loaded fresh on every request

export default async function Home() {
  // Fetch the latest 3 published blog posts for the homepage grid
  let latestPosts: BlogPost[] = [];
  try {
    latestPosts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    });
  } catch (error) {
    console.error("Failed to load blog posts:", error);
  }

  return (
    <div className="relative isolate overflow-hidden bg-background">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,rgba(16,185,129,0.08),rgba(3,7,18,0))]" />
      <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/10 to-accent/5 blur-3xl opacity-50 animate-glow-pulse" />
      <div className="absolute top-[800px] left-[-200px] -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-accent/10 to-primary/5 blur-3xl opacity-30" />

      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 py-20 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" /> Next-Gen AI Workforce Solutions
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none text-white">
                Architecting the Future of{" "}
                <span className="gradient-text">Workforce Intelligence</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Connect talent, employers, and universities with an advanced, 
                GEO-optimized cognitive platform. Harness AI agents to automate screening, 
                streamline placement pipelines, and maximize discoverability.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="https://jobs.airbornehrs.in"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:scale-[1.03] group"
                >
                  Enter Job Portal
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 px-6 py-3 text-base font-semibold text-white transition-all"
                >
                  Explore Insights
                </Link>
              </div>
            </div>

            {/* Hero Image Mockup */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="w-full max-w-md relative aspect-square rounded-2xl overflow-hidden gradient-border glow-glow">
                <Image
                  src="/JobPortal.png"
                  alt="Airborne HRS Platform Preview"
                  fill
                  sizes="(max-w-768px) 100vw, 500px"
                  priority
                  className="object-cover object-top opacity-90 transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 glass-panel p-4 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <p className="text-xs font-mono text-muted-foreground">
                      Platform Status: <span className="text-white font-semibold">Active & Optimizing</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Solutions Grid */}
      <section id="features" className="py-20 bg-muted/30 border-y border-border/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              An Integrated Ecosystem For The Global Economy
            </h2>
            <p className="text-muted-foreground text-lg">
              Airborne HRS bridges critical hiring channels by delivering target-specific intelligence and automated coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {/* For Candidates */}
            <div className="gradient-border p-8 rounded-2xl bg-card space-y-4 group hover:shadow-lg hover:shadow-primary/5 transition-all">
              <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">For Candidates</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Build verifiable talent profiles, navigate tailored job openings, and leverage automated resume auditing to matches top-tier employers.
              </p>
              <a 
                href="https://jobs.airbornehrs.in/candidate" 
                className="inline-flex items-center text-sm font-semibold text-primary hover:text-accent transition-colors pt-2"
              >
                Access Candidate Hub <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>

            {/* For Employers */}
            <div className="gradient-border p-8 rounded-2xl bg-card space-y-4 group hover:shadow-lg hover:shadow-accent/5 transition-all">
              <div className="h-12 w-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">For Employers</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Publish roles, screen resumes with intelligent criteria, deploy candidate assessments, and tap directly into pre-screened university channels.
              </p>
              <a 
                href="https://jobs.airbornehrs.in/employer" 
                className="inline-flex items-center text-sm font-semibold text-accent hover:text-primary transition-colors pt-2"
              >
                Access Employer Portal <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>

            {/* For Universities */}
            <div className="gradient-border p-8 rounded-2xl bg-card space-y-4 group hover:shadow-lg hover:shadow-primary/5 transition-all">
              <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">For Universities</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Streamline placement workflows, verify academic qualifications on-chain, and connect graduating cohorts with elite local and global firms.
              </p>
              <a 
                href="https://jobs.airbornehrs.in/university" 
                className="inline-flex items-center text-sm font-semibold text-primary hover:text-accent transition-colors pt-2"
              >
                Access University Admin <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Meet F.R.I.D.A.Y. */}
      <section id="technology" className="py-20 md:py-32 relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 -z-10 h-72 w-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="glass-panel rounded-3xl border border-white/10 p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden gradient-border">
                <Image
                  src="/Friday.jpeg"
                  alt="F.R.I.D.A.Y. AI Agent"
                  fill
                  sizes="(max-w-768px) 100vw, 320px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
                <Bot className="h-3.5 w-3.5" /> Flagship Cognitive Agent
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                Meet F.R.I.D.A.Y.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                F.R.I.D.A.Y. is our state-of-the-art virtual workforce agent. Designed to operate 
                as an automated recruiter, scheduler, and candidate matcher, F.R.I.D.A.Y. performs 
                cognitive task analysis, reviews resumes against multidimensional skill maps, and schedules 
                placement pipelines without human overhead.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 text-primary flex items-center justify-center">✓</div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Semantic Resumè Screening</h4>
                    <p className="text-xs text-muted-foreground">Parses complex layouts to extract implicit achievements.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 text-primary flex items-center justify-center">✓</div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Cognitive Interviewing</h4>
                    <p className="text-xs text-muted-foreground">Conducts basic screenings via text or conversational API.</p>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <a
                  href="https://jobs.airbornehrs.in/ai-employees"
                  className="inline-flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all"
                >
                  Explore AI Employee Suite
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* GEO and SEO Search Engine Optimization */}
      <section className="py-20 bg-muted/10 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent">
                <MapPin className="h-3.5 w-3.5" /> GEO & SEO Native Discovery
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Engineered for Localized & Global Discoverability
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Traditional hiring sites get lost in generic queries. Airborne HRS integrates localized GEO indexes 
                directly into its core pages. This means search engines like Google and generative search agents 
                (like ChatGPT, Perplexity, and Gemini) locate your listings and blog content for specific regions instantly.
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <Search className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Generative Engine Optimization (GEO)</h4>
                    <p className="text-xs text-muted-foreground">JSON-LD schema mapping embeds structured, citation-friendly answers ready for AI-generated search results.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <Layers className="h-6 w-6 text-accent flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Structured Local Schemas</h4>
                    <p className="text-xs text-muted-foreground">Each location page contains coordinate-based geographic meta headers telling indexers exactly where the talent search is active.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* GEO Visualizer */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="w-full max-w-md p-8 rounded-2xl glass-panel border border-white/10 relative">
                <div className="absolute inset-0 bg-[radial-gradient(20rem_20rem_at_center,rgba(59,130,246,0.15),transparent)]" />
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                  <Database className="h-5 w-5 text-accent animate-pulse" /> Live Regional Nodes
                </h3>
                <div className="space-y-4 relative z-10 font-mono text-xs">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-muted-foreground">US-IL (Chicago Node)</span>
                    <span className="text-primary font-semibold">Active [41.8781, -87.6298]</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-muted-foreground">US-NY (New York Node)</span>
                    <span className="text-primary font-semibold">Active [40.7128, -74.0060]</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-muted-foreground">UK-LND (London Node)</span>
                    <span className="text-primary font-semibold">Active [51.5074, -0.1278]</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">IN-KA (Bangalore Node)</span>
                    <span className="text-primary font-semibold">Active [12.9716, 77.5946]</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white">Latest Insights & Regional Updates</h2>
              <p className="text-muted-foreground text-sm mt-2">Discover how AI recruitment is transforming workflows locally and globally.</p>
            </div>
            <Link 
              href="/blog" 
              className="inline-flex items-center text-sm font-semibold text-primary hover:text-accent transition-colors"
            >
              Browse All Articles <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {latestPosts.length === 0 ? (
            <div className="p-12 rounded-2xl bg-white/5 border border-white/10 text-center space-y-4">
              <Layers className="h-10 w-10 text-muted-foreground mx-auto" />
              <h3 className="text-lg font-semibold text-white">No blog posts published yet</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Admin can log in to the admin panel to publish articles targeting specific search keywords and locations.
              </p>
              <div className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/95 transition-all"
                >
                  Go to Admin Panel
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <article 
                  key={post.id}
                  className="flex flex-col justify-between p-6 rounded-2xl gradient-border bg-card group hover:shadow-lg hover:shadow-primary/5 transition-all"
                >
                  <div className="space-y-4">
                    {/* Location Badge */}
                    {post.targetLocation && (
                      <div className="inline-flex items-center gap-1 text-xs text-primary font-semibold bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                        <MapPin className="h-3 w-3" /> {post.targetLocation}
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{new Date(post.createdAt).toLocaleDateString("en-US", { dateStyle: "medium" })}</span>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-primary font-semibold group-hover:text-accent transition-colors"
                    >
                      Read Post <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Demo Request / Contact Section */}
      <section id="contact" className="py-20 bg-muted/20 border-t border-border/20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Ready to Elevate Your Recruiting Strategy?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Request a personalized walkthrough of the Airborne HRS ecosystem and learn how to deploy AI agents tailored to your business needs.
          </p>
          <div className="max-w-md mx-auto p-6 rounded-2xl glass-panel border border-white/10 text-left space-y-4">
            <h4 className="text-white font-bold text-sm">Send a demo request</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Company Email</label>
                <input 
                  type="email" 
                  placeholder="you@company.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>
              <button 
                onClick={() => alert("Thank you for your interest! We will contact you shortly.")}
                className="w-full rounded-lg bg-primary py-2 text-center text-sm font-semibold text-primary-foreground hover:bg-primary/95 transition-all shadow-md shadow-primary/10"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
