// src/components/ResponsiveMockupSection.tsx
import React from 'react';
import BrightPathGradientTitle from '../BrightPathGradientTitle';


interface ResponsiveMockupSectionProps {
    theme: 'light' | 'dark';
  }
/**
 * ResponsiveMockupSection Component
 * Displays the large responsive mockup image for the case study.
 * Note: Uses w-full object-cover for maximum visual impact and responsiveness.
 */
const ResponsiveMockupSection: React.FC<ResponsiveMockupSectionProps> = ({ theme }) => {
  
    // 💡 STEP 2: Use the theme prop inside the component
    // const textColorClass = theme === 'dark' ? 'text-gray-200' : 'text-gray-800';
    const subtextColorClass = theme === 'light' ? 'text-gray-600' : 'text-gray-400';
  
    return (
      // Note: The background colors already handle dark/light mode via Tailwind variants.
      <section className="bg-gray-50 dark:bg-[#0f1a35] py-20 px-4 transition-colors duration-300" id="large-mockup">
        <div className="max-w-7xl mx-auto text-center mb-16">
          
          {/* Using dynamic text color classes */}
          <BrightPathGradientTitle as="h2" className="text-4xl md:text-5xl font-bold mb-4 font-poppins"
            textColor='text-gray-900 dark:text-gray-200'
            gradientWords={["Responsive"]}
          >
            
        The Responsive Solution
          
          </BrightPathGradientTitle>
          <p className={`${subtextColorClass} font-lato`}>Ensuring an optimal experience on every screen size.</p>
        </div>
  
        <div className="max-w-6xl mx-auto">
          {/* Image Container for the Large Responsive Mockup Image */}
          <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/images/responsive-config.png"
              alt="Large Laptop and Mobile Responsive Mockup"
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>
  );
};

export default ResponsiveMockupSection;