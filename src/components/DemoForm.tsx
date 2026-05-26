"use client";

export default function DemoForm() {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-semibold text-muted-foreground mb-1">Company Email</label>
        <input 
          type="email" 
          placeholder="you@company.com" 
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
        />
      </div>
      <button 
        onClick={() => alert("Thank you for your interest! We will contact you shortly.")}
        className="w-full rounded-lg bg-primary py-2 text-center text-sm font-semibold text-primary-foreground hover:bg-primary/95 transition-all shadow-md shadow-primary/10"
      >
        Submit Request
      </button>
    </div>
  );
}
