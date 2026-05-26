"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBlogPost, updateBlogPost } from "./actions";
import {
  ArrowLeft,
  Save,
  Eye,
  Edit2,
  MapPin,
  Globe,
  Settings,
  Compass,
  AlertCircle,
  Sparkles
} from "lucide-react";
import Link from "next/link";

interface PostData {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  published: boolean;
  seoTitle?: string | null;
  seoDescription?: string | null;
  keywords?: string | null;
  targetLocation?: string | null;
  targetRegion?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  radiusKm?: number | null;
}

export default function PostForm({ initialData }: { initialData?: PostData }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [summary, setSummary] = useState(initialData?.summary || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [published, setPublished] = useState(initialData?.published || false);
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(initialData?.seoDescription || "");
  const [keywords, setKeywords] = useState(initialData?.keywords || "");
  const [targetLocation, setTargetLocation] = useState(initialData?.targetLocation || "");
  const [targetRegion, setTargetRegion] = useState(initialData?.targetRegion || "");
  const [latitude, setLatitude] = useState<string>(
    initialData?.latitude !== undefined && initialData?.latitude !== null
      ? initialData.latitude.toString()
      : ""
  );
  const [longitude, setLongitude] = useState<string>(
    initialData?.longitude !== undefined && initialData?.longitude !== null
      ? initialData.longitude.toString()
      : ""
  );
  const [radiusKm, setRadiusKm] = useState<string>(
    initialData?.radiusKm !== undefined && initialData?.radiusKm !== null
      ? initialData.radiusKm.toString()
      : "50"
  );

  // Auto slugify title if creating new post
  useEffect(() => {
    if (!initialData?.id && title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(generatedSlug);
    }
  }, [title, initialData]);

  // Quick coordinate presets
  const presets = [
    { name: "Chicago, IL", region: "US-IL", lat: "41.8781", lng: "-87.6298" },
    { name: "New York, NY", region: "US-NY", lat: "40.7128", lng: "-74.0060" },
    { name: "London, UK", region: "GB-LND", lat: "51.5074", lng: "-0.1278" },
    { name: "Bangalore, IN", region: "IN-KA", lat: "12.9716", lng: "77.5946" },
  ];

  function applyPreset(preset: typeof presets[0]) {
    setTargetLocation(preset.name);
    setTargetRegion(preset.region);
    setLatitude(preset.lat);
    setLongitude(preset.lng);
  }

  // Simple renderer for Preview
  function getPreviewHtml() {
    let html = content;
    // Escaping basic HTML
    html = html
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Code blocks
    html = html.replace(/```([\s\S]*?)```/g, (_, code) => `<pre><code>${code.trim()}</code></pre>`);
    // Headings
    html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
    html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
    html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");
    // Bold / Italic
    html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    
    // Paragraph parser
    const lines = html.split("\n");
    const processed = lines.map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<pre") ||
        trimmed.startsWith("<code>") ||
        trimmed.startsWith("</")
      ) {
        return line;
      }
      return `<p>${line}</p>`;
    });

    return processed.filter(Boolean).join("\n");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const latVal = latitude ? parseFloat(latitude) : null;
    const lngVal = longitude ? parseFloat(longitude) : null;
    const radVal = radiusKm ? parseFloat(radiusKm) : 50;

    if (latitude && isNaN(latVal || NaN)) {
      setError("Latitude must be a valid number");
      setLoading(false);
      return;
    }
    if (longitude && isNaN(lngVal || NaN)) {
      setError("Longitude must be a valid number");
      setLoading(false);
      return;
    }

    const payload = {
      title,
      slug,
      summary,
      content,
      published,
      seoTitle: seoTitle || undefined,
      seoDescription: seoDescription || undefined,
      keywords: keywords || undefined,
      targetLocation: targetLocation || undefined,
      targetRegion: targetRegion || undefined,
      latitude: latVal,
      longitude: lngVal,
      radiusKm: radVal,
    };

    try {
      if (initialData?.id) {
        await updateBlogPost(initialData.id, payload);
      } else {
        await createBlogPost(payload);
      }
      router.push("/admin-portal-xyz");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong saving the article");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin-portal-xyz"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-muted-foreground hover:text-white transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary animate-pulse" />
              {initialData?.id ? "Edit Insight Post" : "Create New Insight Post"}
            </h1>
            <p className="text-xs text-muted-foreground">
              Define copy, SEO parameters, and target location coordinates.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left main column: Editor and Preview */}
        <div className="lg:col-span-8 space-y-6">
          {/* Tab Selection */}
          <div className="flex border-b border-white/10 pb-px">
            <button
              type="button"
              onClick={() => setActiveTab("edit")}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                activeTab === "edit"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-white"
              }`}
            >
              <Edit2 className="h-3.5 w-3.5" /> Editor
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                activeTab === "preview"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-white"
              }`}
            >
              <Eye className="h-3.5 w-3.5" /> Live Preview
            </button>
          </div>

          {activeTab === "edit" ? (
            <div className="space-y-4">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Article Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Transforming Chicago Placement Pipelines with AI"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Slug (Auto-generated)
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="transforming-chicago-placement"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Summary (Snippet)
                </label>
                <textarea
                  required
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Provide a concise 2-3 sentence overview for search engines and card displays..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              {/* Content Editor */}
              <div className="space-y-1">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Article Content (Markdown)
                  </label>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    Markdown Syntax Supported
                  </span>
                </div>
                <textarea
                  required
                  rows={15}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="## Heading 2&#10;Write content here... use **bold** or [links](url)"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white font-mono focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all leading-relaxed"
                />
              </div>
            </div>
          ) : (
            /* Live Simulated Preview */
            <div className="p-8 rounded-2xl glass-panel border border-white/10 min-h-[500px]">
              <div className="max-w-2xl mx-auto space-y-6">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                    {title || "Untitled Article"}
                  </h1>
                  <p className="text-xs text-muted-foreground mt-2 font-mono">
                    Preview Mode — Live Content Render
                  </p>
                </div>
                <hr className="border-white/5" />
                <div
                  className="prose-custom"
                  dangerouslySetInnerHTML={{
                    __html: getPreviewHtml() || "<p className='italic text-muted-foreground'>Start writing editor content to see preview rendering...</p>",
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Right side-bar column: SEO, GEO and Publish panel */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Publication and Submit Box */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Settings className="h-4 w-4 text-primary" /> Publish Settings
            </h3>
            
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="h-4 w-4 rounded border-white/10 text-primary bg-black/40 focus:ring-0 cursor-pointer"
              />
              <div>
                <div className="text-xs font-semibold text-white">Publish Immediately</div>
                <div className="text-[10px] text-muted-foreground">If unchecked, this post remains a draft.</div>
              </div>
            </label>

            {error && (
              <div className="flex gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive">
                <AlertCircle className="h-4.5 w-4.5 flex-shrink-0" />
                <p className="leading-snug">{error}</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground py-2.5 text-xs font-bold shadow-lg shadow-primary/10 transition-all disabled:opacity-50"
              >
                <Save className="h-4 w-4" /> {loading ? "Saving..." : "Save Article"}
              </button>
              <Link
                href="/admin-portal-xyz"
                className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-xs font-semibold text-white transition-all text-center"
              >
                Cancel
              </Link>
            </div>
          </div>

          {/* GEO Optimization Box */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="h-4 w-4 text-accent" /> GEO Optimization Target
            </h3>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Target a specific city or area to embed metadata coordinates and geographic headers, optimizing search engine queries in those locations.
            </p>

            {/* Quick Presets */}
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">
                Quick Presets:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => applyPreset(p)}
                    className="text-[10px] bg-white/5 border border-white/10 hover:bg-white/10 text-white px-2 py-1 rounded transition-all"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-white/5" />

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Target Location Name
                </label>
                <input
                  type="text"
                  value={targetLocation}
                  onChange={(e) => setTargetLocation(e.target.value)}
                  placeholder="e.g., Chicago, IL"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Target Region ISO Code
                </label>
                <input
                  type="text"
                  value={targetRegion}
                  onChange={(e) => setTargetRegion(e.target.value)}
                  placeholder="e.g., US-IL"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-primary transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Latitude
                  </label>
                  <input
                    type="text"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="41.8781"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-primary transition-all font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Longitude
                  </label>
                  <input
                    type="text"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="-87.6298"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-primary transition-all font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Radius Target Range (KM)
                </label>
                <input
                  type="number"
                  value={radiusKm}
                  onChange={(e) => setRadiusKm(e.target.value)}
                  placeholder="50"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-primary transition-all font-mono"
                />
              </div>
            </div>
          </div>

          {/* SEO Metadata Customization Box */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="h-4 w-4 text-accent" /> SEO Custom Metadata
            </h3>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              If left blank, these parameters fall back directly to the article Title and Summary.
            </p>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  SEO Meta Title Override
                </label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="Optimized SEO Title"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  SEO Meta Description Override
                </label>
                <textarea
                  rows={2}
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="Optimized SEO Description"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Indexing Keywords (Comma list)
                </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="AI recruitment, staffing automation, Chicago hiring"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-primary transition-all"
                />
              </div>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}
