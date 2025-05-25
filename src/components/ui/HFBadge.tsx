import { Tag } from "antd";
import type { TagProps } from "antd/es/tag";
import { cn } from "../../utils/cn";

interface HFBadgeProps extends Omit<TagProps, "color"> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "gradient";
  size?: "small" | "medium" | "large";
  glow?: boolean;
}

export function HFBadge({
  variant = "default",
  size = "medium",
  glow = false,
  className,
  children,
  ...props
}: HFBadgeProps) {
  const baseClasses = "font-medium border-none transition-all duration-200";

  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
    gradient: "hf-bg-gradient text-white shadow-md",
  };

  const sizeClasses = {
    small: "px-2 py-0.5 text-xs",
    medium: "px-3 py-1 text-sm",
    large: "px-4 py-1.5 text-base",
  };

  const glowClass = glow ? "hf-shadow-glow" : "";

  return (
    <Tag
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        glowClass,
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default HFBadge;
