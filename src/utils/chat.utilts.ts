import { AudioState } from "../types/Chat/Audio";

/**
 * @param audioState - `AudioState` enum to get the coresponding tooltip text
 * @returns The tooltip text based on the audio state
 * @description Get the tooltip text based on the audio state
 */
export const getTooltipText = (audioState: AudioState) => {
  switch (audioState) {
    case AudioState.Calibration:
      return "Stay quiet, calibrating...";
    case AudioState.ReadyToTranscribe:
      return "No sound detected. Ready to transcribe...";
    case AudioState.ReadyToSend:
      return "No sound detected. Ready to send...";
    default:
      return "";
  }
};

/**
 * @param value - value to stringify
 * @returns Stringified value with a delimiter at the end, if the value is null or undefined, it returns an empty string
 * @description Stringify the form values and context to pass to the backend
 */
export const stringifyValues = (value: any) => {
  if (value === null || value === undefined) {
    return "";
  }
  return JSON.stringify(value) + "#####jsonEnd";
};
