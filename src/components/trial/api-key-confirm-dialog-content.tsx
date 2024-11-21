import { DialogTitle, DialogContent, TextField } from "@mui/material";
import { useState } from "react";
import { getStoredApiKey, setStoredApiKey } from "../../utils/api-key.utils";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import StyledButton from "../common/styled-button";
import DataUsageInfo from "../common/data-usage-info";

export default function ApiKeyConfirmDialogContent({
  onBack,
  onClose,
  onConfirm,
}: {
  onBack: () => void;
  onClose: () => void;
  onConfirm?: () => void;
}) {
  const [keyInput, setKeyInput] = useState(getStoredApiKey() || "");

  const handleOk = () => {
    setStoredApiKey(keyInput);
    onClose();
    if (onConfirm) onConfirm();
  };

  return (
    <div className="pt-8 pb-8 flex flex-col gap-4">
      <div>
        <div className="flex justify-between items-center">
          <KeyboardBackspaceIcon
            onClick={onBack}
            className={`cursor-pointer text-fg-primary-light`}
          />
          <CloseIcon
            onClick={onClose}
            className={`cursor-pointer text-fg-primary-light`}
          />
        </div>
        <DialogTitle className="!p-0 !pt-4">OpenAI Api Key</DialogTitle>
      </div>
      <DialogContent
        className="flex flex-col gap-4 !px-0 !pb-0 !border-b-0"
        dividers
      >
        <span className="text-text-primary-light">
          First, create an{" "}
          <a
            href="https://platform.openai.com/signup"
            className="text-text-brand-light"
            target="_blank"
          >
            OpenAI account
          </a>{" "}
          or{" "}
          <a
            href="https://platform.openai.com/login"
            className="text-text-brand-light"
            target="_blank"
          >
            sign in
          </a>
          . Next, navigate to the{" "}
          <a
            href="https://platform.openai.com/account/api-keys"
            className="text-text-brand-light"
            target="_blank"
          >
            API key page
          </a>{" "}
          and "Create new secret key", optionally naming the key. Make sure to
          save this somewhere safe and do not share it with anyone.
        </span>
        <div className="flex gap-x-4">
          <TextField
            variant="outlined"
            className="justify-center w-full"
            inputProps={{ className: "!py-[10px]" }}
            placeholder="API Key"
            type="password"
            onChange={(e) => setKeyInput(e.target.value)}
            value={keyInput}
          />
          <StyledButton
            id="api-key-confirm-button"
            className="px-6 w-fit font-medium"
            onClick={handleOk}
          >
            Confirm
          </StyledButton>
        </div>
        <span className="text-text-secondary-light text-sm mb-4">
          The key is not being stored externally. We store it safely in your
          browser. The key can be removed by typing anything here or deleted
          globally following{" "}
          <a
            href="https://help.openai.com/en/articles/9047852-how-can-i-delete-my-api-key"
            className="text-text-brand-light"
            target="_blank"
          >
            this tutorial
          </a>
          .
        </span>
        <DataUsageInfo />
      </DialogContent>
    </div>
  );
}
