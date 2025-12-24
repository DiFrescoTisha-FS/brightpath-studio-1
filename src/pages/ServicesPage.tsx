// src/pages/ServicesPage.tsx

import React, { useState, useEffect } from "react";
import { FlipCardContainer } from "../components/ui/FlipCard";
import { getFlipCardPhases } from "../../backend/services/api.service";
import { motion } from "framer-motion";
import { PhaseCard } from "../types/phaseCard";
import { useAppStore } from '@/store/appStore';
import BrightPathGradientButton from "@/components/BrightPathGradientButton";

const ServicesPage: React.FC = () => {
  const { theme } = useAppStore();
  const [cards, setCards] = useState<PhaseCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data: PhaseCard[] = await getFlipCardPhases();
        setCards(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  if (loading) {
    return (
      <div className={`text-center py-10 min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
        Loading our process...
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-10 text-red-500 min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
        Error: {error}
      </div>
    );
  }

  return (
    <div
      className={`py-12 sm:py-20 mt-20 px-4 sm:px-8 min-h-screen relative overflow-hidden`}
      style={{
        backgroundImage: "url('/images/BG-Lighthouse-Desktop.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Semi-transparent overlay for readability */}
      {/* <div className="absolute inset-0 bg-slate-900 opacity-80 z-0"></div> */}

      <motion.div
        className="container mx-auto relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Main grid container with two columns on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-center">
          {/* Left Column: Text Content with constrained width */}
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-4">
              Our <span className={theme === 'dark' ? 'gradient-text-dark' : 'gradient-text-dark'}>Process</span>
            </h2>
            <p className="text-lg mb-6 text-shadow-md">
              At BrightPath Web Studio, every website we create follows a clear,
              purposeful path—from the first spark of an idea to a seamless,
              fully launched experience.
            </p>
            <p className="text-lg text-shadow-md">
              Our six-phase approach ensures each project is thoughtfully
              planned, beautifully designed, and built to perform.
            </p>
            <BrightPathGradientButton className="mt-8 text-white text-shadow-md font-bold py-3 px-6 rounded-md hover:bg-yellow-400 transition-colors">
              Start Your Project
            </BrightPathGradientButton>
          </div>

          {/* Right Column: Cards with responsive grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <FlipCardContainer cards={cards} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ServicesPage;