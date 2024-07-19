import { useRef, useEffect, useCallback, useState } from "react";
import {
  setupMediaRecorder,
  setupAudioAnalyser,
} from "../utils/setupSpeechRecoginition";
import { WAVEFORM_MIDPOINT } from "../consts/audio.consts";
import conf from "../configs/aiconfig.json";
import { AudioState } from "../types/Chat/Audio";
import { ChatMessageType } from "../types/Chat/Chat";

type UseSpeechRecognitionType = {
  startListening: () => void;
  stopListening: () => void;
  audioState: AudioState;
  audioStateProgress: number;
};

/**
 *
 * @param isDisabled - to check if the speech recognition is disabled
 * @param isListening - to check if the speech recognition is listening
 * @param setIsListening - function to set the speech recognition listening state
 * @param message - string to set the message
 * @param setMessage - function to set the message
 * @param chatHistory - array of chat messages
 * @param sendMessage - function to send the message
 * @returns the speech recognition state and functions to start and stop listening
 * `startListening` - function to start listening
 * `stopListening` - function to stop listening
 * `audioState` - the current audio state
 * `audioStateProgress` - the progress of the current audio state
 * @example
 * ```tsx
 * const { startListening, stopListening, audioState, audioStateProgress } = useSpeechRecognition(
 *  isDisabled,
 * isListening,
 * setIsListening,
 * message,
 * setMessage,
 * chatHistory,
 * sendMessage
 * );
 * ```
 * @description Used to manage the speech recognition
 * */
