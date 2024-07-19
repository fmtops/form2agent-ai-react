import React from "react";

export default function SubmitButton({
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`py-[10px] mt-4 border rounded shadow-sm text-white w-24 bg-lightBlue
       hover:bg-lightBlue
       ${className}`}
      type="submit"
      {...rest}
    >
      {rest.value ? rest.value : "Submit"}
    </button>
  );
}
