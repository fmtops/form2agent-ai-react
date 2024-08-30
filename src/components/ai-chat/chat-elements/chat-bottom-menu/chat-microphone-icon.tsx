import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import { StyledToolTip } from "../../../common/mui-styled/styled-tooltip";

export default function ChatMicrophoneIcon({
  isListening,
  toggleListening,
  disabledVoice,
}: {
  isListening: boolean;
  toggleListening: () => void;
  disabledVoice: boolean;
}) {
  return isListening ? (
    <div
      id="chat-microphone-button"
      className={`p-2 cursor-pointer`}
      onClick={toggleListening}
    >
      <StopCircleOutlinedIcon htmlColor={"#EF4444"} />
    </div>
  ) : (
    <StyledToolTip
      className="text-center"
      title="To use commands, say “chat” followed by “send”, “clear” or “cancel”"
    >
      <div
        className={`p-2 cursor-pointer hover:bg-gray text-fg-secondary-light`}
        onClick={toggleListening}
      >
        <KeyboardVoiceOutlinedIcon
          color={disabledVoice ? "disabled" : "inherit"}
        />
      </div>
    </StyledToolTip>
  );
}
