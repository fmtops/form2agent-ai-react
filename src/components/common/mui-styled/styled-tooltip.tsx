import { TooltipProps, Tooltip, tooltipClasses } from "@mui/material";
import styled from "styled-components";

export const StyledToolTip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({}) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#1F2937",
    padding: 12,
    paddingTop: 8,
    paddingBottom: 8,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#1F2937",
  },
}));
