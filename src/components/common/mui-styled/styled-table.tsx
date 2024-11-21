import { Table, TableProps } from "@mui/material";
import { styled } from "@mui/system";

const StyledTable = styled((props: TableProps) => (
  <Table
    component="div"
    className="border-b-border-primary-light border-b-[1px] gap-24"
    sx={{
      minWidth: "375px",
      width: "100%",
    }}
    {...props}
  />
))(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    "& .MuiTablePagination-selectLabel": {
      display: "none",
    },
  },
  [theme.breakpoints.down("sm")]: {
    "& .MuiTablePagination-selectLabel": {
      display: "none",
    },
    minWidth: "100%",
  },
}));

export default StyledTable;
