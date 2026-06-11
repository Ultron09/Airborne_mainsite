"use client";

import { useState } from "react";
import { submitDemoRequest } from "@/app/actions/demo";

export default function DemoForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async () => {
    if (!email) return;
    setStatus("loading");
    
    const res = await submitDemoRequest({ email, name, company, phone, message });
    if (res.success) {
      setStatus("success");
      setEmail("");
      setName("");
      setCompany("");
      setPhone("");
      setMessage("");
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="space-y-4">
      {/* Name Field */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-20 group-focus-within:opacity-50 transition duration-500"></div>
        <div className="relative glass-panel p-1 rounded-xl">
          <label className="block text-[10px] uppercase tracking-wider font-bold text-white/50 mb-1 ml-2 mt-1">Full Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe" 
            className="w-full bg-transparent border-none px-3 py-2 text-sm text-white focus:outline-none placeholder:text-white/20 font-medium"
            disabled={status === "loading" || status === "success"}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Company Email Field */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-20 group-focus-within:opacity-50 transition duration-500"></div>
          <div className="relative glass-panel p-1 rounded-xl">
            <label className="block text-[10px] uppercase tracking-wider font-bold text-white/50 mb-1 ml-2 mt-1">Company Email *</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com" 
              required
              className="w-full bg-transparent border-none px-3 py-2 text-sm text-white focus:outline-none placeholder:text-white/20 font-medium"
              disabled={status === "loading" || status === "success"}
            />
          </div>
        </div>

        {/* Phone Field */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-20 group-focus-within:opacity-50 transition duration-500"></div>
          <div className="relative glass-panel p-1 rounded-xl">
            <label className="block text-[10px] uppercase tracking-wider font-bold text-white/50 mb-1 ml-2 mt-1">Phone Number</label>
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000" 
              className="w-full bg-transparent border-none px-3 py-2 text-sm text-white focus:outline-none placeholder:text-white/20 font-medium"
              disabled={status === "loading" || status === "success"}
            />
          </div>
        </div>
      </div>

      {/* Company Name Field */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-20 group-focus-within:opacity-50 transition duration-500"></div>
        <div className="relative glass-panel p-1 rounded-xl">
          <label className="block text-[10px] uppercase tracking-wider font-bold text-white/50 mb-1 ml-2 mt-1">Company Name</label>
          <input 
            type="text" 
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Acme Corp" 
            className="w-full bg-transparent border-none px-3 py-2 text-sm text-white focus:outline-none placeholder:text-white/20 font-medium"
            disabled={status === "loading" || status === "success"}
          />
        </div>
      </div>

      {/* Message Field */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-20 group-focus-within:opacity-50 transition duration-500"></div>
        <div className="relative glass-panel p-1 rounded-xl">
          <label className="block text-[10px] uppercase tracking-wider font-bold text-white/50 mb-1 ml-2 mt-1">How can we help?</label>
          <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your HR automation needs..." 
            rows={3}
            className="w-full bg-transparent border-none px-3 py-2 text-sm text-white focus:outline-none placeholder:text-white/20 font-medium resize-none"
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
