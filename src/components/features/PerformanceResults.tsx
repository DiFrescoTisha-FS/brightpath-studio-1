import { TrendingUp } from 'lucide-react';
import BrightPathGradientTitle from '@/components/BrightPathGradientTitle';

interface PerformanceResultsProps {
  theme: 'light' | 'dark';
  screenshotSrc?: string;
  screenshotAlt?: string;
}

const PerformanceResults = ({
  theme,
  screenshotSrc = '/images/lighthouse-score.png',
  screenshotAlt = 'Lighthouse performance score showing 99'
}: PerformanceResultsProps) => {
  return (
    <section className="relative z-10 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <BrightPathGradientTitle
          as="h2"
          className="font-poppins font-bold mb-12 text-2xl md:text-3xl text-center"
          textColor="text-gray-900 dark:text-gray-200"
          gradientWords={["Performance"]}
        >
          Performance Improvements
        </BrightPathGradientTitle>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Score Comparison Card */}
          <div className={`p-8 rounded-2xl text-center transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-[#1A2238] to-[#0f1628] border border-primary/30 shadow-glow-primary'
              : 'bg-gradient-to-br from-white to-gray-50 border border-primary/20 shadow-2xl'
          }`}>
            <div className="flex items-center justify-center gap-2 mb-6">
              <TrendingUp className="h-6 w-6 text-primary" aria-hidden="true" />
              <p className="text-sm uppercase tracking-wider text-primary font-semibold">
                Lighthouse Performance
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 md:gap-8">
              {/* Before Score */}
              <div className="text-center">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Before
                </p>
                <div className={`text-5xl md:text-7xl font-bold font-poppins ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  62
                </div>
              </div>

              {/* Arrow */}
              <div className="text-3xl md:text-5xl text-primary font-bold">
                →
              </div>

              {/* After Score */}
              <div className="text-center">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  After
                </p>
                <div className="text-5xl md:text-7xl font-bold font-poppins text-primary drop-shadow-lg">
                  99
                </div>
              </div>
            </div>

            <p className="mt-6 text-sm text-muted-foreground max-w-sm mx-auto">
              Through asset optimization, layout restructuring, and JavaScript execution improvements.
            </p>
          </div>

          {/* Lighthouse Screenshot */}
          <div className={`rounded-2xl overflow-hidden transition-all duration-300 ${
            theme === 'dark'
              ? 'shadow-glow-primary border border-primary/20'
              : 'shadow-2xl border border-gray-200'
          }`}>
            <img
              src={screenshotSrc}
              alt={screenshotAlt}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceResults;
