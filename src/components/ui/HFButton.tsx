import { Button } from "antd";
import type { ButtonProps } from "antd/es/button";
import { cn } from "../../utils/cn";

interface HFButtonProps extends Omit<ButtonProps, "variant"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  hfSize?: "small" | "medium" | "large";
}

export function HFButton({
  variant = "primary",
  hfSize = "medium",
  className,
  children,
  ...props
}: HFButtonProps) {
  const baseClasses = "font-medium transition-all duration-200 border-none";

  const variantClasses = {
    primary:
      "hf-bg-gradient text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
    secondary:
      "bg-gray-100 text-gray-800 hover:bg-gray-200 shadow-md hover:shadow-lg",
    outline:
      "border-2 border-orange-400 text-orange-600 bg-transparent hover:bg-orange-50 hover:border-orange-500",
    ghost: "text-orange-600 bg-transparent hover:bg-orange-50",
  };

  const sizeClasses = {
    small: "px-3 py-1.5 text-sm h-8",
    medium: "px-4 py-2 text-base h-10",
    large: "px-6 py-3 text-lg h-12",
  };

  return (
    <Button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[hfSize],
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}

export default HFButton;
