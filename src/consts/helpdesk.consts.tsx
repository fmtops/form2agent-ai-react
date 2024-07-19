import { ButtonProps, Button } from "@mui/material";
import styled from "styled-components";
import { HelpdeskFormType, HelpdeskPriority } from "../models/helpdesk-model";

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const UploadButton = styled((props: ButtonProps) => (
  <Button {...props} />
))({
  textTransform: "none",
  marginTop: -8,
});

export const HELPDESK_FORM_VALUES: HelpdeskFormType = {
  action: null,
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  supervisorEmail: "",
  subject: "",
  description: "",
  priority: HelpdeskPriority.LOW,
  attachmentFile: null,
  department: "",
};
