import { Dialog } from "@mui/material";
import { useState } from "react";
import ApiKeyConfirmDialogContent from "./api-key-confirm-dialog-content";
import FreeTrialDialogContent from "./free-trial-dialog-content";
import TrialOptionsDialogContent from "./trial-options-dialog-content";
import { TrialDialogContent } from "../../types/Trial/TrialDialogContent";
import TrialThankYouDialogContent from "./trial-thank-you-dialog-content";
import TrialKeyAlreadyExistsDialogContent from "./trial-key-already-exists-content";

export interface TrialDialogProps {
  id: string;
  open: boolean;
  onClose: () => void;
  onConfirmApiKey?: () => void;
}

export default function TrialOptionsDialog(props: TrialDialogProps) {
  const { onClose, onConfirmApiKey, open, ...other } = props;
  const [openDialog, setOpenDialog] = useState(TrialDialogContent.OptionsMenu); // dialog/popup content currently being rendered

  const backToOptions = () => {
    setOpenDialog(TrialDialogContent.OptionsMenu);
  };

  const trialToSuccessScreen = () => {
    setOpenDialog(TrialDialogContent.TrialThankYou);
  };

  const trialToConflictScreen = () => {
    setOpenDialog(TrialDialogContent.TrialKeyAlreadyExists);
  };

  const getDialogMaxWidth = () => {
    switch (openDialog) {
      case TrialDialogContent.TrialKeyAlreadyExists:
        return "475px";
      case TrialDialogContent.TrialThankYou:
        return "680px";
      default:
        return "900px";
    }
  };

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: getDialogMaxWidth(),
          maxHeight: 635,
        },
      }}
      open={open}
      keepMounted={false}
      {...other}
    >
      <div className="px-8">
        {openDialog === TrialDialogContent.OptionsMenu && (
          <TrialOptionsDialogContent
            onClose={onClose}
            setOpenDialog={setOpenDialog}
          />
        )}
        {openDialog === TrialDialogContent.TrialKeyForm && (
          <FreeTrialDialogContent
            onSuccess={trialToSuccessScreen}
            onConflict={trialToConflictScreen}
            onBack={backToOptions}
            onClose={onClose}
          />
        )}
        {openDialog === TrialDialogContent.OpenAIKeyForm && (
          <ApiKeyConfirmDialogContent
            onBack={backToOptions}
            onClose={onClose}
          />
        )}
        {openDialog === TrialDialogContent.TrialThankYou && (
          <TrialThankYouDialogContent onClose={onClose} />
        )}
        {openDialog === TrialDialogContent.TrialKeyAlreadyExists && (
          <TrialKeyAlreadyExistsDialogContent onClose={onClose} />
        )}
      </div>
    </Dialog>
  );
}
