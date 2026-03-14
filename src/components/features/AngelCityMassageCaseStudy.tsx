import ResponsiveMockupSection from '../features/ResponsiveMockupSection';
import StyleGuideSection from '../features/StyleGuideSection';
import MultiPageFlowSection from './MultiPageFlowSection';
import ProjectSnapshot from './ProjectSnapshot';
import PerformanceResults from './PerformanceResults';
import BrightPathGradientTitle from '../BrightPathGradientTitle';
import BrightPathGradientButton from "@/components/BrightPathGradientButton"
import { useAppStore } from '@/store/appStore';
import { trackPortfolioClick } from '@/utils/analytics';

const AngelCityCaseStudy = () => {
  const { theme } = useAppStore();

  return (
    <div className="min-h-screen relative bg-bp-light-bg-light dark:bg-bp-light-bg-dark transition-colors duration-300">

      <div
        id="extended-background"
        className="absolute top-0 left-0 w-full h-[70rem]
                   bg-bp-dark-bg-light dark:bg-bp-dark-bg-dark transition-colors duration-300 z-0"
      />

      <section className="relative pt-36 md:pt-32 pb-12 md:pb-24 z-10">
        <div className="max-w-4xl mx-auto px-4 text-left">
          <BrightPathGradientTitle
            as="h1"
            className="font-bold pb-6 tracking-tight"
            textColor='text-gray-900 dark:text-gray-200'
          >
            Angel City Massage
          </BrightPathGradientTitle>
                      <p className="text-xs text-muted-foreground mb-4">
              WordPress | Divi | Custom CSS | Performance Optimization | SEO
            </p>
            <h3
            className="font-bold pb-6 tracking-tight shadoe-md text-[#1a2238] dark:text-gray-200"
          >
            Website Design & Development Case Study
          </h3>
          <a
            href="https://angelcitymassage.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
            onClick={() =>
              trackPortfolioClick(
                'angel_city_massage_click',
                'angelcitymassage.com',
                'https://angelcitymassage.com',
                'Angel City Massage'
              )
            }
          >
            <BrightPathGradientButton className="relative z-10 px-8 py-4 text-[#1a2238] shadow-xl">
              angelcitymassage.com
            </BrightPathGradientButton>
          </a>
        </div>
      </section>

      <ProjectSnapshot theme={theme} />

      <PerformanceResults theme={theme} />

      <section className="relative z-20 md:hidden px-4">
        <div className="w-full max-w-md mx-auto">
          <div className="overflow-hidden rounded-2xl shadow-xl bg-bp-light-bg-light dark:bg-bp-light-bg-dark">
            <img
              src="/images/ACM_HOME.png"
              alt="Angel City Massage homepage preview"
              className="w-full h-64 object-cover object-top"
            />
          </div>
          <p className="mt-3 text-sm text-center text-gray-600 dark:text-gray-400">
            Homepage preview
          </p>
        </div>
      </section>

      <section className="relative z-20 hidden md:block">
        <div className="w-full px-4">
          <div className="relative h-[48rem] md:h-[48rem] overflow-hidden rounded-2xl shadow-2xl bg-bp-light-bg-light dark:bg-bp-light-bg-dark">
            <img
              src="/images/CaseStudy.png"
              alt="Angel City Massage Website Case Study"
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-bp-light-bg-light dark:bg-bp-light-bg-dark pt-24 pb-16 px-4 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          <BrightPathGradientTitle as="h2" className="font-bold text-bp-text dark:text-bp-text-dark mb-6"
            textColor='text-gray-900 dark:text-gray-200'
            gradientWords={["Experience"]}
          >
            The Angel City Massage Experience
          </BrightPathGradientTitle>
          <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Angel City Massage website was designed with a focus on <strong>elegance, functionality, and user experience.</strong>
              Our goal was to create a visually calming yet highly intuitive platform that reflects the brand's commitment to wellness and relaxation.
            </p>
            <p>
              The website features a seamless navigation structure, custom imagery, and strategically placed call-to-action elements to enhance client engagement.
            </p>
            <p>
              From booking services to purchasing gift cards, every detail was refined to ensure a <strong>smooth and stress-free experience</strong> across all devices. This case study highlights the research, design process, and development strategies used to bring this project to life.
            </p>
          </div>
        </div>
      </section>
      <ResponsiveMockupSection theme={theme} />
      <StyleGuideSection />
      <MultiPageFlowSection theme={theme} />

      {/* Client Testimonial Section */}
      <section className="    py-20 px-4 transition-colors duration-300 relative z-10
    bg-gradient-to-br
    from-slate-50 via-white to-slate-100
    dark:from-[#050B14] dark:via-[#081426] dark:to-[#0B1E33]">
        <div className="max-w-4xl mx-auto text-center">
          <BrightPathGradientTitle
            as="h2"
            className="font-bold mb-8"
            textColor="text-gray-900 dark:text-gray-200"
            gradientWords={["Client"]}
          >
            What Our Client Says
          </BrightPathGradientTitle>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 relative">
            <div className="absolute top-4 left-4 text-6xl text-primary/20 font-serif">"</div>
            <div className="absolute bottom-4 right-4 text-6xl text-primary/20 font-serif">"</div>

            <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 italic leading-relaxed mb-8 relative z-10">
              Tish did an outstanding job building my new website. She has a great sense of style and really understands how to create a site that looks polished, modern, and inviting. More importantly, she truly cared about my needs and goals, listened carefully, and offered innovative ideas that made the final result even better than I envisioned. She was easy to work with, responsive, timely, and consistently professional throughout the entire process. I felt supported and confident every step of the way. I highly recommend Tish to anyone looking for a talented, creative, and reliable web designer. With sincere thanks.
            </p>

            <div className="flex flex-col items-center">
              <div className="font-bold text-xl text-primary mb-1">Marlene Fenton</div>
              <div className="text-gray-600 dark:text-gray-400">Owner, Angel City Massage</div>
              <div className="flex gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-800 py-16 px-4 transition-colors duration-300 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-[18px] text-shadow-md font-bold text-primary dark:text-primary uppercase tracking-wider">
                Client
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
                <li>Angel City Massage</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-[18px] text-shadow-md font-bold text-primary dark:text-bp-primary uppercase tracking-wider">
                Services
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
                <li>Web design</li>
                <li>UI / UX</li>
                <li>Website Build</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-[18px] text-shadow-md font-bold text-primary dark:text-bp-primary uppercase tracking-wider">
                Other
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
                <li>SEO</li>
                <li>Analytics</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-[18px] text-shadow-md font-bold text-primary dark:text-bp-primary uppercase tracking-wider">
                Website / Deliverables
              </h3>
              <ul className="space-y-2 list-disc pl-5 break-words">
                <li>
                  <a
                    href="https://angelcitymassage.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bp-primary dark:text-bp-primary hover:underline break-all"
                  >
                    angelcitymassage.com
                  </a>
                </li>
                <li className="text-gray-700 dark:text-gray-300">12 Pages</li>
                <li className="text-gray-700 dark:text-gray-300">Custom Backgrounds and Images</li>
                <li className="text-gray-700 dark:text-gray-300">Gift Card Sales</li>
                <li className="text-gray-700 dark:text-gray-300">Client Email List</li>
                <li className="text-gray-700 dark:text-gray-300">Animations</li>
                <li className="text-gray-700 dark:text-gray-300">Custom Icons</li>
                <li className="text-gray-700 dark:text-gray-300">Styleguide</li>
                <li className="text-gray-700 dark:text-gray-300">WordPress Build</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AngelCityCaseStudy;
