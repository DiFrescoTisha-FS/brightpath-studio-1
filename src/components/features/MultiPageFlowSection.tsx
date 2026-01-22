// src/components/MultiPageFlowSection.tsx
import React from 'react';
import BrightPathGradientTitle from '../BrightPathGradientTitle';

// FIX: Define the component interface so the theme prop can be passed in
interface MultiPageFlowSectionProps {
    theme: 'light' | 'dark';
}

/**
 * MultiPageFlowSection Component
 * Displays the complex three-browser mockup illustrating the multi-page website flow.
 */
// FIX: Apply the interface and destructure the theme prop
const MultiPageFlowSection: React.FC<MultiPageFlowSectionProps> = ({ theme }) => {
    const bgVar = theme === 'dark' ? 'var(--timeline-bg-dark)' : 'var(--timeline-bg-light)';
    const fallbackBg = theme === 'dark' ? 'rgb(17, 24, 39)' : 'rgb(243, 244, 246)'; // dark gray / light gray

    return (

        <section
            className="relative min-h-screen py-32 px-6 flex flex-col justify-center bg-cover bg-center bg-fixed transition-colors duration-300"
            style={{
                backgroundImage: bgVar,
                backgroundColor: fallbackBg,
            }}
        >
            <div className={`absolute inset-0 z-10 ${theme === 'dark' ? 'bg-black/40' : 'bg-midnight/60'}`} />

            {/* The rest of the content needs a higher z-index to sit above the overlay */}
            <div className="max-w-7xl mx-auto relative z-20">

                {/* Header and Description */}
                <div className="flex gap-12 mb-20">
                    {/* Adjusted text colors to ensure readability against the dark overlay */}
                    <div className="w-full md:w-1/3">

                        <BrightPathGradientTitle as="h2" className="font-bold header-foreground mb-6 font-poppins leading-tight"
                            textColor='text-gray-900 dark:text-gray-200'
                            gradientWords={["Flow"]}
                        >
                            Multi-Page Flow
                        </BrightPathGradientTitle>
                        <p className="leading-relaxed font-opensans">
                            The Angel City Massage website was built as a multi-page experience to thoroughly showcase their services and offerings. The flow leads visitors seamlessly through key sections: service details, gift card purchases, and flexible session options. This approach enhanced user engagement, allowing for deeper exploration of each service offering while maintaining a clean, organized structure that guides visitors towards booking.
                        </p>
                    </div>
                </div>

                {/* Three Browser Mockups (The complex visual block) */}
                {/* The mockups themselves need their own shadows and z-index handling to stand out. */}
                <div className="relative flex items-center justify-center gap-0 h-[800px] md:h-[900px]">

                    {/* 1. Left Browser - Our Services Image (Rotated -2) */}
                    <div className="absolute left-0 md:left-8 w-[280px] md:w-[360px] transform -rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-105 z-30">
                        {/* Note: Increased z-index to z-30 to ensure it's above the z-20 content wrapper. */}
                        {/* Mentorship Note (Dave): We keep the browser chrome for realism. */}
                        <div className="bg-gray-800 rounded-t-xl shadow-2xl">
                            {/* Browser Chrome */}
                            <div className="bg-gray-700 rounded-xl px-3 py-2 flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                                </div>
                                <div className="flex-1 bg-gray-600 rounded text-xs text-gray-400 px-2 py-1 ml-2">
                                    angelcitymassage.com/services
                                </div>
                            </div>
                            {/* Browser Content - Image Replacement */}
                            <div className="bg-white h-[650px] md:h-[750px] overflow-hidden">
                                <img
                                    src="/images/main_pages-scaled.jpg"
                                    alt="Angel City Massage Our Services Page Mockup"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 2. Center Browser - Gift Cards Image (Full Scale, No Rotation) */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-[300px] md:w-[400px] hover:scale-105 transition-all duration-500 z-40 shadow-2xl">
                        {/* Note: Increased z-index to z-40 to ensure it sits highest and overlaps the side panels. */}
                        {/* Mentorship Note (Dave): Center browser is slightly larger and at full scale to emphasize focus. */}
                        <div className="bg-gray-800 rounded-t-xl shadow-2xl">
                            {/* Browser Chrome */}
                            <div className="bg-gray-700 rounded-t-xl px-4 py-2.5 flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="flex-1 bg-gray-600 rounded text-xs text-gray-400 px-3 py-1.5 ml-2">
                                    angelcitymassage.com/gift-cards
                                </div>
                            </div>
                            {/* Browser Content - Image Replacement */}
                            <div className="bg-white h-[700px] md:h-[800px] overflow-hidden">
                                <img
                                    src="/images/main_pages1.png"
                                    alt="Angel City Massage Gift Cards Page Mockup"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 3. Right Browser - Session Options Image (Rotated +2) */}
                    <div className="absolute right-0 md:right-8 w-[280px] md:w-[360px] transform rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-105 z-30">
                        {/* Note: Increased z-index to z-30 to ensure it's above the z-20 content wrapper. */}
                        <div className="bg-gray-800 rounded-t-xl shadow-2xl">
                            {/* Browser Chrome */}
                            <div className="bg-gray-700 rounded-t-xl px-3 py-2 flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                                </div>
                                <div className="flex-1 bg-gray-600 rounded text-xs text-gray-400 px-2 py-1 ml-2">
                                    angelcitymassage.com/sessions
                                </div>
                            </div>
                            {/* Browser Content - Image Replacement */}
                            <div className="bg-white h-[650px] md:h-[750px] overflow-hidden">
                                <img
                                    src="/images/Long.png"
                                    alt="Angel City Massage Session Options Page Mockup"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MultiPageFlowSection;