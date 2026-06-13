"use client";

import { useState, useEffect } from "react";
import { Cookie, X, Check, Shield } from "lucide-react";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const consent = localStorage.getItem("airborne_cookie_consent");
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("airborne_cookie_consent", "accepted");
    setIsVisible(false);
    // You can trigger tracking scripts initialization here if you implement strict blocking
  };

  const handleDecline = () => {
    localStorage.setItem("airborne_cookie_consent", "declined");
    setIsVisible(false);
    // You can disable tracking scripts here
  };

  if (!isMounted || !isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 md:p-8 pointer-events-none flex justify-center md:justify-end">
      <div className="pointer-events-auto w-full max-w-md bg-[#011411]/95 backdrop-blur-3xl border border-primary/20 rounded-2xl shadow-[0_-10px_40px_rgba(0,214,161,0.1)] p-6 overflow-hidden relative">
        {/* Decorative lighting */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex gap-4">
          <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary">
            <Cookie className="h-5 w-5" />
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                We value your privacy
                <Shield className="h-4 w-4 text-primary" />
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                We use cookies and similar technologies to enhance your browsing experience, analyze our traffic, and provide secure HRMS services. By clicking &quot;Accept All&quot;, you consent to our use of cookies as described in our{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAccept}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-[0_0_15px_rgba(0,214,161,0.2)] hover:bg-primary/90 transition-all hover:-translate-y-0.5"
              >
                <Check className="h-3.5 w-3.5" />
                Accept All
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-all"
              >
                <X className="h-3.5 w-3.5" />
                Essential Only
              </button>
            </div>
          </div>
        </div>
        
        {/* Dismiss icon button for absolute minimalists */}
        <button 
          onClick={handleDecline}
          className="absolute top-3 right-3 text-muted-foreground hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
