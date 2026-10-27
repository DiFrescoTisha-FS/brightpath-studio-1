import { PageMeta } from '@/components/PageMeta';
import { EmailLink, ExternalLink, LegalContactBlock, LegalPage, WebsiteLink } from '@/components/legal/LegalPage';
import { legalH2Class as h2Class, legalH3Class as h3Class, legalLinkClass as linkClass, legalListClass as listClass } from '@/components/legal/legalStyles';
import { BUSINESS } from '@/config/contact';

// Update LAST_UPDATED whenever the policy text changes, and set it to the date
// the change actually goes live.
const LAST_UPDATED = 'October 27, 2026';

const PrivacyPage = () => {
  return (
    <>
      <PageMeta
        title="Privacy Policy"
        description="How BrightPath Web Studio collects, uses, and protects your information, including newsletter signups, the contact form, and website analytics."
        path="/privacy-policy"
      />
      <LegalPage title="Privacy Policy" lastUpdated={LAST_UPDATED}>
        <p className="mb-4">
          {BUSINESS.legalName} (“BrightPath,” “we,” “our,” “us”) respects your privacy. This Privacy Policy explains what information we collect when you use our website,{' '}
          <WebsiteLink /> (the “Website”), how we use it, and the choices you have.
        </p>

        <h2 className={h2Class}>1. Information We Collect</h2>

        <h3 className={h3Class}>Information you give us</h3>
        <ul className={listClass}>
          <li><strong>Contact form:</strong> your full name, email address, and the message you write when you send us an inquiry.</li>
          <li><strong>Newsletter signup:</strong> your email address and, if you choose to provide it, your first name. See <a href="#newsletter" className={linkClass}>Section 3</a> for details.</li>
          <li><strong>Emails and calls:</strong> whatever you choose to share when you contact us directly.</li>
        </ul>

        <h3 className={h3Class}>Information collected automatically</h3>
        <ul className={listClass}>
          <li><strong>Analytics data:</strong> for visitors who appear to be in the United States, we use Google Analytics to understand how visitors use the Website (see Section 4) — for example, which pages are viewed, how visitors arrived (the referring website), browser and device type, approximate location (such as city or country), and certain actions such as clicking a project link or submitting the contact form. Google Analytics does not receive the content of the forms you fill out.</li>
          <li><strong>Technical data:</strong> like any website, our hosting and image-delivery providers receive standard technical information, such as your IP address and browser details, when your browser requests pages and images.</li>
        </ul>

        <h2 className={h2Class}>2. How We Use Your Information</h2>
        <p className="mb-4">We use the information we collect to:</p>
        <ul className={listClass}>
          <li>Respond to your inquiries and communicate with you about our services.</li>
          <li>Send The BrightPath Update, our newsletter, to people who have signed up and confirmed their subscription.</li>
          <li>Understand how the Website is used so we can improve it.</li>
          <li>Operate, maintain, and protect the Website, including preventing spam and abuse.</li>
        </ul>

        <h2 id="newsletter" className={`${h2Class} scroll-mt-24`}>3. Our Newsletter</h2>
        <p className="mb-4">
          The BrightPath Update is our email newsletter, with news from BrightPath Web Studio, our recent projects, and practical website tips. It’s sent approximately once a month, so the timing can vary. Subscribing is entirely voluntary, and you don’t need to subscribe to use the Website or work with us.
        </p>
        <ul className={listClass}>
          <li><strong>What we collect:</strong> your email address (required) and your first name (optional). When you sign up, we pass MailerLite the IP address your signup came from, and MailerLite records the date and time you subscribed. When you confirm your subscription, MailerLite also records the date, time, and IP address of your confirmation. These records help document your consent to receive the newsletter.</li>
          <li><strong>Confirming your subscription (double opt-in):</strong> if your email address is new to our list, we send you an email asking you to confirm your subscription. You won’t receive the newsletter unless you click the confirmation link. After you confirm, we send you a welcome email. If your address is already on our list — for example, because you’ve subscribed before, signed up without confirming, or unsubscribed — signing up again doesn’t change your existing record and doesn’t send another email. Contact us if you need help with an existing subscription.</li>
          <li><strong>Our email provider:</strong> newsletter subscriptions are managed and delivered through MailerLite, which stores your subscription details and sends our emails on our behalf. You can read{' '}
            <ExternalLink href="https://www.mailerlite.com/legal/privacy-policy">MailerLite’s Privacy Policy</ExternalLink>.
          </li>
          <li><strong>Email engagement:</strong> our newsletter emails contain a small invisible image that tells MailerLite when an email is opened, along with the IP address and type of email program used to open it. MailerLite uses that IP address to estimate the country where the email was opened. MailerLite may also record which links in our emails are clicked. We use this information to understand which content is most useful. Some email programs load images automatically, so these records aren’t always accurate.</li>
          <li><strong>Unsubscribing:</strong> every newsletter includes an unsubscribe link, and you can use it at any time to stop receiving the newsletter and withdraw your consent. You can also email us at <EmailLink /> and we’ll unsubscribe you. Our signup form can’t reactivate an address that has unsubscribed, so if you’d like to subscribe again later, please email us.</li>
        </ul>

        <h3 className={h3Class}>How long we keep newsletter information</h3>
        <ul className={listClass}>
          <li><strong>While you’re subscribed:</strong> we keep your subscription details.</li>
          <li><strong>If you don’t confirm:</strong> each month, we review unconfirmed signups and remove those that have stayed unconfirmed for more than 30 days from our mailing list, so a signup may remain until the next review after that point. This review is our own procedure, not an automatic MailerLite feature. Removing a signup from our list doesn’t necessarily erase the historical information MailerLite keeps about it.</li>
          <li><strong>If you unsubscribe:</strong> MailerLite keeps your record and its status history, which can include the dates you subscribed and confirmed, your signup and confirmation IP addresses, your list membership, and your email activity. We keep the information reasonably necessary to honor your unsubscribe request and to document your subscription and consent history, subject to any legal obligations that apply. This information isn’t removed automatically.</li>
          <li><strong>If you ask us to delete your information:</strong> we’ll review and honor your request as applicable, keeping only what is necessary for legitimate legal or compliance purposes.</li>
        </ul>

        <h2 className={h2Class}>4. Cookies and Similar Technologies</h2>
        <ul className={listClass}>
          <li><strong>Analytics cookies (United States only):</strong> we use Google Analytics only for visitors who appear to be in the United States. When you first interact with a page, your browser checks whether its time-zone setting is a U.S. time zone (this check happens on your device and the time zone isn’t sent to us), and our hosting provider estimates your country from your IP address; we don’t store either result. If either check indicates you’re outside the United States — including in the European Economic Area, the United Kingdom, or Switzerland — or a check can’t be completed, Google Analytics doesn’t load, no Analytics cookies are set, and nothing is sent to Google Analytics. For visitors who pass both checks, Google Analytics sets cookies in your browser to distinguish visitors and sessions. These checks are estimates and can be wrong — for example, if you use a VPN or have changed your device’s time zone. If Google’s own location estimate places a visitor outside the United States, Google Analytics is instructed not to set cookies, but Google may still receive limited measurement data without cookies. Google’s advertising features are turned off for our Analytics. You can block or delete cookies in your browser settings, or install Google’s{' '}
            <ExternalLink href="https://tools.google.com/dlpage/gaoptout">Google Analytics Opt-out Browser Add-on</ExternalLink>.
          </li>
          <li><strong>Theme preference:</strong> the Website saves your light or dark mode choice in your browser’s local storage so it’s remembered on your next visit. This stays on your device and isn’t sent to us.</li>
          <li><strong>Security cookie:</strong> some images — currently on our Home, Services, and Reviews pages — load from our WordPress content management system, which is protected by Cloudflare. When those images load, Cloudflare may set a short-lived security cookie, <code>__cf_bm</code>, to help tell people from automated traffic. It expires after about 30 minutes.</li>
        </ul>
        <p className="mb-4">We do not use advertising or retargeting cookies.</p>

        <h2 className={h2Class}>5. Service Providers We Use</h2>
        <p className="mb-4">We rely on a small number of trusted service providers to run the Website and our business. They process information only to provide their services to us:</p>
        <ul className={listClass}>
          <li><strong>Netlify</strong> — hosts the Website and runs the server functions that process contact form messages and newsletter signups.</li>
          <li><strong>Google</strong> — Google Analytics for website analytics (United States visitors only), and Google Workspace (including Google Apps Script and Google Sheets) to receive and store contact form messages and notify us of new inquiries.</li>
          <li><strong>MailerLite</strong> — manages newsletter subscriptions and sends our newsletter.</li>
          <li><strong>Cloudinary</strong> — stores and delivers many of the images on the Website.</li>
          <li><strong>Cloudflare and our WordPress content management system</strong> — store and deliver some page content and images, such as those on our Services page.</li>
        </ul>

        <h2 className={h2Class}>6. Sharing of Information</h2>
        <p className="mb-4">
          <strong>We do not sell, trade, or rent your personal information.</strong> We share information only in these cases:
        </p>
        <ul className={listClass}>
          <li>With the service providers listed above, so they can operate the Website and deliver our services.</li>
          <li>If required by law or legal process.</li>
          <li>To protect the rights, property, or safety of {BUSINESS.legalName} or others.</li>
        </ul>

        <h2 className={h2Class}>7. Data Security</h2>
        <p className="mb-4">
          We use reasonable technical and organizational safeguards to protect the personal information we collect. However, no method of internet transmission or electronic storage can be guaranteed completely secure.
        </p>

        <h2 className={h2Class}>8. Your Choices and Rights</h2>
        <p className="mb-4">You can:</p>
        <ul className={listClass}>
          <li>Unsubscribe from The BrightPath Update at any time using the link in any newsletter email, or by emailing us.</li>
          <li>Ask us what personal information we hold about you, including your newsletter subscription details such as your name and email address, or ask us to correct or delete it.</li>
          <li>Limit analytics tracking by blocking cookies or using the Google Analytics opt-out add-on.</li>
        </ul>
        <p className="mb-4">
          Depending on where you live, you may have additional rights under local privacy laws. To make a request or ask a question, email us at <EmailLink />.
        </p>

        <h2 className={h2Class}>9. Third-Party Links</h2>
        <p className="mb-4">
          Our Website links to other websites, such as client projects and our social profiles. We are not responsible for the privacy practices or content of third-party sites.
        </p>

        <h2 className={h2Class}>10. Children’s Privacy</h2>
        <p className="mb-4">
          Our Website is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we learn that we have collected such information, we will take reasonable steps to delete it.
        </p>

        <h2 className={h2Class}>11. Changes to This Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy as our services or practices change. When we do, we will post the revised policy on this page and update the “Last Updated” date.
        </p>

        <h2 className={h2Class}>12. Contact Us</h2>
        <p className="mb-4">If you have any questions about this Privacy Policy or how we handle your information, please contact us:</p>
        <LegalContactBlock />
      </LegalPage>
    </>
  );
};

export default PrivacyPage;
