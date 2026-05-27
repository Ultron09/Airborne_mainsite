"use client";

import { useState } from "react";
import { submitDemoRequest } from "@/app/actions/demo";

export default function DemoForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async () => {
    if (!email) return;
    setStatus("loading");
    
    const res = await submitDemoRequest(email);
    if (res.success) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-20 group-focus-within:opacity-50 transition duration-500"></div>
        <div className="relative glass-panel p-1 rounded-xl">
          <label className="block text-[10px] uppercase tracking-wider font-bold text-white/50 mb-1 ml-2 mt-1">Company Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com" 
            className="w-full bg-transparent border-none px-3 py-2 text-sm text-white focus:outline-none placeholder:text-white/20 font-medium"
            disabled={status === "loading" || status === "success"}
          />
        </div>
      </div>
      <button 
        onClick={handleSubmit}
        disabled={status === "loading" || status === "success"}
        className="relative w-full group overflow-hidden rounded-xl p-[1px] disabled:opacity-50"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></span>
        <div className="relative bg-background/40 backdrop-blur-md rounded-xl py-3 px-4 flex items-center justify-center transition-all duration-300 group-hover:bg-background/20 group-hover:scale-[0.98]">
          <span className="text-sm font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
            {status === "loading" ? "Initializing..." : status === "success" ? "Protocol Initiated ✓" : "Initialize Contact Protocol"}
          </span>
        </div>
      </button>
      {status === "error" && (
        <p className="text-red-400 text-xs text-center">Failed to submit. Please verify email and try again.</p>
      )}
    </div>
  );
}
