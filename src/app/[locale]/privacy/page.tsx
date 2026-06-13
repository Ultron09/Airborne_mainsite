import { Metadata } from "next";
import { Shield, FileText, Lock, Globe, Database } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Airborne HRS",
  description: "Privacy Policy and Data Protection guidelines for Airborne HRS and our Next-Gen HR Management System.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen bg-background py-16 px-6 lg:px-8 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[40%] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="mx-auto max-w-4xl relative z-10">
        <header className="text-center mb-16 space-y-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-2 shadow-[0_0_30px_rgba(0,214,161,0.2)]">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-heading">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Last Updated: June 2026. This policy describes how Airborne HRS collects, uses, and protects your personal and corporate data.
          </p>
        </header>

        <div className="glass-panel p-8 sm:p-12 rounded-[2rem] border border-white/10 shadow-2xl space-y-12">
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Database className="h-6 w-6 text-primary" />
              1. Information We Collect
            </h2>
            <div className="text-muted-foreground space-y-4 text-sm leading-relaxed">
              <p>When you use Airborne HRS, we may collect the following types of information:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-white/90">Account Information:</strong> Name, email address, company details, billing information, and role configurations.</li>
                <li><strong className="text-white/90">Employee Data:</strong> Information you input into the HRMS regarding your workforce, including performance reviews, attendance, payroll markers, and biometric data (if integration is enabled).</li>
                <li><strong className="text-white/90">Usage Data & Telemetry:</strong> Log files, IP addresses, browser types, and interaction telemetry (e.g., burst/daily read-write metrics via our Neural Monitor) to ensure system security and prevent abuse.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Globe className="h-6 w-6 text-primary" />
              2. How We Use Your Data
            </h2>
            <div className="text-muted-foreground space-y-4 text-sm leading-relaxed">
              <p>We process your information for the following purposes:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>To provide, maintain, and improve the Airborne HRS platform and our AGI architectures.</li>
                <li>To process payroll integrations, attendance tracking, and leave management.</li>
                <li>To enforce our Terms of Service, monitor quota limits, and detect fraudulent or unauthorized activity.</li>
                <li>To optimize GEO-targeted recruitment nodes and job portal searches.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Lock className="h-6 w-6 text-primary" />
              3. Data Security & Storage
            </h2>
            <div className="text-muted-foreground space-y-4 text-sm leading-relaxed">
              <p>
                Airborne HRS employs enterprise-grade security measures to protect your data. All sensitive information is encrypted at rest and in transit.
                Access to the platform is strictly governed by Role-Based Access Control (RBAC). 
              </p>
              <p>
                Data is stored in secure, geo-redundant database instances (e.g., Firebase/GCP). We only retain personal data for as long as necessary to fulfill the purposes outlined in this policy or as required by law.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              4. Cookies and Tracking
            </h2>
            <div className="text-muted-foreground space-y-4 text-sm leading-relaxed">
              <p>
                We use cookies to ensure the platform functions properly and to analyze usage patterns. You can manage your cookie preferences through the consent banner provided upon your first visit, or through your browser settings.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              5. Your Rights (GDPR & CCPA)
            </h2>
            <div className="text-muted-foreground space-y-4 text-sm leading-relaxed">
              <p>
                Depending on your location, you may have the right to access, rectify, delete, or restrict the processing of your personal data. 
                If you are a corporate customer, please manage your employee data directly via the Super Admin or HR portals.
              </p>
              <p>
                To exercise any privacy rights, contact our Data Protection Officer at <a href="mailto:privacy@airbornehrs.in" className="text-primary hover:underline">privacy@airbornehrs.in</a>.
              </p>
            </div>
          </section>

          <div className="pt-8 border-t border-white/10">
            <p className="text-xs text-muted-foreground text-center">
              By using our services, you acknowledge that you have read and understood this Privacy Policy.
              For more information, please refer to our <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
