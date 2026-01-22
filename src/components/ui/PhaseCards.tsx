import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BrightPathGradientTitle from '../BrightPathGradientTitle';

// Define the shape of our data to ensure type-safety in TypeScript
interface ListItem {
  list_item_text: string;
}

interface PhaseCard {
  id: number;
  acf: {
    phase_number: string;
    blurb_title: string;
    card_content: string;
    list_items: ListItem[];
    background_image: string;
    hover_background_image: string;
    card_icon: string;
  };
}

const PhaseCards: React.FC = () => {
  const [cards, setCards] = useState<PhaseCard[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('https://bskfporucm.wpdns.site/wp-json/wp/v2/phase-card?acf_format=standard&order=asc');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // The definitive fix: We explicitly type the data variable upon declaration.
        const data: PhaseCard[] = await response.json();
        setCards(data);

      } catch (e: unknown) {
        // Fix: We now type the error as 'unknown' and handle it safely.
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-white">Loading phase cards...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }
  
  // We use optional chaining (?) here to safely render the cards, as they could be null initially.
  if (!cards) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className="relative group transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl rounded-none p-2 md:p-4"
            style={{
              backgroundImage: `url(${card.acf.background_image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              overflow: 'hidden',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
            }}
            whileHover={{
              scale: 1.05,
              backgroundImage: `url(${card.acf.hover_background_image})`,
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
                <div className="relative z-10 p-10 rounded-none bg-midnight border shadow-glow-primary text-white backdrop-blur-sm">
              <BrightPathGradientTitle
                as="span"
                className="inline-block px-4 py-2 rounded-full font-bold mb-4 bg-yellow-400 text-black">
  {`${card.acf.phase_number}`}
</BrightPathGradientTitle>
              <img src={card.acf.card_icon} alt="Phase Icon" className="w-24 h-24 mb-4 items-center" />


              <h3 className="text-3xl font-bold mb-2">{card.acf.blurb_title}</h3>
              <p className="text-xl mb-4 italic text-gray-300" dangerouslySetInnerHTML={{ __html: card.acf.card_content }}></p>
              
              {card.acf.list_items && card.acf.list_items.length > 0 && (
                <ul className="list-disc list-inside space-y-2 text-gray-200">
                  {card.acf.list_items.map((item, index) => (
                    <li key={index}>{item.list_item_text}</li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PhaseCards;