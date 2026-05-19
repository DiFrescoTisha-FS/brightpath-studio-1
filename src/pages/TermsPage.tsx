import { PageMeta } from '@/components/PageMeta';

const TermsPage = () => {
  return (
    <div className="bg-stone text-deep-dark py-20 px-4 sm:px-6 lg:px-8">
      <PageMeta
        title="Terms and Conditions"
        description="Terms and conditions for using the BrightPath Web Studio website and services."
        path="/terms-of-service"
      />
      <div className="max-w-4xl mx-auto font-lato">
        <h1 className="text-4xl font-poppins font-bold text-center mb-4">Terms and Conditions</h1>
        <p className="text-center text-sm text-gray-600 mb-12">
          Effective Date: <strong className="text-brightpath-blue">[Insert Date]</strong> | Last Updated: <strong className="text-brightpath-blue">[Insert Date]</strong>
        </p>
        
        <p className="mb-4">
          Welcome to BrightPath Web Studio LLC (“Company,” “we,” “our,” “us”). These Terms and Conditions (“Terms”) govern your use of our website, <a href="http://www.brightpathwebstudio.com" className="text-brightpath-blue hover:underline">www.brightpathwebstudio.com</a> (“Website”), and any services, products, or content offered through it. By accessing or using our Website, you agree to be bound by these Terms. If you do not agree, you must not use our Website.
        </p>

        <h2 className="text-2xl font-poppins font-semibold mt-8 mb-3">1. Use of Website</h2>
        <ul className="list-disc ml-8 mb-4 space-y-2">
          <li>You must be at least 18 years old to use our Website.</li>
          <li>You agree to use the Website only for lawful purposes and in a way that does not infringe the rights of others or restrict their use.</li>
          <li>Unauthorized use of this Website may give rise to a claim for damages and/or be a criminal offense.</li>
        </ul>

        <h2 className="text-2xl font-poppins font-semibold mt-8 mb-3">2. Intellectual Property</h2>
        <ul className="list-disc ml-8 mb-4 space-y-2">
            <li>All content, designs, graphics, logos, text, images, software, and other materials on this Website are owned or licensed by BrightPath Web Studio LLC.</li>
            <li>You may not copy, reproduce, distribute, modify, or create derivative works without our prior written consent.</li>
        </ul>

        <h2 className="text-2xl font-poppins font-semibold mt-8 mb-3">3. Services</h2>
        <ul className="list-disc ml-8 mb-4 space-y-2">
            <li>Any services described on the Website are subject to a separate written agreement between you and BrightPath Web Studio LLC.</li>
            <li>We reserve the right to refuse service, modify services, or discontinue offerings at any time.</li>
        </ul>

        <h2 className="text-2xl font-poppins font-semibold mt-8 mb-3">4. Third-Party Links</h2>
        <p className="mb-4">
          Our Website may contain links to third-party websites. We do not control, endorse, or take responsibility for the content or practices of those websites. Accessing third-party sites is at your own risk.
        </p>

        <h2 className="text-2xl font-poppins font-semibold mt-8 mb-3">5. Disclaimers</h2>
        <ul className="list-disc ml-8 mb-4 space-y-2">
            <li>The information on this Website is provided “as is” and for general information purposes only.</li>
            <li>We make no warranties or representations, express or implied, about the accuracy, reliability, or availability of the Website or its content.</li>
        </ul>
        
        <h2 className="text-2xl font-poppins font-semibold mt-8 mb-3">6. Limitation of Liability</h2>
        <p className="mb-4">
          To the fullest extent permitted by law, BrightPath Web Studio LLC will not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of the Website or our services.
        </p>

        <h2 className="text-2xl font-poppins font-semibold mt-8 mb-3">7. Indemnification</h2>
        <p className="mb-4">
          You agree to indemnify and hold harmless BrightPath Web Studio LLC, its owners, employees, and affiliates from any claims, damages, or expenses arising from your use of the Website or violation of these Terms.
        </p>
        
        <h2 className="text-2xl font-poppins font-semibold mt-8 mb-3">8. Privacy</h2>
        <p className="mb-4">
          Your use of the Website is also governed by our <a href="/privacy-policy" className="text-brightpath-blue hover:underline">Privacy Policy</a>. Please review it to understand how we collect and use your information.
        </p>
        
        <h2 className="text-2xl font-poppins font-semibold mt-8 mb-3">9. Governing Law</h2>
        <ul className="list-disc ml-8 mb-4 space-y-2">
            <li>These Terms are governed by and construed under the laws of the State of North Carolina, United States, without regard to conflict of law principles.</li>
            <li>Any disputes will be resolved exclusively in the courts located in Henderson County, North Carolina.</li>
        </ul>

        <h2 className="text-2xl font-poppins font-semibold mt-8 mb-3">10. Changes to Terms</h2>
        <p className="mb-4">
          We may update these Terms from time to time. Changes will be effective when posted on this page with a revised “Effective Date.” Continued use of the Website means you accept the updated Terms.
        </p>

        <h2 className="text-2xl font-poppins font-semibold mt-8 mb-3">11. Contact Us</h2>
        <p className="mb-4">If you have any questions about these Terms, please contact us at:</p>
        <div className="mt-4">
            <p><strong>BrightPath Web Studio LLC</strong></p>
            <p>Email: <strong className="text-brightpath-blue"></strong></p>
            <p>Phone: <strong className="text-brightpath-blue">[Insert Business Phone]</strong></p>
            <p>Address: <strong className="text-brightpath-blue">[Insert Mailing Address]</strong></p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;