const useSpeechRecognition = (
  isDisabled: boolean,
  isListening: boolean,
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>,
  message: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  chatHistory: ChatMessageType[],
  sendMessage: () => void
): UseSpeechRecognitionType => {
  // Compatibility check
  if (window.MediaRecorder === undefined || window.AudioContext === undefined) {
    throw new Error(
      "Media Recorder or Audio Context API is not supported in this browser."
    );
  }

  // Refs and state
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const noiseDetectionIntervalRef = useRef<NodeJS.Timer | null>(null);
  const isThereAudioToTranscribeRef = useRef(false);
  const transcribingQueuesAmountRef = useRef(0);
  const isDisabledRef = useRef(isDisabled);
  const isListeningRef = useRef(isListening);
  const messageRef = useRef(message);
  const lastMessageRef = useRef("");
  const sendMessageRef = useRef(sendMessage);
  const [audioState, setAudioState] = useState(AudioState.NoState);
  const [audioStateProgress, setAudioStateProgress] = useState(0);

  // Helper functions
  const progressBarClear = () => {
    setAudioState(AudioState.NoState);
    setAudioStateProgress(0);
  };

  const progressBarUpdate = (
    newAudioState: AudioState,
    totalTimeToReach: number,
    dateNow: number,
    dateStart: number,
    gracePeriodTime: number = 0
  ) => {
    // Don't display progress bar before we reach the grace period
    // This is done to avoid excessive flickering of the progress bar
    if (gracePeriodTime > 0 && dateNow - dateStart < gracePeriodTime) {
      return;
    }

    // Update state name
    if (audioState !== newAudioState) {
      setAudioState(newAudioState);
    }

    // Update state progress
    let progressRemaining =
      (100 * (totalTimeToReach - (dateNow - dateStart))) /
      (totalTimeToReach - gracePeriodTime);
    progressRemaining = progressRemaining < 0 ? 0 : progressRemaining;

    setAudioStateProgress(progressRemaining);
  };

  // Use Effects
  useEffect(() => {
    isDisabledRef.current = isDisabled;
  }, [isDisabled]);

  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  useEffect(() => {
    messageRef.current = message;
  }, [message]);

  useEffect(() => {
    lastMessageRef.current = chatHistory.at(-1)?.message || "";
  }, [chatHistory]);

  useEffect(() => {
    sendMessageRef.current = sendMessage;
  }, [sendMessage]);

  // Main listening function
  const startListening = useCallback(async () => {
    setIsListening(true);

    // Get audio
    try {
      mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    } catch (error) {
      return;
    }

    // Setup media recorder and audio analyser
    mediaRecorderRef.current = setupMediaRecorder(
      mediaStreamRef.current,
      transcribingQueuesAmountRef,
      messageRef,
      setMessage,
      lastMessageRef
    );

    const { audioAnalyser, analysedAudioDataArray } = setupAudioAnalyser(
      mediaStreamRef.current
    );

    // Calibration loop
    const noiseValues: number[] = [];
    const calibrationTotalTime =
      conf.SPEECH.CALIBRATION_INTERVAL * conf.SPEECH.CALIBRATION_SAMPLE_COUNT;
    const calibrationStartTime = Date.now();

    const calibrationIntervalId = setInterval(() => {
      audioAnalyser.getByteTimeDomainData(analysedAudioDataArray);
      const avgNoise =
        analysedAudioDataArray.reduce(
          (sum, value) => sum + Math.abs(value - WAVEFORM_MIDPOINT),
          0
        ) / analysedAudioDataArray.length;
      noiseValues.push(avgNoise);

      progressBarUpdate(
        AudioState.Calibration,
        calibrationTotalTime,
        Date.now(),
        calibrationStartTime
      );
    }, conf.SPEECH.CALIBRATION_INTERVAL);

    // Noise detection loop
    setTimeout(
      () => {
        clearInterval(calibrationIntervalId);

        const noiseSpeechThreshold =
          conf.SPEECH.NOISE_THRESH_BASE +
          Math.max(...noiseValues) * conf.SPEECH.NOISE_THRESH_MOD;

        progressBarClear();

        // We should allow for very brief periods of silence during speech
        // Don't break out of speech until we've had a few samples of silence
        // Start with silence by default, reset when we detect noise
        let samplesOfSilence = conf.SPEECH.SAMPLES_TO_BREAK_INTO_SILENCE;

        let silenceThresholdToTranscribeReached = false;
        let soundThresholdToConfirmIntentReached = false;
        let silenceStartedAt: number | null = null;
        let soundStartedAt: number | null = null;

        noiseDetectionIntervalRef.current = setInterval(() => {
          if (!isListeningRef.current) return;

          if (isDisabledRef.current) {
            if (mediaRecorderRef.current?.state === "recording") {
              mediaRecorderRef.current.pause();
            }
            return;
          }

          if (mediaRecorderRef.current?.state === "inactive") {
            mediaRecorderRef.current.start(conf.SPEECH.RECORDING_TIMESLICE);
            mediaRecorderRef.current.pause();
            return; // don't analyse b4 next loop, it can break progress bars
          }

          audioAnalyser.getByteTimeDomainData(analysedAudioDataArray);
          const avgNoise =
            analysedAudioDataArray.reduce(
              (sum, value) => sum + Math.abs(value - WAVEFORM_MIDPOINT),
              0
            ) / analysedAudioDataArray.length;
          const dateNow = Date.now();

          if (avgNoise < noiseSpeechThreshold) {
            samplesOfSilence++;
          } else samplesOfSilence = 0;

          // If enough samples of silence have been collected,
          // switch the "timers" to represent no sound
          if (samplesOfSilence >= conf.SPEECH.SAMPLES_TO_BREAK_INTO_SILENCE) {
            soundStartedAt = null;
            // if silence timer has not been started, start the timer and the loop
            // by setting silenceThresholdToTranscribeReached to false
            // otherwise if there is an ongoing or pending transcription, keep resetting it
            // we don't want the timer for sending to run while we are waiting for the API
            if (silenceStartedAt === null) {
              silenceStartedAt = dateNow;
              silenceThresholdToTranscribeReached = false;
            } else if (
              transcribingQueuesAmountRef.current > 0 ||
              (silenceThresholdToTranscribeReached &&
                (messageRef.current === "" ||
                  isThereAudioToTranscribeRef.current))
            ) {
              silenceStartedAt = dateNow;
            }
          } else {
            silenceStartedAt = null;
            silenceThresholdToTranscribeReached = false;
            if (soundStartedAt === null) {
              soundStartedAt = dateNow;
            }
          }

          if (
            silenceStartedAt !== null &&
            dateNow - silenceStartedAt > conf.SPEECH.TIME_TO_PAUSE
          ) {
            if (mediaRecorderRef.current?.state === "recording") {
              mediaRecorderRef.current.pause();
            }
          }

          if (
            silenceStartedAt !== null &&
            soundThresholdToConfirmIntentReached
          ) {
            if (!silenceThresholdToTranscribeReached) {
              progressBarUpdate(
                AudioState.ReadyToTranscribe,
                conf.SPEECH.TIME_TO_TRANSCRIBE,
                dateNow,
                silenceStartedAt,
                conf.SPEECH.DISPLAY_PROGRESS_GRACE_PERIOD
              );

              if (dateNow - silenceStartedAt > conf.SPEECH.TIME_TO_TRANSCRIBE) {
                silenceStartedAt = dateNow; // count from 0 for sending interaction
                silenceThresholdToTranscribeReached = true;
                isThereAudioToTranscribeRef.current = false;
                mediaRecorderRef.current?.stop();
              }
            } else if (
              !isThereAudioToTranscribeRef.current &&
              transcribingQueuesAmountRef.current <= 0 &&
              silenceThresholdToTranscribeReached &&
              messageRef.current?.trim()
            ) {
              progressBarUpdate(
                AudioState.ReadyToSend,
                conf.SPEECH.TIME_TO_SEND,
                dateNow,
                silenceStartedAt,
                conf.SPEECH.DISPLAY_PROGRESS_GRACE_PERIOD
              );

              if (dateNow - silenceStartedAt > conf.SPEECH.TIME_TO_SEND) {
                silenceStartedAt = null;
                soundThresholdToConfirmIntentReached = false;
                sendMessageRef.current();
              }
            } else {
              progressBarClear();
            }
          } else if (soundStartedAt !== null) {
            progressBarClear();

            if (mediaRecorderRef.current?.state === "paused") {
              mediaRecorderRef.current.resume();
            }
            if (dateNow - soundStartedAt > conf.SPEECH.TIME_TO_CONFIRM_SPEECH) {
              isThereAudioToTranscribeRef.current = true;
              soundThresholdToConfirmIntentReached = true;
            }
          } else {
            progressBarClear();
          }
        }, conf.SPEECH.DETECTION_INTERVAL);
      },
      conf.SPEECH.CALIBRATION_INTERVAL * conf.SPEECH.CALIBRATION_SAMPLE_COUNT +
        5
    );

    mediaRecorderRef.current.start(conf.SPEECH.RECORDING_TIMESLICE);
  }, [setIsListening, setMessage]);

  const stopListening = useCallback(() => {
    setIsListening(false);
    progressBarClear();

    if (noiseDetectionIntervalRef.current !== null) {
      clearInterval(noiseDetectionIntervalRef.current);
      noiseDetectionIntervalRef.current = null;
    }

    if (mediaRecorderRef.current !== null) {
      mediaRecorderRef.current.stop();
    }

    if (mediaStreamRef.current !== null) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
  }, [setIsListening]);

  // Cleanup when the parent component is unmounted
  useEffect(() => {
    return () => {
      if (noiseDetectionIntervalRef.current !== null) {
        clearInterval(noiseDetectionIntervalRef.current);
      }

      if (mediaStreamRef.current !== null) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return {
    startListening,
    stopListening,
    audioState: audioState,
    audioStateProgress: audioStateProgress,
  };
};

export default useSpeechRecognition;
