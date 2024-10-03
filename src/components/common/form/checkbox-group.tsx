import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
} from "@mui/material";

export type CheckboxGroupProps = {
  isChatExpanded: boolean;
  isNavbarExpanded: boolean;
  options: string[];
  label: string;
  onChange: (selectedValue: string) => void;
  values?: string[];
  disabled?: boolean | false;
};

export const CheckboxGroupComponent = ({
  isChatExpanded,
  isNavbarExpanded,
  options,
  label,
  onChange,
  values,
  disabled,
}: CheckboxGroupProps) => {
  const checkboxGridRespClasses =
    isChatExpanded && isNavbarExpanded
      ? "sm-chat:grid-cols-2 md-chat:grid-cols-3 lg-chat:grid-cols-4"
      : isChatExpanded
        ? "xs-chat:grid-cols-2 sm-chat:grid-cols-3 md-chat:grid-cols-4"
        : isNavbarExpanded
          ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          : "xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4";

  const checkboxGridClasses = `gap-4 !grid grid-cols-1 ${checkboxGridRespClasses}`;

  return (
    <FormControl className="flex flex-col gap-y-2">
      <FormLabel className={`text-sm font-medium text-text-primary-light`}>
        {label}
      </FormLabel>

      <FormGroup className={checkboxGridClasses}>
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
