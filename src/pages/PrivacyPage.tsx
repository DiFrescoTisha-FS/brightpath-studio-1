import { PageMeta } from '@/components/PageMeta';

const PrivacyPage = () => {
  return (
    <div className="bg-stone text-deep-dark py-20 px-4 sm:px-6 lg:px-8">
      <PageMeta
        title="Privacy Policy"
        description="How BrightPath Web Studio collects, uses, and protects your information."
        path="/privacy-policy"
      />
      <div className="max-w-4xl mx-auto font-lato">
        <h1 className="text-4xl font-poppins font-bold text-center mb-4">Privacy Policy</h1>
        <p className="text-center text-sm text-gray-600 mb-12">
          Effective Date: <strong className="text-brightpath-blue">[Insert Date]</strong> | Last Updated: <strong className="text-brightpath-blue">[Insert Date]</strong>
        </p>
        
        <p className="mb-4">
          BrightPath Web Studio LLC (“Company,” “we,” “our,” “us”) respects your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our website, <a href="http://www.brightpathwebstudio.com" className="text-brightpath-blue hover:underline">www.brightpathwebstudio.com</a> (“Website”).
        </p>

        <h2 className="text-2xl font-poppins font-semibold mt-8 mb-3">1. Information We Collect</h2>
        <p className="mb-4">We may collect the following types of information:</p>
        <ul className="list-disc ml-8 mb-4 space-y-2">
          <li><strong>Personal Information:</strong> Information you voluntarily provide, such as your name, email address, phone number, or other details when you fill out contact forms or request services.</li>
          <li><strong>Usage Data:</strong> Non-personal information such as your IP address, browser type, operating system, referring URLs, and pages visited on our Website.</li>
          <li><strong>Cookies and Tracking Technologies:</strong> We may use cookies, pixels, and analytics tools to improve your browsing experience and understand Website traffic.</li>
        </ul>

        <h2 className="text-2xl font-poppins font-semibold mt-8 mb-3">2. How We Use Your Information</h2>
        <p className="mb-4">We use collected information to:</p>
        <ul className="list-disc ml-8 mb-4 space-y-2">
            <li>Provide, operate, and improve our services.</li>
            <li>Respond to inquiries and communicate with you.</li>
            <li>Send updates, marketing, or promotional materials (only if you opt in).</li>
            <li>Analyze usage patterns to improve the Website.</li>
        </ul>

        <h2 className="text-2xl font-poppins font-semibold mt-8 mb-3">3. Sharing of Information</h2>
        <p className="mb-4">We do not sell, trade, or rent your personal information. We may share information only in these cases:</p>
        <ul className="list-disc ml-8 mb-4 space-y-2">
            <li>With trusted service providers who assist in operating our Website or delivering services.</li>
            <li>If required by law or legal process.</li>
            <li>To protect the rights, property, or safety of BrightPath Web Studio LLC or others.</li>
        </ul>

        <h2 className="text-2xl font-poppins font-semibold mt-8 mb-3">4. Data Security</h2>
        <p className="mb-4">
          We take reasonable measures to protect your personal information, but no system is 100% secure. By using our Website, you acknowledge that transmission of information via the internet is at your own risk.
        </p>

        <h2 className="text-2xl font-poppins font-semibold mt-8 mb-3">5. Your Rights</h2>
        <p className="mb-4">Depending on your location, you may have rights to:</p>
        <ul className="list-disc ml-8 mb-4 space-y-2">
            <li>Access, correct, or delete your personal information.</li>
            <li>Opt out of receiving marketing communications.</li>
            <li>Restrict or object to certain types of processing.</li>
        </ul>
        <p className="mb-4">To exercise these rights, contact us at <strong className="text-brightpath-blue">[Insert Business Email]</strong>.</p>


        <h2 className="text-2xl font-poppins font-semibold mt-8 mb-3">6. Third-Party Links</h2>
        <p className="mb-4">
          Our Website may contain links to other websites. We are not responsible for the privacy practices or content of third-party sites.
        </p>

        <h2 className="text-2xl font-poppins font-semibold mt-8 mb-3">7. Children’s Privacy</h2>
        <p className="mb-4">
          Our Website is not directed toward children under 13. We do not knowingly collect information from children. If we learn we have received information from a child, we will delete it.
        </p>
        
        <h2 className="text-2xl font-poppins font-semibold mt-8 mb-3">8. Changes to This Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised “Effective Date.” Continued use of our Website means you accept the updated policy.
        </p>

        <h2 className="text-2xl font-poppins font-semibold mt-8 mb-3">9. Contact Us</h2>
        <p className="mb-4">If you have any questions about this Privacy Policy, please contact us:</p>
        <div className="mt-4">
            <p><strong>BrightPath Web Studio LLC</strong></p>
            <p>Email: <strong className="text-brightpath-blue">[Insert Business Email]</strong></p>
            <p>Phone: <strong className="text-brightpath-blue">[Insert Business Phone]</strong></p>
            <p>Address: <strong className="text-brightpath-blue">[Insert Mailing Address]</strong></p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;