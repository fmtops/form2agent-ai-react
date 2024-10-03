import {
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import StyledLabel from "./input-label";

export interface SelectComponentProps {
  className?: string;
  options: string[];
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (value: SelectChangeEvent) => void;
}

export const SelectComponent = ({
  className,
  options,
  name,
  placeholder,
  onChange,
  value,
}: SelectComponentProps) => {
  return (
    <FormControl
      className={`px-3 rounded-md border-[#C1C6CF] border-[1px] bg-white text-black ${className}`}
    >
      <StyledLabel>{placeholder}</StyledLabel>
      <Select
        className="h-12"
        name={name}
        label={placeholder}
        value={value}
        onChange={onChange}
      >
        {options.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
