import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import ResponsiveMockupSection from '../features/ResponsiveMockupSection';
import StyleGuideSection from '../features/StyleGuideSection';
import MultiPageFlowSection from './MultiPageFlowSection';
import BrightPathGradientTitle from '../BrightPathGradientTitle';

/**
 * AngelCityCaseStudy Component
 *
 * A production-ready case study showcase with persistent dark/light mode.
 * Implements mentorship-ready patterns for theme management and responsive design.
 */

const AngelCityCaseStudy = () => {
  // MENTORSHIP NOTE: Theme State Management remains the same
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('theme');
    return (stored === 'dark' || stored === 'light') ? stored : 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    // Base wrapper now uses BrightPath light/dark backgrounds
<div className="min-h-screen relative bg-bp-light-bg-light dark:bg-bp-light-bg-dark transition-colors duration-300">
      
      {/* AJANI'S FIX: Extended Dark Background Layer (Correct ID and Z-Index)
        This DIV controls the massive dark blue background (bp-dark-bg).
        ACTION REQUIRED: Adjust the 'h-[70rem]' value to push the blue down to the 
        desired height (e.g., halfway through the image).
      */}
<div 
        id="extended-background"
        className="absolute top-0 left-0 w-full h-[70rem] 
                   bg-bp-dark-bg-light dark:bg-bp-dark-bg-dark transition-colors duration-300 z-0" 
      />

      {/* Header with Theme Toggle - z-50 ensures toggle is always visible */}
      <header className="fixed top-0 right-0 p-6 z-50">
        <button
          onClick={toggleTheme}
          className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 shadow-lg"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-gray-800" />
          ) : (
            <Sun className="w-5 h-5 text-bp-primary" />
          )}
        </button>
      </header>

      {/* Hero Section (TOP CONTENT) - z-10 for content above extended background */}
      <section className="relative pt-32 pb-16 z-10">
      <div className="max-w-4xl mx-auto px-4 text-left">
          {/* Text color uses the inverse text color (white/light) */}
          <BrightPathGradientTitle
            as="h1"
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
            textColor='text-gray-900 dark:text-gray-200'
            gradientWords={["Case", "Study"]}
          >
            Website Design & Development Case Study
          </BrightPathGradientTitle>
          {/* CTA Button uses bp-primary for color */}
          <button className="px-8 py-4 bg-primary dark:bg-primary hover:opacity-80 text-[#1a2238] font-semibold rounded-lg shadow-xl transition-all duration-200 transform hover:scale-105">
            angelcitymassage.com
          </button>
        </div>
      </section>

      {/* Overlapping Image Section - z-20 over everything else */}
      <section className="relative -mt-32 z-20">
        <div className="w-full px-4">
          {/* Image Container: Background removed (white/light) to let the extended background show through */}
          <div className="relative h-[48rem] md:h-[48rem] overflow-hidden rounded-2xl shadow-2xl bg-bp-light-bg-light dark:bg-bp-light-bg-dark">
            <img
              src="/images/CaseStudy.png"
              alt="Angel City Massage Website Case Study"
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* Content Description Section - Starts where the background ends */}
      <section className="relative z-10 bg-bp-light-bg-light dark:bg-bp-light-bg-dark pt-24 pb-16 px-4 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          {/* Text color uses the default text color (dark) */}
          <BrightPathGradientTitle as="h2" className="text-4xl md:text-5xl font-bold text-bp-text dark:text-bp-text-dark mb-6"
            textColor='text-gray-900 dark:text-gray-200'
            gradientWords={["Experience"]}
          >
          The Angel City Massge Experience
          </BrightPathGradientTitle>
          <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
            Angel City Massage website was designed with a focus on <span><strong><strong>elegance, functionality, and user experience. </strong></strong></span>
                Our goal was to create a visually calming yet highly intuitive platform that reflects the brand's commitment to wellness and relaxation.
            </p>
            <p>
              The website features a seamless navigation structure, custom imagery, and strategically placed call-to-action elements to enhance client engagement.
            </p>
            <p>
              From booking services to purchasing gift cards, every detail was refined to ensure a <span><strong><strong>smooth and stress-free experience</strong></strong></span> across all devices. This case study highlights the research, design process, and development strategies used to bring this project to life.
            </p>
          </div>
        </div>
      </section>
      <ResponsiveMockupSection theme={theme} />
      <StyleGuideSection />
      <MultiPageFlowSection theme={theme} />

      {/* Project Details Section (Footer-like content) */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16 px-4 transition-colors duration-300 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* CLIENT */}
            <div className="space-y-4">
              {/* Heading color should use an accent color like bp-primary */}
              <h3 className="text-[18px] text-shadow-md font-bold text-primary dark:text-primary uppercase tracking-wider">
                Client
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc">
                <li>Angel City Massage</li>
              </ul>
            </div>

            {/* SERVICES */}
            <div className="space-y-4">
              <h3 className="text-[18px] text-shadow-md font-bold text-primary dark:text-bp-primary uppercase tracking-wider">
                Services
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc">
                <li>Web design</li>
                <li>UI / UX</li>
                <li>Website Build</li>
              </ul>
            </div>

            {/* DELIVERABLES */}
            <div className="space-y-4">
              <h3 className="text-[18px] text-shadow-md font-bold text-primary dark:text-bp-primary uppercase tracking-wider">
                Other
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc">
                <li>SEO</li>
                <li>Analytics</li>
              </ul>
            </div>

            {/* WEBSITE & DELIVERABLES (Combined for space) */}
            <div className="space-y-4">
              <h3 className="text-[18px] text-shadow-md font-bold text-primary dark:text-bp-primary uppercase tracking-wider">
                Website / Deliverables
              </h3>
              <ul className="space-y-2 list-disc">
                <li>
                  {/* Link color updated */}
                  <a
                    href="https://angelcitymassage.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bp-primary dark:text-bp-primary hover:underline"
                  >
                    angelcitymassage.com
                  </a>
                </li>
                <li className="text-gray-700 dark:text-gray-300">12 Pages</li>
                <li className="text-gray-700 dark:text-gray-300">Custom Backgrounds and Images</li>
                <li className="text-gray-700 dark:text-gray-300">Gift Card Sales</li>
                <li className="text-gray-700 dark:text-gray-300">Client Email List</li>
                <li className="text-gray-700 dark:text-gray-300">Animations</li>
                <li className="text-gray-700 dark:text-gray-300">Custom Icons</li>
                <li className="text-gray-700 dark:text-gray-300">Styleguide</li>
                <li className="text-gray-700 dark:text-gray-300">WordPress Build</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AngelCityCaseStudy;