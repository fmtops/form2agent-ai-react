import React from "react";
import { AiAudioService } from "../services/ai-audio-service";

// Firefox will only return the correct type in ondataavailable event when audio is not empty
// We need to store it to know what type to use during the onstop event
let lastDataMimeType: string | undefined = undefined;

export const setupMediaRecorder = (
  mediaStream: MediaStream,
  transcribingQueuesAmountRef: React.MutableRefObject<number>,
  messageRef: React.MutableRefObject<string>,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  lastMessageRef: React.MutableRefObject<string>
) => {
  const aiAudioService = new AiAudioService();
  let mediaRecorder = new MediaRecorder(mediaStream); // default options
  let chunks: Blob[] = [];

  mediaRecorder.ondataavailable = (e) => {
    lastDataMimeType = mediaRecorder.mimeType
      ? mediaRecorder.mimeType
      : lastDataMimeType;
    chunks.push(e.data);
  };

  mediaRecorder.onstop = async (e) => {
    transcribingQueuesAmountRef.current += 1;

    try {
      // Most browsers will have a correct mediaRecorder.mimeType here
      // In some scenarios, it will be empty, use the last known mime type or the backup
      let mimeTypeToUse = mediaRecorder.mimeType
        ? mediaRecorder.mimeType
        : lastDataMimeType
          ? lastDataMimeType
          : "audio/webm";
      let extension = mimeTypeToUse.split("/")[1].split(";")[0];
      let fileName = `audio.${extension}`;
      let file = new Blob(chunks, { type: mimeTypeToUse });
      chunks = [];
      var response = await aiAudioService.transcribe(
        fileName,
        file,
        messageRef.current,
        lastMessageRef.current
      );

      let text = response.transcription.trim();
      if (text !== "") setMessage((prev) => (prev ? prev + " " + text : text));
    } catch (error) {
      console.error("Transcription error:", error);
    } finally {
      transcribingQueuesAmountRef.current -= 1;
    }
  };

  return mediaRecorder;
};

export const setupAudioAnalyser = (mediaStream: MediaStream) => {
  const audioContext = new window.AudioContext();
  const mediaSource = audioContext.createMediaStreamSource(mediaStream);
  const audioAnalyser = audioContext.createAnalyser();
  mediaSource.connect(audioAnalyser);
  let analysedAudioDataArray = new Uint8Array(audioAnalyser.fftSize);

  return { audioAnalyser, analysedAudioDataArray };
};

// support function to check for permission to play audio - fixes safari autoplay
export function canPlayAudio(audioRef: React.RefObject<HTMLAudioElement>) {
  return new Promise((resolve) => {
    if (!audioRef.current) {
      resolve(false);
      return;
    }

    audioRef.current.oncanplaythrough = () => resolve(true);
    audioRef.current.onerror = () => resolve(false);

    audioRef.current.play().catch(() => resolve(false));
  });
}
