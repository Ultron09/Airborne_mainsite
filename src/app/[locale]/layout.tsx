import type { Metadata } from "next";
import { Orbitron, Exo_2, DM_Sans, Rajdhani, Fira_Code } from "next/font/google";
import "../globals.css";
import Link from "next/link";
import Script from "next/script";
import Background3D from "@/components/Background3D";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  preload: false,
});

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
  preload: false,
});

const dmSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
  preload: false,
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  preload: false,
});

const firaCode = Fira_Code({
  variable: "--font-firacode",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Airborne HRS | Advanced HR AI Workforce Intelligence",
  description: "Leverage state-of-the-art AI technology to transform your hiring, talent acquisition, and workforce management. Optimize search, automate screenings, and align people with potential.",
  keywords: ["HR AI", "Workforce Intelligence", "AI recruitment", "Advanced talent acquisition", "HR Tech", "Airborne HRS", "GEO optimized recruiting", "Artificial Consciousness", "AGI recruiting", "Suryaansh Prithvijit Singh"],
  authors: [{ name: "Airborne HRS Team" }],
  openGraph: {
    title: "Airborne HRS | Advanced HR AI Workforce Intelligence",
    description: "State-of-the-art AI technology transforming talent acquisition and workforce management.",
    url: "https://airbornehrs.in",
    siteName: "Airborne HRS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Airborne HRS | Advanced HR AI Workforce Intelligence",
    description: "Transform your hiring and HR operations with AI.",
  },
  other: {
    "geo.position": "18.916;73.328",
    "geo.region": "IN-MH",
    "geo.placename": "Karjat, Maharashtra, India",
    "ICBM": "18.916, 73.328",
  },
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const resolvedParams = await params;
  const messages = await getMessages();
  const tNav = await getTranslations('Navigation');
  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Airborne HRS",
    "url": "https://airbornehrs.in",
    "logo": "https://airbornehrs.in/favicon.ico",
    "description": "Revolutionizing workforce intelligence and recruiting automation through advanced artificial consciousness and AGI architectures.",
    "founder": {
      "@type": "Person",
      "name": "Suryaansh Prithvijit Singh",
      "jobTitle": "Founder & CEO",
      "alumniOf": "Universal AI University"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Karjat, Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "410201",
      "addressCountry": "IN"
    }
  };

  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Airborne HRS",
    "url": "https://airbornehrs.in"
  };

  return (
    <html
      lang={resolvedParams.locale}
      className={`${orbitron.variable} ${exo2.variable} ${dmSans.variable} ${rajdhani.variable} ${firaCode.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground relative">
        <NextIntlClientProvider messages={messages}>
        <Background3D />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        {/* Navigation Bar */}
        <header className="sticky top-4 z-50 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <div className="glass-panel rounded-full border border-white/20 backdrop-blur-xl shadow-2xl shadow-primary/10 h-16 flex items-center justify-between px-6">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(0,214,161,0.5)] transition-transform group-hover:scale-110">
                  A
                </div>
                <span className="text-xl font-heading font-bold tracking-tight text-white group-hover:text-primary transition-colors drop-shadow-md">
                  Airborne<span className="text-primary font-medium">HRS</span>
                </span>
              </Link>

              {/* Desktop Nav Links */}
              <nav className="hidden md:flex items-center gap-8">
                <Link href={`/${resolvedParams.locale}/#features`} className="text-sm font-medium text-white/70 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
                  {tNav('features')}
                </Link>
                <Link href={`/${resolvedParams.locale}/#technology`} className="text-sm font-medium text-white/70 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
                  {tNav('technology')}
                </Link>
                <Link href={`/${resolvedParams.locale}/blog`} className="text-sm font-medium text-white/70 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
                  {tNav('blog')}
                </Link>
              </nav>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <a
                href="https://jobs.airbornehrs.in"
                className="hidden sm:inline-flex text-sm font-bold text-primary hover:text-accent transition-colors py-2 px-3"
              >
                {tNav('jobPortal')}
              </a>
              <Link
                href={`/${resolvedParams.locale}/#contact`}
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-[0_0_20px_rgba(0,214,161,0.4)] hover:bg-primary/90 transition-all hover:scale-105"
              >
                {tNav('requestDemo')}
              </Link>
              {/* Language Switcher */}
              <div className="flex items-center gap-2 ml-4 border-l border-white/20 pl-4">
                <Link href="/en" className="text-xs font-bold text-white/70 hover:text-primary transition-colors uppercase">EN</Link>
                <Link href="/es" className="text-xs font-bold text-white/70 hover:text-primary transition-colors uppercase">ES</Link>
                <Link href="/hi" className="text-xs font-bold text-white/70 hover:text-primary transition-colors uppercase">HI</Link>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow flex flex-col">{children}</main>

        {/* Footer */}
        <footer className="relative overflow-hidden border-t-2 border-primary/20 pt-16 pb-8 bg-background/80 backdrop-blur-3xl shadow-[0_-10px_40px_rgba(0,214,161,0.1)]">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(0,214,161,0.3)]">
                  A
                </div>
                <span className="font-heading font-bold tracking-tight text-white text-xl">Airborne<span className="text-primary">HRS</span></span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Revolutionizing workforce intelligence through advanced AI architectures and 3D cognitive interfaces.
              </p>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-sm font-bold text-white tracking-widest uppercase">Platform</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/#features" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><span className="h-1 w-1 bg-primary rounded-full" /> Features</Link></li>
                <li><Link href="/#technology" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><span className="h-1 w-1 bg-primary rounded-full" /> AI Tech</Link></li>
                <li><a href="https://jobs.airbornehrs.in" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><span className="h-1 w-1 bg-primary rounded-full" /> Job Portal</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-white tracking-widest uppercase">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><span className="h-1 w-1 bg-primary rounded-full" /> Blog</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-white tracking-widest uppercase">Research Labs</h4>
              <p className="text-xs text-muted-foreground leading-relaxed glass-panel p-4 rounded-xl border border-white/5">
                Working on continual learning and advanced artificial consciousness to revolutionize HR Fabric and HRMS systems.
              </p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
            <p className="text-xs text-muted-foreground font-medium">&copy; {new Date().getFullYear()} Airborne HRS. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-muted-foreground font-medium">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </footer>
        <Script id="metricool-tracker" strategy="afterInteractive">
          {`
            function loadScript(a){
              var b=document.getElementsByTagName("head")[0],c=document.createElement("script");
              c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)
            }
            loadScript(function(){
              beTracker.t({hash:"da5e1d7f32d81f2648f985368dfaaee9"})
            });
          `}
        </Script>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
