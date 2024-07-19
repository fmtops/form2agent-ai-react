import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export type RadioGroupProps = {
  options: string[];
  label: string;
  onChange: (value: string) => void;
  value?: string;
  variant?: "horizontal" | "vertical";
  disabled?: boolean | false;
};
export const RadioGroupComponent = ({
  options,
  label,
  onChange,
  value,
  variant,
  disabled,
}: RadioGroupProps) => {
  return (
    <>
      <FormControl className="flex flex-col gap-y-2">
        <FormLabel className={`text-sm font-medium text-text-primary-light`}>
          {label}
        </FormLabel>
        <RadioGroup
          className={`flex ${
            variant === "horizontal" ? "gap-4" : ""
          } ${variant}`}
          value={value}
          name="radio-buttons-group"
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((option) => (
            <FormControlLabel
              key={option}
              className={`text-sm text-text-primary-light`}
              value={option}
              control={<Radio disabled={disabled} />}
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
};
