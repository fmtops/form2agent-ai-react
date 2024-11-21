import { ListProps, List } from "@mui/material";
import styled from "styled-components";

const unorderedListStyles = {
  listStyleType: "disc",
  py: 0,
  pl: 3,
  "& .MuiListItem-root": {
    display: "list-item",
    p: 0,
  },
};

const StyledUnorderedList = styled((props: ListProps) => (
  <List sx={unorderedListStyles} {...props} />
))``;

export default StyledUnorderedList;
