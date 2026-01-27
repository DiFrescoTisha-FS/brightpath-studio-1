import * as React from "react";
import { Button } from "@/components/ui/button";
import { type LucideIcon } from "lucide-react";

type BrightPathTabButtonProps = {
  children: React.ReactNode;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
};

export function BrightPathTabButton({
  children,
  active = false,
  onClick,
  disabled = false,
  className = "",
  icon: Icon,
  iconPosition = "left",
}: BrightPathTabButtonProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={disabled}
      variant="secondary"
      className={`
        px-4 py-2 rounded-md text-sm font-medium font-poppins
        transition-all duration-300
        ${active
          ? "bg-gradient-to-r from-primary via-yellow-500 to-orange-400 text-primary-foreground shadow-md"
          : "bg-muted text-muted-foreground hover:bg-muted/80"}
        ${className}
      `}
    >
      <span className="inline-flex items-center justify-center gap-2">
        {Icon && iconPosition === "left" && <Icon className="h-4 w-4" />}
        {children}
        {Icon && iconPosition === "right" && <Icon className="h-4 w-4" />}
      </span>
    </Button>
  );
}
