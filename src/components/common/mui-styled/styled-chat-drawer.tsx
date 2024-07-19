import { styled } from "@mui/material/styles";
import { CHAT_WIDTH } from "../../../consts/chat.consts";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

const StyledChatDrawer = styled(SwipeableDrawer)({
  "& .MuiDrawer-paper": {
    width: "100%",
    maxWidth: "100%",
    height: "calc(100% - 12px)",
    maxHeight: "100%",
    borderRadius: "8px 8px 0 0",
    "@media (min-width:780px)": {
      width: CHAT_WIDTH,
      boxShadow: "none",
      borderLeft: "2px solid #D1D5DB",
      borderRadius: 0,
      height: "100%",
    },
  },
});

export default StyledChatDrawer;
