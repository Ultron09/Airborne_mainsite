import type { Metadata } from "next";
import { Orbitron, DM_Sans } from "next/font/google";
import "../globals.css";
import Link from "next/link";
import Script from "next/script";
import MetricoolScript from "@/components/MetricoolScript";
import Background3D from "@/components/Background3D";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import Navigation from "@/components/Navigation";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  preload: false,
});

const dmSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.airbornehrs.in"),
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
      className={`${orbitron.variable} ${dmSans.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground relative bg-noise">
        <Preloader />
        <NextIntlClientProvider messages={messages}>
        <SmoothScroll>
          <CustomCursor />
          <Background3D />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
          />
          
          <Navigation locale={resolvedParams.locale} />

          {/* Page Content */}
          <main className="flex-grow flex flex-col pt-24">{children}</main>

        {/* Footer */}
        <footer className="relative overflow-hidden border-t border-primary/20 pt-16 pb-8 bg-[#011411]/90 backdrop-blur-3xl shadow-[0_-10px_40px_rgba(0,214,161,0.05)]">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
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
              <h4 className="text-sm font-bold text-white tracking-widest uppercase font-heading">Platform</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/#features" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><span className="h-1 w-1 bg-primary rounded-full" /> Features</Link></li>
                <li><Link href="/#technology" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><span className="h-1 w-1 bg-primary rounded-full" /> AI Tech</Link></li>
                <li><a href="https://jobs.airbornehrs.in/jobs" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><span className="h-1 w-1 bg-primary rounded-full" /> Job Portal</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-white tracking-widest uppercase font-heading">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><span className="h-1 w-1 bg-primary rounded-full" /> Blog</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-white tracking-widest uppercase font-heading">Research Labs</h4>
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
        <MetricoolScript />
        </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
