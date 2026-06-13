import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Airborne HRS",
  description: "Terms and Conditions for Airborne HRS.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="relative min-h-screen bg-background py-32 px-6 lg:px-8">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 h-[50vh] w-[50vh] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[50vh] w-[50vh] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-4xl relative z-10 glass-panel p-8 sm:p-16 rounded-[2rem] border border-white/10 shadow-2xl">
        <h1 className="text-4xl font-bold text-white mb-2">Terms and Conditions</h1>
        <p className="text-muted-foreground mb-8 pb-8 border-b border-white/10">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
        
        <div className="prose prose-invert prose-p:text-muted-foreground prose-a:text-primary max-w-none">
          <p>
            Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the Airborne HRS website and services (the "Service") operated by Airborne HRS ("us", "we", or "our").
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service. These Terms apply to all visitors, users, and others who access or use the Service.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of Airborne HRS and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Airborne HRS.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. User Accounts</h2>
          <p>
            When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>
          <p>
            You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Acceptable Use Policy</h2>
          <p>You agree not to use the Service to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Violate any applicable local, national, or international law or regulation.</li>
            <li>Infringe upon the rights of others, including intellectual property and privacy rights.</li>
            <li>Transmit any material that is defamatory, offensive, or otherwise objectionable.</li>
            <li>Attempt to gain unauthorized access to our systems, scrape data, or disrupt the operation of the Service.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Limitation of Liability</h2>
          <p>
            In no event shall Airborne HRS, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. Disclaimer</h2>
          <p>
            Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">7. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which Airborne HRS operates, without regard to its conflict of law provisions.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">8. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">9. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at legal@airbornehrs.in.
          </p>
        </div>
      </div>
    </div>
  );
}
