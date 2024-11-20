import { TableRow } from "@mui/material";
import { styled } from "@mui/system";

export const SmallTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": { border: 0 },
  [theme.breakpoints.down("sm")]: {
    // Only apply on small screens
    padding: "4px 8px",
  },
}));
