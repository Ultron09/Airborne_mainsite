"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, ShieldCheck } from "lucide-react";

export default function TermsPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if the user has already accepted the terms
    const consent = localStorage.getItem("airborne_terms_consent");
    if (!consent) {
      // Show immediately or after a slight delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("airborne_terms_consent", "accepted");
    setIsVisible(false);
  };

  if (!isMounted || !isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#011411]/95 border border-primary/20 rounded-2xl shadow-[0_10px_50px_rgba(0,214,161,0.15)] p-8 overflow-hidden relative animate-in zoom-in-95 duration-300">
        {/* Decorative lighting */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-2">
            <FileText className="h-8 w-8" />
          </div>
          
          <h2 className="text-2xl font-bold text-white">Terms & Conditions Update</h2>
          
          <p className="text-sm text-muted-foreground leading-relaxed mt-2 mb-6">
            We have updated our Terms and Conditions and Privacy Policy to ensure compliance with the latest regulations and to provide you with better service. By continuing to use Airborne HRS, you acknowledge and agree to these terms.
          </p>
          
          <div className="flex flex-col gap-3 w-full sm:flex-row sm:justify-center mb-6">
            <Link 
              href="/terms-and-conditions" 
              className="text-sm text-primary hover:underline flex items-center justify-center gap-1"
            >
              Read Terms
            </Link>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <Link 
              href="/privacy-policy" 
              className="text-sm text-primary hover:underline flex items-center justify-center gap-1"
            >
              Read Privacy Policy
            </Link>
          </div>

          <button
            onClick={handleAccept}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_20px_rgba(0,214,161,0.3)] hover:bg-primary/90 transition-all hover:-translate-y-0.5"
          >
            <ShieldCheck className="h-4 w-4" />
            I Accept and Agree
          </button>
        </div>
      </div>
    </div>
  );
}
