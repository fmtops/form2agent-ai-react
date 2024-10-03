import { useLayout } from "../../../contexts/LayoutContext";

/**
 * Chat Overlay component
 * @description Chat Overlay component to render the overlay when the chat is expanded on mobile
 */
export default function ChatOverlay() {
  const { isChatExpanded } = useLayout();

  return (
    <div
      className={`opacity-80 h-screen w-full fixed top-0 left-0 md:left-auto md:right-0 z-50 bg-bg-primary-solid-light md:invisible ${
        isChatExpanded ? "visible" : "invisible"
      }`}
    ></div>
  );
}
