import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import axios from 'axios';
import { useAppStore } from '@/store/appStore'; // Import the store
import BrightPathGradientTitle from '@/components/BrightPathGradientTitle';

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

// API URL Configuration:
// - In production and `netlify dev`: Uses same-origin paths redirected by netlify.toml
// - For alternate backends, set VITE_API_URL explicitly
const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const CONTACT_FORM_URL = `${API_BASE_URL}/api/submit-contact-form`;


const ContactPage: React.FC = () => {
  const { theme } = useAppStore(); // Get the current theme
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    message: ''
  });
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

    try {
      // The crucial step: send the form data to our new backend API endpoint
      const response = await axios.post(CONTACT_FORM_URL, formData);

      if (response.status === 200) {
        // This allows Google Analytics to track successful contact form conversions.
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'contact_submit', {
            form_name: 'contact_form',
            page_location: window.location.href,
            page_title: document.title
          });
        }

        setStatus('success');
        setFormData({ fullName: '', email: '', message: '' }); // Clear the form
      } else {
        setStatus('error');
      }
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
    inputPlaceholder: theme === 'dark' ? 'placeholder:text-secondary' : 'placeholder:text-gray-600',
    iconColor: theme === 'dark' ? 'text-primary' : 'text-primary',
    goldText: theme === 'dark' ? 'gradient-text-dark' : 'gradient-text-dark',
    textBoxBG: theme === 'dark' ? 'bg-gray-700' : 'bg-[#f9fafb]'
  };

  return (

    <div className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} p-4`}>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            <div className={`${themeClasses.cardBg} p-8 rounded-lg border ${themeClasses.cardBorder}`}>
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
                  className={`w-full px-4 py-3 ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg ${themeClasses.textMuted} font-lato ${themeClasses.inputPlaceholder} focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors`}
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
                  className={`w-full px-4 py-3 ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg ${themeClasses.textMuted} font-lato ${themeClasses.inputPlaceholder} focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors resize-vertical`}
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
  );
};

export default ContactPage;
