import styled from "styled-components";
import { TextField, TextFieldProps } from "@mui/material";

const StyledTextField = styled((props: TextFieldProps) => (
  <TextField
    sx={{
      "& .MuiInputBase-root": {
        fontFamily: "inherit !important",
      },
      "& .MuiInputBase-input": {
        fontFamily: "inherit !important",
      },
      "& .MuiFormHelperText-root": {
        fontFamily: "inherit !important",
      },
    }}
    {...props}
  />
))({});

export default StyledTextField;
