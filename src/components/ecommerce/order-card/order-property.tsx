import React from "react";

interface OrderPropertyProps {
  label: string;
  value: string | number;
  className?: string;
  animate?: boolean;
  spanClassname?: string;
}

export const OrderProperty: React.FC<OrderPropertyProps> = ({
  label,
  value,
  className,
  animate,
  spanClassname,
}) => {
  return (
    <div
      className={`flex gap-1 flex-col text-sm text-text-secondary-light ${
        className ?? " "
      } `}
    >
      {label}
      <span
        className={`${
          animate
            ? "text-text-brand-light animate-pulse "
            : "text-text-primary-light"
        } ${spanClassname ?? "text-sm font-medium"}`}
      >
        {value}
      </span>
    </div>
  );
};
