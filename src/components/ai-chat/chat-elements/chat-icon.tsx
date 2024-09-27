import { Button, CircularProgress } from "@mui/material";
import { ChatOutlined } from "@mui/icons-material";
import { StyledToolTip } from "../../common/mui-styled/styled-tooltip";
import StyledProgress from "../../common/mui-styled/styled-progress";
import { AudioState } from "../../../types/Chat/Audio";
import { VOICE_WAVES_ANIMATION_OPTIONS } from "../../../consts/animations";
import Lottie from "react-lottie";
import { useState, useRef, useEffect } from "react";
import {
  FIRST_TOOLTIP_APPEAR_MS,
  HOLD_TIME_MS,
} from "../../../consts/chat.consts";
import HoldOrPressButton from "../../common/hold-press-button";
import { getTooltipText } from "../../../utils/chat.utilts";

/**
 * @param onClick - function to handle the click event
 * @param isListening - boolean to check if the chat icon is listening
 * @param audioState - `AudioState` enum to get the coresponding tooltip text
 * @param audioStateProgress - progress of the audio state
 * @param handleHoldInteraction - function to handle the hold interaction
 * @param isChatBeingCreated - boolean to check if the chat is being created
 * @param isExpanded - boolean to check if the chat is expanded
 * @returns ChatIcon component
 * @description Chat Icon which opens the chat window, shows the tooltip and state of listening when chat is minimized.
 * When being rendered for the first time, it shows the tooltip for a short time.
 */
export default function ChatIcon({
  onClick,
  isListening,
  audioState,
  audioStateProgress,
  handleHoldInteraction,
  isChatBeingCreated,
  isExpanded,
}: {
  onClick: () => void;
  isListening: boolean;
  audioState: AudioState;
  audioStateProgress: number;
  handleHoldInteraction: () => void;
  isChatBeingCreated: boolean;
  isExpanded: boolean;
}) {
  const firstRenderRef = useRef(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (firstRenderRef.current) {
      setShowTooltip(true);
      tooltipTimeoutRef.current = setTimeout(() => {
        setShowTooltip(false);
      }, FIRST_TOOLTIP_APPEAR_MS);
      firstRenderRef.current = false;
    }
  }, []);

  const tooltipText = getTooltipText(audioState);

  return (
    <>
      <StyledToolTip
        className={`${isExpanded ? "invisible" : ""} z-40`}
        disableHoverListener={Boolean(tooltipText)}
        title={showTooltip ? "Long press to start voice chat" : tooltipText}
        placement="left"
        arrow
        open={showTooltip || tooltipText !== ""}
        PopperProps={{ style: { zIndex: 40 } }}
      >
        <div
          className={`fixed right-8 z-40 bottom-8 lg:right-2 lg:bottom-2 rounded shadow-md ${
            isListening && audioState === AudioState.NoState
              ? "bg-[#EF4444]"
              : "bg-bg-brand-contrast-light"
          } `}
        >
          <HoldOrPressButton
            id="chat-icon-button"
            handleClick={onClick}
            onHold={handleHoldInteraction}
            disabled={isChatBeingCreated}
            holdTime={HOLD_TIME_MS}
          >
            <Button className="w-16 h-16" variant="text">
              {isChatBeingCreated ? (
                <CircularProgress
                  id="chat-hands-free-loading-icon"
                  color="inherit"
                  className="text-white p-1"
                />
              ) : isListening && audioState === AudioState.NoState ? (
                <div id="chat-hands-free-recording-icon">
                  <Lottie options={VOICE_WAVES_ANIMATION_OPTIONS} />
                </div>
              ) : audioState !== AudioState.NoState ? (
                <StyledProgress
                  id="chat-hands-free-progress-icon"
                  className="w-1/2 rounded-sm"
                  variant="determinate"
                  value={audioStateProgress}
                />
              ) : (
                <ChatOutlined
                  id="chat-icon"
                  className={`fillwhite text-bg-brand-contrast-light`}
                />
              )}
            </Button>
          </HoldOrPressButton>
        </div>
      </StyledToolTip>
    </>
  );
}
