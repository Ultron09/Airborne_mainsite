"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "./actions";
import { Lock, AlertCircle, Sparkles } from "lucide-react";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginAdmin(password);
      if (res.success) {
        router.refresh();
      } else {
        setError(res.error || "Login failed");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(35rem_35rem_at_center,rgba(16,185,129,0.05),transparent)]" />
      
      <div className="w-full max-w-md gradient-border bg-card p-8 rounded-3xl shadow-2xl relative space-y-6">
        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1 w-32 bg-gradient-to-r from-primary to-accent blur-sm" />

        <div className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 shadow-inner">
            <Lock className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Admin Gate</h2>
          <p className="text-xs text-muted-foreground">
            Authenticate to publish and manage SEO/GEO optimized blogs.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Admin Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••••••"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground py-3 text-sm font-semibold shadow-lg shadow-primary/10 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? "Verifying..." : "Access Dashboard"}
          </button>
        </form>

        <div className="pt-4 border-t border-white/5 text-center flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
          <Sparkles className="h-3 w-3 text-primary" />
          <span>Airborne HRS AI Workforce Ecosystem</span>
        </div>
      </div>
    </div>
  );
}
