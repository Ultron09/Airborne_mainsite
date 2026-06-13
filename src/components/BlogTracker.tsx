"use client";

import { useEffect, useRef } from "react";

export default function BlogTracker({ blogPostId }: { blogPostId: string }) {
  const startTime = useRef(Date.now());
  const maxScroll = useRef(0);

  useEffect(() => {
    // Scroll depth tracking
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const totalScrollable = docHeight - windowHeight;
      
      if (totalScrollable <= 0) {
        maxScroll.current = 100;
        return;
      }

      const scrollPercentage = (scrollPosition / totalScrollable) * 100;
      if (scrollPercentage > maxScroll.current) {
        maxScroll.current = scrollPercentage;
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Send data when user leaves the page
    const handleUnload = () => {
      // Compliance Check: Only track if cookie consent was explicitly accepted
      const consent = localStorage.getItem("airborne_cookie_consent");
      if (consent !== "accepted") {
        return;
      }

      const timeSpentSec = Math.floor((Date.now() - startTime.current) / 1000);
      
      const payload = JSON.stringify({
        blogPostId,
        scrollDepth: Math.min(Math.round(maxScroll.current), 100),
        timeSpentSec,
        referrer: document.referrer
      });

      // sendBeacon is preferred for unload events as it doesn't block the unmount
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics', payload);
      } else {
        // Fallback for older browsers
        fetch('/api/analytics', {
          method: 'POST',
          body: payload,
          keepalive: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleUnload);
      
      // Also send data if component unmounts (e.g. client-side routing)
      handleUnload();
    };
  }, [blogPostId]);

  return null; // Invisible component
}
