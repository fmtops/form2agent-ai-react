import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
export default function BurgerButton({
  onClick,
  isVisible,
}: {
  onClick: () => void;
  isVisible: boolean;
}) {
  return (
    <button
      className={`w-full py-6 md:p-6 md:pb-0 flex items-start ${
        isVisible ? "hidden" : "block"
      }`}
      onClick={onClick}
    >
      <MenuOutlinedIcon />
    </button>
  );
}
