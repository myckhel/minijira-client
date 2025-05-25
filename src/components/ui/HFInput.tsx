import { Input } from "antd";
import type { InputProps } from "antd/es/input";
import { cn } from "../../utils/cn";

interface HFInputProps extends Omit<InputProps, "variant"> {
  variant?: "default" | "outlined" | "filled";
  hfSize?: "small" | "medium" | "large";
}

export function HFInput({
  variant = "default",
  hfSize = "medium",
  className,
  ...props
}: HFInputProps) {
  const baseClasses = "transition-all duration-200 font-medium";

  const variantClasses = {
    default: "border-gray-300 focus:border-orange-400 focus:shadow-lg",
    outlined:
      "border-2 border-orange-300 focus:border-orange-500 bg-transparent",
    filled:
      "bg-orange-50 border-orange-200 focus:bg-white focus:border-orange-400",
  };

  const sizeClasses = {
    small: "h-8 text-sm",
    medium: "h-10 text-base",
    large: "h-12 text-lg",
  };

  return (
    <Input
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[hfSize],
        className
      )}
      {...props}
    />
  );
}

export default HFInput;
