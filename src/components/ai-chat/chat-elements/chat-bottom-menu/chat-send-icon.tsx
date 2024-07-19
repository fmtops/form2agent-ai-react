import { SendOutlined } from "@mui/icons-material";

export default function ChatSendIcon({
  handleSend,
  disableSend,
}: {
  handleSend: () => void;
  disableSend: boolean;
}) {
  return (
    <div
      onClick={handleSend}
      className={`rounded p-2 bg-bg-brand-contrast-light ${
        disableSend ? " bg-bg-disabled-primary-light" : " cursor-pointer"
      }`}
    >
      <SendOutlined
        className={`${disableSend ? "text-fg-disabled-light" : "text-white "}`}
      />
    </div>
  );
}
