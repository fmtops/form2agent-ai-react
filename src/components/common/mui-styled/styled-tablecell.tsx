import { TableCell } from "@mui/material";
import { styled } from "@mui/system";

export const SmallTableCell = styled(TableCell)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    // Only apply on small screens
    padding: "4px 8px",
    fontSize: "0.875rem", // Smaller font size (14px)
  },
}));
