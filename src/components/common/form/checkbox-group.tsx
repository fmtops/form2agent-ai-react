import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
} from "@mui/material";

export type CheckboxGroupProps = {
  options: string[];
  label: string;
  onChange: (selectedValue: string) => void;
  values?: string[];
  variant?: "horizontal" | "vertical";
  disabled?: boolean | false;
};

export const CheckboxGroupComponent = ({
  options,
  label,
  onChange,
  values,
  variant,
  disabled,
}: CheckboxGroupProps) => {
  return (
    <FormControl className="flex flex-col gap-y-2">
      <FormLabel className={`text-sm font-medium text-text-primary-light`}>
        {label}
      </FormLabel>

      <FormGroup
        className={`flex ${variant === "horizontal" ? "gap-4" : ""} ${variant}`}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option}
            className={`text-sm text-text-primary-light`}
            control={
              <Checkbox
                checked={values ? values.includes(option) : false}
                onChange={(e) => onChange(e.target.value)}
                value={option}
                disabled={disabled}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};
