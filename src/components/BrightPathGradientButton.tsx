import React from 'react';
import { type LucideIcon } from 'lucide-react';

type ButtonClickHandler = React.MouseEventHandler<HTMLButtonElement>;

interface BrightPathGradientButtonProps {
  children: React.ReactNode;
  /**
   * Click handler
   */
  onClick?: ButtonClickHandler;
  /**
   * Button type
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Icon component from lucide-react
   */
  icon?: LucideIcon;
  /**
   * Icon position
   * Default: "left"
   */
  iconPosition?: 'left' | 'right';
  /**
   * Size variant
   * Default: "md"
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Hover animation style
   * - "glow": Adds gold glow effect on hover
   * - "bright": Brightens gradient on hover
   * - "scale": Scales button up slightly on hover
   * Default: "glow"
   */
  hoverEffect?: 'glow' | 'bright' | 'scale';
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

/**
 * BrightPath GradientButton Component
 *
 * A button with gradient background using BrightPath brand colors.
 * Gold primary (#EBB109) with yellow-orange gradient.
 *
 * @example
 * // Basic usage
 * <BrightPathGradientButton onClick={() => alert('Clicked!')}>
 *   Get Started
 * </BrightPathGradientButton>
 *
 * @example
 * // With icon
 * <BrightPathGradientButton icon={ArrowRight} iconPosition="right">
 *   Learn More
 * </BrightPathGradientButton>
 *
 * @example
 * // Large button with glow
 * <BrightPathGradientButton size="lg" hoverEffect="glow">
 *   Contact Us
 * </BrightPathGradientButton>
 */
export default function BrightPathGradientButton({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  size = 'md',
  hoverEffect = 'glow',
}: BrightPathGradientButtonProps) {
  const getHoverClasses = () => {
    switch (hoverEffect) {
      case 'glow':
        return 'hover:shadow-glow-primary';
      case 'bright':
        return 'hover:brightness-110';
      case 'scale':
        return 'hover:scale-105';
      default:
        return '';
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative
        bg-gradient-to-r from-primary via-yellow-500 to-orange-400
        ${getHoverClasses()}
        text-primary-foreground font-semibold font-poppins
        rounded-lg
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${className}
      `}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
        {children}
        {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
      </span>
    </button>
  );
}

/**
 * BrightPath Gradient Button with overlay hover effect
 */
export function BrightPathGradientButtonOverlay({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  size = 'md',
}: Omit<BrightPathGradientButtonProps, 'hoverEffect'>) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative overflow-hidden
        rounded-lg
        disabled:opacity-50 disabled:cursor-not-allowed
        group
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-yellow-500 to-orange-400"></div>

      {/* Hover gradient overlay (reversed) */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-yellow-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Text content */}
      <span className="relative z-10 flex items-center justify-center gap-2 text-primary-foreground font-semibold font-poppins">
        {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
        {children}
        {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
      </span>
    </button>
  );
}

/**
 * BrightPath Outline gradient button (gradient border with transparent background)
 */
export function BrightPathGradientButtonOutline({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  size = 'md',
}: Omit<BrightPathGradientButtonProps, 'hoverEffect'>) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative overflow-hidden
        rounded-lg
        p-[2px]
        bg-gradient-to-r from-primary via-yellow-500 to-orange-400
        disabled:opacity-50 disabled:cursor-not-allowed
        group
        ${className}
      `}
    >
      {/* Inner background */}
      <div className={`
        bg-background rounded-[6px]
        group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-yellow-500 group-hover:to-orange-400
        transition-all duration-300
        ${sizeClasses[size]}
      `}>
        {/* Text content */}
        <span className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-yellow-500 to-orange-400 bg-clip-text text-transparent group-hover:text-primary-foreground font-semibold font-poppins transition-colors duration-300">
          {Icon && iconPosition === 'left' && <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />}
        </span>
      </div>
    </button>
  );
}

/**
 * BrightPath Solid Button (non-gradient, uses primary color)
 */
export function BrightPathSolidButton({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  size = 'md',
}: Omit<BrightPathGradientButtonProps, 'hoverEffect'>) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-primary hover:bg-primary/90
        text-primary-foreground font-semibold font-poppins
        rounded-lg
        transition-all duration-300
        hover:shadow-glow-primary
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${className}
      `}
    >
      <span className="flex items-center justify-center gap-2">
        {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
        {children}
        {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
      </span>
    </button>
  );
}

interface BrightPathTabButtonProps {
  children: React.ReactNode;
  /**
   * Whether the tab is currently active
   */
  active?: boolean;
  /**
   * Click handler
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Icon component from lucide-react
   */
  icon?: LucideIcon;
  /**
   * Icon position
   * Default: "left"
   */
  iconPosition?: 'left' | 'right';
}

/**
 * BrightPath Tab Button Component
 *
 * A toggle-style button for tabs/navigation with active/inactive states.
 * Active = gradient background, Inactive = muted background
 *
 * @example
 * <BrightPathTabButton
 *   active={activeTab === 'home'}
 *   onClick={() => setActiveTab('home')}
 * >
 *   Home
 * </BrightPathTabButton>
 */
export function BrightPathTabButton({
  children,
  active = false,
  onClick,
  disabled = false,
  className = '',
  icon: Icon,
  iconPosition = 'left',
}: BrightPathTabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-md text-sm font-medium font-poppins
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${active
          ? 'bg-gradient-to-r from-primary via-yellow-500 to-orange-400 text-primary-foreground shadow-md'
          : 'bg-muted text-muted-foreground hover:bg-muted/80'
        }
        ${className}
      `}
    >
      <span className="flex items-center justify-center gap-2">
        {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
        {children}
        {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
      </span>
    </button>
  );
}
