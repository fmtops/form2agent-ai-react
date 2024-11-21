import { Modal } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

export default function SuccessFormModal({
  isVisible,
  onClose,
  topText,
  bottomText,
}: {
  isVisible: boolean;
  onClose: () => void;
  topText?: string;
  bottomText?: string;
}) {
  return (
    <Modal
      onClose={onClose}
      open={isVisible}
      className="flex items-center justify-center"
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(31,41,55, 0.8)",
          },
        },
      }}
    >
      <div className={`rounded-[4px] p-6 flex flex-col w-96 bg-white`}>
        <CheckCircleOutlineOutlinedIcon className="text-emerald" />
        <div className="mt-4 mb-8">
          <h2 className={`text-2xl font-medium text-text-primary-light`}>
            {topText ?? "Thank You!"}
          </h2>
          <span className={`text-text-secondary-light`}>
            {bottomText ?? "Your information has been successfully submitted."}
          </span>
        </div>
        <a
          href="/"
          className="py-[6px] text-text-brand-light border-text-brand-light w-fit rounded px-6 border-[1px] text-sm font-medium"
        >
          Return to homepage
        </a>
      </div>
    </Modal>
  );
}
