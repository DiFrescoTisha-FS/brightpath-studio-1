import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';
import BrightPathGradientTitle from './BrightPathGradientTitle';

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
    imageUrl: '/images/case-studies/awestruck/card-hero.png',
    href: '/portfolio/awestruck-intelligence',
    badge: 'Featured',
  },
  {
    id: 2,
    title: 'Dale Tiffany Lighting',
    description: 'An elegant e-commerce site for a luxury lighting brand.',
    imageUrl: '/images/DT-LONG.jpg',
    href: '/portfolio',
  },
  {
    id: 3,
    title: 'Angel City Massage',
    description: 'WordPress modernization with a Lighthouse desktop lift from 62 to 99.',
    imageUrl: '/images/ACM_HOME.png',
    href: '/portfolio',
  },
];

const PortfolioSection = () => {
  const { theme } = useAppStore();

  return (
    <section className={`py-20 ${theme === 'dark' ? 'bg-[#273442]' : 'bg-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <BrightPathGradientTitle as="h2" className="font-poppins font-bold mb-4 text-foreground"
          gradientWords={["Work"]}
        >
          My Work
        </BrightPathGradientTitle>
        <p className="hidden md:block text-muted-foreground font-lato text-sm mb-8">
          Hover over the cards to explore each project
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

                <div className="h-[400px] w-full overflow-hidden">
                  <motion.img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-auto"
                    whileHover={{ y: -((650 * 100) / 400 - 100) + '%' }}
                    transition={{ duration: 3, ease: 'easeInOut' }}
                  />
                </div>

                <div className="p-6">
                  <BrightPathGradientTitle
                    as="h5"
                    gradientWords={["AweStruck", "Intelligence", "Dale", "Tiffany", "Angel", "City"]}
                    className="font-poppins font-semibold mb-2">
                    {item.title}
                  </BrightPathGradientTitle>
                  <p className="card-subheading font-lato text-muted-foreground">
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
