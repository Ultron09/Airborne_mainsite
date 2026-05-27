import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 w-full glass-panel border-b border-border/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center font-bold text-white shadow-md shadow-primary/20 transition-transform group-hover:scale-105">
                  A
                </div>
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
                  Airborne<span className="text-primary font-medium">HRS</span>
                </span>
              </Link>

              {/* Desktop Nav Links */}
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
                <Link href="/#technology" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  AI Tech
                </Link>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </nav>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <a
                href="https://jobs.airbornehrs.in"
                className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors py-2 px-3 rounded-md hover:bg-white/5"
              >
                Go to Job Portal
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/95 transition-all hover:scale-105"
              >
                Request Demo
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow flex flex-col">{children}</main>

        {/* Footer */}
        <footer className="bg-background border-t border-border/40 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-gradient-to-tr from-primary to-accent flex items-center justify-center font-bold text-white text-xs">
                  A
                </div>
                <span className="font-bold tracking-tight text-white">AirborneHRS</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Revolutionizing workforce intelligence through advanced AI architectures.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="/#technology" className="text-muted-foreground hover:text-foreground transition-colors">AI Tech</Link></li>
                <li><a href="https://jobs.airbornehrs.in" className="text-muted-foreground hover:text-foreground transition-colors">Job Portal</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">GEO / Search Optimization</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Airborne HRS content is natively structured using AI-readable schemas, enabling direct discovery by next-gen generative engines.
              </p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Airborne HRS. All rights reserved.</p>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <a href="#" className="hover:text-foreground">Privacy Policy</a>
              <a href="#" className="hover:text-foreground">Terms of Service</a>
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
      </body>
    </html>
  );
}
