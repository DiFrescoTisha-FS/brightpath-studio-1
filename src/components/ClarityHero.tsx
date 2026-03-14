import BrightPathGradientButton from "@/components/BrightPathGradientButton.legacy";
import { useNavigate } from "react-router-dom";

type ClarityHeroProps = {
  onCtaClick?: () => void;
};

export default function ClarityHero({ onCtaClick }: ClarityHeroProps) {
  const navigate = useNavigate();

  return (
    <section className="hero-clarity relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Light that "searches" */}
      <div className="guiding-light" />

      {/* Destination glow */}
      <div className="horizon-glow" />

      {/* Content */}
      <div className="clarity-headline text-center max-w-5xl mx-auto px-4">
        <h1 className="font-poppins font-bold mb-6 mt-24">
          <span className="clarity-text clarity-text-line1 block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Guiding Your Business to
          </span>

          <span className="clarity-text clarity-text-line2 block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-2">
            Shine{" "}
            <span className="bright-word">Bright</span>{" "}
            Online
          </span>
        </h1>

        {/* <p className="clarity-subtitle font-lato mb-12 max-w-2xl mx-auto text-base sm:text-lg">
          Clear strategy. Brilliant design. A website that leads with confidence.
        </p> */}

        <div className="clarity-cta flex flex-col items-center justify-center gap-4 sm:flex-row">
          <BrightPathGradientButton
            onClick={() => {
              if (onCtaClick) return onCtaClick();
              navigate("/portfolio");
            }}
            className="w-full min-w-[220px] bg-primary text-primary-foreground font-bold font-poppins py-3 px-8 rounded-md text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f18] sm:w-auto"
          >
            See My Work
          </BrightPathGradientButton>

          {/* Use a plain anchor so GA4 can automatically detect this resume file download. */}
          <a
            href="/assets/Tisha-DiFresco-Resume.pdf"
            download
            className="inline-flex w-full min-w-[220px] items-center justify-center rounded-md border border-primary/70 bg-white/10 px-8 py-3 text-lg font-bold font-poppins text-[#f5f0e8] shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-white/15 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f18] sm:w-auto"
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
