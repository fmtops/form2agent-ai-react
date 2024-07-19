import Lottie from "react-lottie";
import { RED_DOT_ANIMATION_OPTIONS } from "../../../../consts/animations";
import { AudioState } from "../../../../types/Chat/Audio";

export default function SpeechStatusText({
  isListening,
  audioState,
}: {
  isListening: boolean;
  audioState: AudioState;
}) {
  const audioStateText: Record<AudioState, string> = {
    [AudioState.Calibration]: "Stay quiet, calibrating...",
    [AudioState.ReadyToTranscribe]: "No sound detected. Ready to transcribe...",
    [AudioState.ReadyToSend]: "No sound detected. Ready to send...",
    [AudioState.NoState]: "",
  };

  const statusText =
    audioStateText[audioState] || (isListening ? "Listening..." : "");

  return (
    <div className="flex items-center gap-1">
      <div className="w-2 h-2 rounded-full">
        <Lottie options={RED_DOT_ANIMATION_OPTIONS} />
      </div>
      <span className="text-xs text-[#EF4444]">{statusText}</span>
    </div>
  );
}
