import { Card } from "antd";
import type { CardProps } from "antd/es/card";
import { cn } from "../../utils/cn";

interface HFCardProps extends Omit<CardProps, "variant"> {
  variant?: "default" | "elevated" | "outlined" | "glow";
  interactive?: boolean;
}

export function HFCard({
  variant = "default",
  interactive = false,
  className,
  children,
  ...props
}: HFCardProps) {
  const baseClasses = "transition-all duration-300";

  const variantClasses = {
    default: "border border-gray-200 shadow-md",
    elevated: "border-none shadow-xl bg-white",
    outlined: "border-2 border-orange-200 shadow-sm bg-orange-50/30",
    glow: "border border-orange-300 shadow-lg hf-shadow-glow bg-gradient-to-br from-yellow-50 to-orange-50",
  };

  const interactiveClasses = interactive
    ? "cursor-pointer hover:shadow-xl hover:scale-[1.02] hover:border-orange-300 active:scale-[0.98]"
    : "";

  return (
    <Card
      className={cn(
        baseClasses,
        variantClasses[variant],
        interactiveClasses,
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
}

export default HFCard;
