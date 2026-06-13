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
            At Airborne HRS, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (airbornehrs.in) or use our HR Management System (HRMS) and associated services (collectively, the "Services"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Information We Collect</h2>
          <p>We may collect information about you in a variety of ways. The information we may collect via the Website includes:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Website or when you choose to participate in various activities related to the Website, such as online chat and message boards.</li>
            <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Website, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Website.</li>
            <li><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Website. We store only very limited, if any, financial information that we collect.</li>
            <li><strong>Employee Data (for HRMS Clients):</strong> Data relating to employees of our clients uploaded into our platform. We act as a Data Processor for this information, while our clients act as Data Controllers.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Use of Your Information</h2>
          <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Website to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Create and manage your account.</li>
            <li>Process your transactions and deliver the services requested.</li>
            <li>Email you regarding your account or order.</li>
            <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Website.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Website.</li>
            <li>Notify you of updates to our Website and Services.</li>
            <li>Request feedback and contact you about your use of the Website.</li>
            <li>Resolve disputes and troubleshoot problems.</li>
            <li>Respond to product and customer service requests.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Disclosure of Your Information</h2>
          <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
            <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
            <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Tracking Technologies</h2>
          <p>
            <strong>Cookies and Web Beacons:</strong> We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Website to help customize the Website and improve your experience. When you access the Website, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Website. You may not decline web beacons. However, they can be rendered ineffective by declining all cookies or by modifying your web browser’s settings to notify you each time a cookie is tendered, permitting you to accept or decline cookies on an individual basis.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. Policy for Children</h2>
          <p>
            We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">7. Your Data Protection Rights (GDPR & CCPA)</h2>
          <p>Depending on your location, you may have the following rights regarding your personal data:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Right to Access:</strong> You have the right to request copies of your personal data.</li>
            <li><strong>Right to Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
            <li><strong>Right to Erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
            <li><strong>Right to Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
            <li><strong>Right to Object to Processing:</strong> You have the right to object to our processing of your personal data, under certain conditions.</li>
            <li><strong>Right to Data Portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">8. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at:
            <br/><br/>
            Airborne HRS<br/>
            Email: privacy@airbornehrs.in
          </p>
        </div>
      </div>
    </div>
  );
}
