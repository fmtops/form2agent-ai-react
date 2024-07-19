import { CloudUploadOutlined } from "@mui/icons-material";
import { SupportedFileExtensions } from "../../../../consts/files";

export default function ChatUploadIcon({
  handleFileUpload,
  fileInputRef,
  onFileChange,
}: {
  handleFileUpload: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileChange: (e: any) => void;
}) {
  return (
    <div className="p-2">
      <CloudUploadOutlined
        className={`cursor-pointer text-fg-secondary-light`}
        onClick={handleFileUpload}
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={onFileChange}
        accept={Object.values(SupportedFileExtensions).join(",")}
      />
    </div>
  );
}
