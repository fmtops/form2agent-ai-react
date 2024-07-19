import React from "react";
import { AiAudioService } from "../services/ai-audio-service";

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
    chunks.push(e.data);
  };

  mediaRecorder.onstop = async (e) => {
    transcribingQueuesAmountRef.current += 1;

    try {
      let extension = mediaRecorder.mimeType.split("/")[1].split(";")[0];
      let fileName = `audio.${extension}`;
      let file = new Blob(chunks, { type: mediaRecorder.mimeType });
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
