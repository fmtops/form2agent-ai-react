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
      id="chat-microphone-stop-button"
      className={`p-2 cursor-pointer`}
      onClick={toggleListening}
    >
      <StopCircleOutlinedIcon htmlColor={"#EF4444"} />
    </div>
  ) : (
    <div
      id="chat-microphone-start-button"
      className={`p-2 cursor-pointer hover:bg-gray text-fg-secondary-light`}
      onClick={toggleListening}
    >
      <KeyboardVoiceOutlinedIcon
        color={disabledVoice ? "disabled" : "inherit"}
      />
    </div>
  );
}
