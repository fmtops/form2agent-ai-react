import { SnackbarContentProps } from "@mui/material";
import StyledSnackbarPopup from "./mui-styled/styled-snackbar-popup";

const cookiePopupProps: SnackbarContentProps = {
  message: "This site uses cookies to analyze site usage.",
};

const CookiePopup = () => {
  return <StyledSnackbarPopup {...cookiePopupProps} />;
};

export default CookiePopup;
