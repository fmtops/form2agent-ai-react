import React from "react";
import { AiAudioService } from "../services/ai-audio-service";
import { AudioRecorder } from "../lib/audio/audio-recorder";

export const setupAudioRecorder = (
  mediaStream: MediaStream,
  transcribingQueuesAmountRef: React.MutableRefObject<number>,
  messageRef: React.MutableRefObject<string>,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  lastMessageRef: React.MutableRefObject<string>,
  handleRecognitionError: (error: unknown) => void
) => {
  const aiAudioService = new AiAudioService();
  const onStop = async (file: Blob) => {
    transcribingQueuesAmountRef.current += 1;

    try {
      let extension = file.type.split("/")[1].split(";")[0];
      let fileName = `audio.${extension}`;

      var response = await aiAudioService.transcribe(
        fileName,
        file,
        messageRef.current,
        lastMessageRef.current
      );

      let text = response.transcription.trim();
      if (text !== "") setMessage((prev) => (prev ? prev + " " + text : text));
    } catch (error) {
      handleRecognitionError(error);
    } finally {
      transcribingQueuesAmountRef.current -= 1;
    }
  };

  return new AudioRecorder(mediaStream, onStop);
};

export const setupAudioAnalyser = (mediaStream: MediaStream) => {
  const audioContext = new window.AudioContext();
  const mediaSource = audioContext.createMediaStreamSource(mediaStream);
  const audioAnalyser = audioContext.createAnalyser();
  mediaSource.connect(audioAnalyser);
  let analysedAudioDataArray = new Uint8Array(audioAnalyser.fftSize);

  return { audioAnalyser, analysedAudioDataArray };
};
