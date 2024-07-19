import { Select, SelectProps } from "@mui/material";
import { styled } from "@mui/system";

const StyledSelect = styled((props: SelectProps) => (
  <Select
    sx={{
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    }}
    MenuProps={{
      PaperProps: {
        sx: {
          padding: "8px 16px",
          "& .MuiMenuItem-root.Mui-selected": {
            minWidth: "200px",
            bgcolor: "#F3F4F6",
            "&onhover": {
              bgcolor: "#F3F4F6",
            },
          },
        },
      },
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
      transformOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    }}
    {...props}
  >
    {props.children}
  </Select>
))(`

    `);

export default StyledSelect;
