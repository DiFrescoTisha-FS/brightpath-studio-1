import React, { useRef, useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useAppStore } from '@/store/appStore'; // Import the store
import BrightPathGradientTitle from '@/components/BrightPathGradientTitle';
import { PageMeta } from '@/components/PageMeta';
import { BUSINESS } from '@/config/contact';
import { analyticsSafeUrl, loadAnalytics, trackEvent } from '@/utils/analytics';
import { IS_PRERENDER } from '@/utils/isPrerender';

// Define the shape of the form data
interface FormData {
  fullName: string;
  email: string;
  message: string;
}

// Submissions go to the `contact-inquiry` Netlify Function, which saves them
// through the Google Apps Script and only reports success once the script
// confirms the row was written. The script URL and secret stay server-side.
const CONTACT_ENDPOINT = `${import.meta.env.VITE_API_URL || ''}/api/contact-inquiry`;
const SUBMIT_TIMEOUT_MS = 20000;

type SubmitError = 'invalid' | 'rate_limited' | 'timeout' | 'failed' | 'unavailable';

const ERROR_MESSAGES: Record<SubmitError, string> = {
  invalid: 'Please check that your name, email address, and message are filled in correctly.',
  rate_limited: 'There have been too many attempts in a short time. Please wait a few minutes and try again.',
  timeout: 'We didn’t get confirmation in time. Your message may still have reached us — trying again won’t send a duplicate.',
  failed: 'We couldn’t confirm your message was received. Your message is still here — please try again.',
  unavailable: 'Our contact form isn’t available right now. Your message is still here.',
};

// One ID per distinct message. Resending the same content reuses it, so the
// server can recognise a retry and won't save the inquiry twice; editing the
// message after a failure gets a fresh ID so the edit is never discarded.
const newSubmissionId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
};


// Background images by theme and device
const BG_IMAGES = {
  light: {
    desktop: 'https://res.cloudinary.com/djqw1de3s/image/upload/v1779684787/brightpath/background-images/09733844-51EB-4FED-9D45-96D27F6B5721_h0pgqv.png',
    mobile: 'https://res.cloudinary.com/djqw1de3s/image/upload/v1779713339/brightpath/background-images/DD66B962-520A-4DB7-B601-AF7B05C10EA4_x49gkb.png',
  },
  dark: {
    desktop: 'https://res.cloudinary.com/djqw1de3s/image/upload/v1779684835/brightpath/background-images/39D0F6A1-1E44-47D3-AF62-76DA60A068D2_vrt9t4.png',
    mobile: 'https://res.cloudinary.com/djqw1de3s/image/upload/v1779711137/brightpath/background-images/775767A6-F757-46B8-BEDB-07E2CAFAE02A_tzca8a.png',
  },
};

