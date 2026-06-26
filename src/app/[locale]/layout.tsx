import type { Metadata } from "next";
import { Orbitron, DM_Sans } from "next/font/google";
import "../globals.css";
import Link from "next/link";
import Script from "next/script";
import MetricoolScript from "@/components/MetricoolScript";
import CookieBanner from "@/components/CookieBanner";
import Background3D from "@/components/Background3D";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import Navigation from "@/components/Navigation";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import TermsPopup from "@/components/TermsPopup";

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

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const locale = params.locale;

  let title = "Airborne HRS | AI-Powered HRMS for Startups & SMEs";
  let description = "The ultimate AI-powered HR Management System (HRMS) & HR automation system. Automate payroll, attendance, recruitment, and onboarding for businesses in India, UAE, Qatar, and Australia.";
  let keywords = ["HRMS India", "HRMS UAE", "HRMS Qatar", "HR software startups", "employee management software", "attendance software", "payroll software", "AI HR software", "recruitment automation", "Airborne HRS"];

  if (locale === "hi") {
    title = "Airborne HRS | भारत के लिए AI-संचालित HRMS और पेरोल सॉफ्टवेयर";
    description = "भारत में स्टार्टअप्स और SMEs के लिए अंतिम AI-संचालित HR Management System (HRMS)। पेरोल, उपस्थिति, और भर्ती को स्वचालित करें।";
    keywords = ["HRMS India", "HRMS भारत", "पेरोल सॉफ्टवेयर", "AI HR", "HRMS", "कर्मचारी प्रबंधन", "Airborne HRS"];
  } else if (locale === "ar") {
    title = "منصة Airborne HRS | نظام إدارة الموارد البشرية (HRMS) بالذكاء الاصطناعي";
    description = "نظام إدارة الموارد البشرية (HRMS) وأتمتة الموارد البشرية الأفضل للشركات في الإمارات وقطر والخليج. أتمتة الرواتب والحضور والتوظيف.";
    keywords = ["HRMS UAE", "HRMS Qatar", "نظام HRMS الخليج", "أتمتة الموارد البشرية", "الذكاء الاصطناعي", "Airborne HRS"];
  } else if (locale === "es") {
    title = "Airborne HRS | Software HRMS y Nómina de Personal con IA";
    description = "El mejor sistema de gestión de recursos humanos (HRMS) con IA. Automatice nómina, asistencia y reclutamiento.";
    keywords = ["HRMS", "software de nómina", "asistencia de personal", "recursos humanos con IA", "Airborne HRS"];
  } else {
    // English default targets India, Australia, UAE, Qatar and general AI HR / HRMS software keywords
    title = "Airborne HRS | AI-Powered HRMS (HR Software) for Startups & SMEs";
    description = "The ultimate AI-powered HR Management System (HRMS) & HR automation software. Automate payroll, attendance, recruitment, and onboarding in India, Australia, UAE, Qatar, and globally.";
    keywords = ["HRMS India", "HRMS Australia", "HRMS UAE", "HRMS Qatar", "AI HR", "HRMS software", "employee management software", "attendance software", "payroll software", "Airborne HRS"];
  }

  return {
    metadataBase: new URL("https://www.airbornehrs.in"),
    title,
    description,
    keywords,
    authors: [{ name: "Airborne HRS Team" }],
    alternates: {
      canonical: locale === "en" ? "/en" : `/${locale}`,
      languages: {
        en: "/en",
        hi: "/hi",
        ar: "/ar",
        es: "/es",
        fr: "/fr",
        nl: "/nl",
        ja: "/ja",
        zh: "/zh",
        "x-default": "/en",
      },
    },
    openGraph: {
      title,
      description,
      url: "https://airbornehrs.in",
      siteName: "Airborne HRS",
      locale: locale === "ar" ? "ar_AE" : locale === "hi" ? "hi_IN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

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

  const jsonLdSoftwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Airborne HR Management System (HRMS)",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "url": "https://airbornehrs.in",
    "description": "Advanced HR Automation and HR Management System for enterprise talent acquisition and workforce intelligence.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
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
          <TermsPopup />
          <Background3D />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftwareApp) }}
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
                <img
                  src="/logo.webp"
                  alt="Airborne HRS Logo"
                  className="h-8 w-8 rounded-xl object-contain shadow-[0_0_15px_rgba(0,214,161,0.3)]"
                />
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
              <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms-and-conditions" className="hover:text-primary transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </footer>
        <MetricoolScript />
        <CookieBanner />
        </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
