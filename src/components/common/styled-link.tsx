import React from "react";

export default function StyledLink({
  className,
  linkType,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  className?: string;
  linkType?: "primary" | "secondary";
}) {
  const linkClassName =
    linkType === "secondary"
      ? "py-[6px] text-text-brand-light border-text-brand-light w-fit rounded px-6 border-[1px] text-sm font-medium"
      : "py-[10px] mt-4 rounded shadow-sm text-white w-24 bg-bg-brand-contrast-light";

  return (
    <a className={`${linkClassName} ${className}`} {...rest}>
      {rest.children}
    </a>
  );
}
