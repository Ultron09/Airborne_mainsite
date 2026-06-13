"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if the user has already consented
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
  };

  const handleDecline = () => {
    localStorage.setItem("airborne_cookie_consent", "declined");
    setIsVisible(false);
  };

  if (!isMounted || !isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-8 sm:bottom-8 z-50 sm:max-w-sm glass-panel p-6 rounded-2xl shadow-2xl border border-white/10 animate-in slide-in-from-bottom-10 fade-in duration-500 bg-[#011411]/95 backdrop-blur-3xl">
      <button 
        onClick={handleDecline}
        className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-primary/10 rounded-full text-primary">
          <Cookie className="w-5 h-5" />
        </div>
        <h3 className="text-white font-semibold">Cookie Consent</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        We use cookies and similar technologies to enhance your browsing experience, analyze our traffic, and provide secure services. By clicking "Accept", you consent to our use of cookies as described in our <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.
      </p>
      
      <div className="flex flex-col gap-2">
        <button
          onClick={handleAccept}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Accept All Cookies
        </button>
        <div className="flex gap-2">
          <button
            onClick={handleDecline}
            className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-2 px-4 rounded-lg border border-white/10 transition-colors text-sm"
          >
            Essential Only
          </button>
          <Link
            href="/privacy-policy"
            className="flex-1 flex justify-center items-center bg-transparent hover:bg-white/5 text-muted-foreground hover:text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
            onClick={() => setIsVisible(false)}
          >
            Read Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
