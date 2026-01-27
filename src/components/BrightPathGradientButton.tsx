import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { type LucideIcon } from "lucide-react";

export type BrightPathGradientButtonProps = Omit<ButtonProps, "asChild"> & {
  href?: string;
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
};

export default function BrightPathGradientButton({
  href,
  target = "_blank",
  rel = "noopener noreferrer",
  icon: Icon,
  iconPosition = "left",
  children,
  className,
  disabled,
  ...props
}: BrightPathGradientButtonProps) {
  const bpClasses = `
    bg-gradient-to-r from-primary via-yellow-500 to-yellow-600
    text-primary-foreground font-semibold font-poppins
    hover:opacity-90 hover:shadow-glow-primary
    transition-all duration-300 rounded-lg
    ${className ?? ""}
  `;

  const content = (
    <span className="inline-flex items-center justify-center gap-2">
      {Icon && iconPosition === "left" && <Icon className="h-5 w-5" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="h-5 w-5" />}
    </span>
  );

  // Link mode
  if (href) {
    return (
      <Button asChild className={bpClasses} disabled={disabled} {...props}>
        <a
          href={disabled ? undefined : href}
          target={target}
          rel={rel}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : undefined}
          style={disabled ? { pointerEvents: "none" } : undefined}
        >
          {content}
        </a>
      </Button>
    );
  }

  // Button mode
  return (
    <Button className={bpClasses} disabled={disabled} {...props}>
      {content}
    </Button>
  );
}
