"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-8 sm:bottom-8 z-50 sm:max-w-sm glass-panel p-6 rounded-2xl shadow-2xl border border-white/10 animate-in slide-in-from-bottom-10 fade-in duration-500">
      <button 
        onClick={handleDecline}
        className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-primary/10 rounded-full text-primary">
          <Cookie className="w-5 h-5" />
        </div>
        <h3 className="text-white font-semibold">Cookie Consent</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        We use cookies to improve your experience, analyze site traffic, and assist in our marketing efforts. By clicking "Accept", you agree to our use of cookies.
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
            Decline
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
