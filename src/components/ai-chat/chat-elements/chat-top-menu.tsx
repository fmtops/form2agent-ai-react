import RemoveIcon from "@mui/icons-material/Remove";

export default function ChatNavbar({ onClose }: { onClose: () => void }) {
  return (
    <div
      className={`w-full p-4 border-b-2 mb-2 border-b-border-primary-light flex justify-between items-center`}
    >
      <div className="flex gap-4 justify-center items-center">
        <img className="w-10 rounded-full" src="./icon_fm.svg" alt="" />
        <span className="font-bold">Form2agent AI</span>
      </div>
      <RemoveIcon
        onClick={onClose}
        className={`cursor-pointer text-fg-primary-light`}
      />
    </div>
  );
}
