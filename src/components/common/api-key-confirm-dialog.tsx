import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { getStoredApiKey, setStoredApiKey } from "../../utils/api-key.utils";

export interface ConfirmationDialogRawProps {
  id: string;
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

export default function ApiKeyConfirmDialog(props: ConfirmationDialogRawProps) {
  const { onClose, open, onConfirm, ...other } = props;
  const [keyInput, setKeyInput] = useState(getStoredApiKey() || "");

  const handleOk = () => {
    setStoredApiKey(keyInput);
    onClose();
    if (onConfirm) onConfirm();
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="md"
      open={open}
      keepMounted={false}
      {...other}
    >
      <DialogTitle>OpenAI Api Key</DialogTitle>
      <DialogContent className="flex flex-col gap-4" dividers>
        <span className="text-text-primary-light">
          First, create an
          <a
            href="https://platform.openai.com/signup"
            className="text-text-brand-light"
            target="_blank"
          >
            {" OpenAI account "}
          </a>
          or
          <a
            href="https://platform.openai.com/login"
            className="text-text-brand-light"
            target="_blank"
          >
            {" sign in"}
          </a>
          . Next, navigate to the
          <a
            href="https://platform.openai.com/account/api-keys"
            className="text-text-brand-light"
            target="_blank"
          >
            {` API key page `}
          </a>
          and "Create new secret key", optionally naming the key. Make sure to
          save this somewhere safe and do not share it with anyone.
        </span>
        <TextField
          variant="outlined"
          className="w-full"
          placeholder="API Key"
          size="small"
          type="password"
          onChange={(e) => setKeyInput(e.target.value)}
          value={keyInput}
        />
        <span className="text-text-secondary-light text-sm">
          The key is not being stored externally. We store it safely in your
          browser. The key can be removed by typing anything here or deleted
          globally following
          <a
            href="https://help.openai.com/en/articles/9047852-how-can-i-delete-my-api-key"
            className="text-text-brand-light"
            target="_blank"
          >
            {" "}
            this tutorial
          </a>
          .
        </span>
      </DialogContent>
      <DialogActions>
        <button
          className="p-4 text-text-primary-light"
          autoFocus
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="p-4 text-text-brand-light font-medium"
          onClick={handleOk}
        >
          Confirm
        </button>
      </DialogActions>
    </Dialog>
  );
}
