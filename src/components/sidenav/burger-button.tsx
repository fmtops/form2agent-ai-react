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
      className={`w-full pt-6 flex items-start ${
        isVisible ? "hidden" : "block"
      }`}
      onClick={onClick}
    >
      <MenuOutlinedIcon />
    </button>
  );
}
