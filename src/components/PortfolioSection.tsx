import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';
import BrightPathGradientTitle from './BrightPathGradientTitle';
import { cloudinaryAssets } from '@/data/cloudinaryAssets';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  badge?: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'AweStruck Intelligence',
    description: 'Custom React + TypeScript build with a performance-first architecture — Lighthouse mobile 26 → 100.',
    imageUrl: cloudinaryAssets.awestruckCardHeroFull,
    href: '/portfolio/awestruck-intelligence',
    badge: 'Featured',
  },
  {
    id: 2,
    title: 'Dale Tiffany Lighting',
    description: 'Legacy PHP platform re-architected into a modern React + Supabase system — role-based B2B retailer portal and integrated admin CRM.',
    imageUrl: cloudinaryAssets.daleTiffanyLongFull,
    href: '/portfolio?project=dale-tiffany',
  },
  {
    id: 3,
    title: 'Angel City Massage',
    description: 'WordPress modernization with a Lighthouse desktop lift from 62 to 99.',
    imageUrl: cloudinaryAssets.angelCityHomepage,
    href: '/case-study',
  },
  {
    id: 4,
    title: 'Bamvsthewrld',
    description: 'Full-stack MERN platform for music artist — immersive 3D, Firebase auth, embedded media.',
    imageUrl: cloudinaryAssets.bamvsthewrldScrollFull,
    href: '/portfolio/bamvsthewrld',
  },
];

const PortfolioSection = () => {
  const { theme } = useAppStore();

  // Background handled by the `home-work` rules in globals.css so the section
  // can carry a gradient rather than a flat slab.
  return (
    <section className="home-work py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <BrightPathGradientTitle as="h2" className="font-poppins font-bold mb-4 text-foreground"
          gradientWords={["Work"]}
          emphasis="solid"
        >
          My Work
        </BrightPathGradientTitle>
        <p className="hidden md:block text-muted-foreground font-lato text-sm mb-8">
          Hover over the cards to explore each project
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {portfolioItems.map((item) => (
            <Link to={item.href} key={item.id} className="block">
              <motion.div
                className={`relative rounded-2xl overflow-hidden cursor-pointer h-full
                transition-all duration-300 hover:shadow-2xl
                ${theme === 'dark' ? 'bg-[#273442] border-primary/20 border-[0.25px] shadow-glow-primary' : 'bg-white border-[0.25px] border-primary/50'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.badge && (
                  <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                    {item.badge}
                  </div>
                )}

                <div className="h-[240px] w-full overflow-hidden">
                  <motion.img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-auto"
                    // Scroll-reveal on hover. -70% of image height shifts the
                    // bottom portion of long scroll captures into view; short/
                    // landscape images over-scroll but that's a minor quirk.
                    whileHover={{ y: '-70%' }}
                    transition={{ duration: 3, ease: 'easeInOut' }}
                  />
                </div>

                <div className="p-4">
                  {/* Project names read in the foreground colour; the gold
                      "Featured" badge stays the card's accent. */}
                  <BrightPathGradientTitle
                    as="h5"
                    emphasis="none"
                    className="font-poppins font-semibold mb-1 text-base">
                    {item.title}
                  </BrightPathGradientTitle>
                  <p className="font-lato text-xs text-muted-foreground leading-snug">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
