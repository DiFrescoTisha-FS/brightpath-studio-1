// export default function ClarityHero() {
//   return (
//     <section className="bg-[#1A2238] text-white px-6 py-24 md:px-10">
//       <div className="mx-auto max-w-5xl">
//         <p className="text-sm uppercase tracking-[0.18em] text-white/70">
//           Hero Placeholder
//         </p>
//         <h1 className="mt-4 font-poppins text-4xl font-bold md:text-6xl">
//           TEST CONTENT
//         </h1>
//         <p className="mt-6 max-w-2xl font-lato text-base text-white/80 md:text-lg">
//           Temporary visible hero content so the homepage paints clearly while we
//           troubleshoot Lighthouse and homepage loading behavior.
//         </p>
//       </div>
//     </section>
//   );
// }

import BrightPathGradientButton from "@/components/BrightPathGradientButton.legacy";
import { useNavigate } from "react-router-dom";
type ClarityHeroProps = {
  onCtaClick?: () => void;
};

export default function ClarityHero({ onCtaClick }: ClarityHeroProps) {
  const navigate = useNavigate();

  return (
    <section className="hero-clarity relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="guiding-light" />
      <div className="horizon-glow" />

      <img
        src="/images/lighthouse-sillouette.svg"
        alt=""
        aria-hidden="true"
        className="lighthouse-silhouette"
      />

      <div className="clarity-headline text-center max-w-5xl mx-auto px-4">
        <p className="clarity-eyebrow font-poppins mb-4 mt-24 text-sm sm:text-base md:text-lg uppercase tracking-[0.18em] text-white/70">
          WordPress Developer & Front-End Specialist
        </p>

        <h1 className="font-poppins font-bold mb-6 mt-24">
          <span className="clarity-text clarity-text-line1 block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Custom WordPress Websites
          </span>

          <span className="clarity-text clarity-text-line2 block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-2">
            That <span className="bright-word">Perform</span>
          </span>
        </h1>

        <p className="clarity-subtitle font-lato mb-10 max-w-2xl mx-auto text-base sm:text-lg">
          I build fast, responsive websites using WordPress, ACF, JavaScript,
          and performance-focused front-end development.
        </p>

        <div className="clarity-cta flex flex-col items-center justify-center gap-4 sm:flex-row">
          <BrightPathGradientButton
            onClick={() => {
              if (onCtaClick) return onCtaClick();
              navigate("/portfolio");
            }}
            className="w-full min-w-[220px] bg-primary text-primary-foreground font-bold font-poppins py-3 px-8 rounded-md text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f18] sm:w-auto"
          >
            View My Work
          </BrightPathGradientButton>

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
