import { useState, useEffect, useRef } from "react";
import { AiAudioService } from "../services/ai-audio-service";
import { DEFAULT_TTS_FILE_FORMAT } from "../consts/audio.consts";

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
  const audioRef = useRef(new Audio());
  const [isTTSPlaying, setIsTTSPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);

  useEffect(() => {
    audioRef.current.onplay = () => {
      setIsTTSPlaying(true);
    };

    audioRef.current.onpause =
      audioRef.current.onended =
      audioRef.current.onerror =
        () => {
          if (!isTTSPlaying) return;
          audioRef.current.currentTime = 0;
          setIsTTSPlaying(false);
          onEnd();
        };
  }, [isTTSPlaying, onEnd]);

  // Cleanup the audio when the component unmounts - can't use the onEnd callback here
  useEffect(() => {
    return () => {
      if (isTTSPlaying) {
        audioRef.current.pause();
      }
    };
  }, [isTTSPlaying]);

  /**
   * @param text - text to convert to speech
   * @returns void
   * @description Get and play the text-to-speech audio
   * */
  const getAndPlayTTS = async (text: string) => {
    if (isTTSPlaying) return;
    setIsLoadingAudio(true);
    try {
      const reader = await aiAudioService.textToSpeech(text);
      const playWithBlob = async () => {
        let chunks = [];
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
        }
        const blob = new Blob(chunks, {
          type: `audio/${DEFAULT_TTS_FILE_FORMAT}`,
        });
        const url = URL.createObjectURL(blob);
        audioRef.current.src = url;
      };

      await playWithBlob();
      setIsTTSPlaying(true);
      audioRef.current.play();
      setIsLoadingAudio(false);
    } catch (error) {
      console.error("Error fetching or playing TTS data:", error);
      audioRef.current.pause();
      setIsLoadingAudio(false);
    }
  };

  const stopTTS = () => {
    audioRef.current.pause();
  };

  return { isTTSPlaying, getAndPlayTTS, stopTTS, isLoadingAudio };
};

export default useSpeechSynthesis;
