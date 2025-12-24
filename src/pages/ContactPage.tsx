import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import axios from 'axios';
import { useAppStore } from '@/store/appStore'; // Import the store

// Define the shape of the form data
interface FormData {
  fullName: string;
  email: string;
  message: string;
}

// === FIX APPLIED HERE: Define the API URL ===
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';
const CONTACT_FORM_URL = `${API_BASE_URL}/api/submit-contact-form`;
// ===========================================


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
    text: theme === 'dark' ? 'text-primary' : 'text-slate-600',
    textMuted: theme === 'dark' ? 'text-secondary' : 'text-slate-600',
    cardBg: theme === 'dark' ? 'bg-gray-200' : 'bg-gray-50',
    cardBorder: theme === 'dark' ? 'border-primary' : 'border-gray-200',
    inputBg: theme === 'dark' ? 'bg-midnight' : 'bg-gray-100',
    inputBorder: theme === 'dark' ? 'border-stone/30' : 'border-gray-300',
    inputPlaceholder: theme === 'dark' ? 'placeholder-stone/60' : 'placeholder-gray-400',
    iconColor: theme === 'dark' ? 'text-primary' : 'text-primary',
    goldText: theme === 'dark' ? 'text-primary' : 'text-primary',
    textBoxBG: theme === 'dark' ? 'bg-gray-700' : 'bg-[#f9fafb]'
  };

  return (
    
    <div className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} p-4`}>
      {/* Header Section */}
      <div className="text-center pt-28 pb-12 px-4">
        <h1 className={`text-4xl md:text-5xl font-poppins font-bold ${themeClasses.text} mb-4`}>
          <span className={theme === 'dark' ? 'gradient-text-dark' : 'gradient-text-dark'}>Contact</span> Us
        </h1>
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
              <h2 className={`text-2xl font-poppins font-semibold text-primary mb-6 text-shadow-md`}>
                Get In Touch
              </h2>
              
              <div className="space-y-6">
                {/* Business Name */}
                <div className="flex items-start space-x-4">
                  <div className={`w-6 h-6 mt-1 flex-shrink-0`}>
                    <div className={`w-full h-full bg-gold rounded-full`}></div>
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-lg text-primary">
                      BrightPath Web Studio, LLC
                    </h3>
                    <p className={`font-lato ${themeClasses.textMuted}`}>
                      Your beacon in the digital landscape
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <MapPin className={`w-6 h-6 ${themeClasses.iconColor} mt-1 flex-shrink-0`} />
                  <div>
                    <h3 className={`font-poppins font-semibold text-lg ${themeClasses.text} mb-1`}>
                      Address
                    </h3>
                    <p className={`font-lato ${themeClasses.textMuted}`}>
                      129 Maybin Rd.<br />
                      Zirconia, NC 28790
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <Phone className={`w-6 h-6 ${themeClasses.iconColor} mt-1 flex-shrink-0`} />
                  <div>
                    <h3 className={`font-poppins font-semibold text-lg ${themeClasses.text} mb-1`}>
                      Phone
                    </h3>
                    <p className={`font-lato ${themeClasses.textMuted}`}>
                      (704) 453-3973
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <Mail className={`w-6 h-6 ${themeClasses.iconColor} mt-1 flex-shrink-0`} />
                  <div>
                    <h3 className={`font-poppins font-semibold text-lg ${themeClasses.text} mb-1`}>
                      Email
                    </h3>
                    <p className={`font-lato ${themeClasses.textMuted}`}>
                      tishdifresco@brightpathstudio.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info Box */}
            <div className={`p-6 rounded-lg border border-gold/20 ${themeClasses.textBoxBG}`}>
              <h3 className={`font-poppins font-semibold text-shadow-md ${themeClasses.goldText} mb-3`}>
                Why Choose BrightPath?
              </h3>
              <p className={`font-lato text-sm leading-relaxed ${themeClasses.textMuted}`}>
                We're not just another web agency. We're your strategic partner in navigating the digital landscape, 
                providing clear direction and brilliant solutions that help your business shine bright online.
              </p>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className={`${themeClasses.cardBg} p-8 rounded-lg border ${themeClasses.cardBorder}`}>
            <h2 className={`text-2xl font-poppins font-semibold text-shadow-md ${themeClasses.goldText} mb-6`}>
              Send Us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className={`block font-lato font-semibold ${themeClasses.text} mb-2`}>
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg ${themeClasses.text} font-lato ${themeClasses.inputPlaceholder} focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors`}
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="email" className={`block font-lato font-semibold ${themeClasses.text} mb-2`}>
                  Email Address
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
                <label htmlFor="message" className={`block font-lato font-semibold ${themeClasses.text} mb-2`}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg ${themeClasses.text} font-lato ${themeClasses.inputPlaceholder} focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors resize-vertical`}
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
                className={`w-full bg-primary hover:bg-yellow-400 text-shadow-md text-secondary font-lato font-bold py-3 px-6 rounded-lg transition-all duration-300 transform shadow-lg hover:shadow-xl
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