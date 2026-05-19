import { CheckCircle } from 'lucide-react';
import BrightPathGradientTitle from '@/components/BrightPathGradientTitle';
import type { SnapshotMetadataItem } from '@/types/caseStudy';

interface ProjectSnapshotProps {
  theme: 'light' | 'dark';
  metadata?: SnapshotMetadataItem[];
  achievements?: string[];
  heading?: string;
  gradientWords?: string[];
}

const defaultMetadata: SnapshotMetadataItem[] = [
  { label: 'Client', value: 'Angel City Massage' },
  { label: 'Project Type', value: 'Website Modernization & Performance Optimization' },
  { label: 'Platform', value: 'WordPress + Divi' },
  { label: 'My Role', value: 'Front-End Developer & Performance Optimization' },
];

const defaultAchievements = [
  'Modernized a 20-year-old website originally built before responsive design',
  'Rebuilt layouts for desktop, tablet, and mobile responsiveness',
  'Improved Lighthouse performance from 62 → 99 on desktop and 62 → 97 on mobile',
  'Reduced cumulative layout shift (CLS) by restructuring the hero section',
  'Optimized asset loading and JavaScript execution',
];

const ProjectSnapshot = ({
  theme,
  metadata = defaultMetadata,
  achievements = defaultAchievements,
  heading = 'Project Snapshot',
  gradientWords = ['Snapshot'],
}: ProjectSnapshotProps) => {
  return (
    <section className="relative z-10 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <BrightPathGradientTitle
          as="h2"
          className="font-poppins font-bold mb-8 text-2xl md:text-3xl"
          textColor="text-gray-900 dark:text-gray-200"
          gradientWords={gradientWords}
        >
          {heading}
        </BrightPathGradientTitle>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 p-6 rounded-xl transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-[#1A2238]/50 border border-primary/20'
            : 'bg-gray-50 border border-gray-200'
        }`}>
          {metadata.map((item, index) => (
            <div key={index} className="text-left">
              <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">
                {item.label}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className={`p-6 rounded-xl transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-[#1A2238]/50 border border-primary/20'
            : 'bg-gray-50 border border-gray-200'
        }`}>
          <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-4">
            Key Achievements
          </p>
          <ul className="space-y-3">
            {achievements.map((achievement, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle
                  className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {achievement}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProjectSnapshot;
