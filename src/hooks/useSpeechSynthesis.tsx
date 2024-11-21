import { useState, useEffect } from "react";
import { AiAudioService } from "../services/ai-audio-service";
import { TrialExpiredError } from "../lib/errors/trial-expired-error";
import { useAudio } from "../contexts/AudioContext";

/**
 * @param onEnd - callback function to call when the TTS ends
 * @returns the TTS state and functions to play and stop TTS
 * `isTTSPlaying` - boolean to check if TTS is playing
 * `getAndPlayTTS` - function to play TTS
 * `stopTTS` - function to stop TTS
 * @example
 * ```tsx
 * const { isTTSPlaying, getAndPlayTTS, stopTTS } = useSpeechSynthesis(() => console.log("TTS ended"));
 * ```
 * @description Used to play and stop text-to-speech audio
 */
const useSpeechSynthesis = (onEnd: () => void) => {
  const aiAudioService = new AiAudioService();
  const { isAudioPlaying, playAudioStream, stopAudioStream } = useAudio();
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);

  // Cleanup the audio when the component unmounts - can't use the onEnd callback here
  useEffect(() => {
    return () => {
      if (isAudioPlaying) {
        stopTTS();
      }
    };
  }, [isAudioPlaying]);

  /**
   * @param text - text to convert to speech
   * @returns void
   * @description Get and play the text-to-speech audio
   * */
  const getAndPlayTTS = async (text: string) => {
    if (isAudioPlaying) return;
    setIsLoadingAudio(true);
    try {
      const reader = await aiAudioService.textToSpeech(text);
      playAudioStream(reader);
      setIsLoadingAudio(false);
    } catch (error) {
      console.error("Error fetching or playing TTS data:", error);
      stopTTS();
      setIsLoadingAudio(false);
      if (error instanceof TrialExpiredError) throw error; // let the caller handle an expired trial
    }
  };

  const stopTTS = () => {
    stopAudioStream();
    onEnd();
  };

  return {
    isTTSPlaying: isAudioPlaying,
    getAndPlayTTS,
    stopTTS,
    isLoadingAudio,
  };
};

export default useSpeechSynthesis;
