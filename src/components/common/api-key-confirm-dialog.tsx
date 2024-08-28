import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  ListItem,
} from "@mui/material";
import { useState } from "react";
import { getStoredApiKey, setStoredApiKey } from "../../utils/api-key.utils";
import StyledUnorderedList from "./mui-styled/styled-unordered-list";

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

  const sensitiveDataItem = (
    <ListItem>
      <span className="font-bold">Sensitive Data:</span> Users should{" "}
      <span className="font-bold">NOT</span> use or input any sensitive data
      (e.g., passwords, personal identification information, or financial
      information) when interacting with this project.
    </ListItem>
  );

  const dataStorageItem = (
    <ListItem>
      <span className="font-bold">Data Storage:</span> Please be aware that the
      messages sent to the Form2Agent assistant using the chat widget or the API
      directly are stored to maintain chat context for the assistant. This data
      is never reused for new chats.
    </ListItem>
  );

  const apiKeysItem = (
    <ListItem>
      <span className="font-bold">API Keys:</span> We do{" "}
      <span className="font-bold">NOT</span> store any API keys within this
      project. Form2Agent requires API keys for external services, users are
      responsible for securely managing their own API keys and ensuring they are
      not exposed or stored within their repositories if forking the project.
    </ListItem>
  );

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 635 } }}
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
        <span className="text-text-secondary-light text-sm mb-4">
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
        <h2 className={`text-[#1E2023] font-medium`}>
          Important Information Regarding Data Usage:
        </h2>
        <span className="text-text-secondary-light text-sm">
          <StyledUnorderedList id="demo-information-regarding-data-usage">
            {sensitiveDataItem}
            {dataStorageItem}
            {apiKeysItem}
          </StyledUnorderedList>
        </span>
      </DialogContent>
      <DialogActions>
        <button
          id="api-key-close-button"
          className="p-4 text-text-primary-light"
          autoFocus
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          id="api-key-confirm-button"
          className="p-4 text-text-brand-light font-medium"
          onClick={handleOk}
        >
          Confirm
        </button>
      </DialogActions>
    </Dialog>
  );
}
