import { SnackbarContentProps, SnackbarContent, Button } from "@mui/material";
import { useState, useEffect } from "react";
import styled from "styled-components";

const snackbarActionButtonStyles = {
  padding: "8px",
  fontFamily: "inherit",
  fontSize: "inherit",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "transparent",
  },
};

const snackbarActionButton = (onClick: () => void) => (
  <Button
    disableRipple
    variant="text"
    color="primary"
    size="small"
    onClick={onClick}
    className="normal-case"
    sx={snackbarActionButtonStyles}
  >
    Accept
  </Button>
);

const snackbarPopupStyles = {
  width: "407px",
  height: "52px",
  position: "fixed",
  bottom: "16px",
  left: "50%",
  transform: "translateX(-50%)",
  borderRadius: "8px",
  background: "var(--components-snackbar-fill, #323232)",
  boxShadow: `
    0px 3px 5px -1px #00000033,
    0px 6px 10px 0px #00000024,
    0px 1px 18px 0px #0000001F
  `,
};

const StyledSnackbarPopup = styled((props: SnackbarContentProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  return isVisible ? (
    <SnackbarContent
      sx={snackbarPopupStyles}
      action={snackbarActionButton(handleClose)}
      {...props}
    />
  ) : null;
})``;

export default StyledSnackbarPopup;