const ContactPage: React.FC = () => {
  const { theme } = useAppStore(); // Get the current theme
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    message: ''
  });
  const [honeypot, setHoneypot] = useState(''); // Spam protection - bots fill this, humans don't see it
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<'success' | SubmitError | null>(null);
  const inFlight = useRef(false);
  const submission = useRef<{ key: string; id: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // A ref, not just state: a fast double-click can fire twice before React
    // re-renders the disabled button.
    if (inFlight.current) return;
    inFlight.current = true;
    setLoading(true);
    setStatus(null);

    const fields = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };
    const key = JSON.stringify(fields);
    if (submission.current?.key !== key) submission.current = { key, id: newSubmissionId() };

    let outcome: 'success' | SubmitError = 'failed';
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, bp_contact_extra: honeypot, submissionId: submission.current.id }),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => null);
      // Success only when the server confirms this exact submission was saved.
      if (response.ok && result?.status === 'received' && result.submissionId === submission.current.id) {
        outcome = 'success';
      } else if (result && typeof result.status === 'string' && result.status in ERROR_MESSAGES) {
        outcome = result.status as SubmitError;
      }
    } catch (error) {
      outcome = error instanceof DOMException && error.name === 'AbortError' ? 'timeout' : 'failed';
    } finally {
      window.clearTimeout(timer);
    }

    if (outcome === 'success') {
      // Track in Google Analytics — confirmed submissions only. Waits for
      // Analytics to finish loading (or be refused for this region) so a quick
      // submission isn't dropped; sends nothing where Analytics isn't allowed.
      void loadAnalytics().then(() => {
        trackEvent('contact_submit', {
          form_name: 'contact_form',
          page_location: analyticsSafeUrl(),
          page_title: document.title,
        });
      });
      setFormData({ fullName: '', email: '', message: '' }); // Clear the form
      submission.current = null;
    }
    // On any failure the visitor's name, email and message stay in the form.
    setStatus(outcome);
    setLoading(false);
    inFlight.current = false;
  };

  const themeClasses = {
    bg: theme === 'dark' ? 'bg-background' : 'bg-white',
    pageText: theme === 'dark' ? 'text-gray-100' : 'text-neutral-900',
    text: theme === 'dark' ? 'gradient-text-dark' : 'gradient-text-light',
    textMuted: theme === 'dark' ? 'text-gray-200' : 'text-gray-600',
    cardBg: theme === 'dark' ? 'bg-gray-200' : 'bg-gray-50',
    cardBorder: theme === 'dark' ? 'border-primary' : 'border-gray-200',
    inputBg: theme === 'dark' ? 'bg-midnight' : 'bg-gray-100',
    inputBorder: theme === 'dark' ? 'border-stone/30' : 'border-gray-300',
    inputText: 'text-gray-900', // Dark text for readability in both themes
    inputPlaceholder: theme === 'dark' ? 'placeholder:text-gray-500' : 'placeholder:text-gray-500',
    iconColor: theme === 'dark' ? 'text-primary' : 'text-primary',
    goldText: theme === 'dark' ? 'gradient-text-dark' : 'gradient-text-dark',
    textBoxBG: theme === 'dark' ? 'bg-gray-700' : 'bg-[#f9fafb]'
  };

  const bgImages = theme === 'dark' ? BG_IMAGES.dark : BG_IMAGES.light;

  return (
    <>
      {/* Mobile background */}
      <style>{`
        @media (max-width: 767px) {
          .contact-page-bg {
            background-image: url('${bgImages.mobile}');
          }
        }
        @media (min-width: 768px) {
          .contact-page-bg {
            background-image: url('${bgImages.desktop}');
          }
        }
      `}</style>
      <div className="contact-page-bg min-h-screen p-4 bg-cover bg-center bg-no-repeat md:bg-fixed">
      <PageMeta
        title="Contact"
        description="Start a conversation with BrightPath Web Studio. Tisha Di Fresco builds modern, performant websites — get in touch to discuss your project."
        path="/contact"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'BrightPath Web Studio Contact Page',
          description: 'Contact page for BrightPath Web Studio with phone, email, and a project inquiry form.',
          url: 'https://brightpathwebstudio.org/contact',
        }}
      />
      {/* Header Section */}
      <div className="text-center pt-28 pb-12 px-4">
        <BrightPathGradientTitle as="h1" className="text-4xl md:text-5xl font-poppins font-bold mb-4"
          gradientWords={["Contact"]}
        >Contact Us
        </BrightPathGradientTitle>
        <p className={`text-lg font-lato ${themeClasses.textMuted} max-w-2xl mx-auto`}>
          Ready to illuminate your digital presence? Let's start a conversation about bringing your vision to life.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

          {/* Left Column - Contact Info */}
          <div className="flex flex-col gap-8">
            <div className={`${themeClasses.cardBg} p-8 rounded-lg border ${themeClasses.cardBorder} flex-1 flex flex-col`}>
              <BrightPathGradientTitle as="h2" className="gradient-text-dark text-2xl font-poppins font-semibold mb-6"
                textColor="text-neutral-800 dark:gray-200"
                gradientWords={["Touch"]}
              >
                Get In Touch
              </BrightPathGradientTitle>

              {/* When this card stretches to match the form beside it, the
                  extra height is shared between the items rather than left
                  as a gap under the last one. Stacked on mobile it doesn't
                  stretch, so the spacing stays at gap-6. */}
              <div className="flex flex-1 flex-col justify-between gap-6">
                {/* Business Name */}
                <div className="flex items-center space-x-4">
                  <img
                    src="/images/brightpath-logo-light.png"
                    alt="BrightPath Web Studio Logo"
                    className="h-16 w-auto flex-shrink-0"
                  />
                  <div>
                    <BrightPathGradientTitle
                      className="font-poppins font-semibold text-lg"
                      textColor="text-neutral-800"
                      gradientWords={["BrightPath"]}
                    >
                      {BUSINESS.legalName}
                    </BrightPathGradientTitle>
                    <p className={`font-lato ${theme === 'dark' ? 'text-gray-700' : 'text-gray-700'}`}>
                      Your beacon in the digital landscape
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <MapPin className={`w-6 h-6 ${themeClasses.iconColor} mt-1 flex-shrink-0`} />
                  <div>
                    <BrightPathGradientTitle
                      as="h3"
                      className="font-poppins font-semibold text-lg mb-1"
                    >
                      Location
                    </BrightPathGradientTitle>
                    <p className={`font-lato ${theme === 'dark' ? 'text-gray-700' : 'text-gray-700'}`}>
                      {BUSINESS.location}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <Phone className={`w-6 h-6 ${themeClasses.iconColor} mt-1 flex-shrink-0`} />
                  <div>
                    <BrightPathGradientTitle as="h3" className="font-poppins font-semibold text-lg mb-1">
                      Phone
                    </BrightPathGradientTitle>
                    <p className={`font-lato ${theme === 'dark' ? 'text-gray-700' : 'text-gray-700'}`}>
                      <a href={BUSINESS.phoneHref} className="hover:underline underline-offset-2">{BUSINESS.phoneDisplay}</a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <Mail className={`w-6 h-6 ${themeClasses.iconColor} mt-1 flex-shrink-0`} />
                  <div>
                    <BrightPathGradientTitle as="h3" className="font-poppins font-semibold text-lg mb-1">
                      Email
                    </BrightPathGradientTitle>
                    <p className={`font-lato ${theme === 'dark' ? 'text-gray-700' : 'text-gray-700'}`}>
                      <a href={`mailto:${BUSINESS.email}`} className="hover:underline underline-offset-2 break-words">{BUSINESS.email}</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info Box */}
            <div className={`p-6 rounded-lg border border-gold/20 ${themeClasses.textBoxBG}`}>
              <BrightPathGradientTitle as="h3" className="font-poppins font-semibold text-2xl mb-1" gradientWords={["BrightPath"]}>
                Why Choose BrightPath?
              </BrightPathGradientTitle>
              <p className={`font-lato text-sm leading-relaxed ${themeClasses.textMuted}`}>
                We don’t just build websites. We help businesses create better online experiences that attract
                customers, build trust, and support real business goals.
              </p>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className={`${themeClasses.cardBg} p-8 rounded-lg border ${themeClasses.cardBorder}`}>
            <BrightPathGradientTitle as="h2" className="text-2xl font-poppins font-semibold mb-6"
              textColor='text-neutral-800'
              gradientWords={["Message"]}>
              Send Us a Message
            </BrightPathGradientTitle>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field - hidden from humans, bots will fill it.
                  Named so browser autofill and password managers don't
                  recognise it: as "website" it was being autofilled, which
                  made real messages look like spam and silently dropped them. */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="bp_contact_extra">Leave this field empty</label>
                <input
                  type="text"
                  id="bp_contact_extra"
                  name="bp_contact_extra"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  data-1p-ignore="true"
                  data-lpignore="true"
                  data-bwignore="true"
                  data-form-type="other"
                />
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="mb-1">
                  <BrightPathGradientTitle
                    as="span"
                    className="font-poppins font-semibold text-lg"
                  >
                    Full Name
                  </BrightPathGradientTitle>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  maxLength={200}
                  autoComplete="name"
                  className={`w-full px-4 py-3 ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg ${themeClasses.inputText} font-lato ${themeClasses.inputPlaceholder} focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors`}
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Address */}
              <div>
              <label htmlFor="email" className="mb-1">
                  <BrightPathGradientTitle
                    as="span"
                    className="font-poppins font-semibold text-lg"
                  >
                    Email
                  </BrightPathGradientTitle>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  maxLength={254}
                  autoComplete="email"
                  className={`w-full px-4 py-3 ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg ${themeClasses.inputText} font-lato ${themeClasses.inputPlaceholder} focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors`}
                  placeholder="Enter your email address"
                />
              </div>

              {/* Message */}
              <div>
              <label htmlFor="message" className="mb-1">
                  <BrightPathGradientTitle
                    as="span"
                    className="font-poppins font-semibold text-lg"
                  >
                    Message
                  </BrightPathGradientTitle>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  maxLength={5000}
                  rows={6}
                  className={`w-full px-4 py-3 ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg ${themeClasses.inputText} font-lato ${themeClasses.inputPlaceholder} focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors resize-vertical`}
                  placeholder="Tell us about your project and how we can help illuminate your path to success..."
                />
              </div>

              {/* Form Submission Status */}
              {loading && (
                <div className="text-center text-gold font-lato">Sending message...</div>
              )}
              {/* Live regions stay mounted so screen readers announce the
                  outcome, but take no space until there's a message. */}
              <div className={status ? 'space-y-2' : 'sr-only'}>
                <div role="status">
                  {status === 'success' && (
                    <p className="text-center text-green-800 font-lato">Thank you! Your message has been sent successfully. We typically respond within one business day.</p>
                  )}
                </div>
                <div role="alert">
                  {status && status !== 'success' && (
                    <p className="text-center text-red-700 font-lato">
                      {ERROR_MESSAGES[status]} You can also email{' '}
                      <a href={`mailto:${BUSINESS.email}`} className="underline underline-offset-2 font-semibold break-words">{BUSINESS.email}</a>
                      {' '}or call{' '}
                      <a href={BUSINESS.phoneHref} className="underline underline-offset-2 font-semibold whitespace-nowrap">{BUSINESS.phoneDisplay}</a>.
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                // Disabled in the prerendered HTML: a form submitted before the
                // app takes over would reload the page with the visitor's
                // details in the URL instead of sending them.
                disabled={loading || IS_PRERENDER}
                className={`w-full bg-primary hover:bg-yellow-400 text-shadow-md text-slate-800 font-lato font-bold py-3 px-6 rounded-lg transition-all duration-300 transform shadow-lg hover:shadow-xl
                ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-400 hover:scale-105'}`}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            {/* Form Footer */}
            <div className={`mt-6 pt-6 border-t ${themeClasses.cardBorder}`}>
              <p className="font-lato text-sm text-center text-gray-700">
                We typically respond within one business day. Let's start building something brilliant together!
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default ContactPage;
