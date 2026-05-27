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
  Cpu,
  Network
} from "lucide-react";
import DemoForm from "@/components/DemoForm";
import { FadeIn, Hover3DCard, FloatingElement, MagneticButton, ScrollReveal, IsometricTilt } from "@/components/MotionWrappers";

import { getTranslations } from 'next-intl/server';
import NeuromorphicCoreWrapper from "@/components/NeuromorphicCoreWrapper";

export const revalidate = 0;

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

  return (
    <div className="relative isolate overflow-hidden bg-transparent">
      
      {/* Dynamic 3D Neuromorphic Core Background */}
      <NeuromorphicCoreWrapper />

      {/* Hero Section - Cinematic Entrance */}
      <section className="relative px-6 lg:px-8 pt-32 pb-24 md:pt-40 md:pb-32 min-h-[90vh] flex items-center">
        <div className="mx-auto max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-8 text-left z-10">
              <FadeIn delay={0.1}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs font-bold text-primary shadow-[0_0_20px_rgba(0,214,161,0.2)]">
                  <Sparkles className="h-4 w-4" /> {t('badge')}
                </div>
              </FadeIn>
              
              <FadeIn delay={0.3}>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-extrabold tracking-tighter leading-[1.1] text-white drop-shadow-2xl">
                  {t('titlePart1')}<br/>
                  <span className="gradient-text">{t('titlePart2')}</span>
                </h1>
              </FadeIn>
              
              <FadeIn delay={0.5}>
                <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-light">
                  {t('description')}
                </p>
              </FadeIn>
              
              <FadeIn delay={0.7} className="flex flex-wrap gap-6 pt-6">
                <MagneticButton href="https://jobs.airbornehrs.in">
                  <div className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-[0_0_30px_rgba(0,214,161,0.4)] hover:bg-white hover:text-primary transition-all">
                    {t('cta1')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </div>
                </MagneticButton>
                
                <MagneticButton href="/blog">
                  <div className="inline-flex items-center justify-center rounded-full glass-panel px-8 py-4 text-base font-bold text-white hover:bg-white/10 transition-all">
                    {t('cta2')}
                  </div>
                </MagneticButton>
              </FadeIn>
            </div>

            {/* Hero Visual Mockup */}
            <FadeIn delay={0.8} className="lg:col-span-5 relative flex justify-center perspective-[1200px]">
              <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
              <IsometricTilt className="w-full max-w-lg relative aspect-square z-10 group">
                {/* Backplate / Shadow */}
                <div className="absolute inset-0 bg-black/80 rounded-[3rem] blur-2xl transform translate-y-10 scale-95 opacity-80 group-hover:translate-y-12 group-hover:scale-100 transition-all duration-700" />
                
                {/* Main Floating Mockup */}
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden glass-panel border border-white/10 p-2 shadow-2xl bg-black/40 backdrop-blur-2xl" style={{ transformStyle: 'preserve-3d' }}>
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-black" style={{ transform: 'translateZ(10px)' }}>
                    <Image
                      src="/JobPortal_3D.png"
                      alt="Airborne HRS Platform Preview"
                      fill
                      sizes="(max-w-768px) 100vw, 600px"
                      priority
                      className="object-cover object-center scale-105 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
                  </div>
                  
                  {/* Floating Status UI - Pop out in 3D */}
                  <div className="absolute bottom-8 left-8 right-8 glass-panel p-5 rounded-2xl border border-white/20 backdrop-blur-xl flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.5)]" style={{ transform: 'translateZ(40px)' }}>
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                      </div>
                      <p className="text-sm font-bold text-white tracking-wide">
                        System Active
                      </p>
                    </div>
                    <div className="text-xs text-primary font-mono bg-primary/10 px-2 py-1 rounded-md border border-primary/20">
                      v2.0 Optimized
                    </div>
                  </div>
                  
                  {/* Additional Floating UI Element */}
                  <div className="absolute top-8 right-8 glass-panel px-4 py-2 rounded-xl border border-white/10 backdrop-blur-lg flex items-center gap-2 shadow-xl" style={{ transform: 'translateZ(25px)' }}>
                    <Cpu className="h-4 w-4 text-accent" />
                    <span className="text-xs font-bold text-white">Neural Net</span>
                  </div>
                </div>
              </IsometricTilt>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Asymmetric Bento Grid (Core Solutions) */}
      <section id="features" className="py-32 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <ScrollReveal className="mb-20">
            <h2 className="text-sm font-bold text-primary tracking-[0.2em] uppercase mb-4 text-center">Global Ecosystem</h2>
            <h3 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight text-white text-center max-w-4xl mx-auto leading-tight">
              An intelligent fabric connecting <br/><span className="text-white/40">the world's top talent.</span>
            </h3>
          </ScrollReveal>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            
            {/* Employers (Large, spans 2 columns, 2 rows if configured, but let's do 2 cols 1 row) */}
            <Hover3DCard className="md:col-span-2 md:row-span-2 glass-panel rounded-[2rem] p-10 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-colors duration-700" />
              <div className="relative z-10">
                <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary mb-8 backdrop-blur-md">
                  <Building2 className="h-8 w-8" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">For Employers</h3>
                <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-lg">
                  Deploy AI-driven agents to automate resume screening, coordinate candidate assessments, and unlock hyper-targeted global talent pools with unprecedented accuracy.
                </p>
              </div>
              <div className="mt-12 relative z-10">
                <a href="https://jobs.airbornehrs.in/employer" className="inline-flex items-center text-primary font-bold hover:text-white transition-colors group/btn">
                  Access Portal <ArrowRight className="ml-2 h-5 w-5 transform group-hover/btn:translate-x-2 transition-transform" />
                </a>
              </div>
            </Hover3DCard>

            {/* Candidates (Tall vertical) */}
            <Hover3DCard className="glass-panel rounded-[2rem] p-8 flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent mb-6 backdrop-blur-md">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-3">For Candidates</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Build verifiable profiles, match with elite employers instantly, and let our agents negotiate your optimal career trajectory.
                </p>
              </div>
              <div className="mt-8 relative z-10">
                <a href="https://jobs.airbornehrs.in/candidate" className="inline-flex items-center text-accent font-bold hover:text-white transition-colors group/btn">
                  Enter Hub <ArrowRight className="ml-2 h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </Hover3DCard>

            {/* Universities (Standard) */}
            <Hover3DCard className="glass-panel rounded-[2rem] p-8 flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary mb-6 backdrop-blur-md">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-3">For Universities</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Streamline placements, verify qualifications on-chain, and connect entire cohorts directly to industry pipelines.
                </p>
              </div>
              <div className="mt-8 relative z-10">
                <a href="https://jobs.airbornehrs.in/university" className="inline-flex items-center text-primary font-bold hover:text-white transition-colors group/btn">
                  Admin Login <ArrowRight className="ml-2 h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </Hover3DCard>

          </div>
        </div>
      </section>


      {/* Editorial Founder Section */}
      <section className="py-32 relative border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Massive Typography */}
            <div className="space-y-8 z-20">
              <ScrollReveal>
                <h2 className="text-6xl sm:text-7xl lg:text-8xl font-heading font-extrabold text-white tracking-tighter leading-[0.9] opacity-90 mix-blend-plus-lighter">
                  BUILDING<br/>THE NEXT<br/><span className="text-primary">COGNITIVE</span><br/>ERA.
                </h2>
              </ScrollReveal>
              <ScrollReveal>
                <div className="glass-panel p-8 rounded-3xl border-l-4 border-l-primary mt-12 backdrop-blur-xl">
                  <p className="text-xl text-white font-light leading-relaxed">
                    "We are not building automation spreadsheets. We are building the next generation of artificial consciousness to run collaborative, goal-driven business nodes."
                  </p>
                  <div className="mt-6">
                    <h4 className="text-primary font-bold text-lg tracking-tight">Suryaansh Prithvijit Singh</h4>
                    <p className="text-muted-foreground text-sm font-medium mt-1">Founder & CEO, Airborne HRS</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Parallax Founder Image */}
            <ScrollReveal className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg aspect-[3/4] rounded-[3rem] overflow-hidden glass-panel p-2 shadow-2xl shadow-primary/20">
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-black">
                  <Image
                    src="/founder_3D.png"
                    alt="Suryaansh Prithvijit Singh"
                    fill
                    sizes="(max-w-768px) 100vw, 600px"
                    className="object-cover object-top opacity-90 transition-transform duration-[2s] hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* Latest Insights Section */}
      <section className="py-32 bg-black/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-white drop-shadow-md">Insights & Data</h2>
              <p className="text-muted-foreground text-xl">Discover how AI recruitment is transforming workflows.</p>
            </div>
            <MagneticButton href="/blog">
              <div className="inline-flex items-center justify-center rounded-full glass-panel px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all">
                Browse Publications <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </MagneticButton>
          </ScrollReveal>

          {latestPosts.length === 0 ? (
            <ScrollReveal className="p-16 rounded-[3rem] glass-panel border border-white/10 text-center space-y-6">
              <Layers className="h-16 w-16 text-muted-foreground/30 mx-auto" />
              <h3 className="text-3xl font-heading font-bold text-white">Upcoming Research</h3>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
                We are preparing a series of technical papers and case studies on AI-driven workforce modeling and cognitive recruiting.
              </p>
            </ScrollReveal>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestPosts.map((post, i) => (
                <FadeIn key={post.id} delay={0.1 * i}>
                  <Hover3DCard className="flex flex-col justify-between p-8 rounded-[2rem] glass-panel border border-white/10 h-full group">
                    <div className="space-y-6">
                      {post.targetLocation && (
                        <div className="inline-flex items-center gap-1.5 text-xs text-primary font-bold bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                          <MapPin className="h-3.5 w-3.5" /> {post.targetLocation}
                        </div>
                      )}
                      <h3 className="text-2xl font-heading font-bold text-white group-hover:text-primary transition-colors leading-snug">
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
                        Read <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Link>
                    </div>
                  </Hover3DCard>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Demo Request Section */}
      <section id="contact" className="py-32 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,214,161,0.1),transparent_50%)] pointer-events-none" />
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center space-y-12">
          <ScrollReveal>
            <h2 className="text-5xl sm:text-7xl font-heading font-extrabold text-white tracking-tighter drop-shadow-xl">Elevate Your System</h2>
            <p className="text-muted-foreground text-2xl max-w-2xl mx-auto leading-relaxed mt-6 font-light">
              Deploy cognitive agents tailored to your precise business logic and workforce architecture.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <Hover3DCard className="max-w-md mx-auto p-10 rounded-[3rem] glass-panel border border-primary/30 shadow-[0_0_50px_rgba(0,214,161,0.1)] text-left">
              <h4 className="text-white font-heading font-bold text-2xl mb-8 text-center">Initialize Demo</h4>
              <DemoForm />
            </Hover3DCard>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
