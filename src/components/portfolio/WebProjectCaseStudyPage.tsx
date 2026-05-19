import { ArrowLeft, ArrowRight, CheckCircle, ExternalLink } from 'lucide-react';
import BrightPathGradientTitle from '@/components/BrightPathGradientTitle';
import BrightPathGradientButton from '@/components/BrightPathGradientButton';
import ProjectSnapshot from '@/components/features/ProjectSnapshot';
import PerformanceResults from '@/components/features/PerformanceResults';
import { trackPortfolioClick } from '@/utils/analytics';
import { PageMeta } from '@/components/PageMeta';
import type { WebProjectCaseStudy } from '@/types/caseStudy';

interface WebProjectCaseStudyPageProps {
  caseStudy: WebProjectCaseStudy;
  onBack?: () => void;
  theme: 'light' | 'dark';
}

const WebProjectCaseStudyPage = ({ caseStudy, onBack, theme }: WebProjectCaseStudyPageProps) => {
  const {
    title,
    subtitle,
    client,
    liveUrl,
    heroImage,
    tags,
    badge,
    projectSnapshot,
    challenge,
    approach,
    process,
    performanceMetrics,
    performanceSummary,
    engineeringHighlights,
    featureShowcase,
    mobileShowcase,
    screenshots,
    techStackPills,
    techStack,
    testimonial,
  } = caseStudy;

  const liveLabel = liveUrl?.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const stackPills = techStackPills ?? techStack;

  return (
    <div className="min-h-screen relative bg-white dark:bg-[#1A2238] transition-colors duration-300">
      <PageMeta
        title={`${title} — Case Study`}
        description={caseStudy.description}
        path={`/portfolio/${caseStudy.slug}`}
        image={caseStudy.featuredImage?.startsWith('http') ? caseStudy.featuredImage : undefined}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://brightpathwebstudio.org/' },
              { '@type': 'ListItem', position: 2, name: 'Portfolio', item: 'https://brightpathwebstudio.org/portfolio' },
              { '@type': 'ListItem', position: 3, name: caseStudy.title },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: caseStudy.title,
            description: caseStudy.description,
            url: `https://brightpathwebstudio.org/portfolio/${caseStudy.slug}`,
            creator: { '@type': 'Person', name: 'Tisha Di Fresco' },
            about: caseStudy.category,
            keywords: caseStudy.tags?.join(', '),
          },
        ]}
      />
      {/* Back to Portfolio button */}
      {onBack && (
        <button
          onClick={onBack}
          className="fixed top-24 left-4 z-[10000] flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to Portfolio
        </button>
      )}

      <div
        id="extended-background"
        className="absolute top-0 left-0 w-full h-[40rem] bg-gradient-to-b from-[#1A2238] via-[#1A2238]/95 to-transparent dark:from-[#0F1628] dark:via-[#0F1628]/95 dark:to-transparent transition-colors duration-300 z-0"
      />

      {/* Hero Header */}
      <section className="relative pt-36 md:pt-32 pb-12 md:pb-24 z-10">
        <div className="max-w-4xl mx-auto px-4 text-left">
          {badge && (
            <span className="inline-block mb-4 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded uppercase tracking-wider">
              {badge}
            </span>
          )}

          <BrightPathGradientTitle
            as="h1"
            className="font-bold pb-6 tracking-tight"
            textColor="text-white"
          >
            {title}
          </BrightPathGradientTitle>

          {tags && tags.length > 0 && (
            <p className="text-xs text-gray-300 mb-4">{tags.join(' | ')}</p>
          )}

          {subtitle && (
            <h3 className="font-bold pb-6 tracking-tight text-gray-100">
              {subtitle}
            </h3>
          )}

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
              onClick={() =>
                trackPortfolioClick(
                  `${caseStudy.slug}_live_click`,
                  liveLabel ?? liveUrl,
                  liveUrl,
                  title,
                )
              }
            >
              <BrightPathGradientButton className="relative z-10 px-8 py-4 text-[#1a2238] shadow-xl inline-flex items-center gap-2">
                {liveLabel}
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </BrightPathGradientButton>
            </a>
          )}
        </div>
      </section>

      {/* Optional hero image */}
      {heroImage && (
        <section className="relative z-20 pb-12 md:pb-16 lg:pb-20">
          <div className="w-full px-4">
            <div className="relative max-w-6xl mx-auto h-[24rem] md:h-[36rem] overflow-hidden rounded-2xl shadow-2xl bg-gray-100 dark:bg-[#0F1628]">
              <img
                src={heroImage}
                alt={`${title} hero preview`}
                className="absolute inset-0 w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      )}

      {/* Project Snapshot */}
      {projectSnapshot && (
        <div className="relative z-10 bg-gray-100 dark:bg-[#273442]">
          <ProjectSnapshot
            theme={theme}
            metadata={projectSnapshot.metadata}
            achievements={projectSnapshot.achievements}
          />
        </div>
      )}

      {/* The Challenge */}
      {challenge && challenge.length > 0 && (
        <section className="relative z-10 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <BrightPathGradientTitle
              as="h2"
              className="font-poppins font-bold mb-6 text-2xl md:text-3xl"
              textColor="text-gray-900 dark:text-gray-200"
              gradientWords={['Challenge']}
            >
              The Challenge
            </BrightPathGradientTitle>
            <div className="space-y-4 text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {challenge.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* My Approach */}
      {approach && approach.length > 0 && (
        <section className="relative z-10 py-12 px-4 bg-gray-100 dark:bg-[#273442]">
          <div className="max-w-4xl mx-auto">
            <BrightPathGradientTitle
              as="h2"
              className="font-poppins font-bold mb-6 text-2xl md:text-3xl"
              textColor="text-gray-900 dark:text-gray-200"
              gradientWords={['Approach']}
            >
              My Approach
            </BrightPathGradientTitle>
            <div className="space-y-4 text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {approach.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Project Timeline */}
      {process && process.length > 0 && (
        <section className="relative z-10 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <BrightPathGradientTitle
              as="h2"
              className="font-poppins font-bold mb-12 text-2xl md:text-3xl text-center"
              textColor="text-gray-900 dark:text-gray-200"
              gradientWords={['Timeline']}
            >
              Project Timeline
            </BrightPathGradientTitle>

            <div className="relative">
              {/* Horizontal connecting line — desktop only. Aligned to vertical center of the step circles (top-6 = h-12/2). */}
              <div
                className="hidden md:block absolute top-6 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary/10 via-primary/60 to-primary/10"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative">
                {process.map((phase) => (
                  <div key={phase.step} className="flex flex-col items-center text-center">
                    <div
                      className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full font-poppins font-bold text-lg transition-colors duration-300 ${
                        theme === 'dark'
                          ? 'bg-[#1A2238] text-primary border-2 border-primary shadow-glow-primary'
                          : 'bg-white text-primary border-2 border-primary shadow-lg'
                      }`}
                    >
                      {phase.step}
                    </div>
                    <h3 className="mt-4 font-poppins font-semibold text-base text-primary">
                      {phase.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed max-w-[220px]">
                      {phase.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Performance Results */}
      {performanceMetrics && performanceMetrics.length > 0 && (
        <div className="relative z-10 bg-gray-100 dark:bg-[#273442]">
          <PerformanceResults
            theme={theme}
            metrics={performanceMetrics}
            summary={performanceSummary}
          />
        </div>
      )}

      {/* Engineering Highlights — shares bg with Performance Results above
          since both sections cover the same story (perf overhaul). */}
      {engineeringHighlights && engineeringHighlights.length > 0 && (
        <section className="relative z-10 py-16 px-4 bg-gray-100 dark:bg-[#273442]">
          <div className="max-w-5xl mx-auto">
            <BrightPathGradientTitle
              as="h2"
              className="font-poppins font-bold mb-10 text-2xl md:text-3xl text-center"
              textColor="text-gray-900 dark:text-gray-200"
              gradientWords={['Engineering']}
            >
              Engineering Highlights
            </BrightPathGradientTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {engineeringHighlights.map((item, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-xl transition-colors duration-300 ${
                    theme === 'dark'
                      ? 'bg-[#1A2238]/50 border border-primary/20 shadow-glow-primary'
                      : 'bg-white border border-gray-200 shadow-lg'
                  }`}
                >
                  <h3 className="font-poppins font-semibold text-lg mb-2 text-primary">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Feature Showcase */}
      {featureShowcase && featureShowcase.length > 0 && (
        <section className="relative z-10 py-16 px-4 bg-gray-100 dark:bg-[#273442]">
          <div className="max-w-6xl mx-auto">
            <BrightPathGradientTitle
              as="h2"
              className="font-poppins font-bold mb-10 text-2xl md:text-3xl text-center"
              textColor="text-gray-900 dark:text-gray-200"
              gradientWords={['Features']}
            >
              Features
            </BrightPathGradientTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featureShowcase.map((item, i) => (
                <div
                  key={i}
                  className={`rounded-xl overflow-hidden transition-colors duration-300 ${
                    theme === 'dark'
                      ? 'bg-[#1A2238]/50 border border-primary/20'
                      : 'bg-white border border-gray-200 shadow-lg'
                  }`}
                >
                  {item.video ? (
                    <div className="overflow-hidden bg-gray-200 dark:bg-[#0F1628]">
                      <video
                        src={item.video}
                        poster={item.videoPoster}
                        autoPlay
                        loop
                        muted
                        playsInline
                        aria-label={item.title}
                        className="w-full h-auto block"
                      />
                    </div>
                  ) : item.image ? (
                    <div className="overflow-hidden bg-gray-200 dark:bg-[#0F1628]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-auto block"
                        loading="lazy"
                      />
                    </div>
                  ) : null}
                  <div className="p-6">
                    <h3 className="font-poppins font-semibold text-lg mb-2 text-primary">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mobile-first / Responsive showcase */}
      {mobileShowcase && mobileShowcase.images.length > 0 && (
        <section className="relative z-10 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <BrightPathGradientTitle
              as="h2"
              className="font-poppins font-bold mb-4 text-2xl md:text-3xl text-center"
              textColor="text-gray-900 dark:text-gray-200"
              gradientWords={['Mobile-First']}
            >
              Built Mobile-First
            </BrightPathGradientTitle>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              {mobileShowcase.caption ??
                'Every section is fully responsive — breakpoint-tuned image delivery, mobile-tested layouts, and a static Hero injection that paints the LCP image before React even boots.'}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 justify-items-center">
              {mobileShowcase.images.map((img, i) => (
                <div key={i} className="flex flex-col items-center w-full max-w-[200px]">
                  <div
                    className={`relative w-full rounded-[2rem] p-1.5 transition-colors duration-300 ${
                      theme === 'dark'
                        ? 'bg-[#1A2238] border border-primary/30 shadow-glow-primary'
                        : 'bg-gray-100 border border-gray-300 shadow-2xl'
                    }`}
                  >
                    {/* Lock all phone frames to the iPhone screenshot aspect ratio
                        (1290x2574) so the hero shot — which is ~340px shorter due to
                        bottom-chrome crop — visually matches the other three. The
                        object-cover + object-top combo crops the bottom sliver of the
                        hero's wasted black bg without affecting the visible artwork. */}
                    <div className="overflow-hidden rounded-[1.6rem] bg-black aspect-[1290/2574]">
                      <img
                        src={img.src}
                        alt={img.label ? `${title} — ${img.label} on a phone` : `${title} on a phone`}
                        className="w-full h-full object-cover object-top block"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  {img.label && (
                    <p className="mt-3 text-xs md:text-sm font-medium text-primary text-center">
                      {img.label}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Visual Gallery */}
      {screenshots && screenshots.length > 0 && (
        <section className="relative z-10 py-16 px-4 bg-gray-100 dark:bg-[#273442]">
          <div className="max-w-6xl mx-auto">
            <BrightPathGradientTitle
              as="h2"
              className="font-poppins font-bold mb-10 text-2xl md:text-3xl text-center"
              textColor="text-gray-900 dark:text-gray-200"
              gradientWords={['Gallery']}
            >
              Gallery
            </BrightPathGradientTitle>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {screenshots.map((shot, i) => (
                <figure key={i} className="rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-primary/20">
                  <img
                    src={shot.after}
                    alt={shot.label}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  <figcaption className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-[#1A2238]/50">
                    {shot.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tech Stack Pills */}
      {stackPills && stackPills.length > 0 && (
        <section className="relative z-10 py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <BrightPathGradientTitle
              as="h2"
              className="font-poppins font-bold mb-6 text-2xl md:text-3xl"
              textColor="text-gray-900 dark:text-gray-200"
              gradientWords={['Stack']}
            >
              Tech Stack
            </BrightPathGradientTitle>
            <div className="flex flex-wrap justify-center gap-2">
              {stackPills.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-sm bg-muted text-foreground rounded-full border border-primary/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {testimonial && (
        <section className="py-20 px-4 transition-colors duration-300 relative z-10
          bg-gradient-to-br from-slate-50 via-white to-slate-100
          dark:from-[#050B14] dark:via-[#081426] dark:to-[#0B1E33]"
        >
          <div className="max-w-4xl mx-auto text-center">
            <BrightPathGradientTitle
              as="h2"
              className="font-bold mb-8"
              textColor="text-gray-900 dark:text-gray-200"
              gradientWords={['Client']}
            >
              What the Client Says
            </BrightPathGradientTitle>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 relative">
              <div className="absolute top-4 left-4 text-6xl text-primary/20 font-serif leading-none">"</div>
              <div className="absolute bottom-4 right-4 text-6xl text-primary/20 font-serif leading-none">"</div>

              {testimonial.quoteTitle && (
                <h3 className="relative z-10 font-poppins font-bold text-xl md:text-2xl text-primary mb-6">
                  {testimonial.quoteTitle}
                </h3>
              )}

              <div className="relative z-10 space-y-4 text-left text-base md:text-lg text-gray-700 dark:text-gray-300 italic leading-relaxed mb-8 max-w-2xl mx-auto">
                {testimonial.quote.split(/\n\n+/).map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <div className="flex flex-col items-center">
                {testimonial.image && (
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-primary/30"
                  />
                )}
                <div className="font-bold text-xl text-primary mb-1">{testimonial.author}</div>
                <div className="text-gray-600 dark:text-gray-400">{testimonial.role}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quick-facts footer */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16 px-4 transition-colors duration-300 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-[18px] font-bold text-primary uppercase tracking-wider">
                Client
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
                <li>{client}</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-[18px] font-bold text-primary uppercase tracking-wider">
                Services
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
                <li>Custom React + TypeScript Build</li>
                <li>UI / UX Design</li>
                <li>Performance Engineering</li>
                <li>SEO + Analytics</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-[18px] font-bold text-primary uppercase tracking-wider">
                Stack
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
                {(techStack ?? []).slice(0, 6).map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-[18px] font-bold text-primary uppercase tracking-wider">
                Results
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5 break-words">
                {liveUrl && (
                  <li>
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-bp-primary hover:underline break-all"
                    >
                      {liveLabel}
                    </a>
                  </li>
                )}
                {caseStudy.results?.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-16 px-4 bg-white dark:bg-[#1A2238]">
        <div className="max-w-3xl mx-auto text-center">
          <BrightPathGradientTitle
            as="h2"
            className="font-poppins font-bold mb-4 text-2xl md:text-3xl"
            textColor="text-gray-900 dark:text-gray-200"
            gradientWords={['together']}
          >
            Let's build something together
          </BrightPathGradientTitle>
          <p className="text-muted-foreground mb-8">
            Want a custom-built site that loads fast and tells your story? I'd love to talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <BrightPathGradientButton className="px-6 py-3 inline-flex items-center gap-2 text-primary-foreground font-medium rounded-md">
                Start a project
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </BrightPathGradientButton>
            </a>
            {onBack && (
              <button
                onClick={onBack}
                className="px-6 py-3 inline-flex items-center gap-2 border border-primary/40 text-primary rounded-md hover:bg-primary/5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                See more work
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebProjectCaseStudyPage;
