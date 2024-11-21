import { useRef, useState, useEffect } from "react";
import StyledRadio from "./mui-styled/styled-radio";

export default function FormCardRadio({
  title,
  description,
  value,
}: {
  title: string;
  description: string;
  value: string;
}) {
  const radioRef = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleToggleRadio = () => {
    radioRef.current?.click();
  };

  // This ensures the correct border color when the component is first loaded
  useEffect(() => {
    setIsChecked(radioRef.current?.checked || false);
  }, [radioRef.current?.checked]);

  return (
    <div
      onClick={handleToggleRadio}
      className={`cursor-pointer flex flex-col p-4 justify-between rounded border-[1px] w-full ${
        isChecked ? "border-blue-500" : "border-border-primary-light"
      } text-text-primary-light`}
    >
      <div className="flex flex-row items-start gap-4">
        <StyledRadio
          inputRef={radioRef}
          value={value}
          className="!p-0"
        ></StyledRadio>
        <div className="flex flex-col gap-2">
          <h2 className={`text-lg font-medium text-text-primary-light`}>
            {title}
          </h2>
          <p className={`text-text-secondary-light`}>{description}</p>
        </div>
      </div>
    </div>
  );
}
