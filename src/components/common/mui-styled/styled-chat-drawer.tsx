import { styled } from "@mui/material/styles";
import { CHAT_WIDTH } from "../../../consts/chat.consts";
import SwipeableDrawer, {
  SwipeableDrawerProps,
} from "@mui/material/SwipeableDrawer";

interface StyledChatDrawerProps {
  isNavbarExpanded: boolean;
}

const StyledChatDrawer = styled(
  ({
    isNavbarExpanded,
    ...props
  }: StyledChatDrawerProps & SwipeableDrawerProps) => (
    <SwipeableDrawer {...props}></SwipeableDrawer>
  )
)(({ isNavbarExpanded }) => ({
  "& .MuiDrawer-paper": {
    width: "100%",
    maxWidth: "100%",
    height: "100%",
    maxHeight: "100%",
    borderRadius: "8px 8px 0 0",
    ...(!isNavbarExpanded && {
      "@media (min-width:780px)": {
        width: CHAT_WIDTH,
        boxShadow: "none",
        borderLeft: "2px solid #D1D5DB",
        borderRadius: 0,
        height: "100%",
      },
    }),
    ...(isNavbarExpanded && {
      "@media (min-width:780px)": {
        width: `calc(100% - 280px)`,
      },
      "@media (min-width:1170px)": {
        width: CHAT_WIDTH,
        boxShadow: "none",
        borderLeft: "2px solid #D1D5DB",
        borderRadius: 0,
        height: "100%",
      },
    }),
  },
}));
export default StyledChatDrawer;
