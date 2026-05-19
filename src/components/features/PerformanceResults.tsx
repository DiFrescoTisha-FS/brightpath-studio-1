import { TrendingUp } from 'lucide-react';
import BrightPathGradientTitle from '@/components/BrightPathGradientTitle';
import type { LighthouseMetric } from '@/types/caseStudy';

interface PerformanceResultsProps {
  theme: 'light' | 'dark';
  metrics?: LighthouseMetric[];
  summary?: string;
}

const defaultMetrics: LighthouseMetric[] = [
  {
    label: 'Desktop',
    before: 62,
    after: 99,
    screenshotSrc: '/images/lighthouse-score.png',
    screenshotAlt: 'Angel City Massage desktop Lighthouse performance score showing 99',
  },
  {
    label: 'Mobile',
    before: 62,
    after: 97,
    screenshotSrc: '/images/mobile-scores.png',
    screenshotAlt: 'Angel City Massage mobile Lighthouse performance score showing 97',
  },
];

const defaultSummary =
  'Through asset optimization, layout restructuring, and JavaScript execution improvements across desktop and mobile.';

const PerformanceResults = ({
  theme,
  metrics = defaultMetrics,
  summary = defaultSummary,
}: PerformanceResultsProps) => {
  // When there's only one metric (e.g. AweStruck Mobile-only), render the
  // score card and screenshot as two grid cells side-by-side. The wrapper
  // div uses `display: contents` so its children become direct grid items,
  // bypassing the wrapper for layout. Multiple metrics keep their original
  // vertical stack per metric (e.g. Angel City's Desktop + Mobile pair).
  const isSingle = metrics.length === 1;

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {metrics.map((metric) => (
            <div key={metric.label} className={isSingle ? 'contents' : 'space-y-6'}>
              <div className={`p-8 rounded-2xl text-center transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-[#1A2238] to-[#0f1628] border border-primary/30 shadow-glow-primary'
                  : 'bg-gradient-to-br from-white to-gray-50 border border-primary/20 shadow-2xl'
              }`}>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <TrendingUp className="h-6 w-6 text-primary" aria-hidden="true" />
                  <p className="text-sm uppercase tracking-wider text-primary font-semibold">
                    {metric.label} Lighthouse
                  </p>
                </div>

                <div className="flex items-center justify-center gap-4 md:gap-8">
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Before
                    </p>
                    <div className={`text-5xl md:text-7xl font-bold font-poppins ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {metric.before}
                    </div>
                  </div>

                  <div className="text-3xl md:text-5xl text-primary font-bold">
                    →
                  </div>

                  <div className="text-center">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      After
                    </p>
                    <div className="text-5xl md:text-7xl font-bold font-poppins text-primary drop-shadow-lg">
                      {metric.after}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                theme === 'dark'
                  ? 'shadow-glow-primary border border-primary/20'
                  : 'shadow-2xl border border-gray-200'
              }`}>
                <img
                  src={metric.screenshotSrc}
                  alt={metric.screenshotAlt}
                  className="w-full h-auto"
                />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted-foreground max-w-2xl mx-auto text-center">
          {summary}
        </p>
      </div>
    </section>
  );
};

export default PerformanceResults;
