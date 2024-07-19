import { DescriptionOutlined } from "@mui/icons-material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { CircularProgress } from "@mui/material";

export type FileSectionComponentProps = {
  fileName?: string;
  onClearFile?: () => void;
  progress?: number;
};

export const FileSectionComponent = ({
  fileName,
  onClearFile,
  progress,
}: FileSectionComponentProps) => {
  return (
    <div
      className={`m-2 flex border justify-between rounded p-2 border-border-primary-light`}
    >
      <div className="flex">
        <div
          className={`flex justify-center items-center rounded w-10 h-10 bg-bg-brand-contrast-light`}
        >
          {progress && progress < 100 ? (
            <CircularProgress color="inherit" className="text-white p-2" />
          ) : (
            <DescriptionOutlined className={`text-white`} />
          )}
        </div>
        <div className="flex flex-col ml-4">
          <span className={`text-sm word-break text-text-primary-light`}>
            {fileName}
          </span>
          <span className={`text-xs text-text-secondary-light`}>File</span>
        </div>
      </div>
      {onClearFile && (
        <CloseOutlinedIcon
          onClick={onClearFile}
          htmlColor="#6B7280"
          sx={{ width: 20, height: 20 }}
        />
      )}
    </div>
  );
};
