import {
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/system";
import StyledLabel from "./input-label";

export interface SelectComponentProps {
  className?: string;
  options: string[];
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (value: SelectChangeEvent) => void;
  isBigInput?: boolean;
}

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
  },
}));

export const SelectComponent = ({
  className,
  options,
  name,
  placeholder,
  onChange,
  value,
  isBigInput,
}: SelectComponentProps) => {
  return (
    <StyledFormControl
      className={`!rounded-md !border !border-solid !border-bg-active-light ${className}`}
    >
      {isBigInput ? (
        <InputLabel>{placeholder}</InputLabel>
      ) : (
        <StyledLabel>{placeholder}</StyledLabel>
      )}
      <Select
        className={isBigInput ? "h-14" : "h-12"}
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
    </StyledFormControl>
  );
};
