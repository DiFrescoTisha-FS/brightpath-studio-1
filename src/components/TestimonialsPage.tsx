import ReviewsList from "../components/ui/ReviewsList";
import PhaseCards from "../components/ui/PhaseCards";

const TestimonialsPage = () => {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/parallax-bg.png"
          alt="Parallax Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10">
        <div>
          <h1>Our Project Phases</h1>
          <p>Here's a breakdown of our step-by-step process.</p>
          <PhaseCards />
        </div>

        <div className="py-12">
          <ReviewsList />
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
