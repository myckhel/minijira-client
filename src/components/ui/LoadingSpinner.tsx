import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface LoadingSpinnerProps {
  size?: "small" | "default" | "large";
  text?: string;
  className?: string;
}

export function LoadingSpinner({
  size = "default",
  text,
  className = "",
}: LoadingSpinnerProps) {
  const sizeMap = {
    small: 16,
    default: 24,
    large: 32,
  };

  const antIcon = <LoadingOutlined style={{ fontSize: sizeMap[size] }} spin />;

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Spin indicator={antIcon} size={size} />
      {text && <span className="mt-2 text-sm text-gray-600">{text}</span>}
    </div>
  );
}
