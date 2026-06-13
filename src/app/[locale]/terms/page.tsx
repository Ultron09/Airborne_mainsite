import { Metadata } from "next";
import { Scale, AlertTriangle, FileCheck, Landmark } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Airborne HRS",
  description: "Terms and Conditions of use for the Airborne HRS platform.",
};

export default function TermsOfServicePage() {
  return (
    <div className="relative min-h-screen bg-background py-16 px-6 lg:px-8 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[40%] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="mx-auto max-w-4xl relative z-10">
        <header className="text-center mb-16 space-y-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-2 shadow-[0_0_30px_rgba(0,214,161,0.2)]">
            <Scale className="h-8 w-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-heading">
            Terms of Service
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Last Updated: June 2026. By using the Airborne HRS platform, you agree to be bound by the following terms.
          </p>
        </header>

        <div className="glass-panel p-8 sm:p-12 rounded-[2rem] border border-white/10 shadow-2xl space-y-12">
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <FileCheck className="h-6 w-6 text-primary" />
              1. Acceptance of Terms
            </h2>
            <div className="text-muted-foreground space-y-4 text-sm leading-relaxed">
              <p>
                By accessing or using the Airborne HRS website, software, or services, you agree to be bound by these Terms of Service. If you are entering into these Terms on behalf of an entity, you represent that you have the authority to bind such entity.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Landmark className="h-6 w-6 text-primary" />
              2. Service Provision & Licensing
            </h2>
            <div className="text-muted-foreground space-y-4 text-sm leading-relaxed">
              <p>
                Subject to your compliance with these Terms and payment of applicable subscription fees, Airborne HRS grants you a non-exclusive, non-transferable, revocable license to access and use the platform for your internal HR and workforce management purposes.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>You may not reverse-engineer, decompile, or otherwise attempt to extract the source code or proprietary AI architectures of the platform.</li>
                <li>You may not use the platform to process data illegally or in violation of any applicable labor, privacy, or data protection laws.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-primary" />
              3. Limitations of Liability
            </h2>
            <div className="text-muted-foreground space-y-4 text-sm leading-relaxed">
              <p>
                Airborne HRS is provided "as is" and "as available". We do not warrant that the service will be uninterrupted, completely secure, or error-free.
              </p>
              <p>
                In no event shall Airborne HRS, its directors, employees, or partners be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              4. Subscription and Quotas
            </h2>
            <div className="text-muted-foreground space-y-4 text-sm leading-relaxed">
              <p>
                Your access is governed by the limits established by your Super Admin or the terms of your specific billing tier. Exceeding configured daily telemetry or read/write limits may result in temporary throttling or alerts as part of our fair usage policy.
              </p>
            </div>
          </section>

          <div className="pt-8 border-t border-white/10">
            <p className="text-xs text-muted-foreground text-center">
              For information on how we handle your data, please read our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              If you have any questions about these Terms, contact <a href="mailto:legal@airbornehrs.in" className="text-primary hover:underline">legal@airbornehrs.in</a>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
