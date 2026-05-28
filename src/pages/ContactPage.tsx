import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useAppStore } from '@/store/appStore'; // Import the store
import BrightPathGradientTitle from '@/components/BrightPathGradientTitle';
import { PageMeta } from '@/components/PageMeta';

// Define the shape of the form data
interface FormData {
  fullName: string;
  email: string;
  message: string;
}

declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: string,
      params?: Record<string, string>
    ) => void;
  }
}

// Google Apps Script endpoint for contact form submissions
// Saves to Google Sheet + sends email notification to Google Workspace
const CONTACT_FORM_URL = 'https://script.google.com/macros/s/AKfycbyW1GDPbHkKNiwAM5iFnydDKq8y76bz3Gk3t9BoNGL7A3KqDmHZ_J-6AS3XFKuY2dgm/exec';


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
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null); // Reset status on new submission

    // Honeypot spam check - if filled, a bot submitted the form
    // Silently "succeed" without actually sending to avoid tipping off the bot
    if (honeypot) {
      setTimeout(() => {
        setStatus('success');
        setFormData({ fullName: '', email: '', message: '' });
        setLoading(false);
      }, 1000); // Fake delay to seem real
      return;
    }

    try {
      // Send to Google Apps Script using fetch with no-cors mode
      // This avoids CORS preflight issues with Google Apps Script
      await fetch(CONTACT_FORM_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'text/plain', // Avoids preflight
        },
        body: JSON.stringify(formData),
      });

      // With no-cors mode, we can't read the response, so we assume success
      // if no network error was thrown. The Apps Script logs to Sheet + sends email.

      // Track in Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'contact_submit', {
          form_name: 'contact_form',
          page_location: window.location.href,
          page_title: document.title
        });
      }

      setStatus('success');
      setFormData({ fullName: '', email: '', message: '' }); // Clear the form
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
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
      <div className="contact-page-bg min-h-screen p-4 bg-cover bg-center bg-no-repeat bg-fixed">
      <PageMeta
        title="Contact"
        description="Start a conversation with BrightPath Web Studio. Tisha Di Fresco builds modern, performant websites — get in touch to discuss your project."
        path="/contact"
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
            <div className={`${themeClasses.cardBg} p-8 rounded-lg border ${themeClasses.cardBorder} flex-1`}>
              <BrightPathGradientTitle as="h2" className="gradient-text-dark text-2xl font-poppins font-semibold mb-6"
                textColor="text-neutral-800 dark:gray-200"
                gradientWords={["Touch"]}
              >
                Get In Touch
              </BrightPathGradientTitle>

              <div className="space-y-6">
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
                      BrightPath Web Studio, LLC
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
                      Address
                    </BrightPathGradientTitle>
                    <p className={`font-lato ${theme === 'dark' ? 'text-gray-700' : 'text-gray-700'}`}>
                      129 Maybin Rd.<br />
                      Zirconia, NC 28790
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
                      (704) 453-3973
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
                      tishdifresco@brightpathstudio.com
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
                We're not just another web agency. We're your strategic partner in navigating the digital landscape,
                providing clear direction and brilliant solutions that help your business shine bright online.
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
              {/* Honeypot field - hidden from humans, bots will fill it */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
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
                  className={`w-full px-4 py-3 ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg ${themeClasses.text} font-lato ${themeClasses.inputPlaceholder} focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors`}
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
                  rows={6}
                  className={`w-full px-4 py-3 ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg ${themeClasses.inputText} font-lato ${themeClasses.inputPlaceholder} focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors resize-vertical`}
                  placeholder="Tell us about your project and how we can help illuminate your path to success..."
                />
              </div>

              {/* Form Submission Status */}
              {loading && (
                <div className="text-center text-gold font-lato">Sending message...</div>
              )}
              {status === 'success' && (
                <div className="text-center text-green-500 font-lato">Thank you! Your message has been sent successfully.</div>
              )}
              {status === 'error' && (
                <div className="text-center text-red-500 font-lato">An error occurred. Please try again later.</div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-primary hover:bg-yellow-400 text-shadow-md text-slate-800 font-lato font-bold py-3 px-6 rounded-lg transition-all duration-300 transform shadow-lg hover:shadow-xl
                ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-400 hover:scale-105'}`}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            {/* Form Footer */}
            <div className={`mt-6 pt-6 border-t ${themeClasses.cardBorder}`}>
              <p className={`font-lato text-sm text-center ${themeClasses.textMuted}`}>
                We typically respond within 24 hours. Let's start building something brilliant together!
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
