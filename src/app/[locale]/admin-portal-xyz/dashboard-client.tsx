"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { togglePublishPost, deleteBlogPost, logoutAdmin } from "./actions";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Plus,
  Trash2,
  Edit,
  Eye,
  LogOut,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  FileText,
  Search,
  CheckCircle2,
  XCircle
} from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  published: boolean;
  targetLocation: string | null;
  targetRegion: string | null;
  createdAt: Date;
}

interface DemoReq {
  id: string;
  email: string;
  name: string | null;
  company: string | null;
  phone: string | null;
  message: string | null;
  createdAt: Date;
}

interface Analytics {
  id: string;
  blogPostId: string;
  ipHash: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  scrollDepth: number;
  timeSpentSec: number;
  viewedAt: Date;
}

export default function DashboardClient({ posts, demoRequests, analytics = [] }: { posts: Post[], demoRequests: DemoReq[], analytics?: Analytics[] }) {
  const [activeTab, setActiveTab] = useState<"insights" | "leads" | "analytics">("insights");
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  // Stats calculation
  const totalPosts = posts.length;
  const publishedCount = posts.filter((p) => p.published).length;
  const draftCount = totalPosts - publishedCount;
  const uniqueLocations = Array.from(
    new Set(posts.map((p) => p.targetLocation).filter(Boolean))
  ).length;

  const totalViews = analytics.length;
  const avgScroll = analytics.length > 0 ? Math.round(analytics.reduce((acc, curr) => acc + curr.scrollDepth, 0) / analytics.length) : 0;
  
  // Prepare chart data (Views per day)
  const viewsByDate = analytics.reduce((acc: any, curr) => {
    const date = new Date(curr.viewedAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric' });
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  
  const chartData = Object.keys(viewsByDate).map(date => ({
    date,
    views: viewsByDate[date]
  })).reverse(); // Reverse to get chronological order assuming desc sort from server

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchLower) ||
      (post.targetLocation?.toLowerCase() || "").includes(searchLower) ||
      post.slug.toLowerCase().includes(searchLower)
    );
  });

  async function handleTogglePublish(id: string) {
    setLoadingId(id);
    try {
      await togglePublishPost(id);
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Failed to toggle status");
    } finally {
      setLoadingId(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this blog post? This cannot be undone.")) return;
    setLoadingId(id);
    try {
      await deleteBlogPost(id);
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Failed to delete post");
    } finally {
      setLoadingId(null);
    }
  }

  async function handleLogout() {
    try {
      await logoutAdmin();
      router.refresh();
    } catch (err) {
      alert("Failed to log out");
    }
  }

  return (
    <div className="space-y-8 py-8 px-4 max-w-7xl mx-auto">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <Sparkles className="h-7 w-7 text-primary" />
            Airborne HRS Admin
          </h1>
          <p className="text-sm text-muted-foreground">
            Write, optimize, and publish SEO & GEO-targeted insights.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin-portal-xyz/bulk-upload"
            className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white px-4 py-2 text-sm font-bold transition-all hover:scale-105"
          >
            <Calendar className="h-4 w-4" /> Bulk Schedule
          </Link>
          <Link
            href="/admin-portal-xyz/new"
            className="inline-flex items-center gap-2 rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground px-4 py-2 text-sm font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105"
          >
            <Plus className="h-4 w-4" /> New Article
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 px-4 py-2.5 text-xs font-semibold text-white transition-all"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-panel border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>Total Insights</span>
            <FileText className="h-4 w-4 text-primary" />
          </div>
          <span className="text-3xl font-bold text-white mt-4">{totalPosts}</span>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>Published</span>
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </div>
          <span className="text-3xl font-bold text-white mt-4">{publishedCount}</span>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>Drafts</span>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </div>
          <span className="text-3xl font-bold text-white mt-4">{draftCount}</span>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>GEO Node Coverage</span>
            <MapPin className="h-4 w-4 text-accent" />
          </div>
          <span className="text-3xl font-bold text-white mt-4">{uniqueLocations}</span>
        </div>
        <div className="p-5 rounded-2xl glass-panel border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>Total Views</span>
            <Eye className="h-4 w-4 text-accent" />
          </div>
          <span className="text-3xl font-bold text-white mt-4">{totalViews}</span>
        </div>
      </div>

      {/* Filters and Tabs */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Tabs */}
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
            <button
              onClick={() => setActiveTab("insights")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "insights"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              Insights
            </button>
            <button
              onClick={() => setActiveTab("leads")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "leads"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              Leads ({demoRequests.length})
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "analytics"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              Analytics
            </button>
          </div>
          
          {/* Search */}
          <div className="relative flex items-center w-full max-w-md">
            <Search className="absolute left-4 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={activeTab === "insights" ? "Search dashboard by title..." : "Search leads by email..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* List View */}
        {activeTab === "insights" ? (
          filteredPosts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-white/10 bg-white/5 space-y-2">
            <Layers className="h-8 w-8 text-muted-foreground mx-auto" />
            <h3 className="text-base font-semibold text-white">No insights found</h3>
            <p className="text-xs text-muted-foreground">
              {searchTerm ? "Try searching for a different keyword." : "Click 'New Article' to publish your first post."}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden border border-white/10 rounded-2xl bg-card">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                    <th className="p-4">Article</th>
                    <th className="p-4">Target GEO</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date Created</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 space-y-1 max-w-sm sm:max-w-md">
                        <div className="font-bold text-white truncate">{post.title}</div>
                        <div className="text-xs text-muted-foreground font-mono truncate">
                          /{post.slug}
                        </div>
                      </td>
                      <td className="p-4">
                        {post.targetLocation ? (
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{post.targetLocation}</span>
                            {post.targetRegion && (
                              <span className="text-[10px] text-muted-foreground font-mono bg-white/5 px-1.5 py-0.5 rounded">
                                {post.targetRegion}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">None (Global)</span>
                        )}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleTogglePublish(post.id)}
                          disabled={loadingId === post.id}
                          className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-semibold ${
                            post.published
                              ? "bg-primary/10 border-primary/20 text-primary"
                              : "bg-white/5 border-white/10 text-muted-foreground"
                          } hover:brightness-110 transition-all`}
                        >
                          {post.published ? "Published" : "Draft"}
                        </button>
                      </td>
                      <td className="p-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>
                            {new Date(post.createdAt).toLocaleDateString("en-US", {
                              dateStyle: "medium",
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-muted-foreground hover:text-white transition-colors"
                          title="View Live Post"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/admin-portal-xyz/edit/${post.id}`}
                          className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-muted-foreground hover:text-white transition-all"
                          title="Edit Insight"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          disabled={loadingId === post.id}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-destructive/10 hover:border-destructive/20 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                          title="Delete Post"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === "leads" ? (
          /* LEADS TAB */
          <div className="overflow-hidden border border-white/10 rounded-2xl bg-card">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                    <th className="p-4">Lead Info</th>
                    <th className="p-4">Company</th>
                    <th className="p-4">Message</th>
                    <th className="p-4">Date Received</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {demoRequests
                    .filter((r) => r.email.toLowerCase().includes(searchTerm.toLowerCase()) || (r.name || "").toLowerCase().includes(searchTerm.toLowerCase()) || (r.company || "").toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((req) => (
                    <tr key={req.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 space-y-1">
                        <div className="font-bold text-white">{req.name || "Unknown"}</div>
                        <div className="text-xs text-muted-foreground"><a href={`mailto:${req.email}`} className="hover:text-primary transition-colors">{req.email}</a></div>
                        {req.phone && <div className="text-xs text-muted-foreground font-mono">{req.phone}</div>}
                      </td>
                      <td className="p-4 font-semibold text-white">
                        {req.company || <span className="text-muted-foreground italic text-xs">N/A</span>}
                      </td>
                      <td className="p-4 text-xs text-muted-foreground max-w-xs truncate">
                        {req.message || "-"}
                      </td>
                      <td className="p-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>
                            {new Date(req.createdAt).toLocaleString("en-US", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {demoRequests.length === 0 && (
                    <tr>
                      <td colSpan={2} className="p-12 text-center text-muted-foreground">
                        No demo requests received yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* ANALYTICS TAB */
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chart */}
              <div className="lg:col-span-2 p-6 rounded-2xl border border-white/10 bg-white/5">
                <h3 className="text-lg font-semibold text-white mb-6">Views Over Time</h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                      <XAxis dataKey="date" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#09090b', borderColor: '#ffffff10', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: "#3b82f6" }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Top Regions & Metrics */}
              <div className="space-y-6">
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
                  <h3 className="text-lg font-semibold text-white mb-4">Engagement</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Avg Scroll Depth</div>
                      <div className="text-2xl font-bold text-white flex items-baseline gap-2">
                        {avgScroll}%
                        <div className="w-full bg-white/10 rounded-full h-2 ml-4">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${avgScroll}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Visitors</h3>
                  <div className="space-y-3">
                    {analytics.slice(0, 5).map((a, i) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-white">{a.city || a.country || "Unknown Location"}</span>
                        </div>
                        <span className="text-muted-foreground">{Math.round(a.timeSpentSec / 60)}m read</span>
                      </div>
                    ))}
                    {analytics.length === 0 && (
                      <div className="text-sm text-muted-foreground">No tracking data yet.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
