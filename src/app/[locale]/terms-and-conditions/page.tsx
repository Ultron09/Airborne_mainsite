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
            These Terms and Conditions ("Terms", "Terms and Conditions") govern your relationship with the airbornehrs.in website and the Airborne HRS platform (the "Service") operated by Airborne HRS ("us", "we", or "our").
          </p>
          <p>
            Please read these Terms and Conditions carefully before using our Service. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Subscriptions and Accounts</h2>
          <p>
            Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set either on a monthly or annual basis, depending on the type of subscription plan you select when purchasing a Subscription.
          </p>
          <p>
            When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Intellectual Property</h2>
          <p>
            The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of Airborne HRS and its licensors. The Service is protected by copyright, trademark, and other laws of both the local and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Airborne HRS.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Data Ownership and Client Data</h2>
          <p>
            As a user of our HR Management System, you retain all rights to the data you input into our systems ("Client Data"). Airborne HRS claims no ownership over your Client Data. We process Client Data strictly in accordance with our Privacy Policy and solely for the purpose of providing the Services to you.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Acceptable Use</h2>
          <p>You agree not to use the Service:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>In any way that violates any applicable national or international law or regulation.</li>
            <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation.</li>
            <li>To impersonate or attempt to impersonate Airborne HRS, an Airborne HRS employee, another user, or any other person or entity.</li>
            <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Limitation of Liability</h2>
          <p>
            In no event shall Airborne HRS, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. Disclaimer</h2>
          <p>
            Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">7. Termination</h2>
          <p>
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">8. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of India and applicable international laws, without regard to its conflict of law provisions.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">9. Changes</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">10. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at legal@airbornehrs.in.
          </p>
        </div>
      </div>
    </div>
  );
}
