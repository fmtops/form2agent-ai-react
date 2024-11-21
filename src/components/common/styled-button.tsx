import React from "react";

export default function StyledButton({
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <button
      className={`py-[10px] rounded shadow-sm text-white w-fit bg-bg-brand-contrast-light ${className}`}
      {...rest}
    >
      {rest.children}
    </button>
  );
}
