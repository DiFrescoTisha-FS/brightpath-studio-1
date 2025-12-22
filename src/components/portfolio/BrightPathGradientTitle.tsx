import React from 'react';

interface BrightPathGradientTitleProps {
  children: string;
  /**
   * Words to apply gradient to.
   * Example: gradientWords={['Digital', 'Solutions']}
   */
  gradientWords?: string[];
  /**
   * Class name for the entire title (size, font weight, etc.)
   * Default: "text-4xl font-bold"
   */
  className?: string;
  /**
   * Text color for non-gradient words
   * Default: "text-foreground"
   */
  textColor?: string;
  /**
   * Gradient style
   * - "gold": Gold to orange (works in both themes)
   * - "primary": Primary to secondary (theme-aware)
   * Default: "gold"
   */
  gradientStyle?: 'gold' | 'primary';
  /**
   * HTML tag to render
   * Default: "h2"
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  id?: string;
}

/**
 * BrightPath GradientTitle Component
 *
 * Renders a title with specific words in gradient style using BrightPath brand colors.
 * Uses gold (#EBB109) primary with yellow-orange gradients.
 *
 * @example
 * // Simple usage - all text is gradient
 * <BrightPathGradientTitle>Beautiful Title</BrightPathGradientTitle>
 *
 * @example
 * // Mixed plain and gradient text
 * <BrightPathGradientTitle gradientWords={['Digital', 'Solutions']}>
 *   Your Digital Solutions Partner
 * </BrightPathGradientTitle>
 *
 * @example
 * // Custom styling
 * <BrightPathGradientTitle
 *   className="text-6xl font-extrabold"
 *   textColor="text-white"
 *   gradientWords={['Studio']}
 * >
 *   BrightPath Web Studio
 * </BrightPathGradientTitle>
 */
export default function BrightPathGradientTitle({
  children,
  gradientWords = [],
  className = 'text-4xl font-bold font-poppins',
  textColor = 'text-foreground',
  gradientStyle = 'gold',
  as: Tag = 'h2',
  id,
}: BrightPathGradientTitleProps) {
  // Gradient classes based on style
  const gradientClasses = {
    gold: 'bg-gradient-to-r from-primary via-yellow-500 to-orange-400 bg-clip-text text-transparent',
    primary: 'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent dark:from-yellow-500 dark:to-orange-400',
  };

  const gradientClass = gradientClasses[gradientStyle];

  // If no gradient words specified, apply gradient to entire text
  if (gradientWords.length === 0) {
    return (
      <Tag id={id} className={`${className} ${gradientClass}`}>
        {children}
      </Tag>
    );
  }

  // Split text by words and identify which should be gradient
  const words = children.split(' ');

  return (
    <Tag id={id} className={`${className} ${textColor}`}>
      {words.map((word, index) => {
        const isGradient = gradientWords.some(
          (gw) => word.toLowerCase().includes(gw.toLowerCase())
        );

        if (isGradient) {
          return (
            <React.Fragment key={index}>
              {index > 0 && ' '}
              <span className={gradientClass}>{word}</span>
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={index}>
            {index > 0 && ' '}
            {word}
          </React.Fragment>
        );
      })}
    </Tag>
  );
}

/**
 * Alternative approach using HTML from database
 */
export function BrightPathGradientTitleFromHTML({
  html,
  className = 'text-4xl font-bold font-poppins',
  as: Tag = 'h2',
  id,
}: {
  html: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
