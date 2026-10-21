import { Link } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';
import { LegalContactBlock, LegalPage, WebsiteLink } from '@/components/legal/LegalPage';
import { legalH2Class as h2Class, legalLinkClass as linkClass, legalListClass as listClass } from '@/components/legal/legalStyles';
import { BUSINESS } from '@/config/contact';

// Update LAST_UPDATED whenever the Terms change, and set it to the date the
// change actually goes live.
const LAST_UPDATED = 'October 21, 2026';

const TermsPage = () => {
  return (
    <>
      <PageMeta
        title="Terms of Service"
        description="Terms of service for using the BrightPath Web Studio website and how our web design and development services are provided."
        path="/terms-of-service"
      />
      <LegalPage title="Terms of Service" lastUpdated={LAST_UPDATED}>
        <p className="mb-4">
          Welcome to {BUSINESS.legalName} (“BrightPath,” “we,” “our,” “us”). These Terms of Service (“Terms”) govern your use of our website, <WebsiteLink /> (the “Website”), and describe how our services are provided. By accessing or using our Website, you agree to be bound by these Terms. If you do not agree, please do not use our Website.
        </p>

        <h2 className={h2Class}>1. Use of the Website</h2>
        <ul className={listClass}>
          <li>You agree to use the Website only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the Website.</li>
          <li>Unauthorized use of this Website may give rise to a claim for damages and/or be a criminal offense.</li>
        </ul>

        <h2 className={h2Class}>2. Our Services</h2>
        <ul className={listClass}>
          <li>BrightPath provides website design and development services, from improving existing websites to custom builds, along with ongoing maintenance and support after launch.</li>
          <li>All services are subject to a separate written agreement or quote between you and {BUSINESS.legalName}.</li>
          <li>To enter into an agreement for our services, you must be at least 18 years old and, if you are acting on behalf of a business, authorized to agree on its behalf.</li>
          <li>We reserve the right to refuse service, modify services, or discontinue offerings at any time.</li>
        </ul>

        <h2 className={h2Class}>3. Pricing</h2>
        <p className="mb-4">
          Prices shown on the Website, such as our monthly maintenance plan, are provided for general information. The final scope, pricing, timeline, and payment terms for any project are confirmed in a written agreement or quote, which governs if it differs from the Website.
        </p>

        <h2 className={h2Class}>4. Intellectual Property</h2>
        <ul className={listClass}>
          <li>The content, designs, graphics, logos, text, images, software, and other materials on this Website are owned by {BUSINESS.legalName} or by their respective owners. Client names, logos, and project work shown in our portfolio belong to their respective owners.</li>
          <li>You may not copy, reproduce, distribute, modify, or create derivative works from Website content without prior written permission from us or the relevant owner.</li>
        </ul>

        <h2 className={h2Class}>5. Third-Party Links</h2>
        <p className="mb-4">
          Our Website may contain links to third-party websites. We do not control, endorse, or take responsibility for the content or practices of those websites. Accessing third-party sites is at your own risk.
        </p>

        <h2 className={h2Class}>6. Disclaimers</h2>
        <ul className={listClass}>
          <li>The information on this Website is provided “as is” and for general information purposes only.</li>
          <li>We make no warranties or representations, express or implied, about the accuracy, reliability, or availability of the Website or its content.</li>
        </ul>

        <h2 className={h2Class}>7. Limitation of Liability</h2>
        <p className="mb-4">
          To the fullest extent permitted by law, {BUSINESS.legalName} will not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of the Website or our services.
        </p>

        <h2 className={h2Class}>8. Indemnification</h2>
        <p className="mb-4">
          You agree to indemnify and hold harmless {BUSINESS.legalName}, its owners, employees, and affiliates from any claims, damages, or expenses arising from your use of the Website or violation of these Terms.
        </p>

        <h2 className={h2Class}>9. Privacy</h2>
        <p className="mb-4">
          Your use of the Website is also governed by our <Link to="/privacy-policy" className={linkClass}>Privacy Policy</Link>, which explains how we collect and use your information, including contact form messages and newsletter signups.
        </p>

        <h2 className={h2Class}>10. Governing Law</h2>
        <ul className={listClass}>
          <li>These Terms are governed by and construed under the laws of the State of North Carolina, United States, without regard to conflict of law principles.</li>
          <li>Any disputes will be resolved exclusively in the courts located in Henderson County, North Carolina.</li>
        </ul>

        <h2 className={h2Class}>11. Changes to These Terms</h2>
        <p className="mb-4">
          We may update these Terms from time to time. Changes will be effective when posted on this page with a revised “Last Updated” date. Continued use of the Website means you accept the updated Terms.
        </p>

        <h2 className={h2Class}>12. Contact Us</h2>
        <p className="mb-4">If you have any questions about these Terms, please contact us:</p>
        <LegalContactBlock />
      </LegalPage>
    </>
  );
};

export default TermsPage;
