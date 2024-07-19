import styled from "styled-components";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";

const StyledCheckbox = styled((props: CheckboxProps) => (
  <Checkbox
    sx={{
      color: "#D1D5DB",
      height: 24,
      "&.Mui-checked": {
        color: "#687EFF",
      },
      "&.MuiCheckbox-indeterminate": {
        color: "#687EFF",
      },
    }}
    {...props}
  />
))({});

export default StyledCheckbox;
