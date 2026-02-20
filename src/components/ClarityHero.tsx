import BrightPathGradientButton from "@/components/BrightPathGradientButton.legacy";

type ClarityHeroProps = {
  onCtaClick?: () => void;
};

export default function ClarityHero({ onCtaClick }: ClarityHeroProps) {
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

        <p className="clarity-subtitle font-lato mb-12 max-w-2xl mx-auto text-base sm:text-lg">
          Clear strategy. Brilliant design. A website that leads with confidence.
        </p>

        <div className="clarity-cta">
          <BrightPathGradientButton
            onClick={() => {
              if (onCtaClick) return onCtaClick();
              document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-primary text-primary-foreground font-bold font-poppins py-3 px-8 rounded-md text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Begin Your Journey
          </BrightPathGradientButton>
        </div>
      </div>
    </section>
  );
}