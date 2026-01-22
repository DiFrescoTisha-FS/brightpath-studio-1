import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import BrightPathGradientTitle from './BrightPathGradientTitle';

// Portfolio data structure - each item represents a project showcase
interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

// Hard-coded portfolio items for display
const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Mobile Massage Website',
    description: 'A modern, mobile-first website for a massage therapy service.',
    imageUrl: '/images/scroll-img-2.png' 
  },
  {
    id: 2,
    title: 'Dale Tiffany Lighting',
    description: 'An elegant e-commerce site for a luxury lighting brand.',
    imageUrl: '/images/scroll-img-1.jpg'
  },
  {
    id: 3,
    title: 'Song Artist Website',
    description: 'A dynamic portfolio site for a music artist, showcasing tracks and bio.',
    imageUrl: '/images/scroll-img-3.png'
  }
];

const PortfolioSection = () => {
  const { theme } = useAppStore();

  return (
    <section className={`py-20 ${theme === 'dark' ? 'bg-[#273442]' : 'bg-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <BrightPathGradientTitle as="h2" className="font-poppins font-bold mb-12 text-foreground"
          gradientWords={["Work"]}
        >
          My Work
        </BrightPathGradientTitle>
        {/*
          This is the grid container for the portfolio cards.
          It uses CSS Grid to create a responsive layout that goes from a single column
          on mobile to three columns on desktop.
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            // A motion.div for the card wrapper to handle the hover animation
            <motion.div
              key={item.id}
              className={`relative rounded-2xl overflow-hidden cursor-pointer
              transition-all duration-300 hover:shadow-2xl hover:scale-[0.25px]
              ${theme === 'dark' ? 'bg-[#273442] border-primary/20 border-[0.25px] shadow-glow-primary' : 'bg-white border-[0.25px] border-primary/50'}`}
              // Framer Motion's whileHover prop is perfect for this effect
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/*
                This container holds the image. It has a fixed height and hides
                anything that overflows, creating the "window" effect for the image.
              */}
              <div className="h-[400px] w-full overflow-hidden">
                <motion.img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-auto"
                  // Framer Motion's whileHover prop animates the vertical position of the image.
                  // It moves the image up by the difference in height, creating a scroll effect.
                  whileHover={{ y: -((650 * 100) / 400 - 100) + '%' }}
                  transition={{ duration: 3, ease: 'easeInOut' }}
                />
              </div>

              {/* Card content with a gradient overlay for better readability */}
              <div className="p-6">
                <BrightPathGradientTitle 
                  as="h5"
                  gradientWords={["Mobile", "Massage", "Dale", "Tiffany", "Song", "Artist"]}
                  className="font-poppins font-semibold mb-2">
                  {item.title}
                </BrightPathGradientTitle>
                <p className="card-subheading font-lato text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;