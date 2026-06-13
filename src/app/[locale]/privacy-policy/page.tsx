import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Airborne HRS",
  description: "Privacy Policy and Data Usage terms for Airborne HRS.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen bg-background py-32 px-6 lg:px-8">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 h-[50vh] w-[50vh] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[50vh] w-[50vh] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-4xl relative z-10 glass-panel p-8 sm:p-16 rounded-[2rem] border border-white/10 shadow-2xl">
        <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8 pb-8 border-b border-white/10">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
        
        <div className="prose prose-invert prose-p:text-muted-foreground prose-a:text-primary max-w-none">
          <p>
            At Airborne HRS, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our website and services, in compliance with the General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and other applicable data protection laws.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Personal Information:</strong> Name, email address, company name, and phone number when you request a demo or create an account.</li>
            <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent on pages, scroll depth, and the referring website (source).</li>
            <li><strong>Technical Data:</strong> Anonymized IP addresses, browser type, device type, and approximate geographic location (Country, City, Region).</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. How We Use Your Information</h2>
          <p>We use the collected data for the following purposes:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>To provide, maintain, and improve our services.</li>
            <li>To process and fulfill your requests, such as scheduling a demo.</li>
            <li>To analyze website traffic and user engagement to optimize our content.</li>
            <li>To communicate with you regarding updates, security alerts, and support.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies (such as web beacons) to track activity on our service. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some portions of our service may not function optimally. We utilize an explicit cookie consent banner; tracking for analytics will only occur if you provide affirmative consent.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Data Sharing and Disclosure</h2>
          <p>We do not sell your personal data. We may share your information only in the following situations:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Service Providers:</strong> We may share data with third-party vendors who assist us in operating our website and business (e.g., hosting, analytics).</li>
            <li><strong>Legal Requirements:</strong> We may disclose your data if required to do so by law or in response to valid requests by public authorities.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Data Security</h2>
          <p>
            The security of your data is important to us. We implement commercially acceptable security measures to protect your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. Your Data Protection Rights</h2>
          <p>Depending on your location, you may have the following rights regarding your personal data:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>The right to access, update, or delete the information we have on you.</li>
            <li>The right of rectification (to correct inaccurate data).</li>
            <li>The right to object to or restrict processing.</li>
            <li>The right to data portability.</li>
            <li>The right to withdraw consent at any time.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@airbornehrs.in.
          </p>
        </div>
      </div>
    </div>
  );
}
