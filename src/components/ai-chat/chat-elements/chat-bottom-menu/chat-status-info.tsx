import { CHAT_CHAR_LIMIT } from "../../../../consts/chat.consts";
import { AudioState } from "../../../../types/Chat/Audio";
import StyledProgress from "../../../common/mui-styled/styled-progress";
import SpeechStatusText from "./speech-status-text";

export default function ChatStatusInfo({
  isSpeechStatusVisible,
  errorMessage,
  isListening,
  audioState,
  message,
  showProgressBar,
  audioStateProgress,
}: {
  isSpeechStatusVisible: boolean;
  errorMessage: string;
  isListening: boolean;
  audioState: AudioState;
  message: string;
  showProgressBar: boolean;
  audioStateProgress: number;
}) {
  return (
    <>
      <div
        className={`flex items-center mt-2 ${
          isSpeechStatusVisible || errorMessage !== ""
            ? "justify-between"
            : "justify-end"
        }`}
      >
        {errorMessage !== "" && (
          <span className={`text-sm self-start text-text-error-light`}>
            {errorMessage}
          </span>
        )}
        {isSpeechStatusVisible && (
          <SpeechStatusText isListening={isListening} audioState={audioState} />
        )}
        <span className={`text-xs text-text-secondary-light`}>
          {message.length}/{CHAT_CHAR_LIMIT}
        </span>
      </div>
      <div className="h-1 w-full mt-1">
        {showProgressBar && (
          <StyledProgress
            className="w-full rounded-sm"
            variant="determinate"
            value={audioStateProgress}
            barColor={"#687EFF"}
          />
        )}
      </div>
    </>
  );
}
