import { motion } from "framer-motion";
import useTheme from "../hooks/useTheme";

const AboutPage = () => {
  // Fetch theme internally via the custom hook
  const { theme } = useTheme();

  const timelineEvents = [
    {
      title: "A Journey of Dedication and Achievement",
      description:
        "Graduating from Full Sail University was a defining moment in my journey. Combining creativity with technology led me to web development, and my dedication to the craft earned me the honor of class valedictorian.",
      imageUrl: "/images/boysandme.webp",
      highlightColor: "#F2C94C",
    },
    {
      title: "The Lighthouse That Started It All",
      description:
        "At my graduation, one of my instructors gifted me a lighthouse, symbolizing guidance, resilience, and perseverance. It was a reminder that even in the darkest times, we can find our way forward. This symbol became the foundation for BrightPath Web Studio LLC, inspiring me to help businesses navigate the digital world with confidence and clarity.",
      imageUrl: "/images/lighthouse-gift.png",
      highlightColor: "#F2C94C",
    },
    {
      title: "My Approach",
      description:
        "I believe in thoughtful design, seamless functionality, and strategic branding. A website should do more than just exist—it should engage, inspire, and convert.",
      imageUrl: "/images/brightpath-logo-dark.png",
      highlightColor: "#F2C94C",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* --- HERO SECTION --- */}
      <motion.section
        className="min-h-screen flex items-center justify-center p-8 bg-cover bg-center relative"
        // 🌟 RESTORED ORIGINAL STYLES 🌟
        style={{
          backgroundImage: "url('/images/Mountains.jpeg')",
          filter: "grayscale(100%)",
        }}
        whileHover={{
          filter: "grayscale(0%)",
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
      >
        {/* Bottom fade gradient to blend into timeline section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, #1A2238 100%)',
          }}
        />

        <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center relative z-0">
          {/* Left Column: Text Content */}
          <div className="text-white text-center md:text-left">
            <p className="font-lato text-lg mb-2 tracking-wider">ABOUT ME</p>
            <h1 className="font-poppins text-5xl md:text-6xl font-bold mb-6">
              TISHA DI FRESCO
            </h1>
            <p className="font-lato text-xl mb-8 leading-relaxed">
              Like the mountains that shape my home, my journey in web
              development and design is built on strong foundations and endless
              creativity.
            </p>
            <motion.button
              className="bg-primary text-white font-bold font-lato py-3 px-8 rounded-md text-lg hover:bg-yellow-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read My Story
            </motion.button>
          </div>

          {/* Right Column: Arched Image */}
          <div className="flex justify-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img
                src="/images/my-profile.png"
                alt="Portrait of Tisha Di Fresco"
                className="max-w-sm md:max-w-md w-full rounded-t-full shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* --- TIMELINE SECTION --- */}
      <motion.section
        className="relative py-20 px-8 min-h-screen flex flex-col justify-center bg-cover bg-center bg-fixed"
        style={{
          // This remains correct based on your initial intention for the timeline background
          backgroundImage: theme === 'light'
    ? 'var(--timeline-bg-light)'
    : 'var(--timeline-bg-dark)',
        }}
      >
        {/* Top fade gradient to blend from hero section */}
        <div
          className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(to bottom, #1A2238, transparent)',
          }}
        />

        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-midnight/60 z-10"></div>

        {/* Vertical Timeline Line (Positioned to start below the title block) */}
        <div
          className="absolute left-1/2 w-2 
            top-32 h-[calc(100%-8rem)]                 
            bg-gradient-to-b 
            from-primary              
            via-primary  
            to-transparent 
            transform -translate-x-1/2 z-10"
        ></div>

        <div className="container mx-auto space-y-16 relative z-20">
          {/* H2 Title with Theme Awareness */}

          <h2 className={`text-4xl md:text-5xl font-extrabold text-left mb-12 pt-0 font-poppins ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}
          >My <span 
                // Apply the custom class based on the theme state
                // 🌟 FIX 1: ADD SPACE BEFORE "Digital" 🌟
                className={theme === 'dark' ? 'gradient-text-dark' : 'gradient-text-light'}
            > Digital
            </span> Journey <span 
                // Apply the custom class based on the theme state
                // 🌟 FIX 2: ADD SPACE BEFORE "Timeline" 🌟
                className={theme === 'dark' ? 'gradient-text-dark' : 'gradient-text-light'}
            > Timeline
            </span>
          </h2>

          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`flex items-center w-full ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              {/* Timeline dot (Position fixed for line start) */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-brightpath-blue rounded-full border-4 border-white shadow-lg z-30 top-1/2 -translate-y-1/2"
                style={{ top: "40px" }}
              ></div>

              <div
                className={`w-full md:w-5/12 ${
                  index % 2 === 0
                    ? "pr-0 md:pr-16 text-center md:text-right"
                    : "pl-0 md:pl-16 text-center md:text-left"
                }`}
              >
                <motion.div
                  className="shadow-2xl overflow-hidden
                             relative flex flex-col items-center"
                  style={{
                    background: `linear-gradient(#1A2238, #1A2238) padding-box, 
                                 linear-gradient(to right, #F2C94C, #1A2238, #F2C94C) border-box`,
                    border: "2px solid transparent",
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow:
                      "0 0 40px rgba(242, 201, 76, 0.6), 0 0 15px rgba(242, 201, 76, 0.4)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Card Image */}
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="h-32 pt-4 rounded-t-xl object-cover"
                  />

                  <div className="p-8 text-[#F2C94C] text-center">
                    <h3 className="font-poppins text-xl md:text-2xl font-bold mb-3 gradient-text-dark drop-shadow-lg">
                      {event.title}
                    </h3>
                    <p className="font-lato text- md:text-md text-white leading-[1.6em] text-stone-200">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
