import React from "react";

export default function StyledLink({
  className,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { className?: string }) {
  return (
    <a
      className={`py-[10px] mt-4 rounded shadow-sm text-white w-24 bg-bg-brand-contrast-light ${className}`}
      {...rest}
    >
      {rest.children}
    </a>
  );
}
