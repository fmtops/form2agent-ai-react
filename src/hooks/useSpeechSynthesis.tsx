import { useState, useEffect, useRef } from "react";
import { AiAudioService } from "../services/ai-audio-service";
import { DEFAULT_TTS_FILE_FORMAT } from "../consts/audio.consts";
import { canPlayAudio } from "../utils/setupSpeechRecoginition";

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

  /**
   * @param text - text to convert to speech
   * @returns void
   * @description Get and play the text-to-speech audio
   * */
  const getAndPlayTTS = async (text: string) => {
    if (isTTSPlaying) return;
    setIsTTSPlaying(true);

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
      const playWithMediaSource = async () => {
        const mediaSource = new MediaSource();
        audioRef.current.src = URL.createObjectURL(mediaSource);

        mediaSource.addEventListener("sourceopen", async () => {
          const sourceBuffer = mediaSource.addSourceBuffer(
            `audio/${DEFAULT_TTS_FILE_FORMAT}`
          );

          const appendBuffer = async () => {
            const { done, value } = await reader.read();
            if (done) {
              reader.releaseLock();
              mediaSource.endOfStream();
              return;
            }
            sourceBuffer.appendBuffer(value);
          };

          sourceBuffer.addEventListener("updateend", appendBuffer);
          await appendBuffer();
        });

        mediaSource.addEventListener("error", (error) => {
          console.error("Error loading media source:", error);
        });
      };
      const isMediaSourceSupported = typeof MediaSource !== "undefined";
      if (!isMediaSourceSupported) {
        await playWithBlob();
      } else {
        await playWithMediaSource();
        const isAllowed = await canPlayAudio(audioRef);
        if (!isAllowed) throw new Error("Error playing - not allowed");
      }

      audioRef.current.play();
    } catch (error) {
      console.error("Error fetching or playing TTS data:", error);
      audioRef.current.pause();
    }
  };

  const stopTTS = () => {
    audioRef.current.pause();
  };

  return { isTTSPlaying, getAndPlayTTS, stopTTS };
};

export default useSpeechSynthesis;
