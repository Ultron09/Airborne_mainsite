import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { BlogPost } from "@prisma/client";
import {
  ArrowRight,
  MapPin,
  Sparkles,
  Building2,
  GraduationCap,
  Briefcase,
  Layers,
  Cpu
} from "lucide-react";
import DemoForm from "@/components/DemoForm";
import { FadeIn, Hover3DCard, FloatingElement } from "@/components/MotionWrappers";
import Dashboard3D from "@/components/Dashboard3D";
import { getTranslations } from 'next-intl/server';

export const revalidate = 0; // Ensure data is loaded fresh on every request

// generateStaticParams removed

export default async function Home() {
  const t = await getTranslations('Hero');
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

  const jsonLdLocalBiz = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Airborne HRS",
    "image": "https://airbornehrs.in/favicon.ico",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Universal AI University Campus, Kushiwali, PO Gaurkamath, Vadap",
      "addressLocality": "Karjat, Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "410201",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.916,
      "longitude": 73.328
    },
    "url": "https://airbornehrs.in",
    "priceRange": "$$"
  };

  return (
    <div className="relative isolate overflow-hidden bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBiz) }}
      />
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -z-10 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-primary/10 to-accent/5 blur-3xl opacity-50 animate-glow-pulse" />
      <div className="absolute top-[800px] left-[-200px] -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-accent/10 to-primary/5 blur-3xl opacity-30" />

      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 py-20 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text */}
            <FadeIn className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-primary backdrop-blur-md">
                <Sparkles className="h-4 w-4" /> {t('badge')}
              </div>
              <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xl">
                {t('titlePart1')}{" "}
                <span className="gradient-text">{t('titlePart2')}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                {t('description')}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="https://jobs.airbornehrs.in"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:scale-[1.03] group"
                >
                  {t('cta1')}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 px-8 py-4 text-base font-bold text-white transition-all backdrop-blur-sm"
                >
                  {t('cta2')}
                </Link>
              </div>
            </FadeIn>

            {/* Hero Image Mockup */}
            <FadeIn delay={0.2} className="lg:col-span-5 relative flex justify-center">
              <FloatingElement className="w-full max-w-lg relative aspect-square rounded-3xl overflow-hidden glass-panel border border-primary/20 neon-glow-primary p-2">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/JobPortal_3D.png"
                    alt="Airborne HRS Platform Preview"
                    fill
                    sizes="(max-w-768px) 100vw, 600px"
                    priority
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-xl border border-white/20 backdrop-blur-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-primary shadow-[0_0_10px_#00D6A1] animate-pulse" />
                      <p className="text-sm font-mono text-white/90">
                        Platform Status: <span className="text-primary font-bold">Active & Optimizing</span>
                      </p>
                    </div>
                  </div>
                </div>
              </FloatingElement>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Core Solutions Grid */}
      <section id="features" className="py-24 bg-muted/40 border-y border-border/20 backdrop-blur-sm relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md">
              An Integrated Ecosystem For The Global Economy
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl">
              Airborne HRS bridges critical hiring channels by delivering target-specific intelligence and automated coordination.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {/* For Candidates */}
            <FadeIn delay={0.1}>
              <Hover3DCard className="glass-panel p-8 rounded-3xl space-y-6 h-full flex flex-col justify-between border border-white/10 group">
                <div>
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 shadow-inner">
                    <Briefcase className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">For Candidates</h3>
                  <p className="text-muted-foreground text-base leading-relaxed mt-4">
                    Build verifiable talent profiles, navigate tailored job openings, and leverage automated resume auditing to match top-tier employers.
                  </p>
                </div>
                <a 
                  href="https://jobs.airbornehrs.in/candidate" 
                  className="inline-flex items-center text-sm font-bold text-primary hover:text-accent transition-colors pt-4"
                >
                  Access Candidate Hub <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Hover3DCard>
            </FadeIn>

            {/* For Employers */}
            <FadeIn delay={0.2}>
              <Hover3DCard className="glass-panel p-8 rounded-3xl space-y-6 h-full flex flex-col justify-between border border-white/10 group relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-500" />
                <div className="relative z-10">
                  <div className="h-14 w-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 shadow-inner">
                    <Building2 className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">For Employers</h3>
                  <p className="text-muted-foreground text-base leading-relaxed mt-4">
                    Publish roles, screen resumes with intelligent criteria, deploy candidate assessments, and tap directly into pre-screened university channels.
                  </p>
                </div>
                <a 
                  href="https://jobs.airbornehrs.in/employer" 
                  className="inline-flex items-center text-sm font-bold text-accent hover:text-primary transition-colors pt-4 relative z-10"
                >
                  Access Employer Portal <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Hover3DCard>
            </FadeIn>

            {/* For Universities */}
            <FadeIn delay={0.3}>
              <Hover3DCard className="glass-panel p-8 rounded-3xl space-y-6 h-full flex flex-col justify-between border border-white/10 group">
                <div>
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 shadow-inner">
                    <GraduationCap className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">For Universities</h3>
                  <p className="text-muted-foreground text-base leading-relaxed mt-4">
                    Streamline placement workflows, verify academic qualifications on-chain, and connect graduating cohorts with elite local and global firms.
                  </p>
                </div>
                <a 
                  href="https://jobs.airbornehrs.in/university" 
                  className="inline-flex items-center text-sm font-bold text-primary hover:text-accent transition-colors pt-4"
                >
                  Access University Admin <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Hover3DCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Dynamic 3D Analytics Dashboard */}
      <section id="technology" className="py-24 md:py-32 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -z-10 h-96 w-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="glass-panel rounded-[2.5rem] border border-white/10 p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center shadow-2xl shadow-primary/5">
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary backdrop-blur-md">
                <Cpu className="h-4 w-4" /> Real-time Telemetry
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">
                Dynamic 3D Analytics Dashboard
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                Visualize your hiring velocity, candidate match rates, and geographic talent distribution in real-time. Our interactive dashboard floating in 3D space provides unparalleled insights into your workforce.
              </p>
            </div>
            <div className="lg:col-span-5 flex justify-center">
               <Dashboard3D />
            </div>
          </FadeIn>
        </div>
      </section>



      {/* Vision & Leadership (Founder Suryaansh Prithvijit Singh) */}
      <section className="py-24 md:py-32 relative border-t border-border/10 bg-[radial-gradient(ellipse_at_top,rgba(0,214,161,0.05),transparent_70%)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Visual Column (Founder Photo) */}
            <FadeIn className="lg:col-span-5 flex justify-center order-last lg:order-first">
              <Hover3DCard className="relative w-full max-w-md aspect-[4/5] rounded-[2.5rem] overflow-hidden glass-panel border border-white/20 p-2 shadow-2xl">
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                  <Image
                    src="/founder_3D.png"
                    alt="Suryaansh Prithvijit Singh - Founder & CEO"
                    fill
                    sizes="(max-w-768px) 100vw, 500px"
                    className="object-cover object-top transition-transform duration-1000 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90" />
                  
                  {/* Floating Badge */}
                  <div className="absolute bottom-8 left-8 right-8 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl">
                    <h4 className="text-white font-extrabold text-lg tracking-tight">Suryaansh Prithvijit Singh</h4>
                    <p className="text-primary text-sm font-bold tracking-wide mt-1">Founder & CEO, Airborne HRS</p>
                  </div>
                </div>
              </Hover3DCard>
            </FadeIn>

            {/* Vision & Leadership Column */}
            <FadeIn delay={0.2} className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary backdrop-blur-md">
                <GraduationCap className="h-4 w-4" /> Vision & Leadership
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-xl">
                Research Labs: <span className="gradient-text">Continual Learning</span> & AGI
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                Founded by <strong>Suryaansh Prithvijit Singh</strong>, an AI/ML specialist at Universal AI University, 
                Airborne HRS is built on the philosophy of AGI (Artificial General Intelligence) and continual learning. 
                Under his leadership, our research labs are shifting the industry from static database matchmakers to fully adaptive, 
                cognitive systems that operate with human-like comprehension.
              </p>
              
              <div className="space-y-6 pt-4">
                <Hover3DCard className="flex gap-6 items-center p-6 rounded-3xl glass-panel border border-white/10 group">
                  <div className="p-4 rounded-2xl bg-primary/10 text-primary shadow-inner group-hover:bg-primary/20 transition-colors">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Cognitive Foundations</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Focusing research on Artificial Consciousness to enable virtual employees to adapt dynamically to company workflows.</p>
                  </div>
                </Hover3DCard>

                <Hover3DCard className="flex gap-6 items-center p-6 rounded-3xl glass-panel border border-white/10 group">
                  <div className="p-4 rounded-2xl bg-primary/10 text-primary shadow-inner group-hover:bg-primary/20 transition-colors">
                    <Building2 className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Global Track Record</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Winner of the AI COVID Warrior Global Contest. Represented India internationally, winning Ambassador for Charity.</p>
                  </div>
                </Hover3DCard>
              </div>

              {/* Quote Block */}
              <blockquote className="border-l-4 border-primary pl-6 py-4 bg-primary/5 rounded-r-2xl italic text-muted-foreground text-base leading-relaxed relative">
                <span className="absolute -left-3 -top-2 text-4xl text-primary/40 font-serif">"</span>
                We are not building automation spreadsheets. We are building the next generation of artificial consciousness to run collaborative, goal-driven business nodes.
              </blockquote>
            </FadeIn>

          </div>
        </div>
      </section>



      {/* Latest Blogs Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16 gap-6">
            <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">Latest Insights & Updates</h2>
              <p className="text-muted-foreground text-lg">Discover how AI recruitment is transforming workflows locally and globally.</p>
            </div>
            <Link 
              href="/blog" 
              className="inline-flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 px-6 py-3 text-sm font-bold text-white transition-all backdrop-blur-sm"
            >
              Browse All Articles <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </FadeIn>

          {latestPosts.length === 0 ? (
            <FadeIn delay={0.2} className="p-16 rounded-[2rem] glass-panel border border-white/10 text-center space-y-6">
              <Layers className="h-16 w-16 text-muted-foreground/50 mx-auto" />
              <h3 className="text-2xl font-bold text-white">Upcoming Insights & Deep Dives</h3>
              <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
                We are preparing a series of technical articles and case studies on AI-driven workforce modeling and advanced recruiting workflows. Check back soon.
              </p>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {latestPosts.map((post, i) => (
                <FadeIn key={post.id} delay={0.1 * (i + 1)}>
                  <Hover3DCard className="flex flex-col justify-between p-8 rounded-[2rem] glass-panel border border-white/10 h-full group">
                    <div className="space-y-6">
                      {/* Location Badge */}
                      {post.targetLocation && (
                        <div className="inline-flex items-center gap-1.5 text-xs text-primary font-bold bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                          <MapPin className="h-3.5 w-3.5" /> {post.targetLocation}
                        </div>
                      )}
                      <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors leading-snug">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-muted-foreground text-base leading-relaxed line-clamp-3">
                        {post.summary}
                      </p>
                    </div>
                    <div className="pt-8 border-t border-white/10 mt-8 flex items-center justify-between text-sm text-muted-foreground font-medium">
                      <span>{new Date(post.createdAt).toLocaleDateString("en-US", { dateStyle: "medium" })}</span>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-primary font-bold group-hover:text-accent transition-colors"
                      >
                        Read Post <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Link>
                    </div>
                  </Hover3DCard>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Demo Request / Contact Section */}
      <section id="contact" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent -z-10" />
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center space-y-10">
          <FadeIn>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight drop-shadow-xl">Elevate Your Strategy</h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed mt-6">
              Request a personalized walkthrough of the Airborne HRS ecosystem and learn how to deploy AI agents tailored to your business needs.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Hover3DCard className="max-w-md mx-auto p-8 rounded-[2rem] glass-panel border border-primary/20 shadow-2xl shadow-primary/10 text-left space-y-6">
              <h4 className="text-white font-extrabold text-lg">Send a demo request</h4>
              <DemoForm />
            </Hover3DCard>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
