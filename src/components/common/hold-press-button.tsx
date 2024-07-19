import { useRef } from "react";
import { HOLD_TIME_MS } from "../../consts/chat.consts";

type PropType = {
  handleClick: () => void;
  onHold: () => void;
  holdTime: number;
  disabled?: boolean;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const HoldOrPressButton = ({
  handleClick,
  onHold,
  children,
  holdTime,
  disabled,
  ...rest
}: PropType) => {
  const startTime = useRef<number>(0);

  const handleInteractionStart = () => {
    if (disabled) return;
    startTime.current = Date.now();
  };

  const handleInteractionEnd = () => {
    if (disabled) return;
    const endTime = Date.now();
    const timeDifference = endTime - startTime.current;
    if (timeDifference > HOLD_TIME_MS) {
      onHold();
      startTime.current = 0;
    } else {
      handleClick();
      startTime.current = 0;
    }
  };

  return (
    <div
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
      onMouseDown={handleInteractionStart}
      onMouseUp={handleInteractionEnd}
      {...rest}
    >
      {children}
    </div>
  );
};

export default HoldOrPressButton;
