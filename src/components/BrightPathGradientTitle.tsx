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
   * How the emphasised words are rendered.
   * - "gradient": the original yellow→orange clipped gradient
   * - "solid": one flat warm gold, theme-aware, matching the approved hero
   * - "none": no emphasis at all — the whole title uses `textColor`. Needed
   *   because omitting `gradientWords` makes the *entire* title gradient.
   * Default: "gradient", so existing call sites are unaffected.
   */
  emphasis?: 'gradient' | 'solid' | 'none';
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
  className = 'text-4xl md:text-3xl sm:text-2xl font-bold font-poppins',
  textColor = 'text-foreground',
  gradientStyle = 'gold',
  emphasis = 'gradient',
  as: Tag = 'h2',
  id,
}: BrightPathGradientTitleProps) {
  // Gradient classes based on style
  const gradientClasses = {
    gold: 'bg-gradient-to-r from-yellow-500 via-yellow-500 to-yellow-600 bg-clip-text text-transparent',
            primary: 'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent dark:from-yellow-500 dark:to-yellow-600',
  };

  // `text-brand-gold` is defined in globals.css and resolves per theme.
  const gradientClass =
    emphasis === 'solid' ? 'text-brand-gold' : gradientClasses[gradientStyle];

  // Plain title, no emphasised words.
  if (emphasis === 'none') {
    return (
      <Tag id={id} className={`${className} ${textColor}`}>
        {children}
      </Tag>
    );
  }

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
  className = 'text-4xl md:text-3xl sm:text-2xl font-bold font-poppins',
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
