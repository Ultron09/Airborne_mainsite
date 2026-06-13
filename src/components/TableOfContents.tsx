"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract headings from markdown content
    // We only care about ## and ### (levels 2 and 3)
    const lines = content.split('\n');
    const extractedHeadings: TOCItem[] = [];
    
    // We need to keep track of the count of duplicate ids to make them unique
    const idCount: Record<string, number> = {};

    lines.forEach(line => {
      const match = line.match(/^(#{2,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].replace(/[\[\]*`]/g, '').trim(); // Remove markdown formatting
        
        let baseId = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        if (!baseId) return;

        if (idCount[baseId]) {
          idCount[baseId]++;
          baseId = `${baseId}-${idCount[baseId]}`;
        } else {
          idCount[baseId] = 1;
        }

        extractedHeadings.push({ id: baseId, text, level });
      }
    });

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    // Setup intersection observer to highlight active section
    if (headings.length === 0) return;

    // We add a short delay to allow the markdown to render into the DOM
    const timeout = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: "0px 0px -80% 0px" }
      );

      headings.forEach((heading) => {
        const el = document.getElementById(heading.id);
        if (el) observer.observe(el);
      });

      return () => observer.disconnect();
    }, 500);

    return () => clearTimeout(timeout);
  }, [headings]);

  const scrollToElement = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100; // 100px offset for sticky headers
      window.scrollTo({ top: y, behavior: 'smooth' });
      // Update URL hash without jumping
      window.history.pushState(null, '', `#${id}`);
      setActiveId(id);
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-24 hidden lg:block bg-black/40 border border-white/10 backdrop-blur-md rounded-2xl p-6">
      <h3 className="text-white font-semibold flex items-center gap-2 mb-4">
        <List className="w-4 h-4 text-primary" />
        Table of Contents
      </h3>
      <nav className="flex flex-col gap-2.5 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => scrollToElement(e, heading.id)}
            className={`text-sm transition-all duration-200 block ${
              activeId === heading.id 
                ? "text-primary font-medium translate-x-1" 
                : "text-muted-foreground hover:text-white hover:translate-x-1"
            } ${heading.level === 3 ? "ml-4 text-xs" : ""}`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